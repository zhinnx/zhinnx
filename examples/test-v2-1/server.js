import { handleRequest } from '@zhinnx/server';
import http from 'http';
http.createServer(handleRequest).listen(3001, () => console.log('Test running on 3001'));
