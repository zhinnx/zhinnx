# YTDL Plugin (@zhinnx/ytdl)

A real-world example plugin that provides YouTube downloading capabilities via a clean API and UI.

## Installation

```bash
npm install @zhinnx/ytdl
```

## Features

1. **Auto-Injected Route:** Automatically adds `/ytdl` to your app.
2. **API Client:** Provides `useYouTube(url)` helper.

## Usage

In `src/app.js`:

```javascript
import { defineYTDL } from '@zhinnx/ytdl';

export default defineApp({
    plugins: [
        defineYTDL()
    ]
});
```

Then visit `/ytdl` in your browser.
