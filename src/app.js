import { Router } from '../zhin-core/Router.js';

// We rely on window.__ROUTES__ injected by the server.
// However, the import paths in __ROUTES__ are relative to SERVER root (e.g. ./src/pages/Home.js).
// Client browser needs to import them relative to app.js or absolute URL.
// Since we don't have a bundler rewriting paths, we need a runtime mapper.

// Mapping function to convert server import path to client dynamic import
// This manual mapping is the trade-off for "No Build Tool" + "File Based Routing".
// In a real build (Vite/Webpack), glob import would handle this.
const importPage = (path) => {
    // path comes from server scan, e.g., "./src/pages/Home.js"
    // We need to map it to a dynamic import.
    // Since dynamic imports in browser accept variables but relative paths are tricky without bundler.
    // We assume the server serves /src/ files as-is.

    // Clean path: remove leading ./
    const cleanPath = path.replace(/^\.\//, '/');
    return import(cleanPath);
};

// Transform server route map to client route map with loaders
const serverRoutes = window.__ROUTES__ || {};
const clientRoutes = {};

for (const [key, route] of Object.entries(serverRoutes)) {
    clientRoutes[key] = {
        ...route,
        loader: () => importPage(route.importPath)
    };
}

const rootElement = document.getElementById('app');
const router = new Router(clientRoutes, rootElement);

window.router = router;
