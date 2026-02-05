import { handleRequest } from '@zhinnx/server';

export default async function (req, res) {
    // Vercel Serverless Function Wrapper
    // We need to ensure the working directory is correct for file reads?
    // On Vercel, for serverless functions, cwd is usually the function root or project root.
    // However, handleRequest relies on process.cwd() to find src/pages, etc.
    // If we use "includeFiles": "site/**", the files should be available.

    // We might need to adjust process.cwd() or pass ROOT_DIR to handleRequest if configurable.
    // But handleRequest hardcodes ROOT_DIR = process.cwd().
    // If the function runs in /var/task/, and site content is in /var/task/site,
    // we might need to chdir.

    try {
        if (process.env.VERCEL) {
             // Attempt to find where 'site' is.
             const fs = await import('fs');
             const path = await import('path');

             // If we are in root, check if 'site' exists
             if (fs.existsSync(path.join(process.cwd(), 'site'))) {
                 process.chdir(path.join(process.cwd(), 'site'));
             }
        }

        await handleRequest(req, res);
    } catch (e) {
        console.error("Vercel Entry Error:", e);
        res.statusCode = 500;
        res.end("Internal Server Error");
    }
}
