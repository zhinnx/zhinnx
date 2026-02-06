import { definePlugin } from '@zhinnx/core';

export function defineUI() {
    return definePlugin({
        name: 'ui',
        setup(app) {
            // Inject link tag for the styles
            if (app.injectHead) {
                app.injectHead('<link rel="stylesheet" href="/_zhinnx/ui.css">');
            }
        },
        async server(ctx) {
            if (ctx.req.url === '/_zhinnx/ui.css') {
                const fs = await import('fs');
                const path = await import('path');
                const { fileURLToPath } = await import('url');

                const __filename = fileURLToPath(import.meta.url);
                const __dirname = path.dirname(__filename);
                const styleDir = path.join(__dirname, 'styles');

                const files = [
                    'variables.css',
                    'button.css',
                    'input.css',
                    'card.css',
                    'navbar.css',
                    'modal.css'
                ];

                let css = '/* @zhinnx/ui styles */\n';

                for (const f of files) {
                    const p = path.join(styleDir, f);
                    if (fs.existsSync(p)) {
                        css += fs.readFileSync(p, 'utf-8') + '\n';
                    }
                }

                ctx.res.setHeader('Content-Type', 'text/css');
                ctx.res.end(css);
                ctx.handled = true;
            }
        }
    });
}
