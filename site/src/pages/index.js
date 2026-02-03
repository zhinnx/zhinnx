import { Component, html } from '../../zhinnx.js';

export default class LandingPage extends Component {
    static meta = {
        title: 'Zhinnx - The Future of Web Frameworks',
        description: 'Zero-config, fast, SEO-first framework for modern web applications.',
        image: '/zhinnx_nobg.png'
    }

    render() {
        return html`
            <div class="font-sans text-gray-900 bg-gray-50 overflow-x-hidden">
                <nav class="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100 shadow-sm">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div class="flex justify-between h-16 items-center">
                            <div class="flex-shrink-0 flex items-center">
                                <img class="h-8 w-auto mr-2" src="/zhinnx_logo.png" alt="Zhinnx">
                                <span class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">ZHINNX</span>
                            </div>
                            <div class="hidden md:flex space-x-8">
                                <a href="#features" class="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Features</a>
                                <a href="#docs" class="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Docs</a>
                                <a href="https://github.com/zhinstack/zhinnx" class="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">GitHub</a>
                            </div>
                            <div>
                                <a href="#get-started" class="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition shadow-lg shadow-indigo-500/30">Get Started</a>
                            </div>
                        </div>
                    </div>
                </nav>

                <!-- Hero Section -->
                <div class="relative overflow-hidden bg-white">
                    <div class="max-w-7xl mx-auto">
                        <div class="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 pt-20 px-4 sm:px-6 lg:px-8">
                            <main class="mt-10 mx-auto max-w-7xl sm:mt-12 md:mt-16 lg:mt-20 xl:mt-28">
                                <div class="sm:text-center lg:text-left">
                                    <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                                        <span class="block xl:inline">Building for the</span>
                                        <span class="block text-indigo-600 xl:inline">Future Web</span>
                                    </h1>
                                    <p class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                                        Experience the speed of a compiler-less framework. Zhinnx combines the best of React, Svelte, and Next.js into a single, lightweight package. Zero config, just code.
                                    </p>
                                    <div class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                                        <div class="rounded-md shadow">
                                            <a href="#get-started" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 shadow-lg shadow-indigo-500/40 transform hover:translate-y-[-2px] transition">
                                                Get Started
                                            </a>
                                        </div>
                                        <div class="mt-3 sm:mt-0 sm:ml-3">
                                            <a href="#features" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-50 hover:bg-indigo-100 md:py-4 md:text-lg md:px-10">
                                                Learn More
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </main>
                        </div>
                    </div>
                    <div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 bg-gray-50 flex items-center justify-center">
                        <img class="h-56 w-full object-contain sm:h-72 md:h-96 lg:w-full lg:h-full p-10 transform hover:scale-105 transition duration-500" src="/zhinnx_nobg.png" alt="Zhinnx Hero">
                    </div>
                </div>

                <!-- Features Section -->
                <div id="features" class="py-12 bg-gray-50">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div class="lg:text-center">
                            <h2 class="text-base text-indigo-600 font-semibold tracking-wide uppercase">Performance First</h2>
                            <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                                Why Zhinnx?
                            </p>
                            <p class="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                                We stripped away the complexity. No Webpack config hell. No massive node_modules. Just pure performance.
                            </p>
                        </div>

                        <div class="mt-10">
                            <dl class="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                                <div class="relative bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
                                    <dt>
                                        <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                                            <!-- Heroicon: Lightning bolt -->
                                            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                        </div>
                                        <p class="ml-16 text-lg leading-6 font-bold text-gray-900">Zero-Install Mode</p>
                                    </dt>
                                    <dd class="mt-2 ml-16 text-base text-gray-500">
                                        Use directly via CDN or install via npm. Flexibility at its core. Works in any browser without build steps.
                                    </dd>
                                </div>

                                <div class="relative bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
                                    <dt>
                                        <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                                            <!-- Heroicon: Code -->
                                            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                            </svg>
                                        </div>
                                        <p class="ml-16 text-lg leading-6 font-bold text-gray-900">Developer Experience</p>
                                    </dt>
                                    <dd class="mt-2 ml-16 text-base text-gray-500">
                                        File-based routing (Next.js style), automatic SEO meta injection, and strict typing support out of the box.
                                    </dd>
                                </div>

                                <div class="relative bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
                                    <dt>
                                        <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                                            <!-- Heroicon: Globe -->
                                            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <p class="ml-16 text-lg leading-6 font-bold text-gray-900">SEO First</p>
                                    </dt>
                                    <dd class="mt-2 ml-16 text-base text-gray-500">
                                        Server-side rendering (SSR) by default. Meta tags, OpenGraph, and JSON-LD injected automatically.
                                    </dd>
                                </div>

                                <div class="relative bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
                                    <dt>
                                        <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                                            <!-- Heroicon: Sparkles -->
                                            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                            </svg>
                                        </div>
                                        <p class="ml-16 text-lg leading-6 font-bold text-gray-900">Fine-Grained Reactivity</p>
                                    </dt>
                                    <dd class="mt-2 ml-16 text-base text-gray-500">
                                        Proxy-based state management that only updates what changes. No heavy VDOM diffing on the entire tree.
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>

                <!-- Code Section -->
                <div id="get-started" class="bg-gray-900 py-16 overflow-hidden lg:py-24">
                    <div class="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
                        <div class="relative">
                            <h2 class="text-center text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
                                Simple by Design
                            </h2>
                            <p class="mt-4 max-w-3xl mx-auto text-center text-xl text-gray-400">
                                Familiar syntax, superpowers included.
                            </p>
                        </div>

                        <div class="relative mt-12 lg:mt-24 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
                            <div class="relative">
                                <h3 class="text-2xl font-extrabold text-white tracking-tight sm:text-3xl">
                                    Just plain JavaScript
                                </h3>
                                <p class="mt-3 text-lg text-gray-300">
                                    No compiler magic. No custom file extensions. Zhinnx works with standard ES Modules and template literals.
                                </p>

                                <ul class="mt-10 space-y-4">
                                    <li class="flex items-start">
                                        <div class="flex-shrink-0">
                                            <span class="flex items-center justify-center h-6 w-6 rounded-full bg-indigo-500 text-white font-bold text-xs">✓</span>
                                        </div>
                                        <p class="ml-3 text-base text-gray-300">npm install zhinnx</p>
                                    </li>
                                    <li class="flex items-start">
                                        <div class="flex-shrink-0">
                                            <span class="flex items-center justify-center h-6 w-6 rounded-full bg-indigo-500 text-white font-bold text-xs">✓</span>
                                        </div>
                                        <p class="ml-3 text-base text-gray-300">zhinnx create my-app</p>
                                    </li>
                                    <li class="flex items-start">
                                        <div class="flex-shrink-0">
                                            <span class="flex items-center justify-center h-6 w-6 rounded-full bg-indigo-500 text-white font-bold text-xs">✓</span>
                                        </div>
                                        <p class="ml-3 text-base text-gray-300">zhinnx dev</p>
                                    </li>
                                </ul>
                            </div>

                            <div class="mt-10 -mx-4 relative lg:mt-0" aria-hidden="true">
                                <div class="bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-gray-700">
                                    <div class="flex bg-gray-900 border-b border-gray-700 px-4 py-2">
                                        <div class="flex space-x-2">
                                            <div class="w-3 h-3 rounded-full bg-red-500"></div>
                                            <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                                            <div class="w-3 h-3 rounded-full bg-green-500"></div>
                                        </div>
                                        <div class="mx-auto text-gray-400 text-xs font-mono">Component.js</div>
                                    </div>
                                    <div class="p-6 overflow-x-auto">
<pre class="text-sm font-mono text-gray-300">
<span class="text-purple-400">import</span> { Component, html } <span class="text-purple-400">from</span> <span class="text-green-400">'zhinnx'</span>;

<span class="text-purple-400">export default class</span> <span class="text-yellow-400">Counter</span> <span class="text-purple-400">extends</span> <span class="text-yellow-400">Component</span> {
  <span class="text-blue-400">constructor</span>(props) {
    <span class="text-blue-400">super</span>(props);
    <span class="text-red-400">this</span>.state = { count: <span class="text-blue-400">0</span> };
  }

  <span class="text-blue-400">render</span>() {
    <span class="text-purple-400">return</span> html<span class="text-green-400">\`</span>
      &lt;<span class="text-red-400">div</span>&gt;
        &lt;<span class="text-red-400">h1</span>&gt;Count: <span class="text-blue-400">\${this.state.count}</span>&lt;/<span class="text-red-400">h1</span>&gt;
        &lt;<span class="text-red-400">button</span> <span class="text-orange-400">onclick</span>=<span class="text-blue-400">\${() => this.state.count++}</span>&gt;
           Increment
        &lt;/<span class="text-red-400">button</span>&gt;
      &lt;/<span class="text-red-400">div</span>&gt;
    <span class="text-green-400">\`</span>;
  }
}
</pre>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Footer -->
                <footer class="bg-white border-t border-gray-200">
                    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                         <div class="flex justify-center space-x-6 mb-4">
                            <a href="#" class="text-gray-400 hover:text-gray-500">
                                <span class="sr-only">Twitter</span>
                                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                </svg>
                            </a>
                            <a href="#" class="text-gray-400 hover:text-gray-500">
                                <span class="sr-only">GitHub</span>
                                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
                                </svg>
                            </a>
                        </div>
                        <p class="text-center text-base text-gray-400">
                            &copy; 2024 Zhinnx Framework. Open Source MIT License.
                        </p>
                    </div>
                </footer>
            </div>
        `;
    }
}
