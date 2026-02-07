# Node.js Deployment

ZhinNX is designed to run natively on Node.js.

## Steps

1. **Upload Code:** Transfer your project to your VPS or server.
2. **Install Dependencies:**
   ```bash
   npm install --production
   ```
3. **Start Server:**
   ```bash
   NODE_ENV=production node server.js
   ```

## Process Management

We recommend using PM2 to keep your app running:

```bash
npm install -g pm2
pm2 start server.js --name my-app
```

## Reverse Proxy

Typically, you will run Nginx in front of ZhinNX to handle SSL and port 80/443 forwarding to port 3000.
