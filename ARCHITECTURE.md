# TechTonic Website V2.0 Architecture

## Purpose

This document describes the **current** architecture after Phase 2 completion: all application code lives under `src/`, organized by App Router + Feature-Sliced Design (FSD)-inspired layers.

---

## Current Architecture (Post Phase 2)

### Style

**Next.js App Router + layered `src/` modules** with explicit dependency direction.

```text
┌─────────────────────────────────────────────────────────┐
│  src/app          Routes, layouts, metadata             │
├─────────────────────────────────────────────────────────┤
│  src/widgets      Page composition + site chrome        │
├─────────────────────────────────────────────────────────┤
│  src/features     Domain sections (home, about, …)      │
├─────────────────────────────────────────────────────────┤
│  src/entities     (reserved)                            │
├─────────────────────────────────────────────────────────┤
│  src/shared       UI primitives, utils, providers       │
├─────────────────────────────────────────────────────────┤
│  src/types · src/hooks · src/lib   Cross-cutting        │
├─────────────────────────────────────────────────────────┤
│  src/components/3d  R3F runtime (→ src/3d in Phase 3)   │
└─────────────────────────────────────────────────────────┘
```

There is **no** root `components/` directory. Legacy shadcn paths are preserved only as a TypeScript alias: `@/components/ui/*` → `src/shared/ui/*`.

### Canonical Layers

| Layer               | Role                                                            |
| ------------------- | --------------------------------------------------------------- |
| `src/app`           | Route entrypoints, metadata, layout boundaries                  |
| `src/widgets`       | Orchestrate features per page; site shell (header/footer/Lenis) |
| `src/features`      | Domain section components and feature hooks                     |
| `src/shared`        | UI (`ui`, `ui-v2`), utils, providers, shared hooks              |
| `src/types`         | Shared contracts                                                |
| `src/hooks`         | Cross-cutting React hooks (`use3d`, toast, timeline)            |
| `src/lib`           | Content modules, pure utilities, 3D performance helpers         |
| `src/components/3d` | Transitional Three.js / R3F implementation                      |

### Request / Render Flow

```text
Browser
  → src/app/layout.tsx                    (fonts, toaster, analytics)
  → src/app/(site)/layout.tsx             (SiteShell)
  → src/widgets/layout/site-shell.tsx     (header, footer, Lenis, back-to-top)
  → src/app/(site)/<route>/page.tsx       (thin route file)
  → src/widgets/<route>/*                 (section list / page content)
  → src/features/<domain>/*               (section UI)
  → src/shared/ui/* · src/lib/content/*
  → src/components/3d/*                   (hero/background scenes when enabled)

Developer change
  → local gates: lint · typecheck · test · format:check · build
  → .github/workflows/quality-gates.yml
  → PR merge
```

### Home Page Composition (Example)

```text
page.tsx
  └── widgets/home/home-page-sections.tsx
        ├── features/home/hero.tsx
        ├── features/home/core-values.tsx
        ├── features/home/benefits.tsx
        ├── … (other home sections)
        └── widgets/home/hash-scroll-handler.tsx
```

---

## Architecture Strengths

- **Clear boundaries:** routing vs composition vs feature UI vs shared primitives.
- **Single source tree:** everything under `src/`; no dual `components/` + `src/` drift.
- **Testable pure logic:** `src/lib/3d/performance.ts` covered by Vitest.
- **Quality gates:** local scripts mirror CI (lint, typecheck, format, test, build).
- **Accessible 3D defaults:** reduced-motion and DPR caps in shared runtime wrappers.

---

## Remaining Technical Debt (Phase 3)

| Item               | Notes                                                      |
| ------------------ | ---------------------------------------------------------- |
| 3D folder location | Consolidate `src/components/3d` → `src/3d`                 |
| Test coverage      | Baseline only (`performance.test.ts`); expand hooks/routes |
| `src/entities`     | Not yet used for domain models                             |
| `ui-v2` adoption   | Components exist; integrate into more sections             |
| Next.js 15         | Planned compatibility pass                                 |

---

## Target Architecture (Phase 3+)

```text
src/app
  → src/widgets
    → src/features
      → src/entities          (domain models / mappers)
        → src/shared

src/app | widgets | features → src/3d/*
```

---

## Layer Responsibilities

### `src/app`

Routes, metadata, global styles. No business UI beyond layout wiring.

### `src/widgets`

- Compose ordered feature sections per route.
- Own site chrome (`header`, `footer`, `site-shell`, `lenis-provider`).
- Host small composition-only hooks.

### `src/features`

Domain sections: presentation + feature-local state/hooks. No cross-feature imports.

### `src/shared`

Dependency-light UI and utilities. Must not import from `features` or `widgets`.

### `src/lib`

Static content, formatters, pure 3D helpers. Safe for unit tests without React.

### `src/components/3d` (transitional)

Canvas shell, scenes, particle effects, models. Consumed by features/widgets when 3D is enabled.

---

## Dependency Direction Rules

**Allowed:**

- `app → widgets → features → entities → shared`
- `app | widgets | features → 3d runtime`
- `features → lib, hooks, types, shared`

**Disallowed:**

- `shared →` upper layers
- Cross-feature deep imports
- Circular dependencies
- New permanent code outside `src/` (except tooling, `public`, `docs`)

---

## Architecture Decision Records (ADR)

### ADR-001: App Router as system backbone

- **Decision:** Next.js App Router with thin route files.
- **Status:** Accepted
- **Rationale:** Layout boundaries, static generation, long-term Next alignment.

### ADR-002: Feature-sliced composition

- **Decision:** Introduce `widgets` (composition) and `features` (sections) as first-class layers.
- **Status:** Accepted
- **Rationale:** Scale ownership; isolate change per route/domain.

### ADR-003: Shared UI canonicalization

- **Decision:** All shadcn/Radix primitives live in `src/shared/ui`.
- **Status:** Accepted
- **Rationale:** One import contract; shadcn CLI targets `@/shared/ui`.

### ADR-004: Impact-first Phase 2 migration

- **Decision:** Migrate route composition first, then internalize section implementations.
- **Status:** Accepted
- **Rationale:** Ship-safe refactors with measurable progress.

### ADR-005: Behavior-safe quality refactor (Phase 2.4)

- **Decision:** Extract hooks from large sections; reduce client boundaries; 3D reduced-motion defaults.
- **Status:** Accepted
- **Rationale:** Maintainability and performance without business-logic rewrites.

### ADR-006: Mandatory quality gates

- **Decision:** CI runs `lint`, `typecheck`, `format:check`, `test`, `build`; Husky + lint-staged locally.
- **Status:** Accepted
- **Rationale:** Prevent regressions during structural changes.

### ADR-007: Decommission root `components/` (Phase 2 closure)

- **Decision:** Remove root `components/`; relocate UI to `src/shared/ui`, sections to `src/features/*`, layout to `src/widgets/layout/*`, V2 UI to `src/shared/ui-v2`.
- **Status:** Accepted (2026-05-28)
- **Rationale:** Eliminate dual-tree confusion; `@/*` maps only to `src/*`.
- **Consequences:**
  - `@/components/ui/*` retained as alias → `src/shared/ui/*` for shadcn compatibility.
  - Feature files are full implementations (no re-export bridges).
  - Documentation and onboarding reference `src/` only.

---

## Definition of Architecture Done (Current Baseline)

- [x] Route + composition entrypoints under `src/app` + `src/widgets`
- [x] Feature sections under `src/features` with real implementations
- [x] Shared UI under `src/shared/ui` (+ `ui-v2` for V2 design)
- [x] No root `components/` directory
- [x] Local + CI quality gates defined and passing
- [x] Architecture docs reflect codebase

---

## Related Docs

- [`PROJECT_STRUCTURE.md`](./PROJECT_STRUCTURE.md)
- [`DEVELOPMENT_GUIDE.md`](./DEVELOPMENT_GUIDE.md)
- [`CODE_STYLE.md`](./CODE_STYLE.md)
- [`REFACTOR_PROGRESS.md`](./REFACTOR_PROGRESS.md)
- [`DESIGN.md`](./DESIGN.md)
- [`docs/techtonic-v2/`](./docs/techtonic-v2/)
