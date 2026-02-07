---
title: Your First App
description: Create your first ZhinNX application.
---

# Your First App

## Project Structure

A typical ZhinNX project looks like this:

\`\`\`
my-app/
├── src/
│   ├── app.js
│   ├── pages/
│   │   └── index.js
├── server.js
└── package.json
\`\`\`

## Creating a Page

Create \`src/pages/hello.js\`:

\`\`\`javascript
import { Component, html } from '@zhinnx/core';

export default class HelloPage extends Component {
    render() {
        return html\`<h1>Hello, ZhinNX!</h1>\`;
    }
}
\`\`\`

Run \`npm run dev\` and visit \`/hello\`.
