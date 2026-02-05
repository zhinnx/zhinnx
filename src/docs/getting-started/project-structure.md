# Project Structure

ZhinNX enforces a minimal but structured convention to ensure scalability.

```
my-app/
├── api/                  # Serverless API functions
│   └── hello.js          # Maps to /api/hello
├── public/               # Static assets (images, css)
│   ├── styles/
│   └── zhinnx_nobg.png
├── src/
│   ├── components/       # Reusable UI components
│   │   └── Navbar.js
│   ├── pages/            # File-based routing
│   │   ├── index.js      # /
│   │   └── about.js      # /about
│   └── app.js            # App configuration & plugins
├── server.js             # Entry point for Node.js
├── package.json          # Dependencies & Scripts
└── zhinnx.config.js      # (Optional) Config
```

## Key Files

### `server.js`
This is the entry point. It imports `handleRequest` from `@zhinnx/server` and starts a standard Node.js HTTP server.

### `src/app.js`
This file exports your application definition using `defineApp`. It is where you register plugins like Fonts, UI, or Analytics.

### `src/pages/`
Every `.js` file in this directory automatically becomes a route.
- `index.js` -> `/`
- `about.js` -> `/about`
- `[id].js` -> Dynamic route `/123`
