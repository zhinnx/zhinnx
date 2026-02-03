import { Component, html } from '../../packages/core/index.js';
import { Header } from '../components/Header.js';
import api from '../../packages/core/index.js';

export class About extends Component {
  constructor() {
    super();
    this.state = {
      apiMessage: 'Loading data from backend...',
      timestamp: null
    };
  }

  async onMount() {
    // Simulate API call
    try {
      const data = await api.get('/api/hello');
      this.setState({
        apiMessage: data.message,
        timestamp: data.timestamp
      });
    } catch (err) {
      this.setState({ apiMessage: 'Failed to connect to API.' });
    }
  }

  render() {
    return html`
      <div id="header-slot"></div>
      <main class="container mx-auto p-8">
        <h1 class="text-3xl font-bold mb-6 text-gray-900">About ZhinStack</h1>

        <div class="bg-indigo-50 border-l-4 border-indigo-500 p-4 mb-6">
            <h3 class="font-bold text-indigo-700">Backend Integration Test</h3>
            <p class="text-gray-700">Message: <span class="font-mono bg-white px-1 rounded">${this.state.apiMessage}</span></p>
            ${this.state.timestamp ? html`<p class="text-xs text-gray-500 mt-1">Server Time: ${this.state.timestamp}</p>` : ''}
        </div>

        <p class="text-gray-700 leading-relaxed max-w-2xl">
            ZhinStack is designed to bridge the gap between simple static sites and complex single-page applications.
            It offers a familiar component model without the massive overhead of larger frameworks.
        </p>
      </main>
    `;
  }

  afterRender() {
    new Header().mount(this.$('#header-slot'));
  }
}
