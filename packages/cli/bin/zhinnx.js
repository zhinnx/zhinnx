#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

const args = process.argv.slice(2);
const command = args[0];

// Template Generator Functions
function generatePackageJson(projectName) {
    const name = path.basename(projectName);
    return `{
  "name": "${name}",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "node server.js",
    "start": "node server.js"
  },
  "dependencies": {
    "@zhinnx/core": "^2.0.0",
    "@zhinnx/server": "^2.0.0"
  }
}
`;
}

function generateServerJs() {
    return `import http from 'http';
import { handleRequest } from '@zhinnx/server';

const PORT = process.env.PORT || 3000;

const server = http.createServer(handleRequest);

server.listen(PORT, () => {
    console.log('\\n🚀 zhinnx app running at http://localhost:' + PORT);
});
`;
}

function generateClientAppJs() {
    return `import { Router } from '@zhinnx/core';

// We rely on window.__ROUTES__ injected by the server.
const serverRoutes = window.__ROUTES__ || {};
const clientRoutes = {};

// Helper to dynamically import pages
const importPage = (path) => {
    // path comes from server scan, e.g., "./src/pages/Home.js"
    // Remove leading dot to make it absolute for the browser
    const cleanPath = path.replace(/^\\./, '');
    return import(cleanPath);
};

// Transform server route map to client route map
for (const [key, route] of Object.entries(serverRoutes)) {
    clientRoutes[key] = {
        ...route,
        loader: () => importPage(route.importPath)
    };
}

const rootElement = document.getElementById('app');
if (rootElement) {
    new Router(clientRoutes, rootElement);
} else {
    console.error('Root element #app not found');
}
`;
}

function generateIndexPage() {
    return `import { Component, html } from '@zhinnx/core';

export default class HomePage extends Component {
    static meta = {
        title: 'Welcome to zhinnx',
        description: 'Your new zhinnx app'
    }

    render() {
        return html\`
            <div style="font-family: sans-serif; text-align: center; margin-top: 50px;">
                <h1>Welcome to zhinnx</h1>
                <p>Edit <code>src/pages/index.js</code> to get started.</p>
            </div>
        \`;
    }
}
`;
}

function generateApiHello() {
    return `import { createHandler } from '@zhinnx/server';

export default createHandler(async (req, res) => {
    return { message: "Hello from zhinnx API!" };
});
`;
}

async function main() {
    if (command === 'create') {
        const projectName = args[1];
        if (!projectName) {
            console.error('Please specify project name: zhinnx create <name>');
            process.exit(1);
        }

        const targetDir = path.resolve(process.cwd(), projectName);
        if (fs.existsSync(targetDir)) {
            console.error(`Directory ${projectName} already exists.`);
            process.exit(1);
        }

        console.log(`Creating project in ${targetDir}...`);

        try {
            // Create directories
            fs.mkdirSync(targetDir, { recursive: true });
            fs.mkdirSync(path.join(targetDir, 'src', 'pages'), { recursive: true });
            fs.mkdirSync(path.join(targetDir, 'src', 'components'), { recursive: true });
            fs.mkdirSync(path.join(targetDir, 'api'), { recursive: true });
            fs.mkdirSync(path.join(targetDir, 'public'), { recursive: true });

            // Create files
            fs.writeFileSync(path.join(targetDir, 'package.json'), generatePackageJson(projectName));
            fs.writeFileSync(path.join(targetDir, 'server.js'), generateServerJs());
            fs.writeFileSync(path.join(targetDir, 'src', 'app.js'), generateClientAppJs());
            fs.writeFileSync(path.join(targetDir, 'src', 'pages', 'index.js'), generateIndexPage());
            fs.writeFileSync(path.join(targetDir, 'api', 'hello.js'), generateApiHello());

            // Create gitignore
            fs.writeFileSync(path.join(targetDir, '.gitignore'), 'node_modules\n.DS_Store\n.env\n');

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
zhinnx CLI v2.0.0
-----------------
Usage:
  npx zhinnx create <project-name>
`);
    }
}

main();
