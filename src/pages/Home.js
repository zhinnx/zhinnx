import { Component, html } from '../../zhin-core/Component.js';
import { Header } from '../components/Header.js';
import { Counter } from '../components/Counter.js';

export class Home extends Component {
  render() {
    return html`
      <div id="header-slot"></div>
      <main class="container mx-auto p-8">
        <div class="mb-8">
            <h1 class="text-4xl font-extrabold text-gray-900 mb-2">Welcome to ZhinStack</h1>
            <p class="text-xl text-gray-600">A modern, flexible, and professional web tech stack.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section class="prose">
                <h3>Why ZhinStack?</h3>
                <ul class="list-disc pl-5 text-gray-700 space-y-2">
                    <li><strong>Simple:</strong> No complex build tools required for dev.</li>
                    <li><strong>Modular:</strong> Component-based architecture.</li>
                    <li><strong>Fast:</strong> Lightweight core.</li>
                </ul>
            </section>

            <section>
                <h3 class="text-2xl font-bold mb-4 text-gray-800">Interactive Demo</h3>
                <div id="counter-slot"></div>
            </section>
        </div>
      </main>
    `;
  }

  afterRender() {
    // Composition: Mount child components into placeholders
    new Header().mount(this.$('#header-slot'));
    new Counter().mount(this.$('#counter-slot'));
  }
}
