import { definePlugin } from '@zhinnx/core';
import FontBuilderPage from './src/FontBuilderPage.js';

export * from './src/glyph.js';
export * from './src/renderer.js';

export function defineFont(config = {}) {
    return definePlugin({
        name: 'font',
        setup(app) {
            const { name, src, source, build, weight, display = 'swap', style = 'normal' } = config;

            if (src) {
                const sources = Array.isArray(src) ? src : [src];
                const weights = Array.isArray(weight) ? weight : [weight];
                const styles = Array.isArray(style) ? style : [style];

                let css = '';

                sources.forEach((url, i) => {
                    const w = weights[i] !== undefined ? weights[i] : (weights[0] || 400);
                    const s = styles[i] !== undefined ? styles[i] : (styles[0] || 'normal');

                    let format = '';
                    if (url.endsWith('.woff2')) format = " format('woff2')";
                    else if (url.endsWith('.woff')) format = " format('woff')";
                    else if (url.endsWith('.ttf')) format = " format('truetype')";

                    css += `
@font-face {
    font-family: '${name}';
    src: url('${url}')${format};
    font-weight: ${w};
    font-display: ${display};
    font-style: ${s};
}
`;
                });

                if (app && typeof app.injectHead === 'function') {
                    app.injectHead(`<style>${css}</style>`);
                }
            }
        },
        server(ctx) {
            ctx.router.add('/font', FontBuilderPage);
        },
        client(ctx) {
             ctx.routes['/font'] = {
                regex: '^/font$',
                loader: () => Promise.resolve(FontBuilderPage)
            };
        },
        async cli(program) {
            const { buildFont, previewFont, exportFont } = await import('./src/cli.js');

            program.command('font build', 'Build font from glyphs', buildFont);
            program.command('font preview', 'Preview font', previewFont);
            program.command('font export', 'Export font files', exportFont);
        }
    });
}

export default defineFont;
