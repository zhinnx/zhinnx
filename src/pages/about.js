import { Component, html } from '../../zhinnx.js';

export default class AboutPage extends Component {
    static meta = {
        title: 'About - Zhinnx',
        description: 'About us page.'
    }

    render() {
        return html`
            <div class="p-10 max-w-2xl mx-auto">
                <h1 class="text-3xl font-bold mb-4">About Us</h1>
                <p class="text-gray-700">
                    Zhinnx is built for performance and simplicity.
                </p>
                <div class="mt-8">
                     <a href="/" class="text-blue-500 underline">Back Home</a>
                </div>
            </div>
        `;
    }
}
