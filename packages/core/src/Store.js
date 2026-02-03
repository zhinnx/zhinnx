/**
 * zhinnx Core - Store
 * A lightweight global state management system.
 */

export class Store {
  constructor(initialState = {}) {
    this.listeners = new Set();

    // Proxy allows us to detect changes automatically
    this.state = new Proxy(initialState, {
      set: (target, property, value) => {
        target[property] = value;
        this.notify();
        return true;
      }
    });
  }

  /**
   * Subscribe to state changes.
   * @param {Function} listener - Function to call when state changes.
   * @returns {Function} - Unsubscribe function.
   */
  subscribe(listener) {
    this.listeners.add(listener);
    // Return an unsubscribe function for cleanup
    return () => this.listeners.delete(listener);
  }

  /**
   * Notify all subscribers of a change.
   */
  notify() {
    this.listeners.forEach(listener => listener(this.state));
  }

  /**
   * Action helper to mutate state in a structured way (optional pattern)
   * @param {Function} actionFn
   */
  dispatch(actionFn) {
    actionFn(this.state);
  }
}
