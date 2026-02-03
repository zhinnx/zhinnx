/**
 * zhinnx Backend Handler
 * Wraps API functions to provide consistent error handling and response formatting.
 * Compatible with Vercel/Node.js HTTP patterns.
 */

export function createHandler(handlerFn) {
  return async (req, res) => {
    // Enable CORS for local development
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      res.statusCode = 200;
      res.end();
      return;
    }

    try {
      // Parse body if it's a POST request
      if (req.method === 'POST' && req.headers['content-type'] === 'application/json') {
         await new Promise((resolve, reject) => {
             let body = '';
             req.on('data', chunk => body += chunk);
             req.on('end', () => {
                 try {
                     req.body = JSON.parse(body);
                     resolve();
                 } catch(e) { reject(e); }
             });
             req.on('error', reject);
         });
      }

      // Execute the user's handler
      const result = await handlerFn(req, res);

      // If the handler returned data (and didn't already send the response), send it as JSON
      if (result !== undefined && !res.writableEnded) {
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.end(JSON.stringify(result));
      }
    } catch (error) {
      console.error('API Error:', error);
      if (!res.writableEnded) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Internal Server Error', details: error.message }));
      }
    }
  };
}
