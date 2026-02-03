import { Component, html } from '../../zhinnx.js';

export default class HomePage extends Component {
    static meta = {
        title: 'Welcome to Zhinnx',
        description: 'The modern, lightweight framework.'
    }

    constructor(props) {
        super(props);
        this.state.count = 0;
    }

    render() {
        return html`
            <div class="p-10 max-w-2xl mx-auto">
                <h1 class="text-4xl font-bold mb-4 text-blue-600">Hello, Zhinnx!</h1>
                <p class="mb-4 text-gray-700">
                    Edit <code class="bg-gray-100 p-1 rounded">src/pages/index.js</code> to see updates.
                </p>
                <div class="border p-4 rounded-lg shadow-sm">
                    <p class="mb-2">Counter: <strong>${this.state.count}</strong></p>
                    <button
                        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        onclick=${() => this.state.count++}
                    >
                        Increment
                    </button>
                </div>
                <div class="mt-8">
                     <a href="/about" class="text-blue-500 underline">Go to About Page</a>
                </div>
            </div>
        `;
    }
}
