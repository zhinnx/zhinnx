import { Component, html } from '@zhinnx/core';
import { Navbar } from '../components/Navbar.js';

export default class LandingPage extends Component {
    static meta = {
        title: 'ZhinNX - The Zero-Build, SSR-First Framework',
        description: 'Professional, lightweight, and production-ready web framework for serious developers.',
        image: '/zhinnx_nobg.png'
    }

    render() {
        return html`
            <div class="min-h-screen bg-white text-black overflow-x-hidden font-sans">
                <!-- Navbar Mount Point -->
                <div id="navbar-mount">
                    ${new Navbar({ static: true }).render()}
                </div>

                <!-- Hero -->
                <header class="relative pt-20 pb-32 overflow-hidden border-b-2 border-black">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div class="hero-text">
                                <h1 class="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-8">
                                    THE TECH STACK <br>
                                    <span class="text-gray-500">FOR SERIOUS</span> <br>
                                    BUILDERS.
                                </h1>
                                <p class="text-xl md:text-2xl font-medium text-gray-600 mb-10 max-w-lg border-l-4 border-black pl-6">
                                    No magic. No bloat. Just pure, unadulterated performance.
                                    <strong>Zero-Build. Native ESM. SSR-First.</strong>
                                </p>
                                <div class="flex flex-col sm:flex-row gap-4">
                                    <a href="/docs" class="text-center bg-black text-white text-xl font-bold px-8 py-4 border-2 border-black comic-shadow hover:bg-gray-900 transition-all active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                        Read Documentation
                                    </a>
                                    <a href="#features" class="text-center bg-white text-black text-xl font-bold px-8 py-4 border-2 border-black comic-shadow hover:bg-gray-50 transition-all active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                        Learn More
                                    </a>
                                </div>
                            </div>
                            <div class="hero-image hidden lg:flex justify-center items-center">
                                <div class="relative w-full max-w-md aspect-square bg-gray-100 border-2 border-black comic-shadow p-8 flex items-center justify-center">
                                    <img src="/zhinnx_nobg.png" alt="ZhinNX Box" class="w-full h-full object-contain grayscale">
                                    <div class="absolute -bottom-6 -right-6 bg-white border-2 border-black p-4 comic-shadow">
                                        <span class="font-mono font-bold text-lg">v2.1.5 Stable</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <!-- Core Architecture -->
                <section id="features" class="py-24 bg-white border-b-2 border-black">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 class="text-5xl font-black mb-16 text-center tracking-tight uppercase">Core Architecture</h2>

                        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <!-- Feature 1 -->
                            <div class="p-8 border-2 border-black comic-shadow bg-white hover:translate-y-[-4px] transition-transform">
                                <div class="text-4xl mb-4">⚡</div>
                                <h3 class="text-2xl font-bold mb-4">Zero-Build</h3>
                                <p class="text-gray-600">
                                    Stop waiting for bundlers. ZhinNX uses native ES Modules to serve your code instantly. Change a file, refresh, done.
                                </p>
                            </div>

                             <!-- Feature 2 -->
                            <div class="p-8 border-2 border-black comic-shadow bg-white hover:translate-y-[-4px] transition-transform">
                                <div class="text-4xl mb-4">🌊</div>
                                <h3 class="text-2xl font-bold mb-4">Streaming SSR</h3>
                                <p class="text-gray-600">
                                    Don't make users wait. HTML is streamed from the server immediately, ensuring world-class TTFB and SEO.
                                </p>
                            </div>

                             <!-- Feature 3 -->
                            <div class="p-8 border-2 border-black comic-shadow bg-white hover:translate-y-[-4px] transition-transform">
                                <div class="text-4xl mb-4">🧩</div>
                                <h3 class="text-2xl font-bold mb-4">Plugin First</h3>
                                <p class="text-gray-600">
                                    Extensible by design. Add Font Engines, UI libraries, or custom logic via a standardized plugin API.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Ecosystem / Plugins -->
                <section class="py-24 bg-gray-50 border-b-2 border-black">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                         <div class="flex flex-col md:flex-row justify-between items-end mb-12">
                            <h2 class="text-4xl font-black uppercase tracking-tight">Plugin Ecosystem</h2>
                            <a href="/plugins" class="text-xl font-bold border-b-2 border-black hover:bg-black hover:text-white transition-colors">View Marketplace -></a>
                         </div>

                         <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div class="bg-white border-2 border-black p-6 comic-shadow-sm">
                                <h3 class="font-bold text-xl mb-2">@zhinnx/font</h3>
                                <p class="text-sm text-gray-500 mb-4">Official Font Engine</p>
                                <p class="mb-4">Create, build, and optimize fonts directly within your application. Includes visual editor.</p>
                                <div class="flex gap-2">
                                    <a href="/font" class="px-3 py-1 bg-black text-white text-sm font-bold">Try Demo</a>
                                    <a href="/docs/plugins/font" class="px-3 py-1 border border-black text-sm font-bold">Docs</a>
                                </div>
                            </div>

                            <div class="bg-white border-2 border-black p-6 comic-shadow-sm">
                                <h3 class="font-bold text-xl mb-2">@zhinnx/ui</h3>
                                <p class="text-sm text-gray-500 mb-4">Official UI Preset</p>
                                <p class="mb-4">A lightweight, CSS-only UI kit following the Comic Modern design system.</p>
                                <div class="flex gap-2">
                                    <a href="/docs/plugins/ui" class="px-3 py-1 border border-black text-sm font-bold">Docs</a>
                                </div>
                            </div>

                            <div class="bg-white border-2 border-black p-6 comic-shadow-sm">
                                <h3 class="font-bold text-xl mb-2">@zhinnx/ytdl</h3>
                                <p class="text-sm text-gray-500 mb-4">Example Tool</p>
                                <p class="mb-4">Real-world usage example: YouTube downloader with API integration.</p>
                                <div class="flex gap-2">
                                    <a href="/ytdl" class="px-3 py-1 bg-black text-white text-sm font-bold">Try Demo</a>
                                    <a href="/docs/plugins/ytdl" class="px-3 py-1 border border-black text-sm font-bold">Docs</a>
                                </div>
                            </div>
                         </div>
                    </div>
                </section>

                <!-- CLI Workflow -->
                <section class="py-24 bg-white">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 class="text-5xl font-black mb-8 tracking-tight">START BUILDING.</h2>
                                <p class="text-xl text-gray-600 mb-8 font-medium">Initialize a new project in seconds.</p>
                                <div class="bg-black p-6 border-2 border-black comic-shadow relative group">
                                    <div class="absolute top-0 right-0 p-2">
                                        <div class="flex gap-2">
                                            <div class="w-3 h-3 rounded-full bg-gray-500"></div>
                                            <div class="w-3 h-3 rounded-full bg-gray-500"></div>
                                        </div>
                                    </div>
                                    <code class="font-mono text-white text-lg block mb-4">> npx @zhinnx/cli create my-app</code>
                                    <code class="font-mono text-gray-400 text-lg block mb-4">> cd my-app</code>
                                    <code class="font-mono text-gray-400 text-lg block">> npm run dev</code>
                                </div>
                            </div>
                            <div class="border-2 border-black bg-white p-8 comic-shadow h-full flex flex-col justify-center">
                                <h3 class="text-2xl font-bold mb-4">Explicit API</h3>
                                <p class="text-lg text-gray-700 mb-4">
                                    ZhinNX doesn't hide logic. Your <code>server.js</code> is yours. Your <code>app.js</code> is yours.
                                </p>
                                <p class="text-lg text-gray-700">
                                    We provide the tools (Core, Server, Plugins), you build the castle.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Footer -->
                <footer class="bg-black text-white py-16 border-t-2 border-black">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <img src="/zhinnx_nobg.png" alt="ZhinNX" class="h-16 w-16 mx-auto mb-8 grayscale invert">
                        <h2 class="text-3xl font-bold mb-8">ZhinNX</h2>
                        <div class="flex justify-center gap-8 mb-8 font-mono text-sm">
                            <a href="/docs" class="hover:text-gray-400 hover:underline">Documentation</a>
                            <a href="/plugins" class="hover:text-gray-400 hover:underline">Marketplace</a>
                            <a href="https://github.com/zhinnx/zhinnx" class="hover:text-gray-400 hover:underline">GitHub</a>
                        </div>
                        <p class="text-gray-500 font-mono text-sm">© 2026 ZhinNX. MIT License.</p>
                    </div>
                </footer>
            </div>
        `;
    }

    afterRender() {
        const navMount = this.$('#navbar-mount');
        if (navMount) {
            new Navbar().mount(navMount);
        }

        if (window.gsap) {
            window.gsap.from(".hero-text > *", {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out",
                delay: 0.2
            });

            window.gsap.from(".hero-image", {
                scale: 0.8,
                opacity: 0,
                duration: 1,
                ease: "elastic.out(1, 0.75)",
                delay: 0.5
            });
        }
    }
}
