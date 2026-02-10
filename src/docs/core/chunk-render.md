---
title: Chunk Rendering
description: Optimize large pages with deferred rendering.
---

# Chunk Rendering

**Chunk Rendering** is a performance optimization technique that defers the rendering of components until they are close to the viewport. This significantly reduces the initial main thread work and improves Time-To-Interactive (TTI).

## How it Works

ZhinNX uses the `Lazy` component and `IntersectionObserver` to detect when a component enters the viewport.

## Usage

Wrap heavy components with `Lazy`:

\`\`\`javascript
import { Component, html, Lazy } from '@zhinnx/core';

// Standard import
import HeavyChart from './HeavyChart.js';

export default class Dashboard extends Component {
    render() {
        return html\`
            <div>
                <h1>Dashboard</h1>
                <!-- Only renders when scrolled into view -->
                ${new Lazy({
                    loader: () => import('./HeavyChart.js'), // Dynamic import
                    component: HeavyChart // Or static component reference
                }).render()}
            </div>
        \`;
    }
}
\`\`\`

## Configuration

Enable Chunk Rendering globally in `zhinnx.config.json`:

\`\`\`json
{
  "chunkRender": true
}
\`\`\`

If disabled, `Lazy` components will render immediately.
