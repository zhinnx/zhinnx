import { Component, html } from '@zhinnx/core';
import { Navbar } from '../../components/Navbar.js';

export default class StylingDocs extends Component {
    static meta = { title: 'Styling - ZhinNX Documentation' }
    render() {
        return html`
            <div class="min-h-screen bg-white text-black font-sans">
                <div id="navbar-mount">${new Navbar().render()}</div>
                <div class="max-w-4xl mx-auto px-4 py-20">
                    <h1 class="text-5xl font-black mb-8">Styling System</h1>
                    <p class="text-xl mb-8">ZhinNX believes in standard CSS. No CSS-in-JS runtime overhead. No utility class pollution unless you want it.</p>

                    <h2 class="text-3xl font-bold mb-4">The Golden Path</h2>
                    <p class="mb-4">We recommend structuring your CSS into granular files:</p>
                    <pre class="bg-gray-100 p-4 border-2 border-black mb-8">
/public/styles/
  ├── base.css
  ├── layout.css
  └── components/
      ├── button.css
      └── card.css</pre>

                    <h2 class="text-3xl font-bold mb-4">Usage</h2>
                    <p class="mb-4">Link them in your layout or use the CLI preset to generate them.</p>
                    <pre class="bg-gray-100 p-4 border-2 border-black mb-8">
&lt;link rel="stylesheet" href="/styles/base.css"&gt;</pre>
                </div>
            </div>
        `;
    }
    afterRender() { const nav = this.$('#navbar-mount'); if(nav) new Navbar().mount(nav); }
}
