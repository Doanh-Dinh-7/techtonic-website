# TechTonic V2.0 Code Style Guide

## Objective

Keep code maintainable, scalable, and consistent across the layered architecture.

---

## General Engineering Rules

- Apply SOLID, DRY, KISS pragmatically.
- Prefer readability over clever abstractions.
- Keep modules focused and composable.
- Keep structural refactors behavior-safe by default.

---

## TypeScript Rules

- Keep strict mode enabled.
- Avoid `any`; if unavoidable, isolate and document.
- Prefer `interface` for shared contracts.
- Shared contracts belong in `src/types` or feature model folders.
- Use `import type` for type-only imports.

---

## React and Next.js Rules

- Server Components by default in App Router.
- Use `"use client"` only when interaction/browser APIs are required.
- Route files should stay thin and composition-focused.
- Put section composition in `widgets`, section units in `features`.
- Move reusable logic to hooks/services.

---

## Project Layout Rules (Current)

- `src/app/`: routing, metadata, top-level layout.
- `src/widgets/`: page-level composition.
- `src/features/`: feature/domain section modules.
- `src/shared/`: shared UI/hooks/utils/constants.
- `src/types/`: shared type contracts.
- `src/hooks/`, `src/lib/`: cross-cutting hooks/data/utilities.
- `src/components/3d/`: transitional 3D layer (target: `src/3d`).

Legacy:

- Root `components/` is transitional compatibility only.
- Do not add new permanent modules under root `components/`.

Import policy:

- Always use `@/` alias.
- Prefer `@/shared/ui/*` over `@/components/ui/*` in new code.

---

## Naming Conventions

### Files and folders

- Use `kebab-case`.
- React component symbols use `PascalCase`.
- Hooks start with `use`.

### Symbols

- Variables/functions: `camelCase`.
- Types/interfaces/classes: `PascalCase`.
- Constants: `UPPER_SNAKE_CASE`.

---

## Dependency Direction Rules

Allowed direction:

`app -> widgets -> features -> entities -> shared`

Also allowed:

- `app/widgets/features -> 3d runtime layer` (currently `src/components/3d`, target `src/3d`)

Not allowed:

- `shared ->` upper layers
- cross-feature deep imports
- circular dependencies

---

## Error Handling Standards

- Handle expected failures explicitly.
- Do not silently swallow errors.
- Provide user-friendly fallback states when relevant.

---

## Security Standards

- Validate inputs at boundaries.
- External links using `_blank` must include `rel="noopener noreferrer"`.
- Never expose secrets in client code.

---

## Performance Standards (UI + 3D)

- Minimize unnecessary re-renders.
- Use memoization only when profiling justifies it.
- Avoid uncontrolled infinite animations.
- Lazy-load heavy modules/scenes.
- For 3D: cap DPR, control draw calls, provide fallback behavior.

---

## Documentation Standards

- Document intent/trade-offs, not obvious syntax.
- Update docs when architecture or workflow changes.
- Keep examples runnable and current.

---

## Pull Request Quality Gates

Before merge:

- Lint passes.
- Typecheck passes.
- Tests pass (`npm run test` baseline; expand by change risk).
- Format check passes.
- Build passes.
- Docs updated if structure/standards changed.
