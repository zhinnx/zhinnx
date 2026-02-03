import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// SSR Imports
import { renderPageStream } from './zhin-core/ssr.js';
import { Home } from './src/pages/Home.js';
import { About } from './src/pages/About.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;

const MIME_TYPES = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
};

// Route Configuration
const routes = {
    '/': Home,
    '/about': About,
};

// ISR Cache (Still useful for full pages, but streaming bypasses it usually unless we cache the stream output)
// For simplicity in this iteration: We won't cache streamed responses OR we cache them after completion.
// Let's implement basic streaming without caching first for TTI.
const isrCache = new Map();

const server = http.createServer(async (req, res) => {
    // Basic CORS support
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

    const url = new URL(req.url, `http://${req.headers.host}`);
    let pathname = url.pathname;

    // API Route Handling
    if (pathname.startsWith('/api/')) {
        const apiName = pathname.replace('/api/', '');
        const modulePath = path.join(__dirname, 'api', apiName + '.js');

        if (fs.existsSync(modulePath)) {
            try {
                const module = await import(modulePath);
                if (module.default) {
                    await module.default(req, res);
                } else {
                    res.statusCode = 500;
                    res.end(JSON.stringify({ error: 'Invalid API Module' }));
                }
            } catch (err) {
                console.error('API Execution Error:', err);
                res.statusCode = 500;
                res.end(JSON.stringify({ error: err.message }));
            }
        } else {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: 'Endpoint not found' }));
        }
        return;
    }

    // Static File Serving
    // If it has an extension, treat as static file
    if (path.extname(pathname)) {
        // Prevent directory traversal
        const safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
        const filePath = path.join(__dirname, safePath);

        fs.readFile(filePath, (err, data) => {
            if (err) {
                if (err.code === 'ENOENT') {
                     res.statusCode = 404;
                     res.end('Not Found');
                } else {
                     res.statusCode = 500;
                     res.end('Server Error');
                }
            } else {
                const ext = path.extname(filePath);
                res.setHeader('Content-Type', MIME_TYPES[ext] || 'text/plain');
                res.end(data);
            }
        });
        return;
    }

    // SSR Logic (For non-static routes)
    const PageComponent = routes[pathname] || routes['404'] || Home; // Fallback to Home or 404 Page

    console.log(`[SSR] Streaming: ${pathname}`);
    res.setHeader('Content-Type', 'text/html');

    try {
        const stream = renderPageStream(PageComponent, {}, pathname);
        stream.pipe(res);
    } catch (err) {
        console.error('SSR Error:', err);
        if (!res.headersSent) {
            res.statusCode = 500;
            res.end('Internal Server Error');
        }
    }
});

server.listen(PORT, () => {
    console.log(`\n🚀 ZhinStack v2 Server running at http://localhost:${PORT}`);
    console.log(`   - Mode: Streaming SSR`);
    console.log(`   - Frontend: http://localhost:${PORT}/`);
    console.log(`   - API Hello: http://localhost:${PORT}/api/hello`);
});
