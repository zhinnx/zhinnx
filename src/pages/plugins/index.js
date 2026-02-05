import { Component, html } from '@zhinnx/core';
import { Navbar } from '../../components/Navbar.js';

export default class PluginMarketplace extends Component {
    static meta = {
        title: 'Plugin Marketplace - ZhinNX',
        description: 'Extend ZhinNX with official plugins.'
    }

    render() {
        return html`
            <div class="min-h-screen bg-gray-50 font-sans">
                <div id="navbar-mount">${new Navbar({ static: true }).render()}</div>

                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div class="text-center mb-16">
                         <h1 class="text-5xl font-black uppercase tracking-tight mb-4">Plugin Marketplace</h1>
                         <p class="text-xl text-gray-600 max-w-2xl mx-auto">
                            Extend the capabilities of your ZhinNX application with our official, maintained plugins.
                         </p>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <!-- Font Plugin -->
                        <div class="bg-white border-2 border-black p-8 comic-shadow flex flex-col">
                            <div class="flex-1">
                                <h2 class="text-2xl font-bold mb-2">@zhinnx/font</h2>
                                <p class="text-sm bg-black text-white inline-block px-2 py-1 font-bold mb-4">CORE</p>
                                <p class="text-gray-700 mb-6">
                                    Complete Font Engine. Features a built-in visual font editor, glyph management, and optimized WOFF2 export.
                                </p>
                                <div class="bg-gray-100 p-3 border-2 border-black mb-6">
                                    <code class="text-sm">npm install @zhinnx/font</code>
                                </div>
                            </div>
                            <div class="flex flex-col gap-3">
                                <a href="/font" class="text-center bg-black text-white font-bold py-3 border-2 border-black hover:translate-y-[-2px] hover:shadow-[4px_4px_0_0_#000] transition-all">
                                    Launch Demo
                                </a>
                                <a href="/docs/plugins/font" class="text-center bg-white text-black font-bold py-3 border-2 border-black hover:bg-gray-50">
                                    Read Documentation
                                </a>
                            </div>
                        </div>

                         <!-- UI Plugin -->
                         <div class="bg-white border-2 border-black p-8 comic-shadow flex flex-col">
                            <div class="flex-1">
                                <h2 class="text-2xl font-bold mb-2">@zhinnx/ui</h2>
                                <p class="text-sm bg-gray-200 text-black inline-block px-2 py-1 font-bold mb-4">UTILITY</p>
                                <p class="text-gray-700 mb-6">
                                    A set of lightweight, CSS-only UI components following the Comic Modern design system. Zero JS overhead.
                                </p>
                                <div class="bg-gray-100 p-3 border-2 border-black mb-6">
                                    <code class="text-sm">npm install @zhinnx/ui</code>
                                </div>
                            </div>
                            <div class="flex flex-col gap-3">
                                <a href="/docs/plugins/ui" class="text-center bg-white text-black font-bold py-3 border-2 border-black hover:bg-gray-50">
                                    View Components
                                </a>
                            </div>
                        </div>

                        <!-- YTDL Plugin -->
                        <div class="bg-white border-2 border-black p-8 comic-shadow flex flex-col">
                            <div class="flex-1">
                                <h2 class="text-2xl font-bold mb-2">@zhinnx/ytdl</h2>
                                <p class="text-sm bg-blue-100 text-blue-800 inline-block px-2 py-1 font-bold mb-4">EXAMPLE</p>
                                <p class="text-gray-700 mb-6">
                                    Reference implementation of a full-stack tool plugin. Includes API integration and UI injection.
                                </p>
                                <div class="bg-gray-100 p-3 border-2 border-black mb-6">
                                    <code class="text-sm">npm install @zhinnx/ytdl</code>
                                </div>
                            </div>
                            <div class="flex flex-col gap-3">
                                <a href="/ytdl" class="text-center bg-black text-white font-bold py-3 border-2 border-black hover:translate-y-[-2px] hover:shadow-[4px_4px_0_0_#000] transition-all">
                                    Launch Tool
                                </a>
                                <a href="/docs/plugins/ytdl" class="text-center bg-white text-black font-bold py-3 border-2 border-black hover:bg-gray-50">
                                    Read Documentation
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Footer -->
                <footer class="bg-black text-white py-12 border-t-2 border-black mt-20">
                    <div class="max-w-7xl mx-auto px-4 text-center font-mono">
                        <p>More plugins coming soon.</p>
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
