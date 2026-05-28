# TechTonic Website V2.0 Architecture

## Purpose

This document describes the architecture at the start of Phase 3, after completing Phase 2 refactor and establishing the post-Phase 2.4 hardening baseline.

---

## Current Architecture (After Phase 2.4)

### Style

**App Router + Feature-Sliced composition on top of layered `src/` modules**, with incremental compatibility bridges to legacy root `components/`.

Current canonical layers:

- `src/app` -> route entrypoints and metadata
- `src/widgets` -> page-level composition
- `src/features` -> domain section modules
- `src/shared` -> UI primitives, hooks, utils
- `src/types` -> shared contracts
- `src/hooks` + `src/lib` -> cross-cutting capability/data modules
- `src/components/3d` -> transitional 3D runtime layer
- `.github/workflows` -> CI quality gates automation

### Request / Render Flow (Current)

```text
Browser
  -> src/app/(site)/layout.tsx
  -> src/widgets/layout/site-shell.tsx
  -> src/app/(site)/*/page.tsx
  -> src/widgets/<route>/*
  -> src/features/<domain>/*
  -> src/shared/ui/* + src/lib/content/*
  -> src/components/3d/* (when needed)

Developer change
  -> local gates (lint/typecheck/test/format:check/build)
  -> .github/workflows/quality-gates.yml
  -> PR merge gate
```

### Practical Status

- Route composition has moved from direct `components/*` imports to `widgets/features` entrypoints.
- Site shell layout primitives (`Header`, `Footer`, `LenisProvider`) have been moved into `src/widgets/layout/*`.
- Shared UI is centralized under `src/shared/ui` with transitional bridges kept for safe rollout.
- Large interactive sections have extracted hooks (`Hero`, `SiteShell`, `Header`, `Registration`) to reduce component complexity.
- Reduced-motion and DPR constraints are applied in shared 3D runtime wrappers/scenes.
- CI quality gates and baseline unit test runner (Vitest) are wired.
- Phase 3 has started with documentation consistency and 3D/performance hardening focus.

---

## Architecture Strengths (Now)

- Clear separation between routing (`app`), composition (`widgets`), and feature units (`features`).
- Shared UI and utilities have canonical entrypoints under `src/shared`.
- Incremental migration path preserved without behavior-breaking rewrites.
- Strong local quality gates and conventional-commit workflow.

---

## Remaining Technical Debt

- Root `components/` still contains legacy implementation source.
- Some `features/*` files are currently bridges to legacy modules (planned deep split in next phase).
- 3D runtime still in `src/components/3d` (target remains `src/3d`).
- Test coverage is still minimal (baseline only); needs expansion for critical features/widgets.

---

## Target Architecture (Next)

```text
src/app
  -> src/widgets
    -> src/features
      -> src/entities
        -> src/shared

src/app/widgets/features -> 3d runtime layer (`src/components/3d` now, `src/3d` target)
```

Short-term target (Phase 2.4+):

- Expand test coverage for feature/widget behavior and 3D guard utilities.
- Continue reducing legacy bridges (`components/*` -> `src/features|widgets`).
- Consolidate 3D folder into dedicated runtime layer (`src/3d`).
- Validate and execute Next.js 15 upgrade plan.

---

## Layer Responsibilities

### `src/app`
- Routes, metadata, layout boundaries.

### `src/widgets`
- Compose page sections from multiple features.

### `src/features`
- Feature/domain behavior units (`home`, `about`, `events`, `recruitment`, etc.).

### `src/entities`
- Reusable domain entities (planned).

### `src/shared`
- Generic and dependency-light UI/hooks/utils/types.

### `src/components/3d` (transitional)
- Existing 3D implementation location until promoted to `src/3d`.

---

## Dependency Direction Rules

Allowed:

- `app -> widgets -> features -> entities -> shared`
- `app/widgets/features -> 3d runtime layer` (transitional)

Disallowed:

- `shared ->` upper layers
- cross-feature deep imports
- circular dependencies

---

## ADR Summary

### ADR-001: App Router as system backbone
- **Decision:** Keep Next.js App Router with thin route files.
- **Why:** Better layout/data boundaries and long-term maintainability.

### ADR-002: Feature-sliced composition rollout
- **Decision:** Introduce `widgets` and `features` as first-class route composition layers.
- **Why:** Scale ownership and isolate change impact.

### ADR-003: Shared UI canonicalization
- **Decision:** Standardize primitives under `src/shared/ui` and preserve compatibility bridges.
- **Why:** Avoid breakage while converging to stable import contracts.

### ADR-004: Phase 2 feature migration strategy
- **Decision:** Migrate by impact-first route composition, then progressively internalize legacy sections.
- **Why:** Ship-safe refactor with measurable progress and low regression risk.

### ADR-005: Phase 2.4 behavior-safe quality refactor
- **Decision:** Extract stateful logic from large UI sections into custom hooks, reduce unnecessary client boundaries via client islands, and apply reduced-motion-aware 3D defaults.
- **Why:** Improve maintainability and performance while minimizing regression risk by avoiding business logic rewrites.

### ADR-006: Post-Phase 2.4 quality gate automation
- **Decision:** Establish CI workflow with `lint`, `typecheck`, `format:check`, `test`, and `build`, plus Vitest baseline for unit tests.
- **Why:** Keep refactor outcomes stable and make quality checks mandatory for merge readiness.

---

## Definition of Architecture Done (Current)

- Route composition entrypoints live under `src/app` + `src/widgets`.
- Feature entrypoints live under `src/features`.
- Shared primitives and helpers live under `src/shared` and `src/types`.
- Local and CI quality gates are defined (`lint`, `typecheck`, `test`, `format:check`, `build`).
- Documentation reflects current code state.

---

## Related Docs

- [`PROJECT_STRUCTURE.md`](./PROJECT_STRUCTURE.md)
- [`DEVELOPMENT_GUIDE.md`](./DEVELOPMENT_GUIDE.md)
- [`CODE_STYLE.md`](./CODE_STYLE.md)
- [`DESIGN.md`](./DESIGN.md)
