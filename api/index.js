import { handleRequest } from '../zhin-core/handler.js';

export default async function (req, res) {
    await handleRequest(req, res);
}
