import { Component, html } from '@zhinnx/core';
import { Navbar } from '../../components/Navbar.js';

export default class DocsHome extends Component {
    static meta = {
        title: 'Documentation - ZhinNX',
        description: 'Explore the ZhinNX framework documentation.'
    }

    render() {
        return html`
            <div class="min-h-screen bg-white font-sans">
                <!-- Use z-preserve to keep Navbar state intact -->
                <div id="navbar-mount" z-preserve="true">${new Navbar({ static: true }).render()}</div>

                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <h1 class="text-5xl font-black mb-8 uppercase tracking-tight text-center">Documentation</h1>
                    <p class="text-xl text-gray-600 text-center mb-16 max-w-2xl mx-auto">
                        Everything you need to build fast, scalable web applications with ZhinNX.
                    </p>

                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <!-- Intro -->
                        <div class="border-2 border-black p-6 comic-shadow bg-white hover:translate-y-[-4px] transition-transform">
                            <h2 class="text-2xl font-bold mb-4 border-b-2 border-black pb-2">Introduction</h2>
                            <ul class="space-y-2">
                                <li><a href="/docs/intro/what-is-zhinnx" class="text-gray-700 hover:text-black hover:font-bold">What is ZhinNX?</a></li>
                                <li><a href="/docs/intro/philosophy" class="text-gray-700 hover:text-black hover:font-bold">Philosophy</a></li>
                            </ul>
                        </div>

                        <!-- Getting Started -->
                        <div class="border-2 border-black p-6 comic-shadow bg-white hover:translate-y-[-4px] transition-transform">
                            <h2 class="text-2xl font-bold mb-4 border-b-2 border-black pb-2">Getting Started</h2>
                            <ul class="space-y-2">
                                <li><a href="/docs/getting-started/installation" class="text-gray-700 hover:text-black hover:font-bold">Installation</a></li>
                                <li><a href="/docs/getting-started/first-app" class="text-gray-700 hover:text-black hover:font-bold">Your First App</a></li>
                            </ul>
                        </div>

                        <!-- Core Concepts -->
                        <div class="border-2 border-black p-6 comic-shadow bg-white hover:translate-y-[-4px] transition-transform">
                            <h2 class="text-2xl font-bold mb-4 border-b-2 border-black pb-2">Core Concepts</h2>
                            <ul class="space-y-2">
                                <li><a href="/docs/core/component" class="text-gray-700 hover:text-black hover:font-bold">Components</a></li>
                                <li><a href="/docs/core/state" class="text-gray-700 hover:text-black hover:font-bold">State Management</a></li>
                                <li><a href="/docs/core/smart-image" class="text-gray-700 hover:text-black hover:font-bold">Smart Image</a></li>
                                <li><a href="/docs/core/chunk-render" class="text-gray-700 hover:text-black hover:font-bold">Chunk Rendering</a></li>
                            </ul>
                        </div>

                        <!-- CLI -->
                        <div class="border-2 border-black p-6 comic-shadow bg-white hover:translate-y-[-4px] transition-transform">
                            <h2 class="text-2xl font-bold mb-4 border-b-2 border-black pb-2">CLI</h2>
                            <ul class="space-y-2">
                                <li><a href="/docs/cli/zhinnx-init" class="text-gray-700 hover:text-black hover:font-bold">zhinnx init</a></li>
                                <li><a href="/docs/cli/zhinnx-font" class="text-gray-700 hover:text-black hover:font-bold">zhinnx font</a></li>
                            </ul>
                        </div>

                        <!-- Plugins -->
                        <div class="border-2 border-black p-6 comic-shadow bg-white hover:translate-y-[-4px] transition-transform">
                            <h2 class="text-2xl font-bold mb-4 border-b-2 border-black pb-2">Plugins</h2>
                            <ul class="space-y-2">
                                <li><a href="/docs/plugins/marketplace" class="text-gray-700 hover:text-black hover:font-bold">Marketplace</a></li>
                            </ul>
                        </div>

                        <!-- Deployment -->
                         <div class="border-2 border-black p-6 comic-shadow bg-white hover:translate-y-[-4px] transition-transform">
                            <h2 class="text-2xl font-bold mb-4 border-b-2 border-black pb-2">Deployment</h2>
                            <ul class="space-y-2">
                                <li><a href="/docs/deployment/vercel" class="text-gray-700 hover:text-black hover:font-bold">Vercel</a></li>
                            </ul>
                        </div>
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
