#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Assuming this script is at packages/cli/bin/zhinnx.js
// Repo root is ../../..
const REPO_ROOT = path.resolve(__dirname, '../../..');

const args = process.argv.slice(2);
const command = args[0];

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

        // Find starter template
        // 1. In Repo (Development)
        let starterDir = path.join(REPO_ROOT, 'examples/starter');

        if (!fs.existsSync(starterDir)) {
             // 2. If installed via npm, usually adjacent or in lib?
             // Since we are building the framework structure now, we focus on Repo path.
             console.error('Starter template not found at ' + starterDir);
             process.exit(1);
        }

        console.log(`Creating project in ${targetDir}...`);
        try {
            fs.cpSync(starterDir, targetDir, { recursive: true });
        } catch (e) {
            console.error('Error copying files:', e);
            process.exit(1);
        }

        console.log('Project created successfully!');
        console.log(`\nNext steps:`);
        console.log(`  cd ${projectName}`);
        console.log(`  npm install (optional, for types/linting)`);
        console.log(`  node server.js`);

    } else if (command === 'dev') {
        console.log('Starting Zhinnx Dev Server...');
        if (!fs.existsSync('server.js')) {
            console.error('server.js not found. Are you in a Zhinnx project root?');
            process.exit(1);
        }
        const child = spawn('node', ['server.js'], { stdio: 'inherit' });
        child.on('close', (code) => {
            process.exit(code);
        });

    } else if (command === 'build') {
        console.log('Zhinnx is Zero-Build! Your code is production ready.');
        console.log('Just deploy your folder or run "node server.js".');

    } else {
        console.log(`
Zhinnx CLI v2.0.0
-----------------
Usage:
  zhinnx create <project-name>   Create a new project
  zhinnx dev                     Start dev server
  zhinnx build                   Build for production (No-op)
`);
    }
}

main();
