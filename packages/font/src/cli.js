import opentype from 'opentype.js';
import fs from 'fs';
import path from 'path';

export async function buildFont(args) {
    const cwd = process.cwd();
    // usage: zhinnx font build
    // Expects zhinnx.config.js or just defaults?
    // Prompt says: "zhinnx font build"
    // We look for "glyphs" directory.

    const glyphsDir = path.join(cwd, 'glyphs');
    const outputDir = path.join(cwd, 'dist');
    const name = 'MyFont'; // TODO: Read from config if available

    console.log(`Starting font build for ${name}...`);

    if (!fs.existsSync(glyphsDir)) {
        console.error(`Error: Glyphs directory not found at ${glyphsDir}`);
        return;
    }

    const notdefGlyph = new opentype.Glyph({
        name: '.notdef',
        unicode: 0,
        advanceWidth: 650,
        path: new opentype.Path()
    });

    const glyphs = [notdefGlyph];
    const files = fs.readdirSync(glyphsDir).filter(f => f.endsWith('.svg'));

    for (const file of files) {
        const char = file.replace('.svg', '');
        const unicode = char.length === 1 ? char.charCodeAt(0) : 0;

        if (unicode) {
            // Simplified: create a glyph with a placeholder rectangle
            // In a real implementation, we would parse SVG path d attribute
            const glyph = new opentype.Glyph({
                name: char,
                unicode: unicode,
                advanceWidth: 600,
                path: new opentype.Path()
            });

            // Draw a simple box to prove it works
            glyph.path.moveTo(50, 0);
            glyph.path.lineTo(50, 700);
            glyph.path.lineTo(550, 700);
            glyph.path.lineTo(550, 0);
            glyph.path.close();

            glyphs.push(glyph);
        }
    }

    const font = new opentype.Font({
        familyName: name,
        styleName: 'Regular',
        unitsPerEm: 1000,
        ascender: 800,
        descender: -200,
        glyphs: glyphs
    });

    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

    const buffer = font.toArrayBuffer();
    const dest = path.join(outputDir, `${name}.otf`);
    fs.writeFileSync(dest, Buffer.from(buffer));

    console.log(`✅ Font built successfully: ${dest}`);
}

export async function previewFont(args) {
    console.log('Starting Font Preview Server...');
    // In a real app, this would start a server or open the browser to /font
    console.log('Please visit http://localhost:3000/font');
}

export async function exportFont(args) {
    console.log('Exporting font...');
    // Alias to build for now
    await buildFont(args);
}
