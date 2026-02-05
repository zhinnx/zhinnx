import { Router } from './Router.js';

export class ZhinNXApp {
    constructor(config) {
        this.config = config || {};
        this.plugins = config.plugins || [];
        this.headTags = [];
        this.onMountCallbacks = [];
        this.router = null;

        // Run plugins
        for (const plugin of this.plugins) {
            if (plugin && typeof plugin.setup === 'function') {
                plugin.setup(this);
            }
        }
    }

    injectHead(tag) {
        this.headTags.push(tag);
    }

    onMount(callback) {
        this.onMountCallbacks.push(callback);
    }

    mount(selector) {
        if (typeof window === 'undefined') return;

        const routes = window.__ROUTES__ || {};
        const clientRoutes = {};

        // Helper to dynamically import pages
        // We use absolute path /src/... which works if server serves from root
        const importPage = (path) => {
             // Path from server is like "./src/pages/index.js"
             // We convert to "/src/pages/index.js"
             const cleanPath = path.replace(/^\./, '');
             return import(cleanPath);
        };

        for (const [key, route] of Object.entries(routes)) {
            clientRoutes[key] = {
                ...route,
                loader: () => importPage(route.importPath)
            };
        }

        const root = document.querySelector(selector);
        if (root) {
            this.router = new Router(clientRoutes, root);
        } else {
            console.error(`Root element ${selector} not found`);
        }

        this.onMountCallbacks.forEach(cb => cb());
    }
}

export function defineApp(config) {
    return new ZhinNXApp(config);
}
