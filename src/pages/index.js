import { Component } from '../../zhin-core/component-v2.js';
import { html } from '../../zhin-core/html.js';

export default class LandingPage extends Component {
    static meta = {
        title: 'ZhinStack - Enterprise VDOM Framework',
        description: 'The speed of Svelte, the ecosystem of React, the simplicity of ZhinStack.'
    };

    onMount() {
        if (typeof gsap !== 'undefined') {
            gsap.from('#hero-text', { opacity: 0, y: 50, duration: 1, ease: 'power3.out' });
            gsap.from('.feature-card', {
                scrollTrigger: '#features',
                opacity: 0, y: 30, duration: 0.8, stagger: 0.2
            });
        }
    }

    render() {
        return html`
            <div class="min-h-screen">
                <!-- Nav -->
                <nav class="p-6 flex justify-between items-center max-w-7xl mx-auto">
                    <div class="flex items-center gap-2">
                        <img src="/public/logo-icon.svg" class="w-8 h-8" />
                        <span class="font-bold text-xl">ZhinStack</span>
                    </div>
                    <div class="hidden md:flex gap-6">
                        <a href="#features" class="hover:text-indigo-600">Features</a>
                        <a href="#docs" class="hover:text-indigo-600">Docs</a>
                        <a href="https://github.com/zhinstack" class="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition">GitHub</a>
                    </div>
                </nav>

                <!-- Hero -->
                <section class="pt-20 pb-32 text-center px-4">
                    <div id="hero-text">
                        <div class="inline-block bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full text-sm font-semibold mb-6">
                            v2.0 Now Available
                        </div>
                        <h1 class="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
                            Develop with <br/>
                            <span class="gradient-text">Peace of Mind.</span>
                        </h1>
                        <p class="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
                            The speed of Svelte, the ecosystem of React, the simplicity of ZhinStack.
                            Zero-effort SEO, Full SSR, and Enterprise-ready.
                        </p>
                        <div class="flex justify-center gap-4">
                            <button class="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition shadow-lg hover:shadow-indigo-500/30">
                                Get Started
                            </button>
                            <button class="bg-white text-gray-900 border border-gray-200 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition">
                                View Roadmap
                            </button>
                        </div>
                    </div>

                    <!-- Code Preview -->
                    <div class="mt-20 max-w-4xl mx-auto bg-[#1E1E1E] rounded-2xl shadow-2xl overflow-hidden text-left transform rotate-1 hover:rotate-0 transition duration-500">
                        <div class="flex gap-2 p-4 border-b border-gray-700">
                            <div class="w-3 h-3 rounded-full bg-red-500"></div>
                            <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div class="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div class="p-6 overflow-x-auto">
                            <pre class="font-mono text-sm text-gray-300">
<span class="text-purple-400">import</span> { Component, html } <span class="text-purple-400">from</span> 'zhin-core';

<span class="text-purple-400">export default class</span> <span class="text-yellow-400">App</span> <span class="text-purple-400">extends</span> <span class="text-yellow-400">Component</span> {
  <span class="text-blue-400">render</span>() {
    <span class="text-purple-400">return</span> html\`
      &lt;div class="hero"&gt;
        &lt;h1&gt;Hello, \${<span class="text-blue-400">this</span>.props.name}&lt;/h1&gt;
      &lt;/div&gt;
    \`;
  }
}</pre>
                        </div>
                    </div>
                </section>

                <!-- Features -->
                <section id="features" class="py-24 bg-white">
                    <div class="max-w-7xl mx-auto px-6">
                        <h2 class="text-3xl font-bold text-center mb-16">Why ZhinStack?</h2>
                        <div class="grid md:grid-cols-3 gap-8">
                            <div class="feature-card p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-lg transition">
                                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl mb-6">⚡️</div>
                                <h3 class="text-xl font-bold mb-3">Blazing Fast</h3>
                                <p class="text-gray-600">Built on a custom Virtual DOM engine with fine-grained reactivity. No bulky runtimes.</p>
                            </div>
                            <div class="feature-card p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-lg transition">
                                <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-2xl mb-6">🔍</div>
                                <h3 class="text-xl font-bold mb-3">SEO Native</h3>
                                <p class="text-gray-600">Automatic meta tag injection and Server-Side Rendering out of the box.</p>
                            </div>
                            <div class="feature-card p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-lg transition">
                                <div class="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center text-2xl mb-6">😴</div>
                                <h3 class="text-xl font-bold mb-3">Developer Peace</h3>
                                <p class="text-gray-600">Simple API. Zero config. Just write code and sleep well.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Footer -->
                <footer class="py-12 text-center text-gray-500 border-t border-gray-200">
                    <p>© 2024 ZhinStack Open Source.</p>
                </footer>
            </div>
        `;
    }
}
