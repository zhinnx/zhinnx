/**
 * zhinnx Core - Router
 * specific Simple client-side routing.
 */

import { Config } from './Config.js';

export class Router {
  /**
   * @param {Object} routeMap - Map of routes from server { '/path': { regex, importPath, params } }
   * @param {HTMLElement} rootElement - The DOM element to render pages into.
   */
  constructor(routeMap, rootElement) {
    // 1. Client Bootstrap Lock
    if (window.__ZHINNX_BOOTSTRAPPED__) {
        console.warn('ZhinNX Router already initialized. Skipping second bootstrap.');
        return;
    }
    window.__ZHINNX_BOOTSTRAPPED__ = true;

    this.routeMap = routeMap || {};
    this.root = rootElement;
    this.hydrated = false;

    // Use History API for standard routing
    window.addEventListener('popstate', () => {
        // Only resolve if path changed to prevent redundant re-renders
        if (window.location.pathname !== this.currentPath) {
            this.resolve();
        }
    });

    // Initial load - if DOM already loaded (scripts at end of body), resolve immediately
    if (document.readyState === 'loading') {
        window.addEventListener('DOMContentLoaded', () => this.resolve());
    } else {
        this.resolve();
    }
  }

  /**
   * Resolve the current route and render the component.
   */
  resolve() {
    const path = window.location.pathname || '/';
    this.currentPath = path;

    // Find matching route using Regex
    let matchedRoute = null;
    let params = {};
    let matchedKey = null;

    // routeMap keys are simple paths, but values contain regex
    for (const [key, route] of Object.entries(this.routeMap)) {
        const re = new RegExp(route.regex);
        const match = path.match(re);
        if (match) {
            matchedKey = key;
            matchedRoute = route;
            // Extract params
            if (route.params) {
                route.params.forEach((key, index) => {
                    params[key] = match[index + 1];
                });
            }
            break;
        }
    }

    if (matchedRoute) {
      const handleComponent = (ComponentClass) => {
          const shouldHydrate = this.root.hasChildNodes() && !this.hydrated;

          if (!shouldHydrate) {
              this.root.innerHTML = '';
          }

          // Instantiate and mount the page component with Params
          let props = { params };

          // Hydrate Initial Props (Server Data Injection)
          if (shouldHydrate && window.__INITIAL_PROPS__) {
              props = { ...props, ...window.__INITIAL_PROPS__ };
              // Consume them so they don't persist to other routes unexpectedly
              // (Though current logic reloads for Docs, so it's fine)
              window.__INITIAL_PROPS__ = null;
          }

          const page = new ComponentClass(props);
          page.mount(this.root);

          this.hydrated = true;
          // 2. Hydration Completion Flag
          window.__ZHINNX_HYDRATED__ = true;
      };

      // Check if we have the module loaded (client-side mapping)
      // For file-based routing, `route.importPath` is server-side relative.
      // Client needs to know how to import it.
      // We assume `window.__ROUTES__` contains `importFn` or we Map it in `app.js`.
      // Actually, passing functions in JSON (window.__ROUTES__) is impossible.
      // So `app.js` must construct the Router with a mapping of `key -> import()`.

      // If `routeMap` passed to constructor has a `loader` property (function), use it.
      if (matchedRoute.loader) {
           if (!this.hydrated && !this.root.hasChildNodes()) {
             this.root.innerHTML = '<div>Loading route...</div>';
           }

           matchedRoute.loader().then(module => {
              const Comp = module.default || module;
              handleComponent(Comp);
           }).catch(err => {
              console.error('[ZhinNX] Route Loading Error', err);

              // Graceful Degradation: If we have SSR content, do not destroy it.
              if (this.root.hasChildNodes()) {
                 console.warn('[ZhinNX] Hydration failed. Preserving SSR content.');
                 return;
              }

              // Self-Healing Strategy
              if (Config.get('selfHealing')) {
                  if (!sessionStorage.getItem('zhinnx_retry')) {
                      console.log('[ZhinNX] Attempting auto-recovery...');
                      sessionStorage.setItem('zhinnx_retry', 'true');
                      window.location.reload();
                      return;
                  }
                  sessionStorage.removeItem('zhinnx_retry');
              }

              // Recovery UI
              this.root.innerHTML = `
                  <div style="font-family: sans-serif; text-align: center; padding: 50px;">
                      <h2>Something went wrong.</h2>
                      <p>We couldn't load the page content.</p>
                      <button onclick="window.location.reload()" style="padding: 10px 20px; font-weight: bold; cursor: pointer; border: 2px solid black; background: white;">
                          Try Again
                      </button>
                  </div>
              `;
           });
      } else {
          // Fallback or Error
          console.error('Route found but no loader defined on client:', matchedKey);
          this.root.innerHTML = '<h1>Error: Route Configuration Missing</h1>';
      }

    } else {
      this.root.innerHTML = `
          <div style="font-family: sans-serif; text-align: center; padding: 50px;">
              <h1>404</h1>
              <p>Page Not Found</p>
              <a href="/" style="color: blue; text-decoration: underline;">Go Home</a>
          </div>
      `;
    }
  }

  /**
   * Programmatic navigation
   * @param {string} path
   */
  navigate(path) {
    window.history.pushState({}, '', path);
    this.resolve();
  }
}
