import { Component, html, SmartImage } from '@zhinnx/core';
import { Navbar } from '../components/Navbar.js';

export default class PluginsPage extends Component {
    static meta = {
        title: 'Plugin Marketplace - ZhinNX',
        description: 'Official and community plugins for ZhinNX framework.'
    }

    render() {
        return html`
            <div class="min-h-screen bg-white font-sans">
                <div id="navbar-mount" z-preserve="true">${new Navbar({ static: true }).render()}</div>

                <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <h1 class="text-5xl font-black mb-8 uppercase tracking-tight text-center">Plugin Marketplace</h1>
                    <p class="text-xl text-gray-600 text-center mb-16 max-w-2xl mx-auto">
                        Extend ZhinNX with official plugins. Fonts, UI, Utilities, and more.
                    </p>

                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <!-- @zhinnx/font -->
                        <div class="border-2 border-black p-6 comic-shadow bg-white hover:translate-y-[-4px] transition-transform flex flex-col">
                            <div class="h-48 bg-gray-100 border-2 border-black mb-6 relative overflow-hidden flex items-center justify-center">
                                <span class="text-6xl">🅰️</span>
                            </div>
                            <h2 class="text-2xl font-bold mb-2">@zhinnx/font</h2>
                            <p class="text-sm font-mono text-gray-500 mb-4">v2.2.0 • Official</p>
                            <p class="text-gray-700 mb-6 flex-grow">
                                Comprehensive font engine. Create, optimize, and serve fonts with zero layout shift. Includes visual builder.
                            </p>
                            <div class="flex gap-2 mt-auto">
                                <a href="/font" class="flex-1 text-center bg-black text-white font-bold py-2 border-2 border-black hover:bg-gray-800">Try Demo</a>
                                <a href="/docs/plugins/font" class="flex-1 text-center border-2 border-black font-bold py-2 hover:bg-gray-50">Docs</a>
                            </div>
                        </div>

                        <!-- @zhinnx/ui -->
                        <div class="border-2 border-black p-6 comic-shadow bg-white hover:translate-y-[-4px] transition-transform flex flex-col">
                            <div class="h-48 bg-gray-100 border-2 border-black mb-6 relative overflow-hidden flex items-center justify-center">
                                <span class="text-6xl">🎨</span>
                            </div>
                            <h2 class="text-2xl font-bold mb-2">@zhinnx/ui</h2>
                            <p class="text-sm font-mono text-gray-500 mb-4">v2.2.0 • Official</p>
                            <p class="text-gray-700 mb-6 flex-grow">
                                The Comic Modern design system. Zero-dependency CSS preset for building consistent, bold interfaces.
                            </p>
                            <div class="flex gap-2 mt-auto">
                                <a href="/docs/plugins/ui" class="flex-1 text-center bg-black text-white font-bold py-2 border-2 border-black hover:bg-gray-800">Documentation</a>
                            </div>
                        </div>

                        <!-- @zhinnx/ytdl -->
                        <div class="border-2 border-black p-6 comic-shadow bg-white hover:translate-y-[-4px] transition-transform flex flex-col">
                            <div class="h-48 bg-gray-100 border-2 border-black mb-6 relative overflow-hidden flex items-center justify-center">
                                <span class="text-6xl">📺</span>
                            </div>
                            <h2 class="text-2xl font-bold mb-2">@zhinnx/ytdl</h2>
                            <p class="text-sm font-mono text-gray-500 mb-4">v2.2.0 • Example</p>
                            <p class="text-gray-700 mb-6 flex-grow">
                                A powerful YouTube downloader plugin showcasing API routes and server-side logic integration.
                            </p>
                            <div class="flex gap-2 mt-auto">
                                <a href="/ytdl" class="flex-1 text-center bg-black text-white font-bold py-2 border-2 border-black hover:bg-gray-800">Live Demo</a>
                                <a href="/docs/plugins/ytdl" class="flex-1 text-center border-2 border-black font-bold py-2 hover:bg-gray-50">Docs</a>
                            </div>
                        </div>
                    </div>
                </main>

                <footer class="bg-black text-white py-12 border-t-2 border-black mt-16">
                    <div class="max-w-7xl mx-auto px-4 text-center">
                        <p class="font-mono">More plugins coming soon.</p>
                    </div>
                </footer>
            </div>
        `;
    }

    afterRender() {
        const navMount = this.$('#navbar-mount');
        if (navMount) new Navbar().mount(navMount);
    }
}
