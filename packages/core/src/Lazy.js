
/**
 * ZhinStack Lazy Hydration Wrapper
 */
import { Component, html } from './Component.js';

export class Lazy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            component: null
        };
        this.observer = null;
    }

    render() {
        if (this.state.isLoaded && this.state.component) {
            // Render the actual loaded component
            // We need to instantiate it if it's a class
            const Comp = this.state.component;
            return new Comp(this.props).render();
        }

        // Placeholder
        return html`<div class="zhin-lazy-placeholder" style="min-height: 100px">Loading...</div>`;
    }

    onMount() {
        // Use IntersectionObserver to detect visibility
        if ('IntersectionObserver' in window) {
            this.observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.loadComponent();
                        this.observer.disconnect();
                    }
                });
            });

            const el = this.$('.zhin-lazy-placeholder');
            if (el) this.observer.observe(el);
            else this.loadComponent(); // If no placeholder (maybe rendered already?), load immediately
        } else {
            // Fallback for no observer
            this.loadComponent();
        }
    }

    async loadComponent() {
        if (this.state.isLoaded) return;

        const loader = this.props.loader;
        if (loader) {
            try {
                // Expect loader to be a function returning a Promise that resolves to a Module or Component
                const module = await loader();
                const Comp = module.default || module;
                this.setState({ isLoaded: true, component: Comp });
            } catch (e) {
                console.error('Lazy Load Error:', e);
            }
        }
    }

    onUnmount() {
        if (this.observer) this.observer.disconnect();
    }
}
