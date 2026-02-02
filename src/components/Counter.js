import { Component, html } from '../../zhin-core/Component.js';
import store from '../store/index.js';

export class Counter extends Component {
  constructor() {
    super();
    this.unsubscribe = null;
  }

  onMount() {
    // Subscribe to global store changes
    this.unsubscribe = store.subscribe(() => {
        // When state changes, we re-render
        this.update();
    });
  }

  onUnmount() {
    if (this.unsubscribe) this.unsubscribe();
  }

  afterRender() {
    // Re-bind events after every render because innerHTML was replaced
    const btn = this.$('#inc-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        store.state.count++;
      });
    }

    const resetBtn = this.$('#reset-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            store.state.count = 0;
        });
    }
  }

  render() {
    return html`
      <div class="p-6 bg-white border border-gray-200 rounded-lg shadow-sm max-w-sm">
        <h3 class="text-lg font-semibold text-gray-700 mb-2">Global Counter</h3>
        <div class="text-4xl font-bold text-teal-600 mb-4">${store.state.count}</div>
        <div class="flex space-x-2">
            <button id="inc-btn" class="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded transition">
            Increment
            </button>
            <button id="reset-btn" class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition">
            Reset
            </button>
        </div>
      </div>
    `;
  }
}
