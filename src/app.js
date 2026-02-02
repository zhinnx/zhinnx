import LandingPage from './pages/index.js';

// Simple Client-Side Entry
const routes = {
    '/': LandingPage
};

const path = window.location.pathname;
const Component = routes[path] || LandingPage;

const app = new Component();
app.mount(document.getElementById('app'));
