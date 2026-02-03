
// Verification Script for zhinnx v2 Core Engine
// Runs in Node.js with Mock DOM

console.log('--- Starting zhinnx v2 Core Verification ---');

// --- 1. Mock DOM Environment ---
const Node = {
    ELEMENT_NODE: 1,
    TEXT_NODE: 3,
    DOCUMENT_FRAGMENT_NODE: 11
};
global.Node = Node;

class MockNode {
    constructor() {
        this.childNodes = [];
        this.parentNode = null;
    }
    appendChild(node) {
        if (node.parentNode) node.parentNode.removeChild(node);
        node.parentNode = this;
        this.childNodes.push(node);
        return node;
    }
    removeChild(node) {
        const i = this.childNodes.indexOf(node);
        if (i > -1) {
            this.childNodes.splice(i, 1);
            node.parentNode = null;
        }
        return node;
    }
    replaceChild(newChild, oldChild) {
        const i = this.childNodes.indexOf(oldChild);
        if (i > -1) {
            if (newChild.parentNode) newChild.parentNode.removeChild(newChild);
            this.childNodes[i] = newChild;
            newChild.parentNode = this;
            oldChild.parentNode = null;
        }
        return newChild;
    }
    insertBefore(newNode, refNode) {
        if (!refNode) return this.appendChild(newNode);
        const i = this.childNodes.indexOf(refNode);
        if (i > -1) {
            if (newNode.parentNode) newNode.parentNode.removeChild(newNode);
            this.childNodes.splice(i, 0, newNode);
            newNode.parentNode = this;
        }
        return newNode;
    }
    get nextSibling() {
        if (!this.parentNode) return null;
        const i = this.parentNode.childNodes.indexOf(this);
        return this.parentNode.childNodes[i+1] || null;
    }
}

class MockElement extends MockNode {
    constructor(tag) {
        super();
        this.tagName = tag.toUpperCase();
        this.nodeType = Node.ELEMENT_NODE;
        this.attrs = {};
    }
    setAttribute(k, v) { this.attrs[k] = v; }
    removeAttribute(k) { delete this.attrs[k]; }
    addEventListener() {}
    removeEventListener() {}
}

class MockText extends MockNode {
    constructor(text) {
        super();
        this.nodeType = Node.TEXT_NODE;
        this.nodeValue = text;
    }
}

global.document = {
    createElement: (tag) => new MockElement(tag),
    createTextNode: (text) => new MockText(text),
};

// --- 2. Import Modules ---
// Using dynamic import since we are in a module environment
import { reactive, effect, computed } from '../zhin-core/reactive.js';
import { h } from '../zhin-core/vdom.js';
import { mount, patch } from '../zhin-core/diff.js';

async function runTests() {
    let passed = 0;
    let failed = 0;

    function assert(condition, msg) {
        if (condition) {
            console.log(`✅ ${msg}`);
            passed++;
        } else {
            console.error(`❌ ${msg}`);
            failed++;
        }
    }

    // --- Test Reactivity ---
    console.log('\nTesting Reactivity...');
    const state = reactive({ count: 0 });
    let dummy;
    effect(() => {
        dummy = state.count;
    });
    assert(dummy === 0, 'Effect runs immediately');

    state.count++;
    assert(dummy === 1, 'Effect updates on reactive change');

    // --- Test VDOM Factory ---
    console.log('\nTesting VDOM (h)...');
    const vnode = h('div', { id: 'test' }, 'Hello');
    assert(vnode.tag === 'div', 'Tag is correct');
    assert(vnode.props.id === 'test', 'Props are correct');
    // Check normalization (string -> object)
    assert(vnode.children[0].text === 'Hello', 'Text child normalized');

    // --- Test Mount ---
    console.log('\nTesting Mount...');
    const container = new MockElement('root');
    mount(vnode, container);

    assert(container.childNodes.length === 1, 'Mounted one element');
    const el = container.childNodes[0];
    assert(el.tagName === 'DIV', 'Element tag correct');
    assert(el.attrs.id === 'test', 'Attribute set');
    assert(el.childNodes[0].nodeValue === 'Hello', 'Text content correct');

    // --- Test Patch (Update Text) ---
    console.log('\nTesting Patch (Text Update)...');
    const vnode2 = h('div', { id: 'test' }, 'World');
    patch(vnode, vnode2, container);

    assert(el.childNodes[0].nodeValue === 'World', 'Text updated');
    assert(container.childNodes.length === 1, 'No extra nodes');

    // --- Test Patch (Prop Update) ---
    console.log('\nTesting Patch (Prop Update)...');
    const vnode3 = h('div', { id: 'new-id' }, 'World');
    patch(vnode2, vnode3, container);
    assert(el.attrs.id === 'new-id', 'Prop updated');

    // --- Test Patch (Keyed Diff) ---
    console.log('\nTesting Patch (Keyed Diff)...');
    // List: [A, B, C] -> [A, C, B]
    const list1 = h('ul', {},
        h('li', { key: 'a' }, 'A'),
        h('li', { key: 'b' }, 'B'),
        h('li', { key: 'c' }, 'C')
    );
    const list2 = h('ul', {},
        h('li', { key: 'a' }, 'A'),
        h('li', { key: 'c' }, 'C'),
        h('li', { key: 'b' }, 'B')
    );

    // Clear container
    container.childNodes = [];
    mount(list1, container);
    const ul = container.childNodes[0];
    const [liA, liB, liC] = ul.childNodes; // References to original DOM nodes

    assert(liA.childNodes[0].nodeValue === 'A', 'Initial Render A');

    patch(list1, list2, container);

    const newChildren = ul.childNodes;
    assert(newChildren[0] === liA, 'Node A preserved');
    assert(newChildren[1] === liC, 'Node C moved');
    assert(newChildren[2] === liB, 'Node B moved');
    assert(newChildren.length === 3, 'Correct length');

    // --- Summary ---
    console.log(`\nTests Completed: ${passed} Passed, ${failed} Failed.`);
    if (failed > 0) process.exit(1);
}

runTests().catch(err => {
    console.error(err);
    process.exit(1);
});
