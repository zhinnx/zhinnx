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
    // Try to load app.js for plugins
    const APP_PATH = path.join(ROOT_DIR, 'src', 'app.js');
    let app = null;
    if (fs.existsSync(APP_PATH)) {
        try {
             const mod = await import(path.join(ROOT_DIR, 'src', 'app.js'));
             if (mod.default && typeof mod.default.mount === 'function') {
                 app = mod.default;
             }
        } catch (e) {
             console.error("Failed to load src/app.js", e);
        }
    }

    // Find matching route
    let matchedRoute = null;
    let params = {};

    for (const route of Object.values(ROUTE_MAP)) {
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
            // Import relative to ROOT_DIR
            const modulePath = path.join(ROOT_DIR, matchedRoute.importPath);
            const module = await import(modulePath);
            const PageComponent = module.default;

            res.setHeader('Content-Type', 'text/html');
            const stream = renderPageStream(
                PageComponent,
                { params },
                pathname,
                { routes: ROUTE_MAP, app }
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
}
