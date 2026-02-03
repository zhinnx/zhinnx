
/**
 * ZhinStack VDOM
 * Lightweight Virtual DOM implementation.
 */

// VNode Factory
export function h(tag, props, ...children) {
    return {
        tag,
        props: props || {},
        children: children.flat(Infinity)
            .filter(c => c != null && c !== false)
            .map(c => (typeof c === 'string' || typeof c === 'number') ? { text: String(c) } : c),
        key: props?.key
    };
}

// Token to identify dynamic values in HTML
const UID = '__ZHIN_VAL__';

/**
 * Tagged template function to create VNodes.
 * Uses the browser's native HTML parser (via <template>).
 * Note: This implementation requires a browser environment (DOM).
 */
export function html(strings, ...values) {
    // SSR Check - Return SSR Object
    if (typeof document === 'undefined' || (typeof global !== 'undefined' && global.IS_SSR_TEST)) {
        return {
             isSSR: true,
             strings,
             values
        };
    }

    // 1. Interleave strings and placeholders
    let htmlString = '';
    const valMap = new Map();

    strings.forEach((str, i) => {
        htmlString += str;
        if (i < values.length) {
            const key = UID + i;
            valMap.set(key, values[i]);
            htmlString += key;
        }
    });

    const template = document.createElement('template');
    template.innerHTML = htmlString;

    // 3. Convert DOM to VNodes
    return walk(template.content, valMap);
}

function walk(node, valMap) {
    if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent;
        // Check if the text is exactly a placeholder
        // Note: This logic assumes placeholders are the entire text content or properly separated.
        // For mixed text "Hello ${name}", the parser might see "Hello __ZHIN_VAL__0".
        // We need to split.

        if (text.includes(UID)) {
             // Split by UID regex
             const parts = text.split(new RegExp(`(${UID}\\d+)`));
             const nodes = parts.map(part => {
                 if (part.startsWith(UID)) {
                     return valMap.get(part);
                 } else if (part) {
                     return part; // plain text
                 }
                 return null;
             }).filter(n => n !== null);

             // If single item, return it (could be VNode or string)
             if (nodes.length === 1) return nodes[0];
             // If multiple, return array? Text nodes usually return raw string in VDOM
             // But here we might have mixed content.
             // We'll return a fragment (array) which `h` can't handle directly as a child unless flattened.
             // But `walk` is called by `walk` which maps children.
             return nodes;
        }
        return text;
    }

    if (node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
        // If it's a fragment, just return children
        if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
            const children = Array.from(node.childNodes).map(c => walk(c, valMap)).flat();
            // If the fragment results in a single VNode, return it.
            if (children.length === 1) return children[0];
            return children;
        }

        const tag = node.tagName.toLowerCase();
        const props = {};

        // Attributes
        Array.from(node.attributes).forEach(attr => {
            let name = attr.name;
            let value = attr.value;

            // Check if value is a placeholder
            if (value.startsWith(UID) && valMap.has(value)) {
                value = valMap.get(value);
            }

            props[name] = value;
        });

        const children = Array.from(node.childNodes).map(c => walk(c, valMap)).flat();

        return h(tag, props, ...children);
    }

    return null;
}
