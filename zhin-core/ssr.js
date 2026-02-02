/**
 * ZhinStack SSR Engine
 * Renders VNodes to HTML strings.
 */
import { TEXT_NODE } from './vdom.js';

const VOID_ELEMENTS = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
  'link', 'meta', 'param', 'source', 'track', 'wbr'
]);

export function renderToString(vnode) {
    if (vnode === null || vnode === undefined || vnode === false) return '';

    // Text Node
    if (vnode.tag === TEXT_NODE) {
        return escapeHtml(String(vnode.props.nodeValue));
    }

    // Array of nodes
    if (Array.isArray(vnode)) {
        return vnode.map(renderToString).join('');
    }

    // Element
    let html = `<${vnode.tag}`;

    // Props
    if (vnode.props) {
        for (const key in vnode.props) {
            const value = vnode.props[key];
            if (key === 'children' || key.startsWith('on')) continue;

            if (value === true) {
                html += ` ${key}`;
            } else if (value !== false && value != null) {
                html += ` ${key}="${escapeHtml(String(value))}"`;
            }
        }
    }

    // Self-closing
    if (VOID_ELEMENTS.has(vnode.tag)) {
        return html + '/>';
    }

    html += '>';

    // Children
    if (vnode.children) {
        html += vnode.children.map(renderToString).join('');
    }

    html += `</${vnode.tag}>`;
    return html;
}

function escapeHtml(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
