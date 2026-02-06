# ZhinNX Monorepo

## 🚨 Deployment Architecture (READ THIS)

**The official website source is located in `site/`.**

The root `src/` directory has been removed to prevent confusion. Vercel deployment is configured via `vercel.json` to route traffic to `site/api/index.js` and serve assets from `site/`.

### Deployment Instructions

1. **Vercel:**
   - The repository root `vercel.json` handles rewrites.
   - Do **NOT** set `site` as the Root Directory in Vercel Project Settings (unless you want to break monorepo hoisting). Keep Root Directory as `.`.
   - The `vercel.json` ensures functions and static files are served from `site`.

2. **Node.js / VPS:**
   - `cd site`
   - `npm install`
   - `node server.js`

### Directory Structure

- `packages/`: Core libraries (`@zhinnx/core`, `@zhinnx/server`, etc.)
- `site/`: The official ZhinNX website (Documentation, Landing Page, Demos).
- `examples/`: Sample projects.
- `api/`: **DEPRECATED** (Use `site/api/` for website logic).

## Development

To run the website locally:

```bash
cd site
npm install
npm run dev
# or
node server.js
```
