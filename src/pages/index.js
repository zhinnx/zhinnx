import { Component, html } from '../../zhin-core/Component.js';

export default class Index extends Component {
  static meta = {
      title: 'ZhinStack - The Modern Enterprise Framework',
      description: 'Zero-config, VDOM-based, SSR-ready framework for modern web development.',
      image: '/logo-full.svg'
  };

  render() {
    return html`
      <div class="min-h-screen bg-gray-50 text-gray-900 font-sans">
        <!-- Hero Section -->
        <header class="bg-white shadow-sm sticky top-0 z-50">
            <div class="container mx-auto px-6 py-4 flex justify-between items-center">
                <div class="flex items-center gap-3">
                    <img src="/logo-icon.svg" alt="ZhinStack Logo" class="h-10 w-10">
                    <span class="text-2xl font-bold tracking-tight text-blue-600">ZhinStack</span>
                </div>
                <nav class="hidden md:flex gap-6 text-gray-600 font-medium">
                    <a href="#features" class="hover:text-blue-600 transition">Features</a>
                    <a href="#docs" class="hover:text-blue-600 transition">Docs</a>
                    <a href="/about" class="hover:text-blue-600 transition">About</a>
                    <a href="https://github.com/zhinstack" target="_blank" class="hover:text-blue-600 transition">GitHub</a>
                </nav>
            </div>
        </header>

        <main>
            <!-- Hero -->
            <section class="pt-24 pb-20 px-6 text-center">
                <div class="container mx-auto max-w-4xl">
                    <div class="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-8">
                        <span class="relative flex h-2 w-2">
                          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                          <span class="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        v2.0 Now Available
                    </div>
                    <h1 class="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-gray-900 leading-tight">
                        Build faster with <br>
                        <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">ZhinStack</span>
                    </h1>
                    <p class="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                        The "Peaceful Developer" framework. React-like mental model, Svelte-like performance, and Next.js-like DX.
                    </p>
                    <div class="flex flex-col sm:flex-row justify-center gap-4">
                        <a href="#docs" class="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition shadow-lg shadow-blue-500/30">Get Started</a>
                        <a href="https://github.com/zhinstack" target="_blank" class="bg-white text-gray-800 border border-gray-200 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition">View Source</a>
                    </div>
                </div>
            </section>

            <!-- Features Grid -->
            <section id="features" class="py-20 bg-white">
                <div class="container mx-auto px-6">
                    <h2 class="text-3xl font-bold text-center mb-16">Why ZhinStack?</h2>
                    <div class="grid md:grid-cols-3 gap-12">
                        <div class="space-y-4">
                            <div class="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                            </div>
                            <h3 class="text-xl font-bold">Blazing Fast</h3>
                            <p class="text-gray-600">Powered by a custom Virtual DOM and Keyed Diffing engine. Minimal updates, maximum speed.</p>
                        </div>
                        <div class="space-y-4">
                            <div class="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-4">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                            </div>
                            <h3 class="text-xl font-bold">SSR & Streaming</h3>
                            <p class="text-gray-600">Server-Side Rendering out of the box with HTML Streaming for instant Time-To-First-Byte.</p>
                        </div>
                        <div class="space-y-4">
                            <div class="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mb-4">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
                            </div>
                            <h3 class="text-xl font-bold">File-Based Routing</h3>
                            <p class="text-gray-600">Just create files in <code>src/pages</code>. Dynamic routes, layouts, and API endpoints work automatically.</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Code Demo -->
            <section class="py-20 bg-gray-900 text-white">
                <div class="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 class="text-3xl font-bold mb-6">Simple, Elegant API</h2>
                        <p class="text-gray-400 mb-8 text-lg">
                            Write standard JavaScript with Template Literals. No compilation step required during development.
                        </p>
                        <ul class="space-y-4">
                            <li class="flex items-center gap-3">
                                <span class="text-green-400">✓</span> No complex build tools
                            </li>
                            <li class="flex items-center gap-3">
                                <span class="text-green-400">✓</span> Standard ES Modules
                            </li>
                            <li class="flex items-center gap-3">
                                <span class="text-green-400">✓</span> Proxy-based Reactivity
                            </li>
                        </ul>
                    </div>
                    <div class="bg-gray-800 p-6 rounded-xl shadow-2xl font-mono text-sm overflow-x-auto border border-gray-700">
<pre><code class="language-javascript"><span class="text-purple-400">import</span> { Component, html } <span class="text-purple-400">from</span> 'zhinstack';

<span class="text-purple-400">export default class</span> <span class="text-yellow-400">Counter</span> <span class="text-purple-400">extends</span> <span class="text-yellow-400">Component</span> {
  <span class="text-blue-400">constructor</span>() {
    <span class="text-purple-400">super</span>();
    <span class="text-red-400">this</span>.state = { count: 0 };
  }

  render() {
    <span class="text-purple-400">return</span> html\`
      &lt;button <span class="text-green-400">onClick</span>="\${() => <span class="text-red-400">this</span>.state.count++}"&gt;
        Count is: \${<span class="text-red-400">this</span>.state.count}
      &lt;/button&gt;
    \`;
  }
}</code></pre>
                    </div>
                </div>
            </section>
        </main>

        <footer class="bg-white border-t border-gray-100 py-12">
            <div class="container mx-auto px-6 text-center text-gray-500">
                <p class="mb-4">© 2024 ZhinStack. Released under MIT License.</p>
                <div class="flex justify-center gap-6">
                    <a href="#" class="hover:text-blue-600">Twitter</a>
                    <a href="#" class="hover:text-blue-600">GitHub</a>
                    <a href="#" class="hover:text-blue-600">Discord</a>
                </div>
            </div>
        </footer>
      </div>
    `;
  }
}
