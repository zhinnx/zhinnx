import { Component, html } from '../zhin-core/Component.js';

export class MyComponent extends Component {
    constructor() {
        super();
        this.state = { count: 0 };
    }

    render() {
        return html`
            <div class="p-4 border rounded">
                <h2>Counter: ${this.state.count}</h2>
                <button
                    onClick="${() => this.state.count++}"
                    class="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Increment
                </button>
            </div>
        `;
    }
}
