import { Component, html } from '@zhinnx/core';
import { Navbar } from '../../components/Navbar.js';

export default class PluginsDocs extends Component {
    static meta = { title: 'Plugins - ZhinNX Documentation' }
    render() {
        return html`
            <div class="min-h-screen bg-white text-black font-sans">
                <div id="navbar-mount">${new Navbar().render()}</div>
                <div class="max-w-4xl mx-auto px-4 py-20">
                    <h1 class="text-5xl font-black mb-8">Plugin System</h1>
                    <p class="text-xl mb-8">ZhinNX 2.1.0 introduces a powerful, isomorphic plugin system designed to extend the core without bloat.</p>

                    <h2 class="text-3xl font-bold mb-4">Concept</h2>
                    <p class="mb-4">Plugins are simple objects with a <code>setup(app)</code> method. This method runs on both the server (during SSR) and the client (during hydration).</p>

                    <h2 class="text-3xl font-bold mb-4">Creating a Plugin</h2>
                    <pre class="bg-gray-100 p-4 border-2 border-black mb-8 overflow-x-auto">
export function myPlugin() {
  return {
    name: 'my-plugin',
    setup(app) {
      // Inject into Head (SSR only)
      app.injectHead('<meta name="my-plugin" content="active">');

      // Hook into Mount (Client only)
      app.onMount(() => {
        console.log('App Mounted');
      });
    }
  }
}</pre>

                    <h2 class="text-3xl font-bold mb-4">Using Plugins</h2>
                    <pre class="bg-gray-100 p-4 border-2 border-black mb-8 overflow-x-auto">
import { defineApp } from '@zhinnx/core';
import { myPlugin } from './myPlugin.js';

export default defineApp({
  plugins: [
    myPlugin()
  ]
});</pre>
                </div>
            </div>
        `;
    }
    afterRender() { const nav = this.$('#navbar-mount'); if(nav) new Navbar().mount(nav); }
}
