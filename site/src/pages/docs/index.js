import { Component, html } from '@zhinnx/core';
import { Navbar } from '../../components/Navbar.js';

export default class DocsIndex extends Component {
    static meta = {
        title: 'Documentation - ZhinNX',
        description: 'Learn how to build with ZhinNX.'
    }

    render() {
        return html`
            <div class="min-h-screen bg-white text-black font-sans">
                <div id="navbar-mount">${new Navbar().render()}</div>
                <div class="max-w-7xl mx-auto px-4 py-20">
                    <h1 class="text-6xl font-black mb-12">Documentation</h1>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div class="block p-8 border-2 border-black comic-shadow">
                            <h2 class="text-2xl font-bold mb-4">Getting Started</h2>
                            <p class="mb-4">To create a new project:</p>
                            <code class="bg-gray-100 p-2 block border border-black mb-4">npx @zhinnx/cli create my-app</code>
                            <p>Follow the prompts to select CSS presets and plugins.</p>
                        </div>
                         <div class="p-8 border-2 border-black comic-shadow">
                            <h2 class="text-2xl font-bold mb-4">Core Concepts</h2>
                            <ul class="list-disc pl-5">
                                <li><strong>Zero Build:</strong> Uses native ESM.</li>
                                <li><strong>Plugins:</strong> Extensible core using <code>defineApp</code>.</li>
                                <li><strong>SSR:</strong> Streaming HTML for fast TTFB.</li>
                            </ul>
                        </div>
                    </div>
                    <div class="mt-12">
                         <h2 class="text-4xl font-bold mb-8">Roadmap</h2>
                         <p class="text-xl">Version 2.1.0 introduces the Plugin System and Scoped CLI.</p>
                    </div>
                </div>
            </div>
        `;
    }

    afterRender() {
        const navMount = this.$('#navbar-mount');
        if (navMount) new Navbar().mount(navMount);
    }
}
