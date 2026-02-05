import { Component, html } from '@zhinnx/core';
import { Navbar } from '../components/Navbar.js';

export default class LandingPage extends Component {
    static meta = {
        title: 'ZhinNX - The Modern Tech Stack',
        description: 'Professional, lightweight, and production-ready web framework.',
        image: '/zhinnx_nobg.png'
    }

    render() {
        return html`
            <div class="min-h-screen bg-white text-black overflow-x-hidden font-sans">
                <!-- Navbar Mount Point -->
                <div id="navbar-mount">
                    ${new Navbar().render()}
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
                                    No magic. No bloat. Just pure, unadulterated performance. Ready for npm. Ready for production.
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
                                    <img src="/zhinnx_nobg.png" alt="Zhinnx Box" class="w-full h-full object-contain grayscale">
                                    <div class="absolute -bottom-6 -right-6 bg-white border-2 border-black p-4 comic-shadow">
                                        <span class="font-mono font-bold text-lg">v2.1.0 Ready</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <!-- Detailed Features Section -->
                <section id="features" class="py-24 bg-white border-b-2 border-black">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 class="text-5xl font-black mb-16 text-center tracking-tight">WHY ZHINNX?</h2>

                        <div class="space-y-16">
                            <!-- Feature 1: NPM Ecosystem -->
                            <div class="flex flex-col md:flex-row gap-12 items-start">
                                <div class="flex-shrink-0 w-24 h-24 bg-black text-white flex items-center justify-center text-4xl font-bold border-2 border-black comic-shadow">
                                    npm
                                </div>
                                <div>
                                    <h3 class="text-3xl font-bold mb-4">Native NPM Integration</h3>
                                    <p class="text-lg text-gray-700 leading-relaxed mb-4">
                                        ZhinNX is not a walled garden. It is built as a set of modular packages (@zhinnx/core, @zhinnx/server) that you can install individually or together. This means you can drop ZhinNX components into an existing project or build a new one from scratch using standard tools.
                                    </p>
                                    <p class="text-lg text-gray-700 leading-relaxed">
                                        Unlike other frameworks that require specific CLI tools or global installations to function, ZhinNX lives entirely in your <code>package.json</code>. This guarantees long-term stability and compatibility with the vast JavaScript ecosystem.
                                    </p>
                                </div>
                            </div>

                            <!-- Feature 2: Streaming SSR -->
                            <div class="flex flex-col md:flex-row gap-12 items-start">
                                <div class="flex-shrink-0 w-24 h-24 bg-white text-black flex items-center justify-center text-4xl font-bold border-2 border-black comic-shadow">
                                    SSR
                                </div>
                                <div>
                                    <h3 class="text-3xl font-bold mb-4">Streaming Server-Side Rendering</h3>
                                    <p class="text-lg text-gray-700 leading-relaxed mb-4">
                                        Performance is not an afterthought. ZhinNX implements a cutting-edge HTML streaming pipeline. Instead of waiting for the entire page to render on the server before sending it to the client, ZhinNX streams the HTML head and content chunks as they are generated.
                                    </p>
                                    <p class="text-lg text-gray-700 leading-relaxed">
                                        This results in an incredible Time-To-First-Byte (TTFB). Your users see content instantly, while the rest of the page loads in the background. Search engines love this, giving you a massive SEO advantage out of the box without any complex configuration.
                                    </p>
                                </div>
                            </div>

                            <!-- Feature 3: Developer Experience -->
                            <div class="flex flex-col md:flex-row gap-12 items-start">
                                <div class="flex-shrink-0 w-24 h-24 bg-gray-200 text-black flex items-center justify-center text-4xl font-bold border-2 border-black comic-shadow">
                                    DX
                                </div>
                                <div>
                                    <h3 class="text-3xl font-bold mb-4">Zero-Build Development</h3>
                                    <p class="text-lg text-gray-700 leading-relaxed mb-4">
                                        Wait time is wasted time. ZhinNX eliminates the build step during development. By leveraging native ES Modules (ESM) supported by all modern browsers and Node.js, your code runs directly.
                                    </p>
                                    <p class="text-lg text-gray-700 leading-relaxed">
                                        Change a file, refresh the browser, and see the result instantly. No Webpack bundling, no Babel transpilation, no waiting for a dev server to "warm up". It is raw speed that keeps you in the flow.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Philosophy Section -->
                <section id="philosophy" class="py-24 bg-gray-50 border-b-2 border-black">
                     <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 class="text-4xl font-black mb-8">OUR PHILOSOPHY</h2>
                        <p class="text-xl text-gray-700 leading-loose">
                            We believe that web development has become unnecessarily complex. Layers of abstraction have buried the simple beauty of HTML, CSS, and JavaScript.
                            <br><br>
                            <strong>ZhinNX is a return to sanity.</strong>
                            <br><br>
                            It provides just enough structure to build large-scale applications—Components, Routing, State Management—without forcing you into a black box. You own your code. You understand every line. That is true power.
                        </p>
                     </div>
                </section>

                <!-- Installation -->
                <section id="install" class="py-24 bg-white">
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
                                    <code class="font-mono text-gray-400 text-lg block">> node server.js</code>
                                </div>
                                <p class="text-sm text-gray-500 font-mono">Requires Node.js 16+</p>
                            </div>
                            <div class="border-2 border-black bg-white p-8 comic-shadow h-full flex flex-col justify-center">
                                <h3 class="text-2xl font-bold mb-4">Or add to existing project:</h3>
                                <div class="bg-gray-100 p-4 border-2 border-black mb-4">
                                    <code class="font-mono text-black">npm install @zhinnx/core @zhinnx/server</code>
                                </div>
                                <p class="text-sm text-gray-500 font-mono">Requires Node.js 16+</p>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Footer -->
                <footer class="bg-black text-white py-16 border-t-2 border-black">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <img src="/zhinnx_nobg.png" alt="zhinnx" class="h-16 w-16 mx-auto mb-8 grayscale invert">
                        <h2 class="text-3xl font-bold mb-8">zhinnx</h2>
                        <div class="flex justify-center gap-8 mb-8 font-mono text-sm">
                            <a href="/docs" class="hover:text-gray-400 hover:underline">Documentation</a>
                            <a href="https://github.com/zhinnx/zhinnx" class="hover:text-gray-400 hover:underline">GitHub</a>
                            <a href="#" class="hover:text-gray-400 hover:underline">Twitter</a>
                        </div>
                        <p class="text-gray-500 font-mono text-sm">© 2026 zhinnx. MIT License.</p>
                    </div>
                </footer>
            </div>
        `;
    }

    afterRender() {
        // Mount Navbar component for interactivity
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
