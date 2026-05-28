# TechTonic V2.0 Code Style Guide

## Objective

This guide defines coding standards for long-term maintainability, scalability, and team consistency.

## General Engineering Rules

- Apply SOLID, DRY, and KISS pragmatically.
- Prefer readability over clever or condensed code.
- Avoid premature optimization.
- Keep modules focused and composable.
- Use explicit naming for intent.

## TypeScript Rules

- Keep TypeScript strict mode enabled.
- Avoid `any`. If unavoidable, isolate and explain it.
- Prefer interfaces for shared object contracts.
- Keep shared contracts in a stable location (`src/types` or domain model folders).
- Use typed API request/response/error models.
- Avoid broad type assertions that hide uncertainty.

## React and Next.js Rules

- Use Server Components by default in App Router.
- Use Client Components only when interaction or browser APIs are required.
- Keep route components thin and composition-focused.
- Move business logic into hooks/services.
- Prefer composition over prop drilling.
- Co-locate feature-specific hooks and models with their feature.

### Project layout (post Phase 1)

- **Routes and global layout:** `src/app/` (not root `app/`).
- **Shared hooks:** `src/hooks/` — import as `@/hooks/...`.
- **Utilities and content:** `src/lib/` — import as `@/lib/...`.
- **3D scenes:** `src/components/3d/` — import as `@/components/3d/...` (transitional; target: `src/3d/`).
- **Page UI (legacy):** root `components/` — still valid via `@/components/...` fallback until Phase 2 migration.
- Always use the `@/` alias; do not add new permanent modules outside `src/` except `public/` and config files.
- If duplicate legacy files exist at repository root, edit only the `src/` copy.

## State Management Rules

- Start with local state.
- Introduce shared state only when multiple distant consumers need it.
- Standardize async lifecycle states (`idle`, `loading`, `success`, `error`).
- Keep side effects inside well-defined hooks with cleanup.

## API Layer Rules

- Centralize API calls in dedicated modules.
- Do not scatter raw `fetch` calls across random UI components.
- Normalize errors to typed, UI-friendly structures.
- Separate transport concerns from presentation concerns.

## Naming Conventions

### File and Folder Naming

- Use `kebab-case` for files and folders.
- React component symbols use `PascalCase`.
- Hook files and symbols start with `use` (prefer `use-timeline.ts` over `useTimeline.ts` for new files).

### Code Symbols

- Variables/functions: `camelCase`.
- Types/interfaces/classes: `PascalCase`.
- True constants: `UPPER_SNAKE_CASE`.

## Folder and Dependency Rules

- Respect architecture boundaries in [`ARCHITECTURE.md`](./ARCHITECTURE.md) and paths in [`PROJECT_STRUCTURE.md`](./PROJECT_STRUCTURE.md).
- Avoid cross-feature deep imports.
- No circular dependencies.
- Shared modules must stay dependency-light and generic.
- `tsconfig` path order is `./src/*` then `./*` — prefer placing new code under `src/` so resolution stays unambiguous.

## Error Handling Standards

- Handle expected failures explicitly.
- Do not silently swallow errors.
- Show user-friendly fallback states where relevant.
- Preserve enough context for debugging in development.

## Security Standards

- Validate user inputs at boundaries.
- External links with `_blank` must include `rel="noopener noreferrer"`.
- Never expose secrets in client-side code.
- Keep environment usage explicit and minimal.

## Performance Standards (UI + 3D)

- Minimize unnecessary re-renders.
- Use memoization when profiling justifies it.
- Avoid uncontrolled infinite animations.
- Use lazy loading for heavy modules and scenes.
- Keep image loading strategy intentional (`priority` only when justified).
- For 3D: control DPR, draw calls, texture sizes, and fallback behavior.

## Commenting and Documentation Standards

- Comment intent and trade-offs, not obvious syntax.
- Add rationale for non-obvious constraints.
- Update docs when changing architecture or conventions.
- Keep examples current and executable when possible.

## Pull Request Quality Gates

Before merge, contributors must ensure:

- Lint passes.
- Type checks pass.
- Relevant tests pass.
- Build succeeds.
- Docs are updated when required.
