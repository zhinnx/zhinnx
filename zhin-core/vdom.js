/**
 * ZhinStack VDOM Engine
 * Light-weight virtual DOM implementation.
 */

export const TEXT_NODE = Symbol('TEXT_NODE');

export function createVNode(tag, props, children, key = null) {
    return {
        tag,
        props: props || {},
        children: children || [],
        key,
        el: null // Reference to real DOM node
    };
}

export function h(tag, props = {}, ...children) {
    const flatChildren = children.flat(Infinity).reduce((acc, child) => {
        if (child === null || child === undefined || child === false || child === true) {
            return acc;
        }
        if (typeof child === 'string' || typeof child === 'number') {
            acc.push(createVNode(TEXT_NODE, { nodeValue: child }, [], null));
        } else {
            acc.push(child);
        }
        return acc;
    }, []);

    const key = props?.key ?? null;
    if (props && props.key) delete props.key;

    return createVNode(tag, props, flatChildren, key);
}
