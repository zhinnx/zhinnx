# Your First App

Let's build a simple counter application to understand the ZhinNX component model.

## 1. Create a Component

Create a file `src/pages/counter.js`:

```javascript
import { Component, html } from '@zhinnx/core';

export default class CounterPage extends Component {
    // SEO Metadata
    static meta = {
        title: 'Counter - ZhinNX',
        description: 'A simple counter example'
    }

    constructor() {
        super();
        // Reactive State
        this.state = {
            count: 0
        };
    }

    increment() {
        // State updates automatically trigger re-render
        this.state.count++;
    }

    render() {
        const { count } = this.state;

        return html`
            <div style="padding: 50px; text-align: center;">
                <h1>Count: ${count}</h1>
                <button
                    onclick="${() => this.increment()}"
                    style="padding: 10px 20px; font-size: 1.5rem;"
                >
                    Increment
                </button>
            </div>
        `;
    }
}
```

## 2. Visit the Page

Start your server (`npm run dev`) and visit `http://localhost:3000/counter`.

## How It Works

1. **SSR:** The server renders the initial HTML with `Count: 0`.
2. **Hydration:** The browser loads the JS, re-runs the render, and attaches the event listener.
3. **Reactivity:** When you click "Increment", `this.state.count` changes. The component detects this and efficiently updates the DOM.
