
// Verification Script for ZhinStack v2 DX (File-Based Routing)

console.log('--- Starting ZhinStack v2 DX Verification ---');

import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

// Helper to load modules from source (mocking server context)
// We need to test:
// 1. scanRoutes logic (regex generation)
// 2. Router matching logic (regex matching)

async function runTests() {
    let passed = 0;
    let failed = 0;
    function assert(condition, msg) {
        if (condition) { console.log(`✅ ${msg}`); passed++; }
        else { console.error(`❌ ${msg}`); failed++; }
    }

    // --- Test 1: Route Scanning Logic (Mocking scanRoutes) ---
    // We can't import scanRoutes easily because it's not exported from server.js (unless we export it).
    // I exported it in Step 2.
    // NOTE: Importing server.js starts the server!

    console.log('\nTesting Route Scanning...');
    const serverModule = await import('../server.js');
    // server.js starts on port 3000. We should close it if possible, but it's not exported.
    // This is why verify_dx.js times out/hangs.
    // For verify purposes, we accept it hangs and manually exit process.

    const { ROUTE_MAP } = serverModule;

    // Check if ROUTE_MAP exists
    assert(ROUTE_MAP, 'ROUTE_MAP exported from server.js');

    // Check Index Route
    const indexRoute = ROUTE_MAP['/'];
    assert(indexRoute, 'Index route found');
    assert(indexRoute.regex === '^/$', 'Index regex correct');

    // Check About Route
    const aboutRoute = ROUTE_MAP['/about'];
    assert(aboutRoute, 'About route found');
    assert(aboutRoute.regex === '^/about$', 'About regex correct');

    // --- Test 2: Router Matching Logic ---
    console.log('\nTesting Client Router Matching...');

    // Mock Router Dependencies
    global.window = {
        addEventListener: () => {},
        location: { pathname: '/' },
        history: { pushState: () => {} }
    };
    global.document = {
        readyState: 'complete',
        createElement: () => ({}),
    };

    const { Router } = await import('../zhin-core/Router.js');

    // Mock Routes with regex (similar to what server generates)
    const mockRoutes = {
        '/user/:id': {
            regex: '^/user/([^/]+)$',
            params: ['id'],
            importPath: './src/pages/[id].js',
            loader: async () => ({ default: class {} })
        }
    };

    const root = { innerHTML: '', hasChildNodes: () => false };
    const router = new Router(mockRoutes, root);

    // Test Resolve
    global.window.location.pathname = '/user/123';

    // We need to spy on component creation to check params
    // But Router instantiates the class.
    // Let's spy on console.error or root.innerHTML changes?
    // Or better, let's inject a mock route that we control.

    let capturedParams = null;
    const MockPage = class {
        constructor(props) {
            capturedParams = props.params;
        }
        mount() {}
        render() {}
    };

    mockRoutes['/user/:id'].loader = async () => MockPage;

    router.resolve();

    // Wait for promise resolution
    await new Promise(r => setTimeout(r, 10));

    assert(capturedParams, 'Component instantiated');
    assert(capturedParams && capturedParams.id === '123', 'Params extracted correctly');

    console.log(`\nTests Completed: ${passed} Passed, ${failed} Failed.`);
    process.exit(failed > 0 ? 1 : 0);
}

runTests().catch(err => {
    console.error(err);
    process.exit(1);
});
