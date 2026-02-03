
/**
 * ZhinStack SSR Engine
 * Server-Side Rendering and SEO Injection
 */

import { Component } from './Component.js';
import { Readable } from 'stream';

/**
 * Renders a VNode or SSR Object to HTML string.
 */
export function renderToString(vnode) {
    if (vnode === null || vnode === undefined || vnode === false) {
        return '';
    }

    if (Array.isArray(vnode)) {
        return vnode.map(renderToString).join('');
    }

    // Handle primitive values (strings, numbers)
    if (typeof vnode === 'string' || typeof vnode === 'number') {
        return escapeHtml(String(vnode));
    }

    // Handle VNodes from h() factory (if used manually on server)
    if (vnode.tag) {
        let props = '';
        if (vnode.props) {
            for (const key in vnode.props) {
                const val = vnode.props[key];
                if (key === 'key') continue;
                if (key.startsWith('on')) continue; // Skip events
                if (val === true) props += ` ${key}`;
                else if (val !== false && val != null) props += ` ${key}="${escapeHtml(String(val))}"`;
            }
        }

        // Handle child: Text VNode
        const children = vnode.children ? vnode.children.map(child => {
            if (child.text) return escapeHtml(child.text);
            return renderToString(child);
        }).join('') : '';

        return `<${vnode.tag}${props}>${children}</${vnode.tag}>`;
    }

    // Handle html`` tagged template results (SSR Object)
    if (vnode && vnode.isSSR) {
        let result = '';
        vnode.strings.forEach((str, i) => {
            result += str;
            if (i < vnode.values.length) {
                const val = vnode.values[i];

                // If it's a Component, render it
                if (val && typeof val.render === 'function') {
                     result += renderToString(val.render());
                } else if (val instanceof Component) { // Just in case
                     result += renderToString(val.render());
                } else {
                     // Array or primitive
                     result += renderToString(val);
                }
            }
        });
        return result;
    }

    return '';
}

function escapeHtml(text) {
    if (text === undefined || text === null) return '';
    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

/**
 * Generates the full HTML page via Stream.
 * @param {Component} PageComponent - The page component class or instance
 * @param {Object} props - Initial props
 * @param {string} url - Current URL
 * @returns {Readable} - Node.js Readable Stream
 */
export function renderPageStream(PageComponent, props = {}, url = '/') {
    // Instantiate Page to get metadata
    const page = new PageComponent(props);
    const meta = PageComponent.meta || {};
    const title = meta.title || 'ZhinStack App';
    const description = meta.description || 'Built with ZhinStack';
    const image = meta.image || '/home.png';

    const stream = new Readable({
        read() {}
    });

    // Chunk 1: Head (Push Immediately for TTFB)
    const head = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}">

    <!-- OpenGraph -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="${url}">
    <meta property="og:title" content="${escapeHtml(title)}">
    <meta property="og:description" content="${escapeHtml(description)}">
    <meta property="og:image" content="${image}">

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHtml(title)}">
    <meta name="twitter:description" content="${escapeHtml(description)}">
    <meta name="twitter:image" content="${image}">

    <!-- Preload Critical Assets -->
    <link rel="modulepreload" href="/src/app.js">

    <!-- Styles -->
    <script src="https://cdn.tailwindcss.com"></script>

    <!-- JSON-LD -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "${escapeHtml(title)}",
      "description": "${escapeHtml(description)}"
    }
    </script>
</head>
<body>
    <div id="app">`;

    stream.push(head);

    // Chunk 2: App Content (Blocking Render for now, but sent after Head)
    // Future Improvement: Async generator streaming of renderToString
    let appHtml = '';
    try {
        appHtml = renderToString(page.render());
    } catch (e) {
        console.error('SSR Render Error:', e);
        appHtml = '<h1>Internal Server Error</h1>';
    }
    stream.push(appHtml);

    // Chunk 3: Footer & Scripts
    const footer = `</div>
    <script type="module" src="/src/app.js"></script>
</body>
</html>`;

    stream.push(footer);
    stream.push(null); // End of stream

    return stream;
}

/**
 * Legacy Support (Synchronous)
 */
export function renderPage(PageComponent, props = {}, url = '/') {
    const page = new PageComponent(props);
    const appHtml = renderToString(page.render());

    const meta = PageComponent.meta || {};
    const title = meta.title || 'ZhinStack App';
    const description = meta.description || 'Built with ZhinStack';
    const image = meta.image || '/home.png';

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}">
    <link rel="modulepreload" href="/src/app.js">
    <script src="https://cdn.tailwindcss.com"></script>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "${escapeHtml(title)}",
      "description": "${escapeHtml(description)}"
    }
    </script>
</head>
<body>
    <div id="app">${appHtml}</div>
    <script type="module" src="/src/app.js"></script>
</body>
</html>`;
}
