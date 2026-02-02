/**
 * ZhinStack Core - Component
 * Base class with Reactivity and VDOM integration.
 */

import { reactive, effect } from './reactive.js';
import { html } from './vdom.js';
import { diffChildren, unmount } from './diff.js';

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

        // Reactive update loop
        this._updateEffect = effect(() => {
            this.update();
        });

        this.isMounted = true;
        this.onMount();
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
