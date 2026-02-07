# Plugin API

Developers can create their own plugins using the `definePlugin` function.

## Structure

```javascript
export function defineMyPlugin(options) {
    return {
        name: 'my-plugin',

        // Run on App Initialization (shared)
        setup(app) {
            app.injectHead('<script>...</script>');
        },

        // Run on Server Request
        async server(ctx) {
            // ctx.req, ctx.res, ctx.router
            ctx.router.add('/my-route', MyComponent);
        },

        // Run on Client Hydration
        client(ctx) {
            // ctx.window, ctx.routes
        },

        // Run in CLI
        cli(program) {
            program.command('my-command', 'Description', async () => { ... });
        }
    };
}
```
