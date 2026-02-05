# Plugins Overview

Plugins are the core extension mechanism of ZhinNX v2.1.5. They allow you to:

- Inject global styles/scripts.
- Add server-side routes.
- Add client-side logic.
- Extend the CLI.

## Using Plugins

Plugins are registered in `src/app.js`:

```javascript
import { defineApp } from '@zhinnx/core';
import { defineFont } from '@zhinnx/font';

export default defineApp({
    plugins: [
        defineFont({ ... })
    ]
});
```

## Official Plugins

| Plugin | Description |
| :--- | :--- |
| **@zhinnx/font** | Font loading, creation, and building engine. |
| **@zhinnx/ui** | Essential UI presets (Buttons, Cards, Modals). |
| **@zhinnx/ytdl** | Example plugin demonstrating API integration. |
