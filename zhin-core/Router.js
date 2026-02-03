/**
 * ZhinStack Core - Router
 * specific Simple client-side routing.
 */

export class Router {
  /**
   * @param {Object} routes - Map of path to Component Class. e.g., { '/': Home, '/about': About }
   * @param {HTMLElement} rootElement - The DOM element to render pages into.
   */
  constructor(routes, rootElement) {
    this.routes = routes;
    this.root = rootElement;
    this.hydrated = false;

    // Use History API for standard routing
    window.addEventListener('popstate', () => this.resolve());

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
    // Support History API for SSR hydration
    const path = window.location.pathname || '/';

    // Find matching route
    const routeHandler = this.routes[path] || this.routes['404'];

    if (routeHandler) {
      const handleComponent = (ComponentClass) => {
          // If root has children and it's the first load, assume SSR content
          // The Component.mount logic now handles hydration automatically if container has children.
          // However, we must NOT clear innerHTML if we intend to hydrate.

          const shouldHydrate = this.root.hasChildNodes() && !this.hydrated;

          if (!shouldHydrate) {
              this.root.innerHTML = '';
          }

          // Instantiate and mount the page component
          const page = new ComponentClass();
          page.mount(this.root);

          this.hydrated = true;
      };

      // Check if it's a Dynamic Import (Promise/Function)
      if (typeof routeHandler === 'function' && !routeHandler.prototype) {
          // Assume it's an import() function
          // Show loading state if not hydrating
          if (!this.hydrated && !this.root.hasChildNodes()) {
             this.root.innerHTML = '<div>Loading route...</div>';
          }

          routeHandler().then(module => {
              const Comp = module.default || module;
              handleComponent(Comp);
          }).catch(err => {
              console.error('Route Loading Error', err);
              this.root.innerHTML = '<h1>Error Loading Page</h1>';
          });
      } else {
          // Standard Class Component
          handleComponent(routeHandler);
      }
    } else {
      this.root.innerHTML = '<h1>404 - Page Not Found</h1>';
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
