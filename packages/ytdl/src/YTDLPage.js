import { Component, html, SmartImage } from '@zhinnx/core';
import { useYouTube } from './api.js';

export default class YTDLPage extends Component {
    static meta = {
        title: 'YouTube Downloader - ZhinNX',
        description: 'Download YouTube videos easily.'
    }

    constructor() {
        super();
        this.state = {
            url: '',
            loading: false,
            data: null,
            error: null
        };
    }

    async fetchVideo() {
        // Prevent empty or repeated fetch
        if (!this.state.url || this.state.loading) return;

        // Preserve URL, reset error/data, set loading
        this.setState({ loading: true, error: null, data: null });

        try {
            const data = await useYouTube(this.state.url);
            // On success: loading false, set data, preserve URL
            this.setState({ loading: false, data, error: null });
        } catch (e) {
            // On error: loading false, set error, preserve URL
            this.setState({ loading: false, error: e.message || 'Failed to fetch video', data: null });
        }
    }

    render() {
        const { url, loading, data, error } = this.state;
        const btnText = loading ? 'FETCHING...' : 'GET VIDEO';

        return html`
            <div class="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4 font-sans">
                 <!-- Navbar injection point if needed, but handled by App usually -->

                <div class="max-w-2xl w-full bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000] p-6 relative">
                    <a href="/" class="absolute top-4 right-4 text-sm font-bold underline hover:no-underline">EXIT</a>
                    <h1 class="text-3xl font-bold mb-6 text-center uppercase tracking-tighter">YouTube Downloader</h1>

                    <div class="flex flex-col gap-4">
                        <input
                            type="text"
                            placeholder="Paste YouTube URL here..."
                            class="border-2 border-black p-3 w-full focus:shadow-[4px_4px_0px_0px_#000] outline-none transition-all"
                            value="${url}"
                            oninput="${(e) => this.setState({ url: e.target.value })}"
                            disabled="${loading ? 'disabled' : undefined}"
                        />
                        <button
                            class="bg-black text-white font-bold py-3 px-6 border-2 border-black hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_0px_#000] transition-all active:translate-y-[0px] active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
                            onclick="${() => this.fetchVideo()}"
                            disabled="${loading ? 'disabled' : undefined}"
                        >
                            ${btnText}
                        </button>
                    </div>

                    ${loading ? html`
                        <div class="mt-8 flex justify-center">
                            <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-black"></div>
                        </div>
                    ` : ''}

                    ${error ? html`<div class="mt-6 p-4 border-2 border-red-500 bg-red-50 text-red-700 font-bold">${error}</div>` : ''}

                    ${data ? html`
                        <div class="mt-8 border-t-2 border-black pt-6 animate-in fade-in slide-in-from-bottom-4">
                            <div class="flex flex-col md:flex-row gap-6">
                                ${new SmartImage({ src: data.thumbnail, class: "w-full md:w-48 h-auto object-cover border-2 border-black shadow-sm", alt: data.title }).render()}
                                <div>
                                    <h2 class="text-xl font-bold mb-2 leading-tight">${data.title}</h2>
                                    <p class="text-gray-600 font-medium mb-4">Duration: ${data.duration}</p>
                                </div>
                            </div>

                            <div class="mt-6">
                                <h3 class="font-bold border-b-2 border-black pb-2 mb-4">VIDEO FORMATS</h3>
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    ${data.video && data.video.map(v => html`
                                        <a href="${v.url}" target="_blank" class="block p-3 border-2 border-black hover:bg-black hover:text-white transition-colors text-center font-medium decoration-none">
                                            ${v.quality || 'Unknown'} (${v.size || 'Stream'})
                                        </a>
                                    `)}
                                </div>
                            </div>

                             <div class="mt-6">
                                <h3 class="font-bold border-b-2 border-black pb-2 mb-4">AUDIO FORMATS</h3>
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    ${data.audio && data.audio.map(a => html`
                                        <a href="${a.url}" target="_blank" class="block p-3 border-2 border-black bg-gray-100 hover:bg-black hover:text-white transition-colors text-center font-medium decoration-none">
                                            Audio Only (${a.size || 'Stream'})
                                        </a>
                                    `)}
                                </div>
                            </div>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }
}
