import { Component, html } from '../zhin-core/Component.js';
import { MyComponent } from './MyComponent.js';

export default class MyPage extends Component {
    // SEO Metadata
    static meta = {
        title: 'My Example Page',
        description: 'This is an example page in zhinnx.'
    };

    render() {
        return html`
            <div class="container mx-auto">
                <h1>Welcome to My Page</h1>
                ${new MyComponent().render()}
            </div>
        `;
    }
}
