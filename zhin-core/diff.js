/**
 * ZhinStack Diffing Engine
 * Efficiently updates the DOM based on VNodes.
 */
import { TEXT_NODE } from './vdom.js';

export function mount(vnode, container) {
    let el;
    if (vnode.tag === TEXT_NODE) {
        el = document.createTextNode(vnode.props.nodeValue);
    } else {
        el = document.createElement(vnode.tag);
        // Props
        if (vnode.props) {
            patchProps(el, {}, vnode.props);
        }
        // Children
        if (vnode.children) {
            vnode.children.forEach(child => mount(child, el));
        }
    }
    vnode.el = el;
    if (container) {
        container.appendChild(el);
    }
    return el;
}

export function patch(n1, n2) {
    // If nodes are completely different, replace
    if (n1.tag !== n2.tag) {
        const parent = n1.el.parentNode;
        const newEl = mount(n2, null); // Don't append yet
        if (parent) {
            parent.replaceChild(newEl, n1.el);
        }
        return newEl;
    }

    // If text node
    if (n2.tag === TEXT_NODE) {
        if (n1.props.nodeValue !== n2.props.nodeValue) {
            n1.el.nodeValue = n2.props.nodeValue;
        }
        n2.el = n1.el;
        return n2.el;
    }

    // Same tag, update props and children
    const el = n2.el = n1.el;
    patchProps(el, n1.props, n2.props);
    patchChildren(el, n1.children, n2.children);
    return el;
}

function patchProps(el, oldProps, newProps) {
    // Remove old
    for (const key in oldProps) {
        if (!(key in newProps)) {
            if (key.startsWith('on')) {
                const eventName = key.slice(2).toLowerCase();
                el.removeEventListener(eventName, oldProps[key]);
            } else {
                el.removeAttribute(key);
            }
        }
    }
    // Add/Update new
    for (const key in newProps) {
        const oldVal = oldProps[key];
        const newVal = newProps[key];
        if (oldVal !== newVal) {
            if (key.startsWith('on')) {
                const eventName = key.slice(2).toLowerCase();
                if (oldVal) el.removeEventListener(eventName, oldVal);
                el.addEventListener(eventName, newVal);
            } else if (key === 'value' || key === 'checked') {
                el[key] = newVal;
            } else if (key === 'className') {
                el.className = newVal;
            } else {
                el.setAttribute(key, newVal);
            }
        }
    }
}

function patchChildren(el, oldChildren, newChildren) {
    const oldLen = oldChildren.length;
    const newLen = newChildren.length;
    const commonLen = Math.min(oldLen, newLen);

    for (let i = 0; i < commonLen; i++) {
        patch(oldChildren[i], newChildren[i]);
    }

    if (newLen > oldLen) {
        newChildren.slice(oldLen).forEach(child => mount(child, el));
    } else if (newLen < oldLen) {
        oldChildren.slice(newLen).forEach(child => {
            if (child.el && child.el.parentNode === el) {
                el.removeChild(child.el);
            }
        });
    }
}
