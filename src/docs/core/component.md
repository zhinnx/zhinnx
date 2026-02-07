---
title: Components
description: Understanding ZhinNX Components.
---

# Components

## Base Component

All ZhinNX components extend the `Component` class.

\`\`\`javascript
import { Component, html } from '@zhinnx/core';

export default class MyComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { count: 0 };
    }

    render() {
        return html\`
            <button onclick="\${() => this.setState({ count: this.state.count + 1 })}">
                Count: \${this.state.count}
            </button>
        \`;
    }
}
\`\`\`

## Lifecycle Methods

-   `onMount()`: Called after the component is mounted to the DOM.
-   `afterRender()`: Called after every render (mount and update).
-   `onUnmount()`: Called before the component is removed.
