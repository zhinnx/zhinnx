import { Router } from '../zhinnx.js';

// Get routes injected by server
const routes = window.__ROUTES__ || {};
const routeMap = {};

// Transform for client-side usage
Object.keys(routes).forEach(key => {
    const route = routes[key];
    // Convert importPath (./src/...) to absolute (/src/...)
    const path = route.importPath.replace(/^\./, '');

    routeMap[key] = {
        ...route,
        loader: () => import(path)
    };
});

const app = document.getElementById('app');
// Initialize Router
new Router(routeMap, app);
