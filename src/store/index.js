import { Store } from '../../packages/core/index.js';

// Initialize the global store
const store = new Store({
  count: 0,
  user: { name: 'Guest' },
  theme: 'light'
});

export default store;
