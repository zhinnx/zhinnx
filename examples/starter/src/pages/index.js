import { Component, html } from 'zhinnx-core';

export default class HomePage extends Component {
    static meta = {
        title: 'Welcome to zhinnx',
        description: 'Your new zhinnx app'
    }

    render() {
        return html`
            <div style="font-family: sans-serif; text-align: center; margin-top: 50px;">
                <h1>Welcome to zhinnx</h1>
                <p>Edit <code>src/pages/index.js</code> to get started.</p>
            </div>
        `;
    }
}
