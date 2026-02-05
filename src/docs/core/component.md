# Component System

ZhinNX uses a class-based component system similar to React class components but simplified.

## Anatomy of a Component

```javascript
import { Component, html } from '@zhinnx/core';

export class MyComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { message: 'Hello' };
    }

    onMount() {
        console.log('Component mounted in DOM');
    }

    render() {
        return html`<div>${this.state.message}</div>`;
    }
}
```

## Lifecycle Methods

- `constructor()`: Initialize state.
- `render()`: Return HTML template (VNodes).
- `onMount()`: Called after the component is added to the DOM (Client only).
- `afterRender()`: Called after every update.
- `onUnmount()`: Called before removal.

## Props

Props are passed to the constructor and accessible via `this.props`.
In pages, `this.props.params` contains route parameters.
