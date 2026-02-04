import { Router } from '@zhinnx/core';

// We rely on window.__ROUTES__ injected by the server.
const serverRoutes = window.__ROUTES__ || {};
const clientRoutes = {};

// Helper to dynamically import pages
const importPage = (path) => {
    // path comes from server scan, e.g., "./src/pages/Home.js"
    // Remove leading dot to make it absolute for the browser
    const cleanPath = path.replace(/^\./, '');
    return import(cleanPath);
};

// Transform server route map to client route map
for (const [key, route] of Object.entries(serverRoutes)) {
    clientRoutes[key] = {
        ...route,
        loader: () => importPage(route.importPath)
    };
}

const rootElement = document.getElementById('app');
if (rootElement) {
    new Router(clientRoutes, rootElement);
} else {
    console.error('Root element #app not found');
}
