# zhinnx - Modern Lightweight Web Architecture (v2)

## 1. Gambaran Umum (Overview)
**zhinnx** adalah tech stack web modern yang dirancang untuk developer yang menginginkan kekuatan arsitektur berbasis komponen (seperti React) tetapi tanpa kompleksitas build tools yang berat (seperti Webpack/Vite).

zhinnx menjembatani kesenjangan antara Vanilla JS dan Framework modern. Ia memanfaatkan fitur standar JavaScript (ES6 Modules, Classes, Template Literals, Proxy) untuk menciptakan pengalaman pengembangan yang cepat, ringan, dan berskala Enterprise.

## 2. Filosofi Inti (Core Philosophy)
*   **Zero-Magic**: Tidak ada kompilasi tersembunyi. Kode yang Anda tulis adalah kode yang dijalankan browser.
*   **Isomorphic**: Dapat berjalan di Server (SSR) dan Client (Hydration) dengan kode yang sama.
*   **Modularitas Ekstrem**: Frontend dan Backend terpisah secara logis namun mudah diintegrasikan dalam monorepo.
*   **Developer Experience (DX)**: Setup dalam hitungan detik via `npx zhinnx create`.

## 3. Arsitektur (Architecture)

### Frontend (@zhinnx/core)
Menggunakan model **Component-Based** dengan Virtual DOM.
*   **View**: Menggunakan Tagged Template Literals (`html\``).
*   **State**: Menggunakan `Proxy` untuk reaktivitas otomatis (Fine-Grained).
*   **Routing**: File-based routing yang disinkronkan antara server dan client.

### Backend (@zhinnx/server)
Menggunakan pola **Streaming SSR**.
*   **SSR**: Merender komponen ke stream HTML untuk TTFB instan.
*   **Handler**: Wrapper serverless-ready yang kompatibel dengan Vercel.

## 4. Struktur Folder (Directory Structure)
Struktur zhinnx adalah monorepo:

```
/
├── packages/
│   ├── core/           # Runtime (Component, VDOM, Router)
│   ├── server/         # Server Logic (SSR, Stream)
│   └── cli/            # CLI Tool
│
├── api/                # Backend API Routes (Serverless functions)
│   └── index.js        # Entry point Vercel
│
├── src/                # Kode Aplikasi Frontend
│   ├── components/     # Komponen UI
│   ├── pages/          # Halaman (Routes)
│   └── app.js          # Client Entry Point
│
├── public/             # Aset statis
├── server.js           # Development server lokal
└── package.json        # Workspace config
```

## 5. Contoh Komponen Frontend
Komponen di zhinnx adalah ES6 Class yang mewarisi `Component`.

```javascript
import { Component, html } from '@zhinnx/core';

export class UserCard extends Component {
  constructor() {
    super();
    this.state = { active: false };
  }

  toggle() {
    this.setState({ active: !this.state.active });
  }

  render() {
    return html`
      <div class="card ${this.state.active ? 'active' : ''}">
        <h2>${this.props.name}</h2>
        <button onclick="${() => this.toggle()}">
           Toggle
        </button>
      </div>
    `;
  }
}
```

## 6. Server Side Rendering (SSR)
zhinnx menggunakan Streaming SSR secara default.

```javascript
// packages/server/src/ssr.js
export async function* renderToStream(vnode) {
    yield '<!DOCTYPE html><html>...';
    // Stream body content chunks...
}
```

## 7. Desain & Styling
zhinnx v2 mengusung tema **Comic Modern** secara default pada template starternya:
- Border tebal (2px solid black).
- Bayangan kasar (hard shadows).
- Warna monokromatik dengan aksen minimal.
- Animasi GSAP opsional.

## 8. Setup
Untuk memulai proyek baru:

```bash
npx zhinnx create my-app
```
