#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import readline from 'readline';

const args = process.argv.slice(2);
const command = args[0];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

// Template Generator Functions
function generatePackageJson(projectName, options) {
    const name = path.basename(projectName);
    const deps = {
        "@zhinnx/core": "^2.1.0",
        "@zhinnx/server": "^2.1.0"
    };
    if (options.useFont) {
        deps["@zhinnx/font"] = "^2.1.0";
    }

    const dependenciesString = Object.entries(deps)
        .map(([k, v]) => `    "${k}": "${v}"`)
        .join(',\n');

    return `{
  "name": "${name}",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "node server.js",
    "start": "node server.js"
  },
  "dependencies": {
${dependenciesString}
  }
}
`;
}

function generateServerJs(options) {
    return `import http from 'http';
import { handleRequest } from '@zhinnx/server';

const PORT = process.env.PORT || 3000;

const server = http.createServer(handleRequest);

server.listen(PORT, () => {
    console.log('\\n🚀 zhinnx app running at http://localhost:' + PORT);
});
`;
}

function generateVercelConfig() {
    return `{
  "rewrites": [
    { "source": "/(.*)", "destination": "/api/index.js" }
  ]
}`;
}

function generateVercelEntry() {
    return `import { handleRequest } from '@zhinnx/server';

export default async function handler(req, res) {
    await handleRequest(req, res);
}
`;
}

function generateClientAppJs(options) {
    let imports = `import { defineApp } from '@zhinnx/core';`;
    let plugins = [];

    if (options.useFont) {
        imports += `\nimport { defineFont } from '@zhinnx/font';`;
        // Using a public URL for default font or user replaces it.
        // We use Space Grotesk as default to match theme.
        plugins.push(`defineFont({
        name: 'Space Grotesk',
        src: ['https://fonts.gstatic.com/s/spacegrotesk/v13/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gOoraIAEj7oYXk.woff2'],
        weight: [400],
        display: 'swap'
    })`);
    }

    return `${imports}

export default defineApp({
    plugins: [
        ${plugins.join(',\n        ')}
    ]
});
`;
}

function generateIndexPage(options) {
    const cssLink = options.useCss ? `<link rel="stylesheet" href="/styles/base.css">\n                <link rel="stylesheet" href="/styles/button.css">` : '';
    const btnClass = options.useCss ? `class="zn-btn zn-primary"` : `style="padding: 10px 20px; font-size: 1.2rem; cursor: pointer;"`;

    return `import { Component, html } from '@zhinnx/core';

export default class HomePage extends Component {
    static meta = {
        title: 'Welcome to ZhinNX',
        description: 'Your new ZhinNX app'
    }

    render() {
        return html\`
            <div style="font-family: 'Space Grotesk', sans-serif; text-align: center; margin-top: 50px;">
                <h1>Welcome to ZhinNX</h1>
                ${cssLink}
                <p>Edit <code>src/pages/index.js</code> to get started.</p>
                <div style="margin-top: 20px;">
                    <button ${btnClass} onclick="alert('Clicked!')">Click Me</button>
                </div>
            </div>
        \`;
    }
}
`;
}

function generateApiHello() {
    return `export default async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: "Hello from ZhinNX API!" }));
};
`;
}

function generateCssFiles() {
    return {
        'base.css': `
:root {
  --primary: #000;
  --text: #333;
}
body {
  margin: 0;
  color: var(--text);
  line-height: 1.5;
}
`,
        'button.css': `
.zn-btn {
  border: 2px solid #000;
  background: white;
  padding: 0.5rem 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.1s;
  box-shadow: 2px 2px 0 0 #000;
  text-transform: uppercase;
  font-family: inherit;
}
.zn-btn:active {
  transform: translate(2px, 2px);
  box-shadow: 0 0 0 0 #000;
}
.zn-primary {
  background: #000;
  color: white;
}
`
    };
}


async function main() {
    if (command === 'create') {
        const projectName = args[1];
        if (!projectName) {
            console.error('Please specify project name: npx @zhinnx/cli create <name>');
            process.exit(1);
        }

        const targetDir = path.resolve(process.cwd(), projectName);
        if (fs.existsSync(targetDir)) {
            console.error(`Directory ${projectName} already exists.`);
            process.exit(1);
        }

        // Prompts
        const useCss = (await question('Use CSS preset (yes/no)? [yes] ')) !== 'no';
        const useFont = (await question('Use font plugin (yes/no)? [yes] ')) !== 'no';
        const deployTarget = (await question('Target deploy (node/vercel)? [node] ')) || 'node';

        rl.close();

        const options = { useCss, useFont, deployTarget };

        console.log(`Creating project in ${targetDir}...`);

        try {
            // Create directories
            fs.mkdirSync(targetDir, { recursive: true });
            fs.mkdirSync(path.join(targetDir, 'src', 'pages'), { recursive: true });
            fs.mkdirSync(path.join(targetDir, 'src', 'components'), { recursive: true });
            fs.mkdirSync(path.join(targetDir, 'api'), { recursive: true });
            fs.mkdirSync(path.join(targetDir, 'public'), { recursive: true });

            if (options.useCss) {
                fs.mkdirSync(path.join(targetDir, 'public', 'styles'), { recursive: true });
            }

            // Create files
            fs.writeFileSync(path.join(targetDir, 'package.json'), generatePackageJson(projectName, options));
            fs.writeFileSync(path.join(targetDir, 'server.js'), generateServerJs(options));
            fs.writeFileSync(path.join(targetDir, 'src', 'app.js'), generateClientAppJs(options));
            fs.writeFileSync(path.join(targetDir, 'src', 'pages', 'index.js'), generateIndexPage(options));
            fs.writeFileSync(path.join(targetDir, 'api', 'hello.js'), generateApiHello());
            fs.writeFileSync(path.join(targetDir, '.gitignore'), 'node_modules\n.DS_Store\n.env\n.vercel\n');

            if (options.useCss) {
                const styles = generateCssFiles();
                fs.writeFileSync(path.join(targetDir, 'public', 'styles', 'base.css'), styles['base.css']);
                fs.writeFileSync(path.join(targetDir, 'public', 'styles', 'button.css'), styles['button.css']);
            }

            if (options.deployTarget === 'vercel') {
                fs.writeFileSync(path.join(targetDir, 'vercel.json'), generateVercelConfig());
                // API dir already created
                fs.writeFileSync(path.join(targetDir, 'api', 'index.js'), generateVercelEntry());
            }

        } catch (e) {
            console.error('Error creating project:', e);
            process.exit(1);
        }

        console.log('Project created successfully!');
        console.log(`\nNext steps:`);
        console.log(`  cd ${projectName}`);
        console.log(`  npm install`);
        console.log(`  node server.js`);

    } else {
        console.log(`
@zhinnx/cli v2.1.0
------------------
Usage:
  npx @zhinnx/cli create <project-name>
`);
        rl.close();
    }
}

main();
