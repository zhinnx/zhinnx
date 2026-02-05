import { handleRequest } from '@zhinnx/server';

export default async function (req, res) {
    // Vercel Entry Point
    // Now running from root, src/ is available at ./src
    try {
        await handleRequest(req, res);
    } catch (e) {
        console.error("Vercel Entry Error:", e);
        res.statusCode = 500;
        res.end("Internal Server Error");
    }
}
