import { Component, html } from '@zhinnx/core';
import { Navbar } from '../../components/Navbar.js';

export default class CliDocs extends Component {
    static meta = { title: 'CLI - ZhinNX Documentation' }
    render() {
        return html`
            <div class="min-h-screen bg-white text-black font-sans">
                <div id="navbar-mount">${new Navbar().render()}</div>
                <div class="max-w-4xl mx-auto px-4 py-20">
                    <h1 class="text-5xl font-black mb-8">CLI Reference</h1>
                    <p class="text-xl mb-8">The <code>@zhinnx/cli</code> is your gateway to productivity.</p>

                    <h2 class="text-3xl font-bold mb-4">Commands</h2>
                    <div class="space-y-4">
                        <div class="border-2 border-black p-4">
                            <h3 class="font-bold text-xl">create</h3>
                            <code class="block bg-gray-100 p-2 mt-2">npx @zhinnx/cli create &lt;project-name&gt;</code>
                            <p class="mt-2">Scaffolds a new project with interactive prompts.</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    afterRender() { const nav = this.$('#navbar-mount'); if(nav) new Navbar().mount(nav); }
}
