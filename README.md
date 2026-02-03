# Zhinnx (v2)

**The Modern, Zero-Config, SEO-First Web Framework.**

Zhinnx is built for developers who want the power of React/Next.js but the simplicity of vanilla JS. No build steps required. Just write code and run.

![Zhinnx Logo](/site/zhinnx_nobg.png)

## Features

- ⚡ **Zero-Install Mode:** Use via CDN or npm.
- 🚀 **Streaming SSR:** Blazing fast Time-To-First-Byte.
- 🕸 **SEO Optimized:** Automatic meta tags and OpenGraph injection.
- 🦎 **Fine-Grained Reactivity:** Proxy-based state management.
- 📂 **File-Based Routing:** `src/pages` determines your routes.

## Quick Start

### Create a new project

```bash
npx zhinnx create my-app
cd my-app
node server.js
```

### Manual Setup

1. Install:
   ```bash
   npm install zhinnx
   ```
2. Create `server.js`:
   ```javascript
   import { handleRequest } from '@zhinnx/server';
   import http from 'http';
   http.createServer(handleRequest).listen(3000);
   ```
3. Create `src/pages/index.js`:
   ```javascript
   import { Component, html } from '@zhinnx/core';
   export default class Page extends Component {
     render() { return html`<h1>Hello World</h1>`; }
   }
   ```

## Documentation

See [ZHINNX_ARCHITECTURE.md](./ZHINNX_ARCHITECTURE.md) for deep dive.

## License

MIT
