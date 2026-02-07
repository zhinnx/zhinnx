import http from 'http';
import { handleRequest, ROUTE_MAP } from './packages/server/index.js';

const PORT = 3000;

const server = http.createServer(handleRequest);

server.listen(PORT, () => {
    console.log(`\n🚀 zhinnx v2 Server running at http://localhost:${PORT}`);
    console.log(`   - Mode: File-Based Routing + Streaming SSR`);
    console.log(`   - Frontend: http://localhost:${PORT}/`);
    console.log(`   - API Hello: http://localhost:${PORT}/api/hello`);
});

export { ROUTE_MAP };
