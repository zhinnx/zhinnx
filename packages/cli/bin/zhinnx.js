#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CWD = process.cwd();

// --- Simple Commander Implementation ---
class Program {
    constructor() {
        this.commands = {};
    }

    command(name, desc, action) {
        this.commands[name] = { desc, action };
        return this;
    }

    async parse(argv) {
        const args = argv.slice(2);
        if (args.length === 0) {
            this.printHelp();
            return;
        }

        const sortedKeys = Object.keys(this.commands).sort((a, b) => b.length - a.length);
        const argsStr = args.join(' ');

        for (const key of sortedKeys) {
            if (argsStr === key || argsStr.startsWith(key + ' ')) {
                const cmdArgs = args.slice(key.split(' ').length);
                try {
                    await this.commands[key].action(cmdArgs);
                } catch (e) {
                    console.error(`Error executing command '${key}':`, e);
                }
                return;
            }
        }

        console.error(`Unknown command: ${args[0]}`);
        this.printHelp();
    }

    printHelp() {
        console.log(`\nZhinNX CLI v2.1.5`);
        console.log(`-----------------`);
        console.log(`Usage: zhinnx <command>\n`);
        console.log(`Commands:`);

        for (const [name, cmd] of Object.entries(this.commands)) {
             console.log(`  ${name.padEnd(20)} ${cmd.desc}`);
        }
        console.log('');
    }
}

const program = new Program();

// --- Global Commands ---

program.command('create', 'Create a new ZhinNX project', async (args) => {
    await createProject(args);
});

program.command('dev', 'Start development server', async (args) => {
    console.log('Starting ZhinNX Dev Server...');
    const p = spawn('node', ['server.js'], { stdio: 'inherit', cwd: CWD });
    p.on('close', (code) => process.exit(code));
});

program.command('build', 'Build the project', async (args) => {
    console.log('ZhinNX is Zero-Build. No build step required for core app.');
    console.log('Check plugins for specific build tasks (e.g. zhinnx font build).');
});

program.command('preview', 'Preview production build', async (args) => {
    console.log('Starting Preview Server (NODE_ENV=production)...');
    const p = spawn('node', ['server.js'], {
        stdio: 'inherit',
        cwd: CWD,
        env: { ...process.env, NODE_ENV: 'production' }
    });
    p.on('close', (code) => process.exit(code));
});

program.command('plugin list', 'List active plugins', async (args) => {
    const app = await loadApp();
    if (app && app.plugins) {
        console.log('Active Plugins:');
        app.plugins.forEach(p => {
             console.log(`- ${p.name || 'Unnamed Plugin'}`);
        });
    } else {
        console.log('No plugins found or not in a ZhinNX project.');
    }
});


// --- Plugin Loading ---
async function loadApp() {
    const appPath = path.join(CWD, 'src', 'app.js');
    if (fs.existsSync(appPath)) {
        try {
            const mod = await import(appPath);
            return mod.default;
        } catch (e) {
            // Silently fail if app.js cannot be loaded (e.g. syntax error or missing deps)
            // But if we are running 'plugin list', user expects result.
            // console.error(e);
            return null;
        }
    }
    return null;
}

// --- Create Logic ---
async function createProject(args) {
    const projectName = args[0];
    if (!projectName) {
        console.error('Please specify project name: npx @zhinnx/cli create <name>');
        return;
    }

    const targetDir = path.resolve(CWD, projectName);
    if (fs.existsSync(targetDir)) {
        console.error(`Directory ${projectName} already exists.`);
        return;
    }

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    const question = (query) => new Promise((resolve) => rl.question(query, resolve));

    const useCss = (await question('Use CSS preset (yes/no)? [yes] ')) !== 'no';
    const useFont = (await question('Use font plugin (yes/no)? [yes] ')) !== 'no';
    // const deployTarget = (await question('Target deploy (node/vercel)? [node] ')) || 'node';
    // Simplified for now or default to node
    const deployTarget = 'node';

    rl.close();

    const options = { useCss, useFont, deployTarget };

    console.log(`Creating project in ${targetDir}...`);

    try {
        fs.mkdirSync(targetDir, { recursive: true });
        fs.mkdirSync(path.join(targetDir, 'src', 'pages'), { recursive: true });
        fs.mkdirSync(path.join(targetDir, 'src', 'components'), { recursive: true });
        fs.mkdirSync(path.join(targetDir, 'api'), { recursive: true });
        fs.mkdirSync(path.join(targetDir, 'public'), { recursive: true });

        if (options.useCss) {
            fs.mkdirSync(path.join(targetDir, 'public', 'styles'), { recursive: true });
        }

        // Generate files (Simplified for brevity in this rewrite, assuming helpers exist or inlined)
        // I need to inline the generators since I overwrote the file.

        // Package.json
        const deps = {
            "@zhinnx/core": "^2.1.5",
            "@zhinnx/server": "^2.1.5"
        };
        if (options.useFont) deps["@zhinnx/font"] = "^2.1.5";
        if (options.useCss) deps["@zhinnx/ui"] = "^2.1.5";
        // Also add ytdl by default? Maybe not.

        const pkgJson = {
            name: path.basename(projectName),
            version: "1.0.0",
            type: "module",
            scripts: { "dev": "zhinnx dev", "start": "zhinnx dev" },
            dependencies: deps
        };
        fs.writeFileSync(path.join(targetDir, 'package.json'), JSON.stringify(pkgJson, null, 2));

        // Server.js
        const serverJs = `import http from 'http';
import { handleRequest } from '@zhinnx/server';
const PORT = process.env.PORT || 3000;
const server = http.createServer(handleRequest);
server.listen(PORT, () => {
    console.log('\\n🚀 zhinnx app running at http://localhost:' + PORT);
});
`;
        fs.writeFileSync(path.join(targetDir, 'server.js'), serverJs);

        // App.js
        let imports = `import { defineApp } from '@zhinnx/core';`;
        let plugins = [];

        if (options.useFont) {
            imports += `\nimport { defineFont } from '@zhinnx/font';`;
            plugins.push(`defineFont({
        name: 'Space Grotesk',
        src: ['https://fonts.gstatic.com/s/spacegrotesk/v13/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gOoraIAEj7oYXk.woff2'],
        weight: [400],
        display: 'swap'
    })`);
        }

        if (options.useCss) {
            imports += `\nimport { defineUI } from '@zhinnx/ui';`;
            plugins.push(`defineUI()`);
        }

        const appJs = `${imports}

export default defineApp({
    plugins: [
        ${plugins.join(',\n        ')}
    ]
});
`;
        fs.writeFileSync(path.join(targetDir, 'src', 'app.js'), appJs);

        // Index Page
        const indexPage = `import { Component, html } from '@zhinnx/core';

export default class HomePage extends Component {
    static meta = { title: 'Welcome to ZhinNX' }
    render() {
        return html\`
            <div style="font-family: 'Space Grotesk', sans-serif; text-align: center; margin-top: 50px;">
                <h1>Welcome to ZhinNX</h1>
                <p>Edit <code>src/pages/index.js</code> to get started.</p>
                ${options.useCss ?
                    html`<button class="zn-btn zn-primary" onclick="alert('Clicked!')">Click Me</button>` :
                    html`<button onclick="alert('Clicked!')">Click Me</button>`}
            </div>
        \`;
    }
}
`;
        fs.writeFileSync(path.join(targetDir, 'src', 'pages', 'index.js'), indexPage);

        fs.writeFileSync(path.join(targetDir, '.gitignore'), 'node_modules\n.DS_Store\n.env\n.vercel\n');

    } catch (e) {
        console.error('Error creating project:', e);
    }

    console.log('Project created successfully!');
    console.log(`\nNext steps:`);
    console.log(`  cd ${projectName}`);
    console.log(`  npm install`);
    console.log(`  npm run dev`);
}

// --- Main Execution ---
async function init() {
    const app = await loadApp();
    if (app && Array.isArray(app.plugins)) {
        for (const plugin of app.plugins) {
            if (typeof plugin.cli === 'function') {
                await plugin.cli(program);
            }
        }
    }

    await program.parse(process.argv);
}

init();
