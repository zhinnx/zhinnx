import { Component, html } from '@zhinnx/core';
import { Navbar } from '../components/Navbar.js';

export default class DocsPage extends Component {
    static meta = {
        title: 'Documentation - zhinnx',
        description: 'Comprehensive documentation for the zhinnx framework.',
        image: '/zhinnx_nobg.png'
    }

    render() {
        return html`
            <div class="min-h-screen bg-white text-black font-sans">
                 <!-- Navbar Mount Point -->
                <div id="navbar-mount">
                    ${new Navbar().render()}
                </div>

                <div class="flex flex-col md:flex-row max-w-8xl mx-auto">
                    <!-- Sidebar -->
                    <aside class="w-full md:w-72 border-r-2 border-black md:min-h-screen bg-gray-50 p-6 hidden md:block shrink-0">
                        <nav class="space-y-8 sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto pr-2 custom-scrollbar">
                            <div>
                                <h3 class="font-bold text-lg mb-3 uppercase tracking-wide border-b-2 border-black pb-1">Introduction</h3>
                                <ul class="space-y-2 text-sm font-medium">
                                    <li><a href="#philosophy" class="text-gray-600 hover:text-black hover:translate-x-1 transition-transform block">Philosophy</a></li>
                                    <li><a href="#architecture" class="text-gray-600 hover:text-black hover:translate-x-1 transition-transform block">Architecture</a></li>
                                </ul>
                            </div>
                            <div>
                                <h3 class="font-bold text-lg mb-3 uppercase tracking-wide border-b-2 border-black pb-1">Getting Started</h3>
                                <ul class="space-y-2 text-sm font-medium">
                                    <li><a href="#installation" class="text-gray-600 hover:text-black hover:translate-x-1 transition-transform block">Installation</a></li>
                                    <li><a href="#project-structure" class="text-gray-600 hover:text-black hover:translate-x-1 transition-transform block">Project Structure</a></li>
                                </ul>
                            </div>
                            <div>
                                <h3 class="font-bold text-lg mb-3 uppercase tracking-wide border-b-2 border-black pb-1">@zhinnx/core</h3>
                                <ul class="space-y-2 text-sm font-medium">
                                    <li><a href="#components" class="text-gray-600 hover:text-black hover:translate-x-1 transition-transform block">Components & Lifecycle</a></li>
                                    <li><a href="#reactivity" class="text-gray-600 hover:text-black hover:translate-x-1 transition-transform block">Reactivity & State</a></li>
                                    <li><a href="#html-templating" class="text-gray-600 hover:text-black hover:translate-x-1 transition-transform block">HTML Templating</a></li>
                                    <li><a href="#routing" class="text-gray-600 hover:text-black hover:translate-x-1 transition-transform block">Client-Side Routing</a></li>
                                </ul>
                            </div>
                            <div>
                                <h3 class="font-bold text-lg mb-3 uppercase tracking-wide border-b-2 border-black pb-1">@zhinnx/server</h3>
                                <ul class="space-y-2 text-sm font-medium">
                                    <li><a href="#ssr-streaming" class="text-gray-600 hover:text-black hover:translate-x-1 transition-transform block">SSR & Streaming</a></li>
                                    <li><a href="#file-routing" class="text-gray-600 hover:text-black hover:translate-x-1 transition-transform block">File-Based Routing</a></li>
                                    <li><a href="#api-routes" class="text-gray-600 hover:text-black hover:translate-x-1 transition-transform block">API Routes</a></li>
                                </ul>
                            </div>
                             <div>
                                <h3 class="font-bold text-lg mb-3 uppercase tracking-wide border-b-2 border-black pb-1">Deployment</h3>
                                <ul class="space-y-2 text-sm font-medium">
                                    <li><a href="#deployment" class="text-gray-600 hover:text-black hover:translate-x-1 transition-transform block">Vercel / Serverless</a></li>
                                </ul>
                            </div>
                        </nav>
                    </aside>

                    <!-- Main Content -->
                    <main class="flex-1 p-8 md:p-16 max-w-5xl mx-auto w-full">
                        <article class="prose prose-xl prose-headings:font-black prose-headings:tracking-tight prose-a:text-blue-600 prose-a:font-bold prose-code:bg-gray-100 prose-code:text-pink-600 prose-code:px-1 prose-code:rounded prose-code:before:content-none prose-code:after:content-none font-sans">

                            <!-- Header -->
                            <div class="mb-16 pb-8 border-b-4 border-black">
                                <h1 class="text-6xl font-black mb-6">Documentation</h1>
                                <p class="text-2xl text-gray-600 font-medium leading-relaxed">
                                    The complete guide to building enterprise-grade applications with <strong>zhinnx</strong>.
                                </p>
                            </div>

                            <!-- Philosophy -->
                            <section id="philosophy" class="mb-24 scroll-mt-28">
                                <h2 class="text-4xl font-bold mb-6 flex items-center gap-4">
                                    <span class="bg-black text-white w-12 h-12 flex items-center justify-center text-2xl rounded-none border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">#</span>
                                    Philosophy
                                </h2>
                                <p class="mb-6">
                                    Modern web development has hit a wall of complexity. To render a simple "Hello World", developers are often forced to install gigabytes of dependencies, configure complex bundlers (Webpack, Vite, Rollup), and set up transpilers (Babel, SWC).
                                </p>
                                <p class="mb-6">
                                    <strong>zhinnx takes a different approach.</strong> We believe in the power of the web platform as it exists today.
                                </p>
                                <ul class="list-none space-y-4 mb-8 pl-0">
                                    <li class="flex items-start gap-3">
                                        <div class="mt-1 w-6 h-6 bg-black text-white flex items-center justify-center text-sm font-bold shrink-0">1</div>
                                        <div><strong>Zero-Build Development:</strong> Use native ES Modules. No bundling required during development. Edit a file, refresh, and it works.</div>
                                    </li>
                                    <li class="flex items-start gap-3">
                                        <div class="mt-1 w-6 h-6 bg-black text-white flex items-center justify-center text-sm font-bold shrink-0">2</div>
                                        <div><strong>Standards over Abstractions:</strong> Use standard JavaScript classes, Template Literals, and CSS. No proprietary compiler syntax.</div>
                                    </li>
                                    <li class="flex items-start gap-3">
                                        <div class="mt-1 w-6 h-6 bg-black text-white flex items-center justify-center text-sm font-bold shrink-0">3</div>
                                        <div><strong>Performance by Default:</strong> Streaming Server-Side Rendering (SSR) is built-in, not an plugin.</div>
                                    </li>
                                </ul>
                            </section>

                            <!-- Architecture -->
                            <section id="architecture" class="mb-24 scroll-mt-28">
                                <h2 class="text-4xl font-bold mb-6">Architecture</h2>
                                <p class="mb-6">zhinnx is a monorepo consisting of two primary packages that work in harmony:</p>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                    <div class="border-2 border-black p-6 bg-white comic-shadow">
                                        <h3 class="text-2xl font-bold mb-2">@zhinnx/core</h3>
                                        <p class="text-sm text-gray-600 mb-4">The Client Framework</p>
                                        <ul class="text-base space-y-2 list-disc pl-5">
                                            <li>Virtual DOM (VDOM) engine</li>
                                            <li>Component System</li>
                                            <li>Fine-Grained Reactivity (Proxies)</li>
                                            <li>Client-side Router</li>
                                        </ul>
                                    </div>
                                    <div class="border-2 border-black p-6 bg-white comic-shadow">
                                        <h3 class="text-2xl font-bold mb-2">@zhinnx/server</h3>
                                        <p class="text-sm text-gray-600 mb-4">The Server Runtime</p>
                                        <ul class="text-base space-y-2 list-disc pl-5">
                                            <li>Streaming HTML Renderer</li>
                                            <li>File-based Routing Scanner</li>
                                            <li>Static Asset Handler</li>
                                            <li>API Route Handler</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            <!-- Installation -->
                            <section id="installation" class="mb-24 scroll-mt-28">
                                <h2 class="text-4xl font-bold mb-6">Installation</h2>
                                <p class="mb-4">The recommended way to start is using the CLI tool.</p>

                                <div class="bg-gray-900 text-white p-6 border-2 border-black comic-shadow mb-8 font-mono text-sm relative group">
                                     <button class="absolute top-2 right-2 text-xs bg-gray-700 px-2 py-1 hover:bg-gray-600" onclick="navigator.clipboard.writeText('npx zhinnx create my-app')">Copy</button>
                                     <span class="text-green-400">$</span> npx zhinnx create my-app<br>
                                     <span class="text-green-400">$</span> cd my-app<br>
                                     <span class="text-green-400">$</span> npm install<br>
                                     <span class="text-green-400">$</span> node server.js
                                </div>

                                <h3 class="text-2xl font-bold mb-4">Manual Installation</h3>
                                <p class="mb-4">You can also install the scoped packages directly into any project.</p>
                                <div class="bg-gray-100 p-4 border-2 border-black mb-8">
                                    <code>npm install @zhinnx/core @zhinnx/server</code>
                                </div>
                            </section>

                            <!-- Project Structure -->
                             <section id="project-structure" class="mb-24 scroll-mt-28">
                                <h2 class="text-4xl font-bold mb-6">Project Structure</h2>
                                <p class="mb-6">zhinnx follows a "Convention over Configuration" philosophy. The directory structure dictates how the application behaves.</p>

                                <div class="space-y-4">
                                    <div class="flex gap-4">
                                        <code class="font-bold min-w-[150px]">api/</code>
                                        <p>Server-side API routes. <code>api/hello.js</code> becomes <code>/api/hello</code>.</p>
                                    </div>
                                    <div class="flex gap-4">
                                        <code class="font-bold min-w-[150px]">public/</code>
                                        <p>Static assets served at the root. <code>public/logo.png</code> becomes <code>/logo.png</code>.</p>
                                    </div>
                                    <div class="flex gap-4">
                                        <code class="font-bold min-w-[150px]">src/pages/</code>
                                        <p>Frontend routes. <code>src/pages/index.js</code> is the home page.</p>
                                    </div>
                                    <div class="flex gap-4">
                                        <code class="font-bold min-w-[150px]">src/components/</code>
                                        <p>Reusable UI components.</p>
                                    </div>
                                    <div class="flex gap-4">
                                        <code class="font-bold min-w-[150px]">server.js</code>
                                        <p>The entry point for the Node.js server.</p>
                                    </div>
                                </div>
                            </section>

                            <hr class="border-2 border-black my-16 opacity-20" />

                            <!-- Core: Components -->
                            <section id="components" class="mb-24 scroll-mt-28">
                                <h2 class="text-4xl font-bold mb-6">Components & Lifecycle</h2>
                                <p class="mb-6">
                                    Components are standard ES6 classes extending <code>Component</code>. They encapsulate state, view, and logic.
                                </p>

                                <div class="bg-gray-50 border-2 border-black p-6 mb-6">
<pre class="text-sm overflow-x-auto"><code>import { Component, html } from '@zhinnx/core';

export class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state.loading = true;
    }

    // Lifecycle: Called after component is mounted to DOM
    onMount() {
        console.log('Mounted!');
        this.fetchData();
    }

    // Lifecycle: Called after every render/update
    afterRender() {
        console.log('DOM Updated');
    }

    // Lifecycle: Called before removal
    onUnmount() {
        console.log('Cleanup');
    }

    render() {
        return html\`
            &lt;div class="profile"&gt;
                &lt;h1&gt;\${this.props.name}&lt;/h1&gt;
            &lt;/div&gt;
        \`;
    }
}</code></pre>
                                </div>
                            </section>

                            <!-- Core: Reactivity -->
                            <section id="reactivity" class="mb-24 scroll-mt-28">
                                <h2 class="text-4xl font-bold mb-6">Reactivity & State</h2>
                                <p class="mb-6">
                                    zhinnx uses <strong>JavaScript Proxies</strong> to track state changes. You do not need <code>setState</code> (though it exists for legacy compatibility). Simply mutate <code>this.state</code> and the component updates.
                                </p>
                                <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                                    <p class="font-bold">Fine-Grained Updates</p>
                                    <p class="text-sm">The reactivity system tracks exactly which components depend on which state. Only the affected components re-render.</p>
                                </div>
                                <div class="bg-gray-50 border-2 border-black p-6">
<pre class="text-sm overflow-x-auto"><code>updateName(newName) {
    // Triggers a re-render automatically!
    this.state.name = newName;

    // Arrays work too
    this.state.items.push(newItem);
}</code></pre>
                                </div>
                            </section>

                            <!-- Core: HTML -->
                             <section id="html-templating" class="mb-24 scroll-mt-28">
                                <h2 class="text-4xl font-bold mb-6">HTML Templating</h2>
                                <p class="mb-6">
                                    We use the <code>html</code> tagged template literal. It is unique because it is <strong>isomorphic</strong>:
                                </p>
                                <ul class="list-disc pl-5 mb-6">
                                    <li><strong>On Server:</strong> It returns a specialized object for efficient string concatenation and streaming.</li>
                                    <li><strong>On Client:</strong> It parses the string into Virtual DOM nodes using the browser's native <code>&lt;template&gt;</code> element for maximum performance.</li>
                                </ul>
                                <p class="mb-6">
                                    <strong>Event Handling:</strong> To bind events, use inline attributes with arrow functions.
                                </p>
                                <div class="bg-gray-50 border-2 border-black p-6">
<pre class="text-sm overflow-x-auto"><code>render() {
    return html\`
        &lt;button onclick="\${(e) => this.handleClick(e)}"&gt;
            Click Me
        &lt;/button&gt;
    \`;
}</code></pre>
                                </div>
                            </section>

                             <!-- Core: Routing -->
                             <section id="routing" class="mb-24 scroll-mt-28">
                                <h2 class="text-4xl font-bold mb-6">Client-Side Routing</h2>
                                <p class="mb-6">
                                    While the server handles the initial request (SSR), subsequent navigation is handled client-side by the <code>Router</code>.
                                </p>
                                <p class="mb-6">
                                    zhinnx automatically generates the route map from your <code>src/pages</code> directory. You simply use standard <code>&lt;a href="..."&gt;</code> tags. The router intercepts clicks and loads the new page component via dynamic <code>import()</code>, ensuring code-splitting.
                                </p>
                            </section>

                             <hr class="border-2 border-black my-16 opacity-20" />

                            <!-- Server: SSR & Streaming -->
                             <section id="ssr-streaming" class="mb-24 scroll-mt-28">
                                <h2 class="text-4xl font-bold mb-6">SSR & Streaming</h2>
                                <p class="mb-6">
                                    This is the "killer feature" of zhinnx. Most frameworks render the whole page to a string, then send it. This blocks the browser from receiving anything until the entire page is ready.
                                </p>
                                <p class="mb-6">
                                    zhinnx uses <strong>Generators</strong> to yield HTML chunks as they are created. The <code>@zhinnx/server</code> runtime streams the <code>&lt;head&gt;</code> immediately, then the body content.
                                </p>
                                <p class="mb-6 font-bold text-green-600">
                                    Result: Near-instant Time-To-First-Byte (TTFB).
                                </p>
                            </section>

                             <!-- Server: File Routing -->
                            <section id="file-routing" class="mb-24 scroll-mt-28">
                                <h2 class="text-4xl font-bold mb-6">File-Based Routing</h2>
                                <div class="overflow-x-auto">
                                    <table class="min-w-full border-2 border-black">
                                        <thead class="bg-black text-white">
                                            <tr>
                                                <th class="p-3 text-left">File Path</th>
                                                <th class="p-3 text-left">URL</th>
                                            </tr>
                                        </thead>
                                        <tbody class="bg-white">
                                            <tr class="border-b border-gray-200">
                                                <td class="p-3 font-mono text-sm">src/pages/index.js</td>
                                                <td class="p-3 font-mono text-sm">/</td>
                                            </tr>
                                            <tr class="border-b border-gray-200">
                                                <td class="p-3 font-mono text-sm">src/pages/about.js</td>
                                                <td class="p-3 font-mono text-sm">/about</td>
                                            </tr>
                                            <tr class="border-b border-gray-200">
                                                <td class="p-3 font-mono text-sm">src/pages/blog/post.js</td>
                                                <td class="p-3 font-mono text-sm">/blog/post</td>
                                            </tr>
                                            <tr>
                                                <td class="p-3 font-mono text-sm">src/pages/user/[id].js</td>
                                                <td class="p-3 font-mono text-sm">/user/:id</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </section>

                             <!-- Server: API Routes -->
                            <section id="api-routes" class="mb-24 scroll-mt-28">
                                <h2 class="text-4xl font-bold mb-6">API Routes</h2>
                                <p class="mb-6">
                                    Create serverless-ready API endpoints easily. These run on the same server in development, but can be deployed as individual functions.
                                </p>
                                <div class="bg-gray-50 border-2 border-black p-6">
<pre class="text-sm overflow-x-auto"><code>// api/users.js
import { createHandler } from '@zhinnx/server';

export default createHandler(async (req, res) => {
    if (req.method === 'POST') {
        // Handle POST
    }
    return { users: ['Alice', 'Bob'] };
});</code></pre>
                                </div>
                            </section>

                            <!-- Deployment -->
                            <section id="deployment" class="mb-24 scroll-mt-28">
                                <h2 class="text-4xl font-bold mb-6">Deployment</h2>
                                <h3 class="text-2xl font-bold mb-4">Vercel</h3>
                                <p class="mb-6">zhinnx is designed to deploy to Vercel with zero configuration using the Serverless Function pattern.</p>
                                <p class="mb-6">Simply create an <code>api/index.js</code> that imports your server handler, and Vercel will route all traffic to it.</p>
                            </section>

                        </article>
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

    afterRender() {
        const navMount = this.$('#navbar-mount');
        if (navMount) {
            new Navbar().mount(navMount);
        }
    }
}
