# ZhinStack v2: Architecture Blueprint

## 1. Filosofi Desain
ZhinStack v2 beralih dari *Global Proxy State* sederhana (v1) menuju **Fine-Grained Reactivity (Signal-based)** yang dipadukan dengan **Optimized Virtual DOM**. Tujuannya adalah meminimalkan "Re-render Cost" dan "Memory Bloat", menargetkan performa selevel Vue/React namun dengan bundle size minimal.

---

## 2. Core Engine Components

### A. The Reactive System (Signals)
Kita meninggalkan `setState` dan `Proxy` global demi atomicity.
*   **Signal (`ref`)**: Primitive value wrapper yang bisa di-observe.
*   **Computation (`computed`)**: Nilai turunan yang cache-nya invalid hanya jika dependency berubah.
*   **Effect (`effect`)**: Side-effect runner (untuk DOM updates).

**Diagram Alur Reactivity:**
```text
[Signal Updated]
      │
      ▼
[Notify Subscribers] ➔ (Is it a Computed?) ➔ [Mark Dirty]
      │                       │
      ▼                       ▼
[Scheduler (Microtask)] ➔ [Run Effects] ➔ [Update DOM]
```

### B. Virtual DOM & VNode
Struktur VNode dibuat "flat" (monomorphic) agar ramah bagi JIT compiler engine JS (V8).

```javascript
class VNode {
  tag: string | Function
  props: Object
  children: Array | string
  el: Element | null
  key: string | number | null
  flags: number (PatchFlags)
}
```

### C. Diffing Strategy (Reconciliation)
Menggunakan **Keyed Dual-Ended Diffing** untuk performa list rendering yang optimal (O(n)).

**Diagram Alur Diffing:**
```text
[OldChildren] vs [NewChildren]
      │
      ├── 1. Sync Head (Cek dari depan, stop saat beda)
      │
      ├── 2. Sync Tail (Cek dari belakang, stop saat beda)
      │
      ├── 3. Mount New (Jika Old habis, New sisa)
      │
      ├── 4. Unmount Old (Jika New habis, Old sisa)
      │
      └── 5. Move/Patch Unknown (Pakai Key Map untuk reorder sisanya)
```

---

## 3. SSR Pipeline (Server-Side Rendering)
Pipeline ini bersifat *Isomorphic*, artinya kode komponen yang sama berjalan di server dan client.

**Diagram Alur SSR:**
```text
[Browser Request]
      │
      ▼
[Server Entry] ➔ [Match Router] ➔ [Prefetch Data]
      │
      ▼
[Render to String] (Traverse VNode Tree -> HTML Buffer)
      │
      ├── Inject: <div id="app">...HTML...</div>
      ├── Inject: <script>window.__STATE__ = {...}</script>
      │
      ▼
[Send Response HTML]
      │
      ▼
[Browser Load JS] ➔ [Hydrate] (Attach listeners to existing DOM)
```

---

## 4. Keputusan Teknis & Alasan

| Keputusan | Alternatif | Alasan Memilih |
| :--- | :--- | :--- |
| **Signals** | React Hooks (Fiber), Proxy (Vue 3) | Signals lebih "predictable" daripada Hooks (no dependency array hell) dan lebih ringan daripada full Proxy observer. |
| **Virtual DOM** | No-VDOM (Svelte/Solid), String Templating (Lit) | VDOM memberikan fleksibilitas Render Functions dan SSR yang lebih mudah dikelola secara manual tanpa compiler kompleks. |
| **Dual-Ended Diffing** | Simple Diff (React Pre-Fiber), Myers Diff | Dual-Ended adalah sweet spot antara performa dan kompleksitas kode. Menangani kasus umum (push/pop/unshift) dengan sangat cepat. |
| **Class Components** | Functional Only | Kita mendukung **Functional Components** sebagai default, tapi class internal `VNode` tetap digunakan untuk struktur data. |
| **No Build Tools (Dev)** | Webpack/Vite | Mempertahankan filosofi ZhinStack: "Run directly in browser". ESM native support. |

---

## 5. Roadmap Implementasi (Next Steps)
1.  **Phase 1: Reactivity Core** (`zhin-core/reactivity.js`) - Implementasi Signal, Computed, Effect.
2.  **Phase 2: Virtual DOM** (`zhin-core/vdom.js`) - `h` function, VNode class.
3.  **Phase 3: Renderer** (`zhin-core/renderer.js`) - Mount & Patch logic.
4.  **Phase 4: Component Wrapper** (`zhin-core/index.js`) - Integrasi Reactivity dengan Rendering.
