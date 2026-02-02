# ZhinStack

**ZhinStack** adalah tech stack web modern, ringan, dan fleksibel berbasis JavaScript (ES6+). Dirancang untuk memberikan pengalaman pengembangan seperti React namun dengan kesederhanaan Vanilla JS.

## Fitur Utama
*   🚀 **Zero Build Tooling**: Tidak butuh Webpack/Vite untuk memulai. Jalan langsung di browser modern.
*   ⚛️ **Component Based**: Arsitektur komponen modular dengan lifecycle dan state.
*   ⚡ **Serverless Ready**: Backend API terstruktur siap deploy ke Vercel atau Node.js.
*   🎨 **Tailwind Friendly**: Dukungan native untuk utility-first CSS.
*   🔄 **Simple State Management**: Global store terintegrasi tanpa boilerplate rumit.

## Struktur Proyek

```
/
├── api/            # Backend API Endpoints
├── src/            # Frontend Source Code
│   ├── components/ # Reusable UI Components
│   ├── pages/      # Route Pages
│   └── store/      # Global State
├── zhin-core/      # The Framework Core
└── server.js       # Local Development Server
```

## Cara Menggunakan

1.  **Clone / Download** repository ini.
2.  **Jalankan Server Development**:
    Pastikan Anda memiliki Node.js terinstal.

    ```bash
    npm start
    # atau
    node server.js
    ```

3.  **Buka Browser**:
    Akses `http://localhost:3000`

## Dokumentasi Lengkap

Untuk penjelasan mendalam mengenai arsitektur, filosofi, dan cara kerja ZhinStack, silakan baca [ZHINSTACK_DESIGN.md](./ZHINSTACK_DESIGN.md).

## Contoh Kode

**Membuat Komponen Baru:**

```javascript
import { Component, html } from '../../zhin-core/Component.js';

export class MyButton extends Component {
    render() {
        return html`<button class="btn">Click Me</button>`;
    }
}
```

**Menambah Route Baru:**

1. Buat file `src/pages/NewPage.js`
2. Daftarkan di `src/app.js`:
   ```javascript
   const routes = {
       '/newpage': NewPage
   };
   ```

---
Dibuat dengan ❤️ oleh Arsitek ZhinStack.
