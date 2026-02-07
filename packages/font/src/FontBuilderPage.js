import { Component, html } from '@zhinnx/core';

export default class FontBuilderPage extends Component {
    static meta = {
        title: 'ZhinNX Font Builder',
        description: 'Create fonts visually'
    }

    constructor() {
        super();
        this.state = {
            glyphs: {}, // char -> path/svg
            selectedChar: 'A',
            metrics: { ascent: 800, descent: -200, unitsPerEm: 1000 },
            strokeWidth: 10
        };
        // Populate basic glyphs
        this.chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split('');
    }

    selectChar(char) {
        this.setState({ selectedChar: char });
    }

    updateMetrics(key, value) {
        this.setState({
            metrics: { ...this.state.metrics, [key]: parseInt(value) }
        });
    }

    render() {
        const { selectedChar, glyphs, metrics, strokeWidth } = this.state;
        const currentGlyph = glyphs[selectedChar] || '';

        return html`
            <div class="flex h-screen w-full font-sans bg-gray-50 overflow-hidden">
                <!-- Sidebar -->
                <div class="w-64 bg-white border-r-2 border-black flex flex-col h-full">
                    <div class="p-4 border-b-2 border-black bg-black text-white flex justify-between items-center">
                        <h1 class="font-bold text-xl">Font Builder</h1>
                        <a href="/" class="text-white hover:text-gray-300 font-bold text-sm">EXIT</a>
                    </div>
                    <div class="flex-1 overflow-y-auto p-2 grid grid-cols-4 gap-2 content-start">
                        ${this.chars.map(char => html`
                            <button
                                class="w-10 h-10 border-2 border-black font-bold flex items-center justify-center hover:bg-gray-200 ${selectedChar === char ? 'bg-black text-white' : 'bg-white'}"
                                onclick="${() => this.selectChar(char)}"
                            >
                                ${char}
                            </button>
                        `)}
                    </div>
                </div>

                <!-- Main Canvas Area -->
                <div class="flex-1 flex flex-col h-full">
                    <div class="p-4 bg-gray-100 border-b-2 border-black flex justify-between items-center">
                         <h2 class="font-bold text-2xl">Editing: ${selectedChar}</h2>
                         <div class="flex gap-4">
                             <button class="px-4 py-2 border-2 border-black bg-white font-bold shadow-[2px_2px_0px_0px_#000] hover:translate-y-[-1px] active:translate-y-[1px]" onclick="${() => alert('Export feature not implemented in UI yet')}">Export .OTF</button>
                             <button class="px-4 py-2 border-2 border-black bg-black text-white font-bold shadow-[2px_2px_0px_0px_#000] hover:translate-y-[-1px] active:translate-y-[1px]" onclick="${() => alert('Download .WOFF2')}">Download .WOFF2</button>
                         </div>
                    </div>

                    <div class="flex-1 relative flex items-center justify-center bg-white" style="background-image: radial-gradient(#ccc 1px, transparent 1px); background-size: 20px 20px;">
                        <!-- SVG Editor Placeholder -->
                        <svg width="600" height="600" viewBox="0 0 1000 1000" class="border-2 border-dashed border-gray-400 bg-white shadow-lg">
                            <line x1="0" y1="${800 - metrics.ascent}" x2="1000" y2="${800 - metrics.ascent}" stroke="blue" stroke-width="1" stroke-dasharray="5,5" />
                            <line x1="0" y1="${800}" x2="1000" y2="${800}" stroke="red" stroke-width="1" />
                            <line x1="0" y1="${800 - metrics.descent}" x2="1000" y2="${800 - metrics.descent}" stroke="blue" stroke-width="1" stroke-dasharray="5,5" />

                            <text x="500" y="500" text-anchor="middle" font-size="400" font-family="sans-serif" fill="#eee">${selectedChar}</text>

                            <!-- Editable Path would go here -->
                        </svg>
                    </div>
                </div>

                <!-- Controls Panel -->
                <div class="w-72 bg-white border-l-2 border-black p-4 flex flex-col gap-6 h-full">
                    <div>
                        <h3 class="font-bold border-b-2 border-black pb-2 mb-4">Metrics</h3>
                        <div class="space-y-4">
                            <div>
                                <label class="block text-sm font-bold mb-1">Ascent</label>
                                <input type="number" class="w-full border-2 border-black p-2" value="${metrics.ascent}" oninput="${(e) => this.updateMetrics('ascent', e.target.value)}">
                            </div>
                            <div>
                                <label class="block text-sm font-bold mb-1">Descent</label>
                                <input type="number" class="w-full border-2 border-black p-2" value="${metrics.descent}" oninput="${(e) => this.updateMetrics('descent', e.target.value)}">
                            </div>
                            <div>
                                <label class="block text-sm font-bold mb-1">Units Per Em</label>
                                <input type="number" class="w-full border-2 border-black p-2" value="${metrics.unitsPerEm}" oninput="${(e) => this.updateMetrics('unitsPerEm', e.target.value)}">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}
