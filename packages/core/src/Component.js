/**
 * ZhinStack Core - Component
 * Base class with Reactivity and VDOM integration.
 */

import { reactive, effect } from './reactive.js';
import { html } from './vdom.js';
import { diffChildren, unmount, hydrate } from './diff.js';

export { html };

export class Component {
    constructor(props = {}) {
        this.props = props;
        this.state = reactive({});
        this.isMounted = false;

        // Internal
        this._container = null;
        this._vnodes = []; // Supports Fragments (multiple roots)
        this._updateEffect = null;
    }

    /**
     * Override to return VNodes.
     */
    render() {
        return html`<div></div>`;
    }

    /**
     * Mounts the component to a DOM element.
     */
    mount(container) {
        if (this.isMounted) return;
        this._container = container;

        // Check for Hydration Need (SSR Content Present)
        // Only hydrate if we haven't mounted yet and container has children
        const shouldHydrate = !this.isMounted && container.hasChildNodes();

        // Reactive update loop
        this._updateEffect = effect(() => {
            // If it's the first run and shouldHydrate is true, run hydration
            // Note: In effect, this runs immediately.
            if (shouldHydrate && !this.isMounted) {
                this.hydrate();
            } else {
                this.update();
            }
        });

        this.isMounted = true;
        this.onMount();
    }

    hydrate() {
        if (!this._container) return;
        const rendered = this.render();
        const newVNodes = Array.isArray(rendered) ? rendered : [rendered];

        // Hydrate logic in diff.js
        hydrate(newVNodes, this._container);

        this._vnodes = newVNodes;
        this.afterRender();
    }

    /**
     * Force update (automatically called by reactive state).
     */
    update() {
        if (!this._container) return;

        const rendered = this.render();
        // Normalize to array to support Fragments (multiple root nodes)
        const newVNodes = Array.isArray(rendered) ? rendered : [rendered];

        // Use diffChildren to reconcile the container's content
        diffChildren(this._vnodes, newVNodes, this._container);

        this._vnodes = newVNodes;

        // Lifecycle
        this.afterRender();
    }

    unmount() {
        if (!this.isMounted) return;

        this._vnodes.forEach(vnode => unmount(vnode));
        this._vnodes = [];
        this.isMounted = false;
        this.onUnmount();
    }

    /**
     * Legacy State Support
     */
    setState(newState) {
        Object.assign(this.state, newState);
    }

    /**
     * Lifecycle Hooks
     */
    onMount() {}
    onUnmount() {}
    afterRender() {}

    /**
     * Helper
     */
    $(selector) {
        return this._container ? this._container.querySelector(selector) : null;
    }
}
