import { handleRequest } from '../packages/server/index.js';

export default async function (req, res) {
    await handleRequest(req, res);
}
