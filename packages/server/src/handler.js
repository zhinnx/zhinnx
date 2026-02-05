import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { renderPageStream } from './ssr.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = process.cwd();

const MIME_TYPES = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf'
};

// --- File-Based Routing Logic ---
function scanRoutes(dir, baseRoute = '') {
    const routes = {};
    if (!fs.existsSync(dir)) return routes;

    const items = fs.readdirSync(dir);

    for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            Object.assign(routes, scanRoutes(fullPath, `${baseRoute}/${item}`));
        } else if (item.endsWith('.js')) {
            const name = path.basename(item, '.js');
            let routePath = baseRoute;

            if (name === 'index') {
                if (routePath === '') routePath = '/';
            } else if (name.startsWith('[') && name.endsWith(']')) {
                const paramName = name.slice(1, -1);
                routePath = `${baseRoute}/:${paramName}`;
            } else if (['layout', 'error', 'loading'].includes(name)) {
                continue;
            } else {
                routePath = `${baseRoute}/${name.toLowerCase()}`;
            }

            const paramNames = [];
            const regexPath = routePath.replace(/:([^/]+)/g, (_, key) => {
                paramNames.push(key);
                return '([^/]+)';
            });

            const importPath = './' + path.relative(ROOT_DIR, fullPath).replace(/\\/g, '/');

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

const PAGES_DIR = path.join(ROOT_DIR, 'src', 'pages');
export const ROUTE_MAP = scanRoutes(PAGES_DIR);

export async function handleRequest(req, res) {
    const url = new URL(req.url, `http://${req.headers.host}`);
    let pathname = url.pathname;

    // API Route Handling
    if (pathname.startsWith('/api/') && !pathname.endsWith('index.js')) {
        const apiName = pathname.replace('/api/', '');
        // In serverless, API might be handled differently, but here we dynamic import from api/ folder
        const modulePath = path.join(ROOT_DIR, 'api', apiName + '.js');

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
    if (path.extname(pathname)) {
        if (pathname === '/server.js' || pathname === '/package.json' || pathname.startsWith('/verification') || pathname.startsWith('/.git')) {
            res.statusCode = 403;
            res.end('Forbidden');
            return;
        }

        const safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
        let filePath = path.join(ROOT_DIR, safePath);

        // Check if file exists in root, if not check public/
        if (!fs.existsSync(filePath)) {
            const publicPath = path.join(ROOT_DIR, 'public', safePath);
            if (fs.existsSync(publicPath)) {
                filePath = publicPath;
            }
        }

        // Allow serving from node_modules for imports (mapped via importmap)
        if (pathname.startsWith('/node_modules/')) {
            filePath = path.join(ROOT_DIR, safePath);
        }

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

    // SSR Logic
    // 1. Load App & Plugins
    const APP_PATH = path.join(ROOT_DIR, 'src', 'app.js');
    let app = null;
    const dynamicRoutes = {};

    if (fs.existsSync(APP_PATH)) {
        try {
             const mod = await import(APP_PATH);
             if (mod.default) {
                 app = mod.default;

                 // Run Server Plugins
                 if (Array.isArray(app.plugins)) {
                    const ctx = {
                        req,
                        res,
                        router: {
                            add: (path, component) => {
                                dynamicRoutes[path] = {
                                    path: path,
                                    regex: `^${path}$`,
                                    params: [],
                                    component: component
                                };
                            }
                        },
                        app: app
                    };

                    for (const plugin of app.plugins) {
                        if (typeof plugin.server === 'function') {
                            await plugin.server(ctx);
                            if (ctx.handled) return;
                        }
                    }
                 }
             }
        } catch (e) {
             console.error("Failed to load src/app.js", e);
        }
    }

    // 2. Find matching route
    let matchedRoute = null;
    let params = {};

    // Combine routes: dynamic (plugin) routes take precedence
    const allRoutes = { ...ROUTE_MAP, ...dynamicRoutes };

    for (const route of Object.values(allRoutes)) {
        const re = new RegExp(route.regex);
        const match = pathname.match(re);
        if (match) {
            matchedRoute = route;
            route.params.forEach((key, index) => {
                params[key] = match[index + 1];
            });
            break;
        }
    }

    if (matchedRoute) {
        try {
            let PageComponent;

            // Direct component (from plugin) or File import (from routing)
            if (matchedRoute.component) {
                PageComponent = matchedRoute.component;
            } else {
                // Import relative to ROOT_DIR
                const modulePath = path.join(ROOT_DIR, matchedRoute.importPath);
                const module = await import(modulePath);
                PageComponent = module.default;
            }

            if (!PageComponent) {
                throw new Error("Route component not found or default export missing");
            }

            res.setHeader('Content-Type', 'text/html');
            const stream = renderPageStream(
                PageComponent,
                { params },
                pathname,
                { routes: ROUTE_MAP, app } // We pass ROUTE_MAP so client knows about file routes.
                // Dynamic routes might need to be passed to client too if we want client-side nav to them?
                // Yes, otherwise Router won't know about /font.
            );

            // To fix client-side routing for dynamic routes:
            // renderPageStream injects window.__ROUTES__.
            // We should pass merged routes?
            // But dynamic routes contain 'component' class which is not serializable to JSON.
            // Client needs to know how to load them.
            // Since plugins run on client too, the client plugin hook `client(ctx)` can add routes to client router.
            // So we don't need to serialize dynamic routes here.

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
}
