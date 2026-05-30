# TechTonic Website V2.0 Architecture

## Purpose

This document describes the **current** architecture after **V2.0 refactor completion**: FSD layers under `src/`, canonical `src/3d`, CI/testing hardening, SEO module, and **Next.js 15 + React 19**.

---

## Current Architecture (Post V2.0)

### Style

**Next.js 15 App Router + layered `src/` modules** with explicit dependency direction, first-class **3D runtime**, and centralized **SEO / structured data**.

```text
┌──────────────────────────────────────────────────────────────┐
│  src/app           Routes, layouts, sitemap, robots, SEO base│
├──────────────────────────────────────────────────────────────┤
│  src/widgets       Page composition + site chrome (a11y)     │
├──────────────────────────────────────────────────────────────┤
│  src/features      Domain sections + feature hooks + tests   │
├──────────────────────────────────────────────────────────────┤
│  src/entities      (reserved — post–V2.0)                    │
├──────────────────────────────────────────────────────────────┤
│  src/shared        ui, ui-v2, seo, a11y, utils, providers    │
├──────────────────────────────────────────────────────────────┤
│  src/types · src/hooks · src/lib                             │
│       lib/seo = metadata + JSON-LD                           │
│       lib/3d  = pure budgets, constants (unit-tested)        │
├──────────────────────────────────────────────────────────────┤
│  src/3d            Canonical R3F runtime (React)             │
│       hero-media = SSR-safe dynamic CanvasShell (home)       │
└──────────────────────────────────────────────────────────────┘
```

There is **no** active `src/components/` import path. UI: `@/shared/ui/*` only.

### 3D Layer Split

| Concern                              | Location                | Why                            |
| ------------------------------------ | ----------------------- | ------------------------------ |
| Budgets, caps, DPR policy            | `src/lib/3d/`           | Pure functions — unit tested   |
| Capability (`WebGL`, reduced motion) | `src/hooks/use3d.ts`    | Shared React hook              |
| Canvas, scenes, models               | `src/3d/`               | R3F implementation             |
| Lazy route entry                     | `src/3d/scene-lazy.tsx` | `next/dynamic`, `ssr: false`   |
| Home hero canvas                     | `src/3d/hero-media.tsx` | Avoid R3F in SSR bundle on `/` |

### SEO Layer

| Concern              | Location                          |
| -------------------- | --------------------------------- |
| Site URL & org facts | `src/lib/seo/site.ts`             |
| Per-route copy       | `src/lib/seo/page-config.ts`      |
| Next Metadata API    | `src/lib/seo/metadata.ts`         |
| Schema.org           | `src/lib/seo/json-ld.ts`          |
| Script injection     | `src/shared/seo/json-ld.tsx`      |
| Sitemap / robots     | `src/app/sitemap.ts`, `robots.ts` |

Requires `NEXT_PUBLIC_SITE_URL` in production.

### Canonical Layers

| Layer          | Role                                              |
| -------------- | ------------------------------------------------- |
| `src/app`      | Routes, metadata, sitemap, robots, global styles  |
| `src/widgets`  | Orchestrate features; site shell (skip link, nav) |
| `src/features` | Domain sections and feature hooks                 |
| `src/shared`   | UI, V2 design, SEO helpers, utils, providers      |
| `src/lib/seo`  | Metadata and structured data builders             |
| `src/lib/3d`   | Performance policy (pure)                         |
| `src/3d`       | Three.js / R3F runtime                            |

### Request / Render Flow

```text
Browser
  → src/app/layout.tsx                    (metadataBase, lang=vi)
  → src/app/(site)/layout.tsx               (SiteShell, Organization JSON-LD)
  → src/widgets/layout/site-shell.tsx
  → src/app/(site)/<route>/page.tsx         (createPageMetadata + PageSeo)
  → src/widgets/<route>/*
  → src/features/<domain>/*
  → src/shared/ui/* · src/lib/content/*
  → src/3d/hero-media (home, when use3d allows)

Developer workflow
  → npm run ci          (lint, typecheck, format, test — 38 tests)
  → npm run ci:build    (+ production build + bundle budget)
  → .github/workflows/quality-gates.yml
  → PR merge
```

### Home Page Composition (Example)

```text
page.tsx (metadata + PageSeo JSON-LD)
  └── widgets/home/home-page-sections.tsx
        ├── features/home/hero.tsx          (HeroCanvasShell + HeroSceneLazy | carousel)
        ├── features/home/core-values.tsx   (ui-v2 SectionShell)
        ├── …
        └── widgets/home/hash-scroll-handler.tsx
```

---

## Architecture Strengths

- Clear separation: routing → composition → features → shared.
- Single `src/` tree; documented import map.
- Testable 3D policy (`src/lib/3d`) and SEO builders (`src/lib/seo`).
- CI: split verify/build, bundle budgets, optional Lighthouse scripts.
- Accessible defaults: skip link, landmarks, reduced motion, WebGL fallback.

---

## Remaining Technical Debt (Post V2.0)

| Item                        | Notes                                                                |
| --------------------------- | -------------------------------------------------------------------- |
| `src/entities` layer        | Reserved — introduce when domain models grow                         |
| `src/components/3d` on disk | Orphan copies — safe to delete; not imported                         |
| Playwright E2E              | Optional (deferred)                                                  |
| Registration hook parity    | `use-registration-form` tested; UI still uses inline state in places |

---

## Target Architecture (Future)

```text
src/app → src/widgets → src/features → src/entities → src/shared
src/app | widgets | features → src/3d
```

---

## Layer Responsibilities

### `src/app`

Routes, `metadataBase`, `sitemap`, `robots`. Thin `page.tsx` — metadata + optional `PageSeo`.

### `src/widgets`

Compose sections per route; own site chrome and shell hooks/tests.

### `src/features`

Domain UI and hooks. No cross-feature imports.

### `src/shared`

Dependency-light primitives. Must not import from `features` or `widgets`.

### `src/lib`

Static content, **SEO** builders, **pure** 3D policy.

### `src/3d`

Canvas, scenes, models, lazy loaders. Home uses `hero-media` for SSR safety.

## Dependency Direction Rules

**Allowed:**

- `app → widgets → features → entities → shared`
- `app | widgets | features → src/3d`
- `features → lib, hooks, types, shared`
- `src/3d → lib/3d, hooks, shared/utils`

**Disallowed:**

- `shared →` upper layers
- Cross-feature deep imports
- `@/components/*` imports
- Permanent app code outside `src/`

---

## Architecture Decision Records (ADR)

### ADR-001: App Router as system backbone

- **Decision:** Next.js App Router with thin route files.
- **Status:** Accepted

### ADR-002: Feature-sliced composition

- **Decision:** `widgets` + `features` as first-class layers.
- **Status:** Accepted

### ADR-003: Shared UI canonicalization

- **Decision:** shadcn/Radix under `src/shared/ui`.
- **Status:** Accepted

### ADR-004: Impact-first Phase 2 migration

- **Decision:** Route composition first, then internalize sections.
- **Status:** Accepted

### ADR-005: Behavior-safe quality refactor (Phase 2.4)

- **Decision:** Hook extraction, client boundaries, 3D motion defaults.
- **Status:** Accepted

### ADR-006: Mandatory quality gates

- **Decision:** CI + Husky: lint, typecheck, format, test, build.
- **Status:** Accepted

### ADR-007: Decommission root `components/` (Phase 2 closure)

- **Decision:** Remove root `components/`; consolidate under `src/`.
- **Status:** Accepted (2026-05-28)

### ADR-008: Canonical 3D runtime under `src/3d` (Phase 3)

- **Decision:** R3F at `src/3d`; no `src/components/3d` import path.
- **Status:** Accepted; bridge removed Phase 4.4

### ADR-009: 3D performance policy as code + docs (Phase 3)

- **Decision:** Budgets in `src/lib/3d/performance.ts`; Vitest + runbook.
- **Status:** Accepted

### ADR-010: Centralized SEO module (Phase 4.4)

- **Decision:** `src/lib/seo` for metadata, Open Graph, Twitter, canonical URLs, JSON-LD; `sitemap.ts` + `robots.ts`; `NEXT_PUBLIC_SITE_URL` for production.
- **Status:** Accepted (2026-05-29)
- **Consequences:** New routes must extend `PAGE_SEO` and `SITE_ROUTES`; use `<PageSeo />` on each page.

### ADR-011: Next.js 15 + React 19 (Phase 4.4)

- **Decision:** Upgrade to Next.js 15.5 and React 19; R3F v9 / drei v10; remove webpack React alias.
- **Status:** Accepted (2026-05-29)
- **Rationale:** Next 15 client runtime requires React 19 `use()` — React 18 caused production runtime errors.
- **Consequences:** See `docs/techtonic-v2/nextjs-15-checklist.md`.

### ADR-012: Home hero 3D via `hero-media` (Phase 4.4)

- **Decision:** Dynamic `CanvasShell` in `src/3d/hero-media.tsx` (`ssr: false`) instead of static `@/3d` barrel import on home.
- **Status:** Accepted (2026-05-29)
- **Rationale:** Prevents R3F from breaking Next.js prerender / Lighthouse traces on `/`.

---

## Definition of Architecture Done (V2.0 Baseline)

- [x] FSD layers under `src/` with documented dependency direction
- [x] Canonical 3D at `src/3d` with lazy loaders + hero-media SSR pattern
- [x] Performance guardrails tested and documented
- [x] SEO module, sitemap, robots, structured data
- [x] CI verify + build + bundle budget
- [x] Vitest baseline (38 tests)
- [x] Architecture documentation matches codebase

---

## Related Docs

- [`PROJECT_STRUCTURE.md`](./PROJECT_STRUCTURE.md)
- [`DEVELOPMENT_GUIDE.md`](./DEVELOPMENT_GUIDE.md)
- [`CODE_STYLE.md`](./CODE_STYLE.md)
- [`CONTRIBUTING.md`](./CONTRIBUTING.md)
- [`REFACTOR_PROGRESS.md`](./REFACTOR_PROGRESS.md)
- [`DESIGN.md`](./DESIGN.md)
- [`docs/techtonic-v2/README.md`](./docs/techtonic-v2/README.md)
- [`docs/techtonic-v2/seo.md`](./docs/techtonic-v2/seo.md)
- [`docs/techtonic-v2/3d-performance.md`](./docs/techtonic-v2/3d-performance.md)
- [`docs/techtonic-v2/nextjs-15-checklist.md`](./docs/techtonic-v2/nextjs-15-checklist.md)
