---
title: What is ZhinNX?
description: An introduction to the ZhinNX framework.
---

# What is ZhinNX?

**ZhinNX** is a professional, lightweight, and production-ready web framework designed for serious developers who value performance and simplicity.

## Core Philosophy

1.  **Zero-Build:** ZhinNX uses native ES Modules to serve your code instantly. Change a file, refresh, done. No bundlers required for development.
2.  **SSR-First:** HTML is streamed from the server immediately, ensuring world-class Time-To-First-Byte (TTFB) and SEO.
3.  **Plugin-First:** The architecture is built around a powerful plugin system that allows you to extend the framework with custom logic, UI libraries, and more.

## Why ZhinNX?

-   **Performance:** Optimized for speed and low overhead.
-   **Simplicity:** Minimal configuration, explicit API.
-   **Stability:** Built-in self-healing rendering and robust error handling.
-   **Modern:** Uses latest web standards (ESM, Proxies, IntersectionObserver).

## Get Started

To create a new project:

\`\`\`bash
npx @zhinnx/cli create my-app
cd my-app
npm install
npm run dev
\`\`\`
