import { h, TEXT_NODE } from '../zhin-core/vdom.js';
import { mount, patch } from '../zhin-core/diff.js';
import assert from 'assert';

// Mock DOM
const mockDoc = {
    createTextNode: (val) => ({ nodeValue: val, nodeName: '#text' }),
    createElement: (tag) => ({
        tagName: tag.toUpperCase(),
        attributes: {},
        children: [],
        style: {},
        setAttribute(k, v) { this.attributes[k] = v; },
        removeAttribute(k) { delete this.attributes[k]; },
        appendChild(child) {
            this.children.push(child);
            child.parentNode = this;
            return child;
        },
        replaceChild(newChild, oldChild) {
            const idx = this.children.indexOf(oldChild);
            if (idx > -1) {
                this.children[idx] = newChild;
                newChild.parentNode = this;
                oldChild.parentNode = null;
            }
        },
        removeChild(child) {
            const idx = this.children.indexOf(child);
            if (idx > -1) {
                this.children.splice(idx, 1);
                child.parentNode = null;
            }
        },
        addEventListener() {},
        removeEventListener() {}
    })
};
global.document = mockDoc;

console.log("Running VDOM Tests...");

// Test 1: h()
const vnode = h('div', { id: 'app' }, 'Hello');
assert.strictEqual(vnode.tag, 'div');
assert.strictEqual(vnode.props.id, 'app');
assert.strictEqual(vnode.children[0].tag, TEXT_NODE);
console.log("  - h() created correct structure");

// Test 2: Mount
const container = mockDoc.createElement('body');
const el = mount(vnode, container);
assert.strictEqual(container.children.length, 1);
assert.strictEqual(container.children[0].tagName, 'DIV');
assert.strictEqual(container.children[0].attributes.id, 'app');
console.log("  - mount() attached to DOM");

// Test 3: Patch (Text Update)
const vnode2 = h('div', { id: 'app' }, 'World');
patch(vnode, vnode2);
// The 'el' variable holds the reference to the REAL DOM node.
// vnode.el was the old VNode's ref. vnode2.el should be the same.
assert.strictEqual(el.children[0].nodeValue, 'World');
console.log("  - patch() updated text content");

// Test 4: Patch (Attribute Update)
const vnode3 = h('div', { id: 'container' }, 'World');
patch(vnode2, vnode3);
assert.strictEqual(el.attributes.id, 'container');
console.log("  - patch() updated attributes");

// Test 5: Patch (Replace Node)
const vnode4 = h('span', {}, 'Span');
const newEl = patch(vnode3, vnode4);
assert.strictEqual(container.children[0].tagName, 'SPAN');
console.log("  - patch() replaced node type");

console.log("VDOM & Diff Tests Passed!");
