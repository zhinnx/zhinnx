# Changelog

## [2.2.0] - 2024-05-20

### Major Changes

- **Intelligent Render Engine:**
  - **SmartImage:** New component with placeholder, error fallback, and retry logic.
  - **ChunkRender:** Option to defer rendering of heavy components until visible (using `Lazy`).
  - **Self-Healing:** Framework now catches render/hydration errors and attempts to recover or show a friendly UI instead of crashing.
  - **Priority Rendering:** `Component.update` now respects `priority="deferred"` using `requestIdleCallback`.

- **Stability & Resilience:**
  - **DocsPage Fix:** Fixed "Double Navbar" and "Hamburger not working" issues by implementing `z-preserve` attribute.
  - **z-preserve Attribute:** New attribute for VNodes to skip diffing children, allowing manual DOM management (e.g., interactive islands in static pages).
  - **Router:** Removed "Error Loading Page" screen. Implemented auto-reload recovery strategy and better 404 UI.

- **CLI Redesign:**
  - **New Commands:** `doctor`, `optimize`, `render status`, `render toggle`.
  - **Improved UX:** Case-insensitive inputs (`y`/`yes`).
  - **Config Safety:** `create` command now merges `package.json` dependencies instead of overwriting.

### Bug Fixes
- Fixed mobile menu clipping in `Navbar` (removed `contain-content`).
- Fixed `YTDLPage` rendering issues by using `SmartImage`.
- Fixed potential hydration mismatches by ensuring consistent `Config` usage.

### Configuration
- **Runtime Config:** ZhinNX now supports `zhinnx.config.json` for runtime feature toggles (smartImage, chunkRender, etc.).
