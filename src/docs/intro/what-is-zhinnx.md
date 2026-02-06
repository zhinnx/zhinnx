# What is ZhinNX?

ZhinNX is a **Zero-Build, SSR-First Web Framework** designed for serious developers who value performance, simplicity, and control.

## The Philosophy

Modern web development has become overly complex. We have layers upon layers of abstraction: bundlers, transpilers, complex state management libraries, and hydration nightmares.

ZhinNX takes a different approach. We believe in:

- **Zero Build Step:** Development should be instant. No waiting for Webpack or Vite to bundle your code. ZhinNX uses native ES Modules directly in the browser and Node.js.
- **SSR First:** Performance matters. We stream HTML from the server to the client, ensuring the fastest possible Time-To-First-Byte (TTFB).
- **Explicit APIs:** No magic. If you want state, you define it. If you want a route, you see it. We avoid "black box" logic.
- **Platform Native:** We use standard Web APIs (Custom Elements, ES Modules, Fetch, History API) wherever possible.

## Key Features

- **Streaming SSR:** Send HTML chunks as they are generated.
- **Component System:** Class-based components with reactive state.
- **Plugin Architecture:** Extensible core that supports UI libraries, font engines, and more.
- **File-Based Routing:** `src/pages/about.js` becomes `/about`.
- **Zero Configuration:** It just works out of the box.

## Who is ZhinNX For?

ZhinNX is for developers who:
- Are tired of "config hell".
- Want to understand exactly how their framework works.
- Need raw performance without the bloat.
- Want to build long-lasting applications using standard web technologies.
