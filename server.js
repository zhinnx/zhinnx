import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

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
                // Dynamic import of the API module
                // We add a query param to ensure we get a fresh module if developing (optional)
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
    if (pathname === '/') pathname = '/index.html';

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
});

server.listen(PORT, () => {
    console.log(`\n🚀 ZhinStack Dev Server running at http://localhost:${PORT}`);
    console.log(`   - Frontend: http://localhost:${PORT}/`);
    console.log(`   - API Hello: http://localhost:${PORT}/api/hello`);
});
