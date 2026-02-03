import { Router } from '../zhin-core/Router.js';
// We can now use dynamic imports for route splitting!
// Static imports for critical paths, Dynamic for others.

// Critical Path (Home) - Static Import
import { Home } from './pages/Home.js';

// Define the application routes
const routes = {
  '/': Home,
  // Lazy Load About Page
  '/about': () => import('./pages/About.js'),
  '404': Home
};

// Initialize the Router on the #app element
// Use a check for existing content (handled by Router internally for hydration)
const rootElement = document.getElementById('app');
const router = new Router(routes, rootElement);

// Expose router to window for debugging (optional)
window.router = router;
