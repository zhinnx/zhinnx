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

    // Bind navigation event
    window.addEventListener('hashchange', () => this.resolve());

    // Initial load
    window.addEventListener('DOMContentLoaded', () => this.resolve());
  }

  /**
   * Resolve the current route and render the component.
   */
  resolve() {
    // Basic hash routing (e.g. #/about)
    // Default to '/' if empty
    const path = window.location.hash.slice(1) || '/';

    // Find matching route
    const ComponentClass = this.routes[path] || this.routes['404'];

    if (ComponentClass) {
      // Clear current content
      this.root.innerHTML = '';

      // Instantiate and mount the page component
      const page = new ComponentClass();
      page.mount(this.root);
    } else {
      this.root.innerHTML = '<h1>404 - Page Not Found</h1>';
    }
  }

  /**
   * Programmatic navigation
   * @param {string} path
   */
  navigate(path) {
    window.location.hash = path;
  }
}
