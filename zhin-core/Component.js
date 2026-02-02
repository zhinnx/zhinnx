/**
 * ZhinStack Core - Component
 * The base class for all UI components.
 */

export const html = (strings, ...values) => {
  return strings.reduce((result, string, i) => {
    const val = values[i];
    // Simple array handling for lists
    const strValue = Array.isArray(val) ? val.join('') : (val !== undefined && val !== null ? val : '');
    return result + string + strValue;
  }, '');
};

export class Component {
  constructor(props = {}) {
    this.props = props;
    this.state = {};
    this.container = null;
    this._mountCallback = null;
  }

  /**
   * Update the state and trigger a re-render.
   * @param {Object} newState
   */
  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.update();
  }

  /**
   * Lifecycle hook called after the component is mounted to the DOM.
   */
  onMount() {}

  /**
   * Lifecycle hook called before the component is unmounted.
   */
  onUnmount() {}

  /**
   * The render method should return an HTML string.
   * Use the html`` tagged template literal.
   */
  render() {
    return html`<div></div>`;
  }

  /**
   * Internal method to mount the component to a DOM element.
   * @param {HTMLElement} element
   */
  mount(element) {
    this.container = element;
    this.update();
    this.onMount();
  }

  /**
   * Internal method to update the DOM.
   */
  update() {
    if (!this.container) return;

    // In a full implementation, this would use a VDOM diff.
    // For ZhinStack V1, we use direct innerHTML replacement for simplicity
    // and maximum compatibility with standard CSS/Tailwind.
    this.container.innerHTML = this.render();

    // Re-bind events if necessary (or rely on delegated events in the App)
    this.afterRender();
  }

  /**
   * Called immediately after render. Useful for binding DOM events manually
   * if not using delegated events.
   */
  afterRender() {}

  /**
   * Helper to find an element within this component
   */
  $(selector) {
      return this.container ? this.container.querySelector(selector) : null;
  }
}
