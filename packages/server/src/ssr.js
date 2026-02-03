
/**
 * Zhinnx SSR Engine
 * Server-Side Rendering with Streaming Support
 */

import { Component } from '../../core/index.js';
import { Readable } from 'stream';

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
 * Generator function that yields HTML chunks from a VNode or SSR Object.
 */
export function* renderToStream(vnode) {
    if (vnode === null || vnode === undefined || vnode === false) {
        return;
    }

    if (Array.isArray(vnode)) {
        for (const child of vnode) {
            yield* renderToStream(child);
        }
        return;
    }

    // Handle primitive values (strings, numbers)
    if (typeof vnode === 'string' || typeof vnode === 'number') {
        yield escapeHtml(String(vnode));
        return;
    }

    // Handle Text VNodes
    if (vnode.text !== undefined) {
        yield escapeHtml(vnode.text);
        return;
    }

    // Handle VNodes from h() factory (if used manually on server)
    if (vnode.tag) {
        yield `<${vnode.tag}`;
        if (vnode.props) {
            for (const key in vnode.props) {
                const val = vnode.props[key];
                if (key === 'key') continue;
                if (key.startsWith('on')) continue; // Skip events
                if (val === true) yield ` ${key}`;
                else if (val !== false && val != null) yield ` ${key}="${escapeHtml(String(val))}"`;
            }
        }
        yield `>`;

        // Handle children
        if (vnode.children) {
            for (const child of vnode.children) {
                if (child.text) yield escapeHtml(child.text);
                else yield* renderToStream(child);
            }
        }

        yield `</${vnode.tag}>`;
        return;
    }

    // Handle html`` tagged template results (SSR Object)
    if (vnode && vnode.isSSR) {
        for (let i = 0; i < vnode.strings.length; i++) {
            yield vnode.strings[i];
            if (i < vnode.values.length) {
                const val = vnode.values[i];
                yield* renderToStream(val);
            }
        }
        return;
    }
}

/**
 * Renders a VNode to string (for legacy support or small snippets).
 */
export function renderToString(vnode) {
    let result = '';
    for (const chunk of renderToStream(vnode)) {
        result += chunk;
    }
    return result;
}

/**
 * Generates the full HTML page via Stream.
 * @param {Component} PageComponent - The page component class or instance
 * @param {Object} props - Initial props
 * @param {string} url - Current URL
 * @returns {Readable} - Node.js Readable Stream
 */
export function renderPageStream(PageComponent, props = {}, url = '/', injections = {}) {
    // Instantiate Page to get metadata
    const page = new PageComponent(props);
    const meta = PageComponent.meta || {};
    const title = meta.title || 'Zhinnx App';
    const description = meta.description || 'Built with zhinnx';
    const image = meta.image || '/zhinnx_nobg.png';

    // We use an async iterator approach wrapped in a Readable
    const iterator = (async function* () {
        // Handle Injections (e.g. __ROUTES__)
        let scripts = '';
        if (injections.routes) {
            scripts += `<script>window.__ROUTES__ = ${JSON.stringify(injections.routes)};</script>`;
        }

        // Chunk 1: Head (Push Immediately for TTFB)
        yield `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Import Map for Bare Modules -->
    <script type="importmap">
    {
        "imports": {
            "zhinnx-core": "/node_modules/zhinnx-core/index.js",
            "zhinnx-server": "/node_modules/zhinnx-server/index.js"
        }
    }
    </script>

    <title>${escapeHtml(title)}</title>
    ${scripts}
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
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap');
        body {
            font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background-color: #ffffff;
            color: #000000;
        }
        .comic-border { border: 2px solid #000000; }
        .comic-border-t { border-top: 2px solid #000000; }
        .comic-border-b { border-bottom: 2px solid #000000; }
        .comic-border-r { border-right: 2px solid #000000; }
        .comic-shadow { box-shadow: 4px 4px 0px 0px #000000; }
        .comic-shadow-sm { box-shadow: 2px 2px 0px 0px #000000; }
        .comic-shadow-hover:hover { box-shadow: 6px 6px 0px 0px #000000; transform: translate(-2px, -2px); }
        .comic-shadow-active:active { box-shadow: 2px 2px 0px 0px #000000; transform: translate(2px, 2px); }
        ::selection { background-color: #000; color: #fff; }
    </style>

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

        // Chunk 2: App Content (Streaming)
        try {
            const appVNode = page.render();
            // renderToStream is synchronous generator, but we wrap it in async generator for Readable.from
            for (const chunk of renderToStream(appVNode)) {
                yield chunk;
            }
        } catch (e) {
            console.error('SSR Render Error:', e);
            yield '<h1>Internal Server Error</h1>';
        }

        // Chunk 3: Footer & Scripts
        yield `</div>
    <script type="module" src="/src/app.js"></script>
</body>
</html>`;
    })();

    return Readable.from(iterator);
}
