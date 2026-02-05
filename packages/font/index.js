export * from './src/glyph.js';
export * from './src/renderer.js';

export function defineFont(config) {
    return {
        name: 'font',
        setup(app) {
            const { name, src, source, build, weight, display = 'swap', style = 'normal' } = config;

            // If build mode is enabled, we assume files are generated/served or handled by CLI separately.
            // For runtime injection:

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
        }
    };
}

export default defineFont;
