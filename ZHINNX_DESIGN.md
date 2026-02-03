# zhinnx - Modern Lightweight Web Architecture

## 1. Gambaran Umum (Overview)
**zhinnx** adalah tech stack web modern yang dirancang untuk developer yang menginginkan kekuatan arsitektur berbasis komponen (seperti React) tetapi tanpa kompleksitas build tools yang berat (seperti Webpack/Vite) dan boilerplate yang berlebihan.

zhinnx menjembatani kesenjangan antara Vanilla JS dan Framework modern. Ia memanfaatkan fitur standar JavaScript (ES6 Modules, Classes, Template Literals, Proxy) untuk menciptakan pengalaman pengembangan yang cepat, ringan, dan berskala Enterprise.

## 2. Filosofi Inti (Core Philosophy)
*   **Zero-Magic**: Tidak ada kompilasi tersembunyi. Kode yang Anda tulis adalah kode yang dijalankan browser.
*   **Standard-Compliant**: Menggunakan API standar web (DOM, Fetch, History, Proxy).
*   **Modularitas Ekstrem**: Frontend dan Backend terpisah secara logis namun mudah diintegrasikan.
*   **Developer Experience (DX)**: Setup dalam hitungan detik, bukan menit. Tidak ada `npm install` ribuan dependensi hanya untuk Hello World.

## 3. Arsitektur (Architecture)

### Frontend
Menggunakan model **Component-Based**.
*   **View**: Menggunakan Tagged Template Literals (`html\``) untuk keamanan dan kemudahan pembacaan.
*   **State**: Menggunakan `Proxy` untuk reaktivitas otomatis.
*   **Routing**: Client-side routing ringan (Hash/History) untuk Single Page Application (SPA).

### Backend
Menggunakan pola **Serverless Functions**.
*   Setiap file di folder `api/` adalah endpoint independen.
*   Wrapper `handler` menstandarisasi Request/Response, membuatnya kompatibel dengan Node.js biasa maupun Vercel/AWS Lambda.

## 4. Struktur Folder (Directory Structure)
Struktur zhinnx dirancang untuk skalabilitas:

```
/
├── api/                # Backend API Routes (Serverless functions)
│   ├── handler.js      # Wrapper untuk standarisasi response
│   └── hello.js        # Endpoint contoh
├── src/                # Kode Aplikasi Frontend
│   ├── components/     # Komponen UI yang dapat digunakan kembali
│   ├── pages/          # Komponen Halaman (Route targets)
│   ├── store/          # State management global
│   └── app.js          # Entry point aplikasi
├── zhin-core/          # Inti Framework (Library zhinnx)
│   ├── Component.js    # Base class komponen
│   ├── Router.js       # Routing logic
│   ├── Store.js        # State management logic
│   └── API.js          # Wrapper fetch
├── public/             # Aset statis (gambar, favicon)
├── index.html          # HTML Shell utama
└── server.js           # Development server lokal
```

## 5. Contoh Komponen Frontend
Komponen di zhinnx adalah ES6 Class yang mewarisi `Component`.

```javascript
import { Component, html } from '../../zhin-core/Component.js';

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
        <button onclick="this.closest('.card').dispatchEvent(new Event('toggle'))">
           Toggle
        </button>
      </div>
    `;
  }

  afterRender() {
      // Event binding yang aman
      this.$('button').addEventListener('click', () => this.toggle());
  }
}
```

## 6. State Management
zhinnx menggunakan pola **Store** terpusat yang sangat sederhana.

```javascript
// store/index.js
import { Store } from '../../zhin-core/Store.js';

export default new Store({
  user: null,
  theme: 'dark'
});

// Penggunaan di Komponen
import store from '../store/index.js';

class Profile extends Component {
  onMount() {
    this.sub = store.subscribe(() => this.update());
  }

  onUnmount() {
    this.sub(); // Unsubscribe
  }

  render() {
    return html`<div>User: ${store.state.user?.name}</div>`;
  }
}
```

## 7. Backend / API Serverless
Backend sangat bersih. Fokus hanya pada logika bisnis.

```javascript
// api/users.js
import { createHandler } from './handler.js';

export default createHandler(async (req, res) => {
  if (req.method === 'POST') {
    // Logic simpan user
    return { status: 'created', id: 123 };
  }
  return { error: 'Method not allowed' };
});
```

## 8. Integrasi Styling
zhinnx agnostik terhadap CSS, namun sangat cocok dengan **Tailwind CSS** karena penggunaan Template Literals.

```javascript
render() {
  return html`
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Click Me
    </button>
  `;
}
```

## 9. Fleksibilitas dan Skalabilitas
*   **Fleksibel**: Inti framework (`zhin-core`) kurang dari 200 baris kode. Anda bisa memodifikasinya sesuai kebutuhan tim.
*   **Skalabel**: Struktur folder memisahkan logic (`api`), view (`components`), dan data (`store`). Saat aplikasi membesar, pola ini mencegah "Spaghetti Code".

## 10. Best Practices
1.  **Komposisi**: Pecah halaman besar menjadi komponen kecil di `src/components`.
2.  **Pure Functions**: Usahakan logika di `api/` bersifat stateless dan idempotent.
3.  **Global vs Local State**: Gunakan `this.state` untuk UI lokal (misal: dropdown open/close), dan `store` untuk data aplikasi (misal: data user).
4.  **Security**: Selalu sanitasi input di backend. `handler.js` bisa diperluas untuk middleware autentikasi.
