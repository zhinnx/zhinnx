/**
 * ZhinStack V2 Component
 * Base class for Components using VDOM and Diffing.
 */
import { mount, patch } from './diff.js';

export class Component {
    constructor(props = {}) {
        this.props = props;
        this.state = {};
        this._vnode = null;
        this._el = null;
        this._container = null;
    }

    /**
     * Update component state and trigger re-render.
     */
    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.update();
    }

    /**
     * Must return a VNode (using h() or html``).
     */
    render() {
        throw new Error('Component must implement render()');
    }

    /**
     * Mounts the component to a container.
     */
    mount(container) {
        this._container = container;
        const vnode = this.render();
        this._vnode = vnode;

        // If container already has content, we might want to clear it?
        // For V1 compatibility, yes.
        container.innerHTML = '';
        this._el = mount(vnode, container);

        this.onMount();
        return this._el;
    }

    /**
     * Updates the component UI.
     */
    update() {
        if (!this._vnode) return; // Not mounted

        const newVNode = this.render();
        const oldVNode = this._vnode;

        this._el = patch(oldVNode, newVNode);
        this._vnode = newVNode;

        this.onUpdate();
    }

    onMount() {}
    onUpdate() {}
    onUnmount() {}

    $(selector) {
        return this._el ? this._el.querySelector(selector) : null;
    }
}
