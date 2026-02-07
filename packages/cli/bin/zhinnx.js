#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CWD = process.cwd();

// --- Utils ---
function ask(rl, query, defaultVal = 'yes') {
    return new Promise((resolve) => {
        rl.question(`${query} [${defaultVal}] `, (answer) => {
            const a = answer.trim().toLowerCase();
            if (!a) resolve(defaultVal === 'yes');
            else resolve(['y', 'yes', 'true'].includes(a));
        });
    });
}

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
        console.log(`\nZhinNX CLI v2.2.0`);
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

    // Config Merging Strategy: Warn if exists, but proceed if user confirms (or merge)
    // Here we enforce directory creation, so if exists, we might overwrite files inside.
    if (fs.existsSync(targetDir)) {
        console.warn(`Directory ${projectName} already exists.`);
        // Proceeding might be dangerous, but for "merge" requirement we continue.
    } else {
        fs.mkdirSync(targetDir, { recursive: true });
    }

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const useCss = await ask(rl, 'Use CSS preset?', 'yes');
    const useFont = await ask(rl, 'Use font plugin?', 'yes');

    rl.close();

    const options = { useCss, useFont };

    console.log(`Setting up project in ${targetDir}...`);

    try {
        fs.mkdirSync(path.join(targetDir, 'src', 'pages'), { recursive: true });
        fs.mkdirSync(path.join(targetDir, 'src', 'components'), { recursive: true });
        fs.mkdirSync(path.join(targetDir, 'api'), { recursive: true });
        fs.mkdirSync(path.join(targetDir, 'public'), { recursive: true });

        if (options.useCss) {
            fs.mkdirSync(path.join(targetDir, 'public', 'styles'), { recursive: true });
        }

        // Package.json Merging
        const pkgPath = path.join(targetDir, 'package.json');
        let pkgJson = {
            name: path.basename(projectName),
            version: "1.0.0",
            type: "module",
            scripts: { "dev": "zhinnx dev", "start": "zhinnx dev" },
            dependencies: {}
        };

        if (fs.existsSync(pkgPath)) {
            try {
                const existing = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
                pkgJson = { ...existing, ...pkgJson, dependencies: { ...existing.dependencies, ...pkgJson.dependencies } };
            } catch (e) {}
        }

        pkgJson.dependencies["@zhinnx/core"] = "^2.2.0";
        pkgJson.dependencies["@zhinnx/server"] = "^2.2.0";

        if (options.useFont) pkgJson.dependencies["@zhinnx/font"] = "^2.2.0";
        if (options.useCss) pkgJson.dependencies["@zhinnx/ui"] = "^2.2.0";

        fs.writeFileSync(pkgPath, JSON.stringify(pkgJson, null, 2));

        // Server.js (Only if missing)
        const serverPath = path.join(targetDir, 'server.js');
        if (!fs.existsSync(serverPath)) {
            const serverJs = `import http from 'http';
import { handleRequest } from '@zhinnx/server';
const PORT = process.env.PORT || 3000;
const server = http.createServer(handleRequest);
server.listen(PORT, () => {
    console.log('\\n🚀 zhinnx app running at http://localhost:' + PORT);
});
`;
            fs.writeFileSync(serverPath, serverJs);
        }

        // App.js (Only if missing, otherwise we might break existing app)
        const appPath = path.join(targetDir, 'src', 'app.js');
        if (!fs.existsSync(appPath)) {
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
             fs.writeFileSync(appPath, appJs);
        }

        // Index Page (Only if missing)
        const indexPath = path.join(targetDir, 'src', 'pages', 'index.js');
        if (!fs.existsSync(indexPath)) {
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
            fs.writeFileSync(indexPath, indexPage);
        }

        if (!fs.existsSync(path.join(targetDir, '.gitignore'))) {
            fs.writeFileSync(path.join(targetDir, '.gitignore'), 'node_modules\n.DS_Store\n.env\n.vercel\n');
        }

    } catch (e) {
        console.error('Error creating project:', e);
    }

    console.log('Project setup complete!');
    console.log(`\nNext steps:`);
    console.log(`  cd ${projectName}`);
    console.log(`  npm install`);
    console.log(`  npm run dev`);
}

// --- New Commands ---

program.command('doctor', 'Diagnose ZhinNX project', async (args) => {
    console.log('Running ZhinNX Doctor...');
    const checks = [
        { name: 'package.json', check: () => fs.existsSync(path.join(CWD, 'package.json')) },
        { name: 'src/app.js', check: () => fs.existsSync(path.join(CWD, 'src', 'app.js')) },
        { name: 'node_modules', check: () => fs.existsSync(path.join(CWD, 'node_modules')) },
        { name: 'zhinnx.config.json', check: () => fs.existsSync(path.join(CWD, 'zhinnx.config.json')) }
    ];

    let issues = 0;
    checks.forEach(c => {
        if (c.check()) console.log(`[OK] ${c.name}`);
        else {
            console.log(`[MISSING] ${c.name}`);
            issues++;
        }
    });

    if (issues === 0) console.log('\nAll systems operational.');
    else console.log(`\nFound ${issues} issues.`);
});

program.command('optimize', 'Suggestion for performance', async (args) => {
    console.log('Optimization Suggestions:');
    console.log('1. Ensure images use SmartImage component.');
    console.log('2. Enable "chunkRender" for large pages.');
    console.log('3. Use "priority: deferred" for heavy components.');
});

program.command('render status', 'Check render config', async (args) => {
    const configPath = path.join(CWD, 'zhinnx.config.json');
    if (fs.existsSync(configPath)) {
        const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
        console.log('Current Render Config:');
        console.log(JSON.stringify(config, null, 2));
    } else {
        console.log('No zhinnx.config.json found (using defaults: all OFF).');
    }
});

program.command('render toggle', 'Toggle render feature', async (args) => {
    const feature = args[0];
    if (!feature) {
        console.error('Usage: zhinnx render toggle <feature>');
        return;
    }

    const configPath = path.join(CWD, 'zhinnx.config.json');
    let config = {};
    if (fs.existsSync(configPath)) {
        try {
            config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
        } catch (e) {}
    }

    config[feature] = !config[feature];
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    console.log(`Feature '${feature}' set to ${config[feature]}`);
});


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
