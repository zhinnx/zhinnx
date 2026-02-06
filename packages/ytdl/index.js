import { definePlugin } from '@zhinnx/core';
import YTDLPage from './src/YTDLPage.js';

export * from './src/api.js';

export function defineYTDL() {
    return definePlugin({
        name: 'ytdl',
        setup(app) {
            // Setup logic if needed
        },
        server(ctx) {
            ctx.router.add('/ytdl', YTDLPage);
        },
        client(ctx) {
            ctx.routes['/ytdl'] = {
                path: '/ytdl',
                regex: '^/ytdl$',
                loader: () => Promise.resolve(YTDLPage)
            };
        }
    });
}

export default defineYTDL;
