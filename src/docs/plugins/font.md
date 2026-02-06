# Font Plugin (@zhinnx/font)

The Font plugin is more than just a loader. It is a complete **Font Creation System**.

## Installation

```bash
npm install @zhinnx/font
```

## Usage

In `src/app.js`:

```javascript
import { defineFont } from '@zhinnx/font';

export default defineApp({
    plugins: [
        defineFont({
            name: 'MyFont',
            src: '/fonts/myfont.woff2'
        })
    ]
});
```

## Font Builder (UI)

The plugin injects a **Font Builder UI** at `/font`.
Visit `http://localhost:3000/font` to access a visual editor where you can:
- Draw glyphs.
- Adjust metrics (ascent, descent).
- Export fonts.

## CLI Commands

The plugin also extends the CLI:

```bash
zhinnx font build
zhinnx font preview
zhinnx font export
```
