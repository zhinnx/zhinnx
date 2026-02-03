import { Component, html } from '../../packages/core/index.js';

export class Header extends Component {
  render() {
    return html`
      <nav class="bg-slate-900 text-white p-4 shadow-md">
        <div class="container mx-auto flex justify-between items-center">
          <div class="text-xl font-bold text-teal-400">ZhinStack</div>
          <ul class="flex space-x-6">
            <li><a href="#/" class="hover:text-teal-300 transition">Home</a></li>
            <li><a href="#/about" class="hover:text-teal-300 transition">About</a></li>
          </ul>
        </div>
      </nav>
    `;
  }
}
