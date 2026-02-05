export class FontRenderer {
    render(glyph) {
        throw new Error('Render method must be implemented');
    }
}

export class CanvasRenderer extends FontRenderer {
    render(glyph) {
        // Mock Canvas render logic
        return `[Canvas Render: ${glyph.char}]`;
    }
}

export class SVGRenderer extends FontRenderer {
    render(glyph) {
        // Mock SVG path generation from declarative paths
        const d = glyph.paths ? glyph.paths.join(' ') : '';
        return `<svg viewBox="0 0 100 100"><path d="${d}" /></svg>`;
    }
}

export class WebGPURenderer extends FontRenderer {
    render(glyph) {
        return `[WebGPU Stub: ${glyph.char}]`;
    }
}
