import { Component, html } from '../../packages/core/index.js';

export default class DocsPage extends Component {
    static meta = {
        title: 'Documentation - zhinnx',
        description: 'Comprehensive documentation for the zhinnx framework.',
        image: '/zhinnx_nobg.png'
    }

    constructor() {
        super();
        this.state = {
            mobileMenuOpen: false
        };
    }

    toggleMenu() {
        this.setState({ mobileMenuOpen: !this.state.mobileMenuOpen });
    }

    render() {
        return html`
            <div class="min-h-screen bg-white text-black font-sans">
                 <!-- Navbar -->
                <nav class="sticky top-0 z-50 bg-white border-b-2 border-black">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div class="flex justify-between h-20 items-center">
                            <div class="flex items-center gap-3">
                                <a href="/" class="flex items-center gap-3 hover:opacity-75">
                                    <img src="/zhinnx_nobg.png" alt="zhinnx" class="h-10 w-10 object-contain">
                                    <span class="text-2xl font-bold tracking-tighter">zhinnx</span>
                                </a>
                            </div>

                            <!-- Desktop Menu -->
                            <div class="hidden md:flex space-x-8 items-center">
                                <a href="/#features" class="text-black font-bold hover:underline decoration-2 underline-offset-4">Features</a>
                                <a href="/#philosophy" class="text-black font-bold hover:underline decoration-2 underline-offset-4">Philosophy</a>
                                <a href="/docs" class="bg-black text-white px-6 py-2 font-bold comic-shadow hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all border-2 border-black">Docs</a>
                                <a href="https://github.com/zhinnx/zhinnx" class="text-black font-bold hover:underline decoration-2 underline-offset-4">GitHub</a>
                            </div>

                            <!-- Mobile Menu Button -->
                            <div class="md:hidden">
                                <button id="menu-btn" onclick="${() => this.toggleMenu()}" class="p-2 border-2 border-black hover:bg-gray-100 focus:outline-none">
                                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${this.state.mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                     <!-- Mobile Menu Dropdown -->
                    <div class="${this.state.mobileMenuOpen ? 'block' : 'hidden'} md:hidden border-t-2 border-black bg-white absolute w-full left-0 z-40 shadow-xl">
                        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            <a href="/" class="block px-3 py-2 text-base font-bold text-black hover:bg-gray-50 border-b border-gray-100">Home</a>
                            <a href="/#features" class="block px-3 py-2 text-base font-bold text-black hover:bg-gray-50 border-b border-gray-100">Features</a>
                            <a href="/docs" class="block px-3 py-2 text-base font-bold text-black hover:bg-gray-50 border-b border-gray-100">Documentation</a>
                            <a href="https://github.com/zhinnx/zhinnx" class="block px-3 py-2 text-base font-bold text-black hover:bg-gray-50">GitHub</a>
                        </div>
                    </div>
                </nav>

                <div class="flex flex-col md:flex-row max-w-7xl mx-auto">
                    <!-- Sidebar -->
                    <aside class="w-full md:w-64 border-r-2 border-black md:min-h-screen bg-gray-50 p-6 hidden md:block">
                        <nav class="space-y-4 sticky top-24">
                            <div>
                                <h3 class="font-bold text-lg mb-2 uppercase tracking-wide">Getting Started</h3>
                                <ul class="space-y-2">
                                    <li><a href="#introduction" class="text-gray-600 hover:text-black hover:underline">Introduction</a></li>
                                    <li><a href="#installation" class="text-gray-600 hover:text-black hover:underline">Installation</a></li>
                                    <li><a href="#structure" class="text-gray-600 hover:text-black hover:underline">Project Structure</a></li>
                                </ul>
                            </div>
                            <div>
                                <h3 class="font-bold text-lg mb-2 uppercase tracking-wide">Core Concepts</h3>
                                <ul class="space-y-2">
                                    <li><a href="#components" class="text-gray-600 hover:text-black hover:underline">Components</a></li>
                                    <li><a href="#routing" class="text-gray-600 hover:text-black hover:underline">Routing</a></li>
                                    <li><a href="#state" class="text-gray-600 hover:text-black hover:underline">State Management</a></li>
                                </ul>
                            </div>
                            <div>
                                <h3 class="font-bold text-lg mb-2 uppercase tracking-wide">Advanced</h3>
                                <ul class="space-y-2">
                                    <li><a href="#ssr" class="text-gray-600 hover:text-black hover:underline">SSR & Streaming</a></li>
                                    <li><a href="#api" class="text-gray-600 hover:text-black hover:underline">API Routes</a></li>
                                </ul>
                            </div>
                        </nav>
                    </aside>

                    <!-- Main Content -->
                    <main class="flex-1 p-8 md:p-12">
                        <div class="max-w-4xl mx-auto prose prose-xl prose-headings:font-bold prose-a:text-blue-600">
                            <h1 id="introduction" class="text-5xl font-black mb-8">Introduction</h1>
                            <p class="text-xl leading-relaxed text-gray-800 mb-8">
                                Welcome to the official documentation for <strong>zhinnx</strong>. Zhinnx is a modern, enterprise-grade web framework designed to simplify the complexity of modern web development. It combines the component-based architecture developers love with a "zero-build" philosophy that drastically improves developer experience and iteration speed.
                            </p>
                            <p class="text-xl leading-relaxed text-gray-800 mb-12">
                                Unlike other frameworks that rely on heavy bundlers (Webpack, Parcel, Rollup) for development, zhinnx embraces the web platform. It uses native ES Modules, CSS variables, and standard browser APIs. This means when you hit save, your browser reflects the change instantly—no compilation required.
                            </p>

                            <hr class="border-2 border-black my-12" />

                            <h2 id="installation" class="text-4xl font-bold mb-6">Installation</h2>
                            <p class="mb-4">Getting started with zhinnx is incredibly simple. You can initialize a new project using our CLI tool.</p>

                            <div class="bg-gray-900 text-white p-6 rounded-none border-2 border-black comic-shadow mb-8">
                                <code class="block font-mono mb-2">> npx zhinnx create my-app</code>
                                <code class="block font-mono mb-2">> cd my-app</code>
                                <code class="block font-mono">> node server.js</code>
                            </div>

                            <p class="mb-4">Alternatively, you can install zhinnx into an existing project via npm:</p>
                             <div class="bg-gray-100 text-black p-4 border-2 border-black mb-12">
                                <code class="font-mono">npm install @zhinnx/core @zhinnx/server</code>
                            </div>

                            <hr class="border-2 border-black my-12" />

                            <h2 id="structure" class="text-4xl font-bold mb-6">Project Structure</h2>
                            <p class="mb-6">A standard zhinnx project follows a convention-over-configuration approach. Here is what a typical project looks like:</p>

                            <ul class="list-disc pl-6 space-y-2 mb-12">
                                <li><strong>api/</strong>: Contains server-side API routes. Each file becomes an endpoint.</li>
                                <li><strong>public/</strong>: Static assets like images, fonts, and robots.txt.</li>
                                <li><strong>src/components/</strong>: Reusable UI components.</li>
                                <li><strong>src/pages/</strong>: File-based routing. Files here automatically become routes.</li>
                                <li><strong>src/app.js</strong>: The client-side entry point (auto-generated or manual).</li>
                                <li><strong>server.js</strong>: The entry point for the local development server.</li>
                            </ul>

                             <hr class="border-2 border-black my-12" />

                            <h2 id="components" class="text-4xl font-bold mb-6">Components</h2>
                            <p class="mb-6">Components are the building blocks of zhinnx. They are standard ES6 classes that extend the base <code>Component</code> class.</p>

                            <div class="bg-gray-50 border-2 border-black p-6 mb-8 overflow-x-auto">
<pre class="font-mono text-sm">
import { Component, html } from '@zhinnx/core';

export class Counter extends Component {
  constructor() {
    super();
    // Reactive state
    this.state = { count: 0 };
  }

  increment() {
    this.state.count++;
  }

  render() {
    // HTML Tagged Template Literal
    return html\`
      &lt;div&gt;
        &lt;h1&gt;Count: \${this.state.count}&lt;/h1&gt;
        &lt;button onclick="\${() => this.increment()}"&gt;
          Add +1
        &lt;/button&gt;
      &lt;/div&gt;
    \`;
  }
}
</pre>
                            </div>
                            <p class="mb-12">Notice that we use <code>html\`</code> tagged templates. This allows us to write standard HTML that is parsed efficiently by the browser (using <code>&lt;template&gt;</code>) and by the server (for SSR).</p>

                            <hr class="border-2 border-black my-12" />

                            <h2 id="routing" class="text-4xl font-bold mb-6">Routing</h2>
                            <p class="mb-6">zhinnx uses a file-based routing system similar to Next.js. You don't need to configure a router manually.</p>
                            <ul class="list-disc pl-6 space-y-2 mb-12">
                                <li><code>src/pages/index.js</code> → <code>/</code></li>
                                <li><code>src/pages/about.js</code> → <code>/about</code></li>
                                <li><code>src/pages/blog/post.js</code> → <code>/blog/post</code></li>
                                <li><code>src/pages/users/[id].js</code> → <code>/users/:id</code> (Dynamic Route)</li>
                            </ul>

                             <hr class="border-2 border-black my-12" />

                            <h2 id="ssr" class="text-4xl font-bold mb-6">SSR & Streaming</h2>
                            <p class="mb-6">Server-Side Rendering (SSR) is enabled by default. zhinnx takes this a step further with <strong>HTML Streaming</strong>.</p>
                            <p class="mb-6">When a request comes in, the server immediately sends the document head and starts streaming the body as it renders. This ensures the browser can start loading CSS, JS, and fonts immediately, resulting in superior performance metrics.</p>
                            <p class="mb-12">This happens automatically in <code>server.js</code> via the <code>@zhinnx/server</code> package. No configuration is needed.</p>

                        </div>
                    </main>
                </div>

                <!-- Footer -->
                <footer class="bg-black text-white py-16 border-t-2 border-black">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <img src="/zhinnx_nobg.png" alt="zhinnx" class="h-16 w-16 mx-auto mb-8 grayscale invert">
                        <h2 class="text-3xl font-bold mb-8">zhinnx</h2>
                        <div class="flex justify-center gap-8 mb-8 font-mono text-sm">
                            <a href="/" class="hover:text-gray-400 hover:underline">Home</a>
                            <a href="https://github.com/zhinnx/zhinnx" class="hover:text-gray-400 hover:underline">GitHub</a>
                            <a href="#" class="hover:text-gray-400 hover:underline">Twitter</a>
                        </div>
                        <p class="text-gray-500 font-mono text-sm">© 2026 zhinnx. MIT License.</p>
                    </div>
                </footer>
            </div>
        `;
    }

    afterRender() {}
}
