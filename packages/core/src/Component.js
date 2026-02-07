/**
 * zhinnx Core - Component
 * Base class with Reactivity and VDOM integration.
 */

import { reactive, effect } from './reactive.js';
import { html } from './vdom.js';
import { diffChildren, unmount, hydrate as vdomHydrate } from './diff.js';
import { Config } from './Config.js';

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

        // Ensure hydration flag is set if this is a root mount that didn't go through Router
        if (shouldHydrate) {
             window.__ZHINNX_HYDRATED__ = true;
        }
    }

    hydrate() {
        if (!this._container) return;

        let rendered;
        try {
            rendered = this.render();
        } catch (e) {
            if (Config.get('selfHealing')) {
                console.error('[ZhinNX] Self-Healing: Hydration error caught', e);
                // On hydration error, we might want to blow away SSR and render fresh fallback
                // But for now, simple fallback VNode
                rendered = html`<div class="zhinnx-recovery">Recovery Mode</div>`;
            } else {
                throw e;
            }
        }

        const newVNodes = Array.isArray(rendered) ? rendered : [rendered];

        // Hydrate logic in diff.js
        try {
            vdomHydrate(newVNodes, this._container);
        } catch (e) {
            if (Config.get('selfHealing')) {
                 console.error('[ZhinNX] Self-Healing: DOM mismatch caught', e);
                 // Fallback: Clear and Mount
                 this._container.innerHTML = '';
                 // We call diffChildren with empty oldNodes to force mount
                 diffChildren([], newVNodes, this._container);
            } else {
                throw e;
            }
        }

        this._vnodes = newVNodes;
        this.afterRender();
    }

    /**
     * Force update (automatically called by reactive state).
     */
    update() {
        if (!this._container) return;

        let rendered;
        try {
            rendered = this.render();
        } catch (e) {
            if (Config.get('selfHealing')) {
                console.error('[ZhinNX] Self-Healing: Render error caught', e);
                rendered = html`<div class="zhinnx-recovery">Content Unavailable</div>`;
            } else {
                throw e;
            }
        }

        const commit = () => {
             // Normalize to array to support Fragments (multiple root nodes)
             const newVNodes = Array.isArray(rendered) ? rendered : [rendered];

             // Use diffChildren to reconcile the container's content
             try {
                diffChildren(this._vnodes, newVNodes, this._container);
             } catch (e) {
                if (Config.get('selfHealing')) {
                     console.error('[ZhinNX] Self-Healing: Diff error caught', e);
                     // Hard Reset
                     this._container.innerHTML = '';
                     diffChildren([], newVNodes, this._container);
                } else {
                    throw e;
                }
             }

             this._vnodes = newVNodes;

             // Lifecycle
             this.afterRender();
        };

        if (Config.get('priorityRender') && this.props.priority === 'deferred') {
             if (typeof window !== 'undefined' && window.requestIdleCallback) {
                 window.requestIdleCallback(commit);
             } else {
                 setTimeout(commit, 0);
             }
        } else {
             commit();
        }
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
