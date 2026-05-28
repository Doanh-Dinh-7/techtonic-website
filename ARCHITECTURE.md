# TechTonic Website V2.0 Architecture

## Purpose

This document defines the architecture baseline and direction for TechTonic Website V2.0: a maintainable, multi-developer Next.js platform with a dark futuristic identity and performance-aware 3D experiences.

---

## Current Architecture (After Phase 1)

### Style

**Hybrid App Router + layered `src/` foundation**, with legacy UI modules still at repository root.

- **Routing & layouts:** `src/app/` (App Router, route group `(site)`).
- **Shared hooks:** `src/hooks/`.
- **Content & utilities:** `src/lib/` (including `lib/content/*` and `lib/3d/*` helpers).
- **3D scenes (R3F):** `src/components/3d/`.
- **Page UI & primitives:** still primarily `components/` at root (resolved via `@/*` fallback).
- **Path alias:** `@/*` → `./src/*` first, then `./*`.

### Request / render flow (simplified)

```text
Browser
  -> src/app/(site)/layout.tsx (SiteShell: header, footer, Lenis, scroll)
  -> src/app/(site)/*/page.tsx (thin route composition)
  -> @/components/* (sections: hero, registration, events-content, ...)
  -> @/lib/content/* (typed static data)
  -> @/components/3d/* (optional R3F scenes via CanvasShell)
```

### Strengths (post Phase 1)

| Area | Detail |
|---|---|
| Clear entry points | `src/app/layout.tsx`, `src/app/(site)/layout.tsx`, `components/site-shell.tsx` |
| Content separation | Domain content in `src/lib/content/*` with shared types |
| 3D boundary started | Canvas, scenes, effects under `src/components/3d/` |
| Migration-safe imports | `@/` alias prioritizes `src/` without breaking legacy `components/` |
| Strict TypeScript | `strict: true` in `tsconfig.json` |

### Weaknesses & technical debt (still open)

| Issue | Impact | Planned phase |
|---|---|---|
| Duplicate root copies of migrated folders (`app/`, `hooks/`, `lib/`, `components/3d/`) | Confusion, risk of editing wrong file | Cleanup PR |
| Flat `components/` at root | Weak feature boundaries, large files | Phase 2 |
| Duplicate hooks (`src/hooks/use-toast` vs `components/ui/use-toast`) | Inconsistent behavior risk | Phase 2 |
| Build gates disabled in `next.config.mjs` | False-green builds | Phase 2 |
| Next.js 14.x (target: 15) | Docs/tooling drift | Phase 2+ |
| `src/features`, `widgets`, `entities` are scaffolds only | Target architecture not fully realized | Phase 2 |

### Architecture scorecard (updated)

| Dimension | Score (1–10) | Notes |
|---|---:|---|
| Maintainability | **6.5** | Improved layout; legacy `components/` and duplicates remain |
| Scalability | **6.0** | `src/` foundation ready; feature slices not implemented yet |
| Readability | **7.0** | Clearer paths for app/hooks/lib/3d |
| Team collaboration readiness | **5.5** | Docs + structure improved; tooling/CI still pending |

---

## Target Architecture (Version 2.0)

- **Next.js 15** App Router (server-first by default).
- **Feature-sliced + domain-oriented** modules under `src/`.
- **Dedicated 3D layer** (`src/3d`) for R3F/Three.js runtime and performance policy.
- **Explicit dependency direction** and no cross-feature deep imports.
- **Quality gates enforced** (lint, typecheck, test, build).

### Target diagram

```text
src/app (routing, metadata)
  -> src/widgets (page composition)
    -> src/features (use-cases)
      -> src/entities (domain units)
        -> src/shared (ui, hooks, utils, types, config)

src/app / src/widgets / src/features
  -> src/3d (R3F runtime: canvas, scenes, effects, loaders, perf guards)
```

---

## Layer Responsibilities

### `src/app`
- Route segments, layouts, metadata, global CSS.
- Thin pages; delegate to widgets/features/components.

### `src/widgets` (target)
- Compose multiple features/entities for a page section.

### `src/features` (target)
- Business flows: recruitment, events, departments, portfolio, about, home.

### `src/entities` (target)
- Reusable domain models and UI: member, event, project, partner.

### `src/shared` (target)
- Generic UI primitives, hooks, utils, constants — no feature coupling.

### `src/components/3d` (current) → `src/3d` (target)
- R3F canvas shell, scenes, effects, models.
- Performance guards (`use3d`, reduced motion, DPR caps) via `src/hooks` and `src/lib/3d`.

### `components/` (legacy, transitional)
- Page sections and shadcn `ui/` until Phase 2 migration completes.

---

## Dependency Direction Rules

**Allowed:**
- `app -> widgets -> features -> entities -> shared`
- Upper layers may import `src/3d` or transitional `src/components/3d`
- `app` may import `@/components/*` during migration

**Not allowed:**
- `shared ->` upper layers
- Feature-to-feature internal imports
- Circular dependencies
- Permanent new modules in legacy root folders (except `public/` and config)

---

## ADR Summary

### ADR-001: Adopt App Router as default architecture
- **Decision:** Use Next.js App Router with server-first pages.
- **Why:** Layout composition, metadata API, long-term framework alignment.

### ADR-002: Introduce feature-sliced boundaries
- **Decision:** Organize by feature/domain under `src/features`, `src/entities`, `src/widgets`.
- **Why:** Parallel ownership and clearer onboarding as the team grows.

### ADR-003: Keep 3D in a dedicated layer
- **Decision:** Isolate R3F/Three.js in `src/components/3d` (transitional), then `src/3d`.
- **Why:** Protect core app code from render-heavy concerns and enforce performance budgets.

### ADR-004: Enforce strict quality gates
- **Decision:** Lint and TypeScript must block bad builds (currently disabled — revert in Phase 2).
- **Why:** Reduce regressions and improve release confidence.

### ADR-005: Phase 1 — Migrate core folders into `src/` with alias-first resolution
- **Decision:** Move `hooks/`, `lib/`, `components/3d/`, and `app/` into `src/`; configure `@/*` as `["./src/*", "./*"]`.
- **Why:** Establish a single canonical source tree without a big-bang rewrite of all UI components.
- **Consequences:**
  - Imports like `@/hooks/use3d` and `@/lib/content` resolve to `src/` automatically.
  - Legacy `components/` remains at root until Phase 2.
  - Duplicate root folders must be deleted after verification.
- **Status:** Implemented (Phase 1 complete).

---

## Architecture Risks to Track

- Editing duplicate legacy files instead of `src/` copies.
- Regression while splitting large components in Phase 2.
- Performance drift from uncontrolled animations and 3D.
- Docs/tooling falling behind code during fast migration.

---

## Definition of Architecture Done

- New code follows layer boundaries and lives under `src/` when applicable.
- No new circular dependencies.
- Legacy duplicate folders removed.
- Quality gates pass locally and in CI.
- Docs updated when structure or conventions change.

---

## Related Docs

- [`PROJECT_STRUCTURE.md`](./PROJECT_STRUCTURE.md)
- [`CODE_STYLE.md`](./CODE_STYLE.md)
- [`DEVELOPMENT_GUIDE.md`](./DEVELOPMENT_GUIDE.md)
- [`DESIGN.md`](./DESIGN.md)
