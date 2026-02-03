# Zhinnx Architecture (v2)

Zhinnx is a modern, lightweight, isomorphic web framework designed for speed, SEO, and developer experience. It combines the best of React (Component model), Svelte (Compiler-less, simple), and Next.js (File-based routing, SSR).

## Core Concepts

### 1. Zero-Install & Zero-Build
Zhinnx is designed to run directly in the browser via ES Modules, or on the server via Node.js, without a mandatory build step.
- **Client:** Uses native `html` tagged templates and `Proxy` reactivity.
- **Server:** Uses a streaming SSR engine that handles the same components.

### 2. Isomorphic Components
Components are ES6 Classes extending `Component`.
```javascript
import { Component, html } from 'zhinnx';

export default class MyComponent extends Component {
  render() {
    return html`<div>${this.props.title}</div>`;
  }
}
```

### 3. Fine-Grained Reactivity
Zhinnx uses `Proxy` to track dependencies.
- `this.state` is reactive.
- `computed` properties are lazy and cached.
- Updates are batched and precise.

### 4. VDOM & Diffing
The Virtual DOM engine (`vdom.js` and `diff.js`) is optimized for:
- Fragments (Arrays)
- Keyed Lists
- Text Node Normalization
- Hydration Mismatches

### 5. Streaming SSR
The Server (`ssr.js`) renders components to a Node.js `Readable` stream.
- Head is flushed immediately (TTFB optimization).
- Body is streamed as generated.
- `Lazy` components are hydrated on the client via `IntersectionObserver`.

## Architecture Diagram

```mermaid
graph TD
    User[Browser Request] --> Server[Node.js Server (handler.js)]
    Server --> Router[Server Router (Scan pages/)]
    Router --> Page[Import Page Component]
    Page --> SSR[SSR Engine (ssr.js)]
    SSR --> Stream[Readable Stream]
    Stream -->|Chunk 1: Head| User
    Stream -->|Chunk 2: Body| User
    Stream -->|Chunk 3: Scripts| User

    User -->|Hydrate| Client[Client App (app.js)]
    Client -->|Import| VDOM[Core VDOM (vdom.js)]
    Client -->|Attach| Events[Event Listeners]
```

## Folder Structure (Mono-repo)

```
/
├── packages/
│   ├── core/           # The Runtime (VDOM, Reactivity, Router)
│   ├── server/         # The Server (SSR, Handler, Stream)
│   ├── cli/            # The 'zhinnx' command
│
├── examples/
│   ├── starter/        # The default template
│
├── site/               # The Zhinnx Landing Page
```

## Request Flow

1. **Incoming Request:** `handleRequest` in `zhinnx-server` intercepts.
2. **Route Matching:** Scans `src/pages` for matching file.
3. **Rendering:**
   - Instantiates Page Component.
   - Extracts `static meta` for SEO.
   - Generates HTML Stream.
4. **Response:** Pipes stream to `res`.
5. **Client Hydration:**
   - `src/app.js` loads.
   - Reconstructs Router map.
   - `hydrate` walks the DOM and attaches listeners to the existing HTML.
