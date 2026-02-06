import { Component, html } from '@zhinnx/core';
import { Navbar } from '../../components/Navbar.js';

export default class ArchitectureDocs extends Component {
    static meta = { title: 'Architecture - ZhinNX Documentation' }
    render() {
        return html`
            <div class="min-h-screen bg-white text-black font-sans">
                <div id="navbar-mount">${new Navbar().render()}</div>
                <div class="max-w-4xl mx-auto px-4 py-20">
                    <h1 class="text-5xl font-black mb-8">Architecture</h1>
                    <p class="text-xl mb-8">Understanding the internals of ZhinNX v2.</p>

                    <h2 class="text-3xl font-bold mb-4">Core Principles</h2>
                    <ul class="list-disc pl-5 mb-8 text-lg">
                        <li><strong>Zero-Build:</strong> Leveraging native ESM imports.</li>
                        <li><strong>Streaming SSR:</strong> Generators yield chunks to the response stream.</li>
                        <li><strong>Fine-Grained Reactivity:</strong> Proxy-based state tracking.</li>
                    </ul>

                    <h2 class="text-3xl font-bold mb-4">The App Lifecycle</h2>
                    <ol class="list-decimal pl-5 mb-8 space-y-2">
                        <li>Server receives request.</li>
                        <li>Handler scans <code>src/app.js</code> and loads plugins.</li>
                        <li>SSR Engine renders <code>&lt;head&gt;</code> chunks (including injected styles).</li>
                        <li>Page Component is instantiated and rendered to stream.</li>
                        <li>Client boots, mounts <code>ZhinNXApp</code>, and hydrates the DOM.</li>
                    </ol>
                </div>
            </div>
        `;
    }
    afterRender() { const nav = this.$('#navbar-mount'); if(nav) new Navbar().mount(nav); }
}
