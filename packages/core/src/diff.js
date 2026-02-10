
/**
 * Zhinnx VDOM Diffing Engine
 * Optimized for Fragments and Arrays
 */

export function mount(vnode, container, anchor = null) {
    if (vnode === null || vnode === undefined || vnode === false) return;

    if (Array.isArray(vnode)) {
        vnode.forEach(child => mount(child, container, anchor));
        return; // Fragments don't return a single EL
    }

    const el = createDOM(vnode);
    vnode.el = el;
    container.insertBefore(el, anchor);
    return el;
}

export function unmount(vnode) {
    if (vnode === null || vnode === undefined || vnode === false) return;

    if (Array.isArray(vnode)) {
        vnode.forEach(unmount);
        return;
    }

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
 */
export function hydrate(vnode, container) {
    let domNode = container.firstChild;

    // Normalize vnode to array for consistent handling
    const nodes = Array.isArray(vnode) ? vnode : [vnode];

    nodes.forEach(child => {
        domNode = hydrateNode(child, domNode);
    });
}

function hydrateNode(vnode, domNode) {
    if (vnode === null || vnode === undefined || vnode === false) return domNode;

    if (Array.isArray(vnode)) {
        vnode.forEach(child => {
            domNode = hydrateNode(child, domNode);
        });
        return domNode;
    }

    if (!domNode) {
        mount(vnode, domNode ? domNode.parentNode : null);
        return null;
    }

    vnode.el = domNode;

    // Text Node
    if (vnode.text !== undefined) {
        if (domNode.nodeType !== Node.TEXT_NODE) {
            // console.warn('Hydration Mismatch: Expected Text, found Element');
            const newEl = createDOM(vnode);
            domNode.parentNode.replaceChild(newEl, domNode);
            vnode.el = newEl;
            return newEl.nextSibling;
        }
        if (domNode.nodeValue !== vnode.text) {
             domNode.nodeValue = vnode.text;
        }
        return domNode.nextSibling;
    }

    // Element Node
    if (domNode.nodeType !== Node.ELEMENT_NODE || domNode.tagName.toLowerCase() !== vnode.tag.toLowerCase()) {
         // console.warn(`Hydration Mismatch: Expected <${vnode.tag}>, found <${domNode.tagName}>`);
         const newEl = createDOM(vnode);
         domNode.parentNode.replaceChild(newEl, domNode);
         vnode.el = newEl;
         return newEl.nextSibling;
    }

    // Patch Props
    let shouldPreserve = false;
    if (vnode.props) {
        if (vnode.props['z-preserve'] || vnode.props['preserve']) {
            shouldPreserve = true;
        }
        for (const key in vnode.props) {
            if (key.startsWith('on')) {
                patchProp(domNode, key, null, vnode.props[key]);
            }
        }
    }

    if (shouldPreserve) {
        return domNode.nextSibling;
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

    // Handle Arrays (Fragments)
    if (Array.isArray(n1) || Array.isArray(n2)) {
        const c1 = Array.isArray(n1) ? n1 : [n1];
        const c2 = Array.isArray(n2) ? n2 : [n2];
        diffChildren(c1, c2, container);
        return;
    }

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
    if (!newProps['z-preserve'] && !newProps['preserve']) {
        diffChildren(n1.children, n2.children, el);
    }
}

export function diffChildren(oldChildren, newChildren, container) {
    // Optimization: fast path for empty
    if (oldChildren.length === 0) {
        newChildren.forEach(c => mount(c, container));
        return;
    }
    if (newChildren.length === 0) {
        oldChildren.forEach(c => unmount(c));
        return;
    }

    const oldMap = new Map();
    const unkeyed = [];

    oldChildren.forEach((c, i) => {
        if (c.key != null) oldMap.set(c.key, c);
        else unkeyed.push({ vnode: c, index: i });
    });

    let unkeyedIndex = 0;

    // We need to track where we are inserting in the DOM.
    // Since we are patching in place, we can use the old children's locations,
    // but if we move things, it gets complex.
    // For this implementation, we use `insertBefore` with a reference node.
    // But getting the reference node is hard if the old list is shuffled.

    // Simplified Reconciler:
    // 1. Walk new children.
    // 2. If matched (key or type), patch. Move if needed.
    // 3. If new, mount.

    // To properly place nodes, we can use `container.childNodes` but that includes text nodes and comments
    // that might not be in VDOM if VDOM stripped them (vdom.js keeps text).

    // We'll trust the VDOM order matches DOM order initially.

    // Pointer to the *next* sibling for insertion
    let nextSibling = oldChildren[0]?.el;

    // Wait, this is getting into React Fiber complexity.
    // Fallback to the previous implementation which was decent for keyed,
    // but ensure we handle `mount` correctly.

    // Let's use the previous implementation logic but fix the anchor.

    const newChildrenSize = newChildren.length;

    // First, process keyed updates and moves
    for (let i = 0; i < newChildrenSize; i++) {
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
            // Move: check if the DOM node at this position is correct
            // The DOM node at index `i` (ignoring non-vdom nodes? No, we assume 1-to-1)
            // But if we have fragments, index `i` is meaningless.

            // Critical fix: We assume Component doesn't return Fragments for now in diffChildren logic
            // OR we accept that reordering Fragments is expensive/not supported.
            // Component.render() returning Array is handled by `patch` -> `diffChildren` on container.

            // Let's rely on `container.childNodes[i]` assuming 1-to-1 mapping for Elements/Text.
            const currentNode = container.childNodes[i];
             if (oldChild.el && currentNode !== oldChild.el) {
                 container.insertBefore(oldChild.el, currentNode);
             }
        } else {
             // Mount new
             // We want to insert it at index `i`.
             const anchor = container.childNodes[i];
             mount(newChild, container, anchor);
        }
    }

    // Cleanup
    oldMap.forEach(c => unmount(c));
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
    } else if (key === 'className') {
        el.className = next || '';
    } else {
        if (next == null || next === false) el.removeAttribute(key);
        else el.setAttribute(key, next);
    }
}
