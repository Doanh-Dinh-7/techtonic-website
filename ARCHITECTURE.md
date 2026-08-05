# TechTonic Website V2.0 Architecture

## Purpose

This document describes the **current** architecture after **V2.0 refactor** and post-release page expansion: FSD layers under `src/`, canonical `src/3d` (multi-route canvas entries), CI/testing hardening, SEO module, and **Next.js 15 + React 19**.

---

## Current Architecture (Post V2.0 + Expansion)

### Style

**Next.js 15 App Router + layered `src/` modules** with explicit dependency direction, first-class **3D runtime**, and centralized **SEO / structured data**.

```text
┌──────────────────────────────────────────────────────────────┐
│  src/app           Routes, layouts, sitemap, robots, SEO base│
│                    (+ Vercel Analytics / Speed Insights)     │
├──────────────────────────────────────────────────────────────┤
│  src/widgets       Page composition + site chrome (a11y)     │
│                    Lenis, theme toggle, animation-ready      │
├──────────────────────────────────────────────────────────────┤
│  src/features      Domain sections + feature hooks + tests   │
│                    (feature-local components/ + lib/)        │
├──────────────────────────────────────────────────────────────┤
│  src/entities      (reserved — post–V2.0)                    │
├──────────────────────────────────────────────────────────────┤
│  src/shared        ui, ui-v2, seo, a11y, hooks, utils, …     │
├──────────────────────────────────────────────────────────────┤
│  src/types · src/hooks · src/lib                             │
│       lib/seo = metadata + JSON-LD                           │
│       lib/3d  = pure budgets, constants (unit-tested)        │
│       lib/content = static data (home, about-team, …)        │
├──────────────────────────────────────────────────────────────┤
│  src/3d            Canonical R3F runtime (React)             │
│       hero-media              → Home (/) Rubik               │
│       events-hero-canvas      → Events (/events)             │
│       departments-hero-canvas → Departments (/departments)   │
│       recruitment-page-canvas → Recruitment (/recruitment)   │
│       models/rubiks-cube      → shared 3D asset              │
└──────────────────────────────────────────────────────────────┘
```

There is **no** `src/components/` import path. UI: `@/shared/ui/*` only.

### 3D Layer Split

| Concern                              | Location                             | Why                                             |
| ------------------------------------ | ------------------------------------ | ----------------------------------------------- |
| Budgets, caps, DPR policy            | `src/lib/3d/`                        | Pure functions — unit tested                    |
| Capability (`WebGL`, reduced motion) | `src/hooks/use3d.ts`                 | Shared React hook                               |
| Canvas, scenes, models               | `src/3d/`                            | R3F implementation                              |
| Lazy scene helpers                   | `src/3d/scene-lazy.tsx`              | `BackgroundSceneLazy`, `EventsHeroSceneLazy`    |
| Home hero (Rubik)                    | `src/3d/hero-media.tsx`              | `HeroRubiksCube` — `dynamic`, `ssr: false`      |
| Events hero canvas                   | `src/3d/events-hero-canvas.tsx`      | Same SSR-safe dynamic pattern                   |
| Departments hero canvas              | `src/3d/departments-hero-canvas.tsx` | Same SSR-safe dynamic pattern                   |
| Recruitment page canvas              | `src/3d/recruitment-page-canvas.tsx` | Backdrop scene; exported from `@/3d` barrel     |
| Rubik cube model                     | `src/3d/models/rubiks-cube/`         | Isolated model + `public/rubik-faces/` textures |

### SEO Layer

| Concern              | Location                          |
| -------------------- | --------------------------------- |
| Site URL & org facts | `src/lib/seo/site.ts`             |
| Per-route copy       | `src/lib/seo/page-config.ts`      |
| Next Metadata API    | `src/lib/seo/metadata.ts`         |
| Schema.org           | `src/lib/seo/json-ld.ts`          |
| Script injection     | `src/shared/seo/json-ld.tsx`      |
| Sitemap / robots     | `src/app/sitemap.ts`, `robots.ts` |

Requires `NEXT_PUBLIC_SITE_URL` in production (falls back to `http://localhost:3000` in `site.ts`).

### Canonical Layers

| Layer          | Role                                              |
| -------------- | ------------------------------------------------- |
| `src/app`      | Routes, metadata, sitemap, robots, global styles  |
| `src/widgets`  | Orchestrate features; site shell (skip link, nav) |
| `src/features` | Domain sections, feature hooks, local components  |
| `src/shared`   | UI, V2 design, SEO helpers, utils, providers      |
| `src/lib/seo`  | Metadata and structured data builders             |
| `src/lib/3d`   | Performance policy (pure)                         |
| `src/3d`       | Three.js / R3F runtime                            |

### Request / Render Flow

```text
Browser
  → src/app/layout.tsx                    (metadataBase, lang=vi, Analytics, SpeedInsights)
  → src/app/(site)/layout.tsx               (SiteShell, Organization JSON-LD)
  → src/widgets/layout/site-shell.tsx       (Lenis + AnimationReady + Header/Footer)
  → src/app/(site)/<route>/page.tsx         (createPageMetadata + PageSeo)
  → src/widgets/<route>/*
  → src/features/<domain>/*
  → src/shared/ui/* · src/lib/content/*
  → route 3D entry (hero-media | events | departments | recruitment) when use3d allows

Developer workflow
  → pnpm run ci          (lint, typecheck, format, test — 48 tests / 14 files)
  → pnpm run ci:build    (+ production build + bundle budget)
  → .github/workflows/quality-gates.yml
  → PR merge → main
```

### Home Page Composition (Example)

```text
page.tsx (metadata + PageSeo JSON-LD)
  └── widgets/home/home-page-sections.tsx
        ├── features/home/hero.tsx          (HeroRubiksCube via @/3d/hero-media | fallback)
        ├── features/home/core-values.tsx   (ui-v2 SectionShell)
        ├── …
        └── widgets/home/hash-scroll-handler.tsx
```

### Events Page Composition (Example)

```text
page.tsx (metadata + PageSeo JSON-LD)
  └── widgets/events/events-page-content.tsx
        └── features/events/events-content.tsx
              ├── features/events/events-hero.tsx   (EventsHeroCanvas)
              ├── weekly-academic-section.tsx
              ├── happy-hour-section.tsx
              ├── event-timeline-section.tsx
              └── stellar-gallery-section.tsx
```

### About Page Composition (Example)

```text
page.tsx (metadata + PageSeo JSON-LD)
  └── widgets/about/about-page-sections.tsx
        └── features/about/about-content.tsx
              ├── about-hero.tsx, about-intro.tsx, about-identity-section.tsx
              ├── about-timeline.tsx, about-video.tsx, gallery.tsx
              └── team.tsx
                    └── components/team-org-chart.tsx (+ connector, member-card)
                          data from lib/content/about-team.ts
```

### Departments Page Composition (Example)

```text
page.tsx (metadata + PageSeo JSON-LD)
  └── widgets/departments/departments-page-content.tsx
        └── features/departments/departments-content.tsx
              ├── departments-hero.tsx              (DepartmentsHeroCanvas)
              ├── departments-structure-section.tsx
              ├── departments-book-section.tsx
              └── departments-recruitment-section.tsx
```

### Recruitment Page Composition (Example)

```text
page.tsx (metadata + PageSeo JSON-LD)
  └── widgets/recruitment/recruitment-page-sections.tsx
        └── features/recruitment/recruitment-content.tsx
              ├── components/recruitment-page-backdrop.tsx  (RecruitmentPageCanvas)
              ├── registration.tsx
              ├── recruitment-process-extra.tsx
              └── recruitment-faq.tsx
```

---

## Architecture Strengths

- Clear separation: routing → composition → features → shared.
- Single `src/` tree; documented import map.
- Testable 3D policy (`src/lib/3d`) and SEO builders (`src/lib/seo`).
- Per-route SSR-safe 3D entry points (Home Rubik, Events, Departments, Recruitment).
- CI: split verify/build, bundle budgets, optional Lighthouse scripts.
- Accessible defaults: skip link, landmarks, reduced motion, WebGL fallback.
- Complex pages scale via feature-local `components/` and `lib/` without polluting `shared/`.

---

## Remaining Technical Debt (Post V2.0)

| Item                     | Notes                                                                 |
| ------------------------ | --------------------------------------------------------------------- |
| `src/entities` layer     | Reserved — introduce when domain models grow                          |
| Chatbot env vars         | `GEMINI_*`, `SUPABASE_*` in `.env.example`; no `src/app/api/` yet     |
| Playwright E2E           | Optional (deferred)                                                   |
| Registration hook parity | `use-registration-form` tested; UI still uses inline state in places  |
| Root README drift        | Still mentions `npm` / feature branch in places — prefer this doc hub |
| `src/3d/README.md`       | May lag behind `hero-media` → `HeroRubiksCube` naming                 |

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

Domain UI and hooks. No cross-feature imports. Use `components/` and `lib/` subfolders for feature-scoped code.

### `src/shared`

Dependency-light primitives. Must not import from `features` or `widgets`.

### `src/lib`

Static content, **SEO** builders, **pure** 3D policy.

### `src/3d`

Canvas, scenes, models, lazy loaders. Each animated route gets its own SSR-safe `*-canvas.tsx` (or `hero-media` for Home Rubik).

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

- **Decision:** Dynamic 3D boundary in `src/3d/hero-media.tsx` (`ssr: false`) instead of static `@/3d` barrel import on home.
- **Status:** Accepted (2026-05-29); **evolved** by ADR-016
- **Rationale:** Prevents R3F from breaking Next.js prerender / Lighthouse traces on `/`.

### ADR-013: V2.0 refactor — consolidated baseline

- **Decision:** Migrate to FSD under `src/`, canonical `@/3d`, centralized `@/lib/seo`, Vitest + CI gates, Next.js 15 + React 19, **pnpm** as package manager.
- **Status:** Accepted (2026-05-29)
- **Consequences:** All app code in `src/`; no `@/components/*`; thin routes compose via widgets/features; quality gates run via `pnpm run ci:build`.

### ADR-014: Post-V2.0 domain expansion pattern

- **Decision:** Complex pages (About, Events) use feature-local `components/` + `lib/` subfolders; team data in `lib/content/about-team.ts`; org chart as layout components colocated in `features/about/components/`.
- **Status:** Accepted (2026-06)
- **Consequences:** Do not promote feature-only UI to `shared/` prematurely; colocate tests (`about-team.test.ts`, `use-about-team-tabs.test.ts`).

### ADR-015: Events 3D + Rubik model

- **Decision:** Events hero uses dedicated `events-hero-canvas.tsx` (dynamic, `ssr: false`); Rubik cube model isolated under `src/3d/models/rubiks-cube/` with textures in `public/rubik-faces/`.
- **Status:** Accepted (2026-06)
- **Consequences:** Each route with 3D gets its own SSR-safe canvas entry point; 3D textures live in `public/` by model namespace.

### ADR-016: Multi-route 3D entries + Home Rubik hero (post–V2.0)

- **Decision:**
  1. Home hero uses **`HeroRubiksCube`** from `@/3d/hero-media` (dynamic import of `RubiksCubeController`, `ssr: false`) instead of a generic hero scene shell.
  2. Departments and Recruitment follow the Events pattern with dedicated entry points: `departments-hero-canvas.tsx`, `recruitment-page-canvas.tsx`.
  3. Feature composition grows under `features/<domain>/{components,lib}` (departments book/org-chart, recruitment backdrop).
- **Status:** Accepted (2026-08)
- **Rationale:** Keeps R3F out of SSR/prerender per route; aligns Home visual identity with Rubik brand asset; avoids a single bloated `@/3d` import on every page.
- **Consequences:** Docs and CODE_STYLE must reference `HeroRubiksCube` (not legacy `HeroCanvasShell`); new animated routes add a `*-canvas.tsx` entry + scene under `src/3d/scenes/`.

---

## Definition of Architecture Done (V2.0 Baseline)

- [x] FSD layers under `src/` with documented dependency direction
- [x] Canonical 3D at `src/3d` with lazy loaders + hero-media SSR pattern
- [x] Events 3D via `events-hero-canvas` + Rubik model under `models/rubiks-cube/`
- [x] Departments + Recruitment SSR-safe canvas entries (ADR-016)
- [x] Performance guardrails tested and documented
- [x] SEO module, sitemap, robots, structured data
- [x] CI verify + build + bundle budget (pnpm)
- [x] Vitest baseline (48 tests, 14 files)
- [x] Architecture documentation matches codebase

---

## Related Docs

- [`PROJECT_STRUCTURE.md`](./PROJECT_STRUCTURE.md)
- [`DEVELOPMENT_GUIDE.md`](./DEVELOPMENT_GUIDE.md)
- [`CODE_STYLE.md`](./CODE_STYLE.md)
- [`CONTRIBUTING.md`](./CONTRIBUTING.md)
- [`CHANGELOG.md`](./CHANGELOG.md)
- [`docs/techtonic-v2/phase-plan.md`](./docs/techtonic-v2/phase-plan.md)
- [`DESIGN.md`](./DESIGN.md)
- [`docs/techtonic-v2/README.md`](./docs/techtonic-v2/README.md)
- [`docs/techtonic-v2/seo.md`](./docs/techtonic-v2/seo.md)
- [`docs/techtonic-v2/3d-performance.md`](./docs/techtonic-v2/3d-performance.md)
- [`docs/techtonic-v2/nextjs-15-checklist.md`](./docs/techtonic-v2/nextjs-15-checklist.md)
