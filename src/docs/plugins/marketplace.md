---
title: Plugin Marketplace
description: Extend ZhinNX with official and community plugins.
---

# Plugin Marketplace

ZhinNX has a thriving ecosystem of plugins. You can explore them on the [Official Marketplace](/plugins).

## Official Plugins

-   **@zhinnx/font:** A comprehensive font engine for creating, optimizing, and serving fonts. Includes a visual builder.
-   **@zhinnx/ui:** A lightweight, CSS-only UI kit following the Comic Modern design system.
-   **@zhinnx/ytdl:** An example plugin demonstrating API integration and server-side logic (YouTube Downloader).

## Creating a Plugin

Plugins export a `definePlugin` function:

\`\`\`javascript
import { definePlugin } from '@zhinnx/core';

export function myPlugin() {
    return definePlugin({
        name: 'my-plugin',
        setup(app) {
            // Run on app init
        },
        server(ctx) {
            // Add server routes
            ctx.router.add('/my-route', MyComponent);
        },
        client(ctx) {
            // Add client routes
            ctx.routes['/my-route'] = { ... };
        },
        cli(program) {
            // Add CLI commands
            program.command('my-command', 'Description', async () => { ... });
        }
    });
}
\`\`\`
