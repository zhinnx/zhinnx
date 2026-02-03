
// Verification Script for zhinnx v2 SSR & Hydration

console.log('--- Starting zhinnx v2 SSR Verification ---');

// --- 1. Mock DOM Environment for Hydration Test ---
const Node = {
    ELEMENT_NODE: 1,
    TEXT_NODE: 3,
    DOCUMENT_FRAGMENT_NODE: 11
};
global.Node = Node;

// Flag for VDOM to switch to SSR mode when testing SSR functions
global.IS_SSR_TEST = false;

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
    get firstChild() {
        return this.childNodes[0] || null;
    }
    hasChildNodes() {
        return this.childNodes.length > 0;
    }
}

class MockElement extends MockNode {
    constructor(tag) {
        super();
        this.tagName = tag.toUpperCase();
        this.nodeType = Node.ELEMENT_NODE;
        this.attrs = {};
        this._listeners = {};
    }
    setAttribute(k, v) { this.attrs[k] = v; }
    removeAttribute(k) { delete this.attrs[k]; }
    addEventListener(name, fn) { this._listeners[name] = fn; }
    removeEventListener(name) { delete this._listeners[name]; }
}

class MockText extends MockNode {
    constructor(text) {
        super();
        this.nodeType = Node.TEXT_NODE;
        this.nodeValue = text;
    }
}

global.document = {
    createElement: (tag) => {
        if (tag === 'template') {
            return {
                content: { nodeType: 11, childNodes: [] }, // Mock template content
                innerHTML: ''
            };
        }
        return new MockElement(tag);
    },
    createTextNode: (text) => new MockText(text),
};

// --- 2. Import Modules ---
import { h, html } from '../zhin-core/vdom.js';
import { Component } from '../zhin-core/Component.js';
import { renderToString, renderPage } from '../zhin-core/ssr.js';
import { hydrate } from '../zhin-core/diff.js';

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

    // --- Test 1: renderToString (Basic) ---
    console.log('\nTesting renderToString...');

    // Enable SSR mode manually via global flag we added in vdom.js
    global.IS_SSR_TEST = true;

    const vnode = h('div', { id: 'ssr' }, 'Content');
    const htmlStr = renderToString(vnode);
    assert(htmlStr === '<div id="ssr">Content</div>', 'Render VNode to String');

    // --- Test 2: renderPage (SEO) ---
    console.log('\nTesting renderPage (SEO)...');
    class MockPage extends Component {
        static meta = { title: 'Test Page', description: 'SEO Test' };
        render() { return h('h1', {}, 'Hello'); }
    }

    const pageHtml = renderPage(MockPage, {}, '/test');
    assert(pageHtml.includes('<title>Test Page</title>'), 'Title injected');
    assert(pageHtml.includes('content="SEO Test"'), 'Description injected');
    assert(pageHtml.includes('<h1>Hello</h1>'), 'Content rendered');
    assert(pageHtml.includes('application/ld+json'), 'JSON-LD injected');

    global.IS_SSR_TEST = false;

    // --- Test 3: Hydration ---
    console.log('\nTesting Hydration...');

    // Setup Mock DOM that matches the VNode
    const container = new MockElement('root');
    const ssrDiv = new MockElement('div');
    ssrDiv.setAttribute('id', 'hydrate-me');
    const ssrText = new MockText('Click Me');
    ssrDiv.appendChild(ssrText);
    container.appendChild(ssrDiv);

    // VNode to hydrate
    const vnodeToHydrate = h('div', { id: 'hydrate-me', onClick: () => {} }, 'Click Me');

    // Run Hydrate
    hydrate(vnodeToHydrate, container);

    const hydratedEl = container.childNodes[0];
    assert(hydratedEl === ssrDiv, 'DOM Node Preserved');
    assert(hydratedEl._listeners['click'], 'Event Listener Attached');
    assert(hydratedEl.childNodes[0].nodeValue === 'Click Me', 'Text Content Preserved');

    // --- Test 4: Hydration Mismatch (Text) ---
    console.log('\nTesting Hydration Mismatch...');
    const container2 = new MockElement('root');
    container2.appendChild(new MockText('Old Text'));

    const vnodeMismatch = h('span', {}, 'New Text');

    // Hydrate should replace
    hydrate(vnodeMismatch, container2);

    assert(container2.childNodes[0].tagName === 'SPAN', 'Node replaced on mismatch');
    assert(container2.childNodes[0].childNodes[0].nodeValue === 'New Text', 'New content rendered');


    console.log(`\nTests Completed: ${passed} Passed, ${failed} Failed.`);
    process.exit(failed > 0 ? 1 : 0);
}

runTests().catch(err => {
    console.error(err);
    process.exit(1);
});
