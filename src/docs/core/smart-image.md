---
title: Smart Image Rendering
description: Learn about the Intelligent Render Engine's SmartImage component.
---

# Smart Image Rendering

ZhinNX v2.2.0 introduces the **Intelligent Render Engine**, featuring the `SmartImage` component for robust image handling.

## Features

-   **Placeholder:** Displays a lightweight placeholder while the image loads.
-   **Error Fallback:** Automatically switches to a fallback image or visual if loading fails.
-   **Retry Logic:** Automatically retries loading failed images (up to 2 times) with exponential backoff.
-   **Configurable:** Toggle behavior globally via `zhinnx.config.json`.

## Usage

Import `SmartImage` from `@zhinnx/core`:

\`\`\`javascript
import { Component, html, SmartImage } from '@zhinnx/core';

export default class MyPage extends Component {
    render() {
        return html\`
            <div>
                ${new SmartImage({
                    src: '/my-image.jpg',
                    alt: 'My Image',
                    width: 800,
                    height: 600,
                    fallback: '/fallback.png',
                    placeholder: '/placeholder.jpg'
                }).render()}
            </div>
        \`;
    }
}
\`\`\`

## Configuration

Enable or disable Smart Image features in `zhinnx.config.json`:

\`\`\`json
{
  "smartImage": true
}
\`\`\`
