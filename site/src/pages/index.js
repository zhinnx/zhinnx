import { Component, html } from '../../packages/core/index.js';

export default class LandingPage extends Component {
    static meta = {
        title: 'zhinnx - The Modern Tech Stack',
        description: 'Professional, lightweight, and production-ready web framework.',
        image: '/zhinnx_nobg.png'
    }

    render() {
        return html`<div class="min-h-screen bg-white text-black overflow-x-hidden">
                <nav class="sticky top-0 z-50 bg-white border-b-2 border-black">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div class="flex justify-between h-20 items-center">
                            <div class="flex items-center gap-3">
                                <img src="/zhinnx_nobg.png" alt="zhinnx" class="h-10 w-10 object-contain">
                                <span class="text-2xl font-bold tracking-tighter">zhinnx</span>
                            </div>
                            <div class="hidden md:flex space-x-8 items-center">
                                <a href="#features" class="text-black font-bold hover:underline decoration-2 underline-offset-4">Features</a>
                                <a href="#install" class="text-black font-bold hover:underline decoration-2 underline-offset-4">Install</a>
                                <a href="https://github.com/zhinnx/zhinnx" class="text-black font-bold hover:underline decoration-2 underline-offset-4">GitHub</a>
                                <a href="#docs" class="bg-black text-white px-6 py-2 font-bold comic-shadow hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all border-2 border-black">Docs</a>
                            </div>
                        </div>
                    </div>
                </nav>
                <header class="relative pt-20 pb-32 overflow-hidden border-b-2 border-black">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div class="hero-text opacity-0 transform translate-y-10">
                                <h1 class="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-8">THE TECH STACK <br><span class="text-gray-500">FOR SERIOUS</span> <br>BUILDERS.</h1>
                                <p class="text-xl md:text-2xl font-medium text-gray-600 mb-10 max-w-lg border-l-4 border-black pl-6">No magic. No bloat. Just pure, unadulterated performance. Ready for npm. Ready for production.</p>
                                <div class="flex flex-col sm:flex-row gap-4">
                                    <a href="#install" class="text-center bg-black text-white text-xl font-bold px-8 py-4 border-2 border-black comic-shadow hover:bg-gray-900 transition-all active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">npm install zhinnx</a>
                                    <a href="#features" class="text-center bg-white text-black text-xl font-bold px-8 py-4 border-2 border-black comic-shadow hover:bg-gray-50 transition-all active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">Learn More</a>
                                </div>
                            </div>
                            <div class="hero-image hidden lg:flex justify-center items-center opacity-0 scale-90">
                                <div class="relative w-full max-w-md aspect-square bg-gray-100 border-2 border-black comic-shadow p-8 flex items-center justify-center">
                                    <img src="/zhinnx_nobg.png" alt="Zhinnx Box" class="w-full h-full object-contain grayscale">
                                    <div class="absolute -bottom-6 -right-6 bg-white border-2 border-black p-4 comic-shadow">
                                        <span class="font-mono font-bold text-lg">v2.0.0 Ready</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <section id="features" class="py-24 bg-white">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 class="text-5xl font-black mb-16 text-center tracking-tight">WHY ZHINNX?</h2>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div class="feature-card border-2 border-black p-8 comic-shadow hover:-translate-y-2 transition-transform duration-300 bg-white">
                                <div class="w-16 h-16 bg-black text-white flex items-center justify-center text-3xl font-bold mb-6 border-2 border-black">npm</div>
                                <h3 class="text-2xl font-bold mb-4">NPM Ready</h3>
                                <p class="text-gray-600 font-medium">Fully modular architecture. Install core, server, or cli independently. Built for the modern ecosystem.</p>
                            </div>
                            <div class="feature-card border-2 border-black p-8 comic-shadow hover:-translate-y-2 transition-transform duration-300 bg-white">
                                <div class="w-16 h-16 bg-white text-black flex items-center justify-center text-3xl font-bold mb-6 border-2 border-black">SSR</div>
                                <h3 class="text-2xl font-bold mb-4">Streaming SSR</h3>
                                <p class="text-gray-600 font-medium">Out-of-the-box server-side rendering with HTML streaming. Best-in-class TTFB and SEO.</p>
                            </div>
                            <div class="feature-card border-2 border-black p-8 comic-shadow hover:-translate-y-2 transition-transform duration-300 bg-white">
                                <div class="w-16 h-16 bg-gray-200 text-black flex items-center justify-center text-3xl font-bold mb-6 border-2 border-black">DX</div>
                                <h3 class="text-2xl font-bold mb-4">Zero Config</h3>
                                <p class="text-gray-600 font-medium">File-based routing. Zero build steps for dev. Just run node server.js and go.</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="install" class="py-24 border-t-2 border-black bg-gray-50">
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
                                    <code class="font-mono text-white text-lg block mb-4">> npx zhinnx create my-app</code>
                                    <code class="font-mono text-gray-400 text-lg block mb-4">> cd my-app</code>
                                    <code class="font-mono text-gray-400 text-lg block">> node server.js</code>
                                </div>
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
                <footer class="bg-black text-white py-16 border-t-2 border-black">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <img src="/zhinnx_nobg.png" alt="zhinnx" class="h-16 w-16 mx-auto mb-8 grayscale invert">
                        <h2 class="text-3xl font-bold mb-8">zhinnx</h2>
                        <div class="flex justify-center gap-8 mb-8 font-mono text-sm">
                            <a href="#" class="hover:text-gray-400 hover:underline">Documentation</a>
                            <a href="https://github.com/zhinnx/zhinnx" class="hover:text-gray-400 hover:underline">GitHub</a>
                            <a href="#" class="hover:text-gray-400 hover:underline">Twitter</a>
                        </div>
                        <p class="text-gray-500 font-mono text-sm">© 2024 zhinnx. MIT License.</p>
                    </div>
                </footer>
            </div>`;
    }

    afterRender() {
        if (typeof gsap !== 'undefined') {
            gsap.to('.hero-text', { opacity: 1, y: 0, duration: 1, ease: 'steps(10)', delay: 0.2 });
            gsap.to('.hero-image', { opacity: 1, scale: 1, duration: 1, ease: 'steps(10)', delay: 0.5 });
            const cards = document.querySelectorAll('.feature-card');
            cards.forEach((card, i) => {
                gsap.from(card, {
                    scrollTrigger: { trigger: card, start: 'top 85%' },
                    y: 50, opacity: 0, duration: 0.8, delay: i * 0.1, ease: 'steps(8)'
                });
            });
        }
    }
}
