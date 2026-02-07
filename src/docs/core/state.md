---
title: State Management
description: Managing state in ZhinNX.
---

# State Management

## Reactive State

ZhinNX uses proxies for fine-grained reactivity.

\`\`\`javascript
this.state = reactive({
    user: { name: 'John' }
});
\`\`\`

## Updates

Updates happen automatically when you mutate the state.

\`\`\`javascript
this.state.user.name = 'Jane'; // Triggers re-render
\`\`\`
