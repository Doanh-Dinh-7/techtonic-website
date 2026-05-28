# TechTonic V2.0 Project Structure

## Purpose

This document is the source of truth for repository layout at the start of Phase 3, after completing Phase 2 refactor and the post-Phase 2.4 hardening baseline.

Use this for onboarding, code review, and deciding where new files should be created.

---

## Current Status

- **Phase 1:** complete (core modules moved under `src/`)
- **Phase 2.2:** complete (shared layer + UI primitive mapping)
- **Phase 2.3:** complete (route composition moved to `widgets` + `features`)
- **Phase 2.4:** complete (code quality improvements: hook extraction, client-boundary reduction, 3D pass, JSDoc)
- **Post-Phase 2.4 hardening:** in progress (CI quality gates + baseline test setup added)
- **Phase 3 kickoff:** active (documentation consistency + 3D runtime/performance polish)

---

## Canonical Tree (Current)

```text
techtonic-website/
+-- src/
|   +-- app/                                # App Router entrypoints
|   |   +-- layout.tsx
|   |   +-- globals.css
|   |   +-- (site)/
|   |       +-- layout.tsx
|   |       +-- page.tsx
|   |       +-- about/page.tsx
|   |       +-- departments/page.tsx
|   |       +-- events/page.tsx
|   |       +-- portfolio/page.tsx
|   |       +-- recruitment/page.tsx
|   |
|   +-- widgets/                            # Page-level composition
|   |   +-- layout/
|   |   |   +-- site-shell.tsx
|   |   |   +-- header.tsx
|   |   |   +-- footer.tsx
|   |   |   +-- lenis-provider.tsx
|   |   |   +-- hooks/
|   |   |       +-- use-site-shell-visibility.ts
|   |   |       +-- use-header-navigation.ts
|   |   +-- home/
|   |   |   +-- home-page-sections.tsx
|   |   |   +-- hash-scroll-handler.tsx
|   |   +-- about/about-page-sections.tsx
|   |   +-- departments/departments-page-content.tsx
|   |   +-- events/events-page-content.tsx
|   |   +-- portfolio/portfolio-page-content.tsx
|   |   +-- recruitment/recruitment-page-sections.tsx
|   |
|   +-- features/                           # Feature/domain section entrypoints
|   |   +-- home/
|   |   |   +-- hero.tsx
|   |   |   +-- hooks/use-hero-section.ts
|   |   +-- recruitment/
|   |   |   +-- registration.tsx
|   |   |   +-- hooks/use-registration-form.ts
|   |   +-- about/*
|   |   +-- departments/*
|   |   +-- events/*
|   |   +-- portfolio/*
|   |
|   +-- shared/
|   |   +-- ui/                             # Canonical shared UI primitives
|   |   +-- hooks/                          # Shared hook entrypoints
|   |   +-- utils/                          # Shared utils (`cn`)
|   |   +-- constants/
|   |   +-- config/
|   |   +-- styles/
|   |
|   +-- types/                              # Shared type contracts
|   |   +-- common.ts
|   |   +-- ui.ts
|   |   +-- index.ts
|   |
|   +-- hooks/                              # Cross-cutting hooks (`use3d`, etc.)
|   +-- lib/                                # Content + utilities + 3D helpers
|   |   +-- 3d/
|   |       +-- performance.ts
|   |       +-- performance.test.ts
|   +-- components/3d/                      # Transitional 3D runtime (target: `src/3d`)
|   +-- entities/                           # Reserved for Phase 3+
|   +-- config/                             # Reserved for Phase 3+
|   +-- 3d/                                 # Reserved target runtime folder
|
+-- components/                             # Legacy section/components (transitional)
|   +-- ui/                                 # Legacy UI files mapped/proxied to shared layer
|   +-- ...
+-- .github/
|   +-- workflows/
|       +-- quality-gates.yml               # CI: lint/typecheck/format/test/build
+-- public/
+-- docs/archive/techtonic-v2/              # Archived early V2 proposal docs
+-- vitest.config.ts                        # Unit test baseline config
+-- ARCHITECTURE.md
+-- PROJECT_STRUCTURE.md
+-- DEVELOPMENT_GUIDE.md
+-- CODE_STYLE.md
+-- package.json
+-- tsconfig.json
+-- tailwind.config.ts
+-- next.config.mjs
+-- components.json
```

---

## Folder Responsibilities

### `src/app`

- Routing, metadata, top-level layout boundaries.
- Keep route files thin; delegate section composition to `src/widgets`.

### `src/widgets`

- Route-level composition and orchestration of features.
- Contains small route-scoped hooks/islands for composition behavior (for example hash-scroll and shell visibility hooks).

### `src/features`

- Feature/domain section entrypoints (`home`, `about`, `events`, `recruitment`, etc.).
- Holds reusable feature-scoped hooks extracted from large components.

### `src/shared`

- Reusable, dependency-light primitives and utilities.
- `src/shared/ui` is the canonical UI import target.

### `src/types`

- Shared contracts used across app/widgets/features/shared.

### `src/hooks` and `src/lib`

- Cross-cutting hooks and utility/content modules.
- `src/lib/3d/*` also contains testable 3D performance helpers.

### `src/components/3d` (transitional)

- Current R3F implementation location.
- Planned consolidation to `src/3d` in next phase.

### Root `components/` (legacy transitional)

- Maintained for safe incremental compatibility.
- Do not add new long-term modules here.

### `.github/workflows`

- CI automation and quality gates for pull requests and branch pushes.

---

## Import Conventions (Current)

`tsconfig` keeps `@/*` as `./src/*` first, then `./*` fallback.

### Recommended imports

- `@/app/...` (when needed from framework boundaries)
- `@/widgets/...`
- `@/features/...`
- `@/shared/ui/...`
- `@/shared/hooks/...`
- `@/shared/utils/...`
- `@/types/...`
- `@/lib/...`

### Transitional compatibility imports

- `@/components/...` still resolves for legacy modules.
- `@/components/ui/*` resolves to shared layer first via path mapping, then legacy fallback.

---

## Dependency Direction

Allowed:

- `app -> widgets -> features -> entities -> shared`
- `app/widgets/features -> 3d runtime layer` (currently `src/components/3d`, target `src/3d`)

Disallowed:

- `shared -> features/widgets/app`
- Cross-feature deep internal imports
- Circular dependencies
- New permanent modules outside `src/` (except `.github`, config, public, docs, and root tool configs)

---

## Migration Notes for Developers

- Prefer creating new logic under `src/features` and `src/widgets`.
- Prefer `@/shared/ui` over `@/components/ui` in new code.
- Keep behavior unchanged in structural migration PRs.
- If touching legacy files, add or maintain bridge entrypoints in `src/`.

---

## Related Docs

- [`ARCHITECTURE.md`](./ARCHITECTURE.md)
- [`DEVELOPMENT_GUIDE.md`](./DEVELOPMENT_GUIDE.md)
- [`CODE_STYLE.md`](./CODE_STYLE.md)
