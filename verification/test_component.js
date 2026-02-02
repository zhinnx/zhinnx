import { Component } from '../zhin-core/component-v2.js';
import { html } from '../zhin-core/html.js';
import { renderToString } from '../zhin-core/ssr.js';
import assert from 'assert';

// Mock DOM
const mockDoc = {
    createTextNode: (val) => ({ nodeValue: val, nodeName: '#text' }),
    createElement: (tag) => ({
        tagName: tag.toUpperCase(),
        attributes: {},
        children: [],
        appendChild(child) {
            this.children.push(child);
            child.parentNode = this;
            return child;
        },
        replaceChild(newChild, oldChild) {
            const idx = this.children.indexOf(oldChild);
            if (idx > -1) this.children[idx] = newChild;
        },
        removeChild(child) {},
        addEventListener() {},
        removeEventListener() {},
        setAttribute(k, v) { this.attributes[k] = v; }
    })
};
global.document = mockDoc;

console.log("Running Component & SSR Tests...");

// Test 1: HTML Parser
const vnode = html`<div id="test">Hello ${'World'}</div>`;
assert.strictEqual(vnode.tag, 'div');
assert.strictEqual(vnode.props.id, 'test');
// Children structure might vary depending on whitespace/parser
// Just check it has children
assert(vnode.children.length > 0);
console.log("  - html`` parser works");

// Test 2: Component
class TestComp extends Component {
    render() {
        return html`<span class="foo">${this.props.msg}</span>`;
    }
}

const comp = new TestComp({ msg: 'Hi' });
const container = mockDoc.createElement('div');
comp.mount(container);

assert.strictEqual(container.children[0].tagName, 'SPAN');
assert.strictEqual(container.children[0].attributes.class, 'foo');
console.log("  - Component mount works");

// Test 3: SSR
const ssrHtml = renderToString(vnode);
console.log(`    Output: ${ssrHtml}`);
assert(ssrHtml.includes('<div id="test">'));
assert(ssrHtml.includes('Hello'));
assert(ssrHtml.includes('World'));
console.log("  - SSR renderToString works");

console.log("Component & HTML Tests Passed!");
