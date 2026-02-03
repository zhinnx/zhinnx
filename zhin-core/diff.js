
/**
 * ZhinStack VDOM Diffing Engine
 */

export function mount(vnode, container, anchor = null) {
    const el = createDOM(vnode);
    vnode.el = el;
    container.insertBefore(el, anchor);
    return el;
}

export function unmount(vnode) {
    if (vnode.el && vnode.el.parentNode) {
        vnode.el.parentNode.removeChild(vnode.el);
    }
}

function createDOM(vnode) {
    if (vnode.text !== undefined) {
        return document.createTextNode(vnode.text);
    }
    const el = document.createElement(vnode.tag);
    if (vnode.props) {
        for (const key in vnode.props) {
            patchProp(el, key, null, vnode.props[key]);
        }
    }
    if (vnode.children) {
        vnode.children.forEach(child => mount(child, el));
    }
    return el;
}

/**
 * Hydrates a VNode into an existing DOM Node.
 * Assumes the DOM structure matches the VNode structure (SSR).
 */
export function hydrate(vnode, container) {
    // If container is an element and we are hydrating children into it
    // Usually hydrate is called on a root component with a container.
    // We need to match vnode to container.firstChild.

    // Simplification: We assume the container already has the content rendered by SSR.
    // We walk the children.

    let domNode = container.firstChild;

    // If vnode is an array (Fragment)
    if (Array.isArray(vnode)) {
         vnode.forEach(child => {
             domNode = hydrateNode(child, domNode);
         });
    } else {
         hydrateNode(vnode, domNode);
    }
}

function hydrateNode(vnode, domNode) {
    if (!domNode) {
        // Mismatch: VNode exists but DOM doesn't. Mount it.
        // This handles client-side only nodes or mismatches.
        mount(vnode, domNode ? domNode.parentNode : null); // Parent unknown here if not passed
        return null;
    }

    vnode.el = domNode;

    // Text Node
    if (vnode.text !== undefined) {
        if (domNode.nodeType !== Node.TEXT_NODE) {
            // Mismatch type
            console.warn('Hydration Mismatch: Expected Text, found Element');
            const newEl = createDOM(vnode);
            domNode.parentNode.replaceChild(newEl, domNode);
            vnode.el = newEl;
            return newEl.nextSibling;
        }
        if (domNode.nodeValue !== vnode.text) {
             console.warn('Hydration Mismatch: Text content differs');
             domNode.nodeValue = vnode.text;
        }
        return domNode.nextSibling;
    }

    // Element Node
    if (domNode.nodeType !== Node.ELEMENT_NODE || domNode.tagName.toLowerCase() !== vnode.tag.toLowerCase()) {
         console.warn(`Hydration Mismatch: Expected <${vnode.tag}>, found <${domNode.tagName}>`);
         const newEl = createDOM(vnode);
         domNode.parentNode.replaceChild(newEl, domNode);
         vnode.el = newEl;
         return newEl.nextSibling;
    }

    // Patch Props (Attach Event Listeners)
    if (vnode.props) {
        for (const key in vnode.props) {
            // Only attach events, assume attributes are correct from SSR
            if (key.startsWith('on')) {
                patchProp(domNode, key, null, vnode.props[key]);
            }
            // Optional: Check other attributes for consistency
        }
    }

    // Hydrate Children
    let childDomNode = domNode.firstChild;
    if (vnode.children) {
        vnode.children.forEach(child => {
            childDomNode = hydrateNode(child, childDomNode);
        });
    }

    return domNode.nextSibling;
}


export function patch(n1, n2, container) {
    if (n1 === n2) return;

    // Replace if different types
    if (n1.tag !== n2.tag || (n1.text !== undefined && n2.text === undefined) || (n1.text === undefined && n2.text !== undefined)) {
        const anchor = n1.el.nextSibling;
        unmount(n1);
        mount(n2, container, anchor);
        return;
    }

    // Text Update
    if (n2.text !== undefined) {
        n2.el = n1.el;
        if (n2.text !== n1.text) {
            n2.el.nodeValue = n2.text;
        }
        return;
    }

    // Element Update
    const el = (n2.el = n1.el);

    // Patch Props
    const oldProps = n1.props || {};
    const newProps = n2.props || {};
    for (const key in newProps) {
        const oldValue = oldProps[key];
        const newValue = newProps[key];
        if (newValue !== oldValue) {
            patchProp(el, key, oldValue, newValue);
        }
    }
    for (const key in oldProps) {
        if (!(key in newProps)) {
            patchProp(el, key, oldProps[key], null);
        }
    }

    // Patch Children
    diffChildren(n1.children, n2.children, el);
}

export function diffChildren(oldChildren, newChildren, container) {
    const oldMap = new Map();
    const unkeyed = [];

    oldChildren.forEach((c, i) => {
        if (c.key != null) oldMap.set(c.key, c);
        else unkeyed.push({ vnode: c, index: i });
    });

    let unkeyedIndex = 0;

    for (let i = 0; i < newChildren.length; i++) {
        const newChild = newChildren[i];
        let oldChild;

        if (newChild.key != null) {
            oldChild = oldMap.get(newChild.key);
            oldMap.delete(newChild.key);
        } else {
            if (unkeyedIndex < unkeyed.length) {
                oldChild = unkeyed[unkeyedIndex].vnode;
                unkeyedIndex++;
            }
        }

        if (oldChild) {
            patch(oldChild, newChild, container);
            // Reordering / Position check
            const currentNode = container.childNodes[i];
            if (currentNode !== oldChild.el) {
                container.insertBefore(oldChild.el, currentNode);
            }
        } else {
            // Mount new
            const anchor = container.childNodes[i];
            mount(newChild, container, anchor);
        }
    }

    // Remove remaining keyed
    oldMap.forEach(c => unmount(c));
    // Remove remaining unkeyed
    while (unkeyedIndex < unkeyed.length) {
        unmount(unkeyed[unkeyedIndex].vnode);
        unkeyedIndex++;
    }
}

function patchProp(el, key, prev, next) {
    if (key.startsWith('on')) {
        const name = key.slice(2).toLowerCase();
        if (prev) el.removeEventListener(name, prev);
        if (next) el.addEventListener(name, next);
    } else if (key === 'value' || key === 'checked') {
        el[key] = next;
    } else {
        if (next == null || next === false) el.removeAttribute(key);
        else el.setAttribute(key, next);
    }
}
