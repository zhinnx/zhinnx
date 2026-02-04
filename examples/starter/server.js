import http from 'http';
import { handleRequest } from '@zhinnx/server';

const PORT = process.env.PORT || 3000;

const server = http.createServer(handleRequest);

server.listen(PORT, () => {
    console.log('\n🚀 zhinnx app running at http://localhost:' + PORT);
});
