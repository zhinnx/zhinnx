import { handleRequest } from '../../packages/server/index.js';
import http from 'http';

const PORT = process.env.PORT || 3000;

const server = http.createServer(handleRequest);

server.listen(PORT, () => {
    console.log(`
  🚀 Zhinnx App running at http://localhost:${PORT}
  `);
});
