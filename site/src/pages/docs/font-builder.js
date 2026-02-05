import { Component, html } from '@zhinnx/core';
import { Navbar } from '../../components/Navbar.js';

export default class FontBuilderDocs extends Component {
    static meta = { title: 'Font Engine - ZhinNX Documentation' }
    render() {
        return html`
            <div class="min-h-screen bg-white text-black font-sans">
                <div id="navbar-mount">${new Navbar().render()}</div>
                <div class="max-w-4xl mx-auto px-4 py-20">
                    <h1 class="text-5xl font-black mb-8">Font Engine Mini</h1>
                    <p class="text-xl mb-8">The <code>@zhinnx/font</code> package is not just a loader. It is a capable font engine allowing declarative glyph definitions and multi-target rendering.</p>

                    <h2 class="text-3xl font-bold mb-4">Headless Build</h2>
                    <p class="mb-4">You can build fonts from source config files using the CLI:</p>
                    <code class="bg-gray-100 p-2 border border-black block mb-8">npx @zhinnx/font build ./font.config.js</code>

                    <h2 class="text-3xl font-bold mb-4">Declarative Glyphs</h2>
                    <p class="mb-4">Define glyphs programmatically instead of using vector editors.</p>
                    <pre class="bg-gray-100 p-4 border-2 border-black mb-8 overflow-x-auto">
import { defineGlyph } from '@zhinnx/font';

const glyphA = defineGlyph('A', {
  paths: ['M 0 0 L 10 20 L 20 0'],
  weight: 400
});</pre>

                    <h2 class="text-3xl font-bold mb-4">Renderers</h2>
                    <p class="mb-4">The engine supports pluggable renderers:</p>
                    <ul class="list-disc pl-5 mb-8">
                        <li><strong>CanvasRenderer</strong>: For dynamic generation.</li>
                        <li><strong>SVGRenderer</strong>: For vector output.</li>
                        <li><strong>WebGPURenderer</strong>: Future-proof hardware acceleration.</li>
                    </ul>
                </div>
            </div>
        `;
    }
    afterRender() { const nav = this.$('#navbar-mount'); if(nav) new Navbar().mount(nav); }
}
