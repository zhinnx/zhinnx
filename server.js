import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// SSR Imports
import { renderPageStream } from './zhin-core/ssr.js';

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

// --- File-Based Routing Logic ---
function scanRoutes(dir, baseRoute = '') {
    const routes = {};
    const items = fs.readdirSync(dir);

    for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            // Recurse
            Object.assign(routes, scanRoutes(fullPath, `${baseRoute}/${item}`));
        } else if (item.endsWith('.js')) {
            const name = path.basename(item, '.js');
            let routePath = baseRoute;

            if (name === 'index') {
                // /pages/index.js -> /
                if (routePath === '') routePath = '/';
            } else if (name.startsWith('[') && name.endsWith(']')) {
                // /pages/[id].js -> /:id
                const paramName = name.slice(1, -1);
                routePath = `${baseRoute}/:${paramName}`;
            } else if (['layout', 'error', 'loading'].includes(name)) {
                // Special files, ignore as routes
                continue;
            } else {
                // /pages/about.js -> /about
                routePath = `${baseRoute}/${name.toLowerCase()}`;
            }

            // Convert path params :id to regex
            // e.g. /users/:id -> ^/users/([^/]+)$
            const paramNames = [];
            const regexPath = routePath.replace(/:([^/]+)/g, (_, key) => {
                paramNames.push(key);
                return '([^/]+)';
            });

            // Normalize path for import (relative to server.js)
            const importPath = './' + path.relative(__dirname, fullPath).replace(/\\/g, '/');

            routes[routePath] = {
                path: routePath,
                regex: `^${regexPath}$`,
                params: paramNames,
                importPath: importPath
            };
        }
    }
    return routes;
}

// Generate Route Map
const PAGES_DIR = path.join(__dirname, 'src', 'pages');
// Note: In a real app, we might watch for file changes to update this map.
const ROUTE_MAP = scanRoutes(PAGES_DIR);
console.log('[Server] Discovered Routes:', ROUTE_MAP);

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
    // Only serve files from whitelisted directories or specific extensions if needed
    // For "No Build" setup, we need to serve src/ and zhin-core/ to the browser
    if (path.extname(pathname)) {
        // Security Check: Block sensitive files
        if (pathname === '/server.js' || pathname === '/package.json' || pathname.startsWith('/verification')) {
            res.statusCode = 403;
            res.end('Forbidden');
            return;
        }

        // Whitelist Check (Optional but recommended)
        // const allowedDirs = ['/src', '/zhin-core', '/public', '/assets'];
        // if (!allowedDirs.some(dir => pathname.startsWith(dir)) && pathname !== '/index.html') { ... }

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

    // SSR Logic with File-Based Routing
    console.log(`[SSR] Matching: ${pathname}`);

    // Find matching route
    let matchedRoute = null;
    let params = {};

    for (const route of Object.values(ROUTE_MAP)) {
        const re = new RegExp(route.regex);
        const match = pathname.match(re);
        if (match) {
            matchedRoute = route;
            // Extract params
            route.params.forEach((key, index) => {
                params[key] = match[index + 1];
            });
            break;
        }
    }

    if (matchedRoute) {
        try {
            const module = await import(matchedRoute.importPath);
            const PageComponent = module.default;

            res.setHeader('Content-Type', 'text/html');

            // Pass ROUTE_MAP injection
            const stream = renderPageStream(
                PageComponent,
                { params },
                pathname,
                { routes: ROUTE_MAP }
            );

            stream.pipe(res);

        } catch (err) {
            console.error('SSR Error:', err);
            if (!res.headersSent) {
                res.statusCode = 500;
                res.end('Internal Server Error');
            }
        }
    } else {
        res.statusCode = 404;
        res.end('<h1>404 - Page Not Found</h1>');
    }
});

server.listen(PORT, () => {
    console.log(`\n🚀 ZhinStack v2 Server running at http://localhost:${PORT}`);
    console.log(`   - Mode: File-Based Routing`);
    console.log(`   - Frontend: http://localhost:${PORT}/`);
    console.log(`   - API Hello: http://localhost:${PORT}/api/hello`);
});

// Export for usage if needed
export { ROUTE_MAP };
