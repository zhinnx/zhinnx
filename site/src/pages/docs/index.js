import { Component, html } from '@zhinnx/core';

// Redirect /docs to /docs/intro/what-is-zhinnx
export default class DocsIndex extends Component {
    static async getProps({ res }) {
        if (res) {
            res.writeHead(302, { Location: '/docs/intro/what-is-zhinnx' });
            res.end();
        }
        return {};
    }

    render() {
        return html`<div>Redirecting...</div>`;
    }

    afterRender() {
        window.location.href = '/docs/intro/what-is-zhinnx';
    }
}
