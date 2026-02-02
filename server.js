import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { renderToString } from './zhin-core/ssr.js';

// Import Pages (In a real framework, this would be dynamic)
import LandingPage from './src/pages/index.js';

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
    '.svg': 'image/svg+xml',
};

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

    // Static File Serving (Look for extension)
    if (pathname.includes('.')) {
        const safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
        const filePath = path.join(__dirname, safePath);

        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.statusCode = 404;
                res.end('Not Found');
            } else {
                const ext = path.extname(filePath);
                res.setHeader('Content-Type', MIME_TYPES[ext] || 'text/plain');
                res.end(data);
            }
        });
        return;
    }

    // SSR / HTML Handling
    // If it's a root request or looks like a page
    try {
        // Logic to choose page. For demo, we always use LandingPage for '/'
        let Component = null;
        if (pathname === '/' || pathname === '/index') {
            Component = LandingPage;
        }

        if (Component) {
            const app = new Component();
            // In a real scenario, we'd pass req/query to the component
            const vnode = app.render();
            const htmlContent = renderToString(vnode);

            // SEO: Meta Injection
            // We look for static 'meta' export on the Component class or module
            // Since we imported the module as 'LandingPage' (class), we check static properties if defined
            // Or we should have imported the *Module* namespace.
            // For this demo, let's assume Component.meta is set or we default.
            const meta = Component.meta || { title: 'ZhinStack', description: 'Modern Web Framework' };

            // Read index.html shell
            let template = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8');

            // Inject SEO
            template = template.replace('<title>ZhinStack - The Future of Web Development</title>', `<title>${meta.title}</title>`);
            // Add description if not present (simple hack for demo)
            if (!template.includes('<meta name="description"')) {
                template = template.replace('</head>', `<meta name="description" content="${meta.description}">\n</head>`);
            }

            // Inject content
            // We replace the innerHTML of #app
            const finalHtml = template.replace('<div id="app"></div>', `<div id="app">${htmlContent}</div>`);

            res.setHeader('Content-Type', 'text/html');
            res.end(finalHtml);
        } else {
            // 404
            res.statusCode = 404;
            res.end('Page Not Found');
        }
    } catch (err) {
        console.error('SSR Error:', err);
        res.statusCode = 500;
        res.end('Internal Server Error');
    }
});

server.listen(PORT, () => {
    console.log(`\n🚀 ZhinStack v2 Server running at http://localhost:${PORT}`);
    console.log(`   - SSR Ready`);
});
