import { Router } from '../zhin-core/Router.js';
import { Home } from './pages/Home.js';
import { About } from './pages/About.js';

// Define the application routes
const routes = {
  '/': Home,
  '/about': About,
  '404': Home // Fallback to Home for now, or create a NotFound component
};

// Initialize the Router on the #app element
const rootElement = document.getElementById('app');
const router = new Router(routes, rootElement);

// Expose router to window for debugging (optional)
window.router = router;
