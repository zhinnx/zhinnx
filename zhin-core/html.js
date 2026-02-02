/**
 * ZhinStack HTML Parser
 * Converts tagged template literals to VNodes.
 * Based on the concepts of HTM (Hyperscript Tagged Markup).
 */
import { h, createVNode, TEXT_NODE } from './vdom.js';

const MODE_TEXT = 0;
const MODE_TAG = 1;
const MODE_ATTR = 2;
const MODE_WHITESPACE = 3;

// A simple caching parser
const CACHE = new Map();

export function html(strings, ...values) {
    const raw = strings.raw;
    let template = CACHE.get(raw);

    if (!template) {
        template = parse(raw);
        CACHE.set(raw, template);
    }

    return execute(template, values);
}

function parse(strings) {
    // This function compiles the static parts into an "OpCode" list
    // For simplicity in this demo, we will use a runtime parser
    // that reconstructs the string with placeholders for values.
    // However, robust parsing is complex.

    // Fallback: A very simple runtime parser that doesn't cache opcodes efficiently
    // but works for the demo.
    return (values) => {
        let buf = '';
        let current = [0]; // 0 = Text, 1 = Tag, ...
        let output = [];

        // We will combine everything into a string with markers
        // and parse using DOMParser on Client, or regex on Server.
        // Wait, "Server" needs to run this.

        // Strategy: Use a Regex Tokenizer.
        return parseVNodes(strings, values);
    }
}

function execute(fn, values) {
    return fn(values);
}

function parseVNodes(strings, values) {
    // Combine strings and values
    // We replace values with a placeholder __V_INDEX__
    let str = '';
    const valueMap = {};

    for (let i = 0; i < strings.length; i++) {
        str += strings[i];
        if (i < values.length) {
            const key = `__V_${i}__`;
            valueMap[key] = values[i];
            str += key;
        }
    }

    // Tokenize
    // Note: This regex is simplified and won't handle all edge cases (like /> in strings)
    const tokenizer = /<(\/?)([\w-]+)([^>]*?)(\/?)>|([^<]+)/g;
    let match;
    let root = { children: [] };
    let stack = [root];

    while ((match = tokenizer.exec(str))) {
        const [full, slash, tagName, attrs, closeSlash, text] = match;

        if (text) {
            const trimmed = text.trim(); // Aggressive trimming for this VDOM
            if (trimmed) {
                // Check for values
                const parts = text.split(/(__V_\d+__)/);
                parts.forEach(part => {
                   if (valueMap[part] !== undefined) {
                       let val = valueMap[part];
                       // If val is primitive, wrap in text node
                       if (typeof val === 'string' || typeof val === 'number') {
                           stack[stack.length - 1].children.push(createVNode(TEXT_NODE, { nodeValue: val }));
                       } else {
                           stack[stack.length - 1].children.push(val);
                       }
                   } else if (part.trim()) {
                       stack[stack.length - 1].children.push(createVNode(TEXT_NODE, { nodeValue: part }));
                   }
                });
            }
        } else {
            // Tag
            if (slash) {
                // Close tag </tag>
                stack.pop();
            } else {
                // Open tag <tag>
                const props = {};
                // Parse attributes
                // Simple regex for attr="val" or attr=val or attr
                const attrRegex = /([\w-]+)(?:=(?:"([^"]*)"|'([^']*)'|(\S+)))?/g;
                let attrMatch;
                while ((attrMatch = attrRegex.exec(attrs))) {
                    const [_, key, qVal, sqVal, rawVal] = attrMatch;
                    let val = qVal ?? sqVal ?? rawVal ?? true;

                    // Restore value
                    if (typeof val === 'string' && valueMap[val] !== undefined) {
                        val = valueMap[val];
                    }
                    props[key] = val;
                }

                // Create VNode but with empty children initially (we push to it)
                const vnode = createVNode(tagName, props, []);
                stack[stack.length - 1].children.push(vnode);

                if (!closeSlash && !isVoid(tagName)) {
                    stack.push(vnode);
                }
            }
        }
    }

    // Return the children of root (usually one)
    return root.children.length === 1 ? root.children[0] : root.children;
}

function isVoid(tag) {
    return ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
  'link', 'meta', 'param', 'source', 'track', 'wbr'].includes(tag);
}
