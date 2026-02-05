#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

const args = process.argv.slice(2);
const command = args[0];

if (command === 'build') {
    const configPath = path.resolve(process.cwd(), args[1] || 'font.config.js');
    if (!fs.existsSync(configPath)) {
        console.error('Config file not found:', configPath);
        process.exit(1);
    }

    console.log(`Building font from ${configPath}...`);
    // Mock build process
    const dist = path.join(process.cwd(), 'dist');
    if (!fs.existsSync(dist)) fs.mkdirSync(dist);

    fs.writeFileSync(path.join(dist, 'ZhinSans.woff2'), 'mock-woff2-data');
    fs.writeFileSync(path.join(dist, 'ZhinSans.ttf'), 'mock-ttf-data');
    fs.writeFileSync(path.join(dist, 'ZhinSans.svg'), 'mock-svg-data');

    console.log('Font built successfully in dist/');
} else {
    console.log('Usage: npx @zhinnx/font build <config-file>');
}
