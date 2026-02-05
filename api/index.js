import { handleRequest } from '@zhinnx/server';

export default async function (req, res) {
    try {
        if (process.env.VERCEL) {
             const fs = await import('fs');
             const path = await import('path');

             // Vercel usually sets CWD to the project root for Monorepos or the specific root.
             // We want to run inside 'site' so that src/ and public/ are resolved correctly relative to CWD.
             const sitePath = path.join(process.cwd(), 'site');

             if (fs.existsSync(sitePath)) {
                 process.chdir(sitePath);
             } else {
                 console.warn(`[Vercel] 'site' directory not found at ${sitePath}. CWD is ${process.cwd()}`);
             }
        }

        await handleRequest(req, res);
    } catch (e) {
        console.error("Vercel Entry Error:", e);
        res.statusCode = 500;
        res.end("Internal Server Error");
    }
}
