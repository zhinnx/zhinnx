---
title: Vercel Deployment
description: How to deploy ZhinNX on Vercel.
---

# Vercel Deployment

ZhinNX is optimized for serverless deployment on Vercel.

## Configuration

The project includes a `vercel.json` file at the root.

\`\`\`json
{
  "env": {
    "ZHINNX_ROOT": "site"
  },
  "rewrites": [
    { "source": "/(.*)", "destination": "/site/api/index.js" }
  ],
  "functions": {
    "site/api/index.js": {
      "includeFiles": "site/**, packages/**, public/**, node_modules/**"
    }
  }
}
\`\`\`

## Directory Structure

For the official website (monorepo structure):

-   **site/**: Contains the website source code.
-   **packages/**: Contains framework packages.
-   **vercel.json**: Configures the deployment root and rewrites.

## Environment Variables

-   `ZHINNX_ROOT`: Set to `site` (or your app directory relative to root) to tell the SSR engine where to find your application code.
