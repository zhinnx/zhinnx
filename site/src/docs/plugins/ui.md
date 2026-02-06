# UI Plugin (@zhinnx/ui)

A lightweight, CSS-only UI preset for rapid development.

## Installation

```bash
npm install @zhinnx/ui
```

## Usage

In `src/app.js`:

```javascript
import { defineUI } from '@zhinnx/ui';

export default defineApp({
    plugins: [
        defineUI()
    ]
});
```

## Components

The plugin injects CSS classes globally.

### Button
```html
<button class="zn-btn zn-primary">Click Me</button>
```

### Card
```html
<div class="zn-card">
  Content here...
</div>
```

### Input
```html
<input class="zn-input" placeholder="Type..." />
```

### Navbar
```html
<nav class="zn-navbar">...</nav>
```
