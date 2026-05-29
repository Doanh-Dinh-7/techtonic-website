# TechTonic V2.0 Code Style Guide

## Objective

Keep code maintainable, scalable, and consistent across the layered `src/` architecture.

---

## General Engineering Rules

- Apply SOLID, DRY, KISS pragmatically.
- Prefer readability over clever abstractions.
- Keep modules focused and composable.
- Keep structural refactors **behavior-safe** by default.

---

## TypeScript Rules

- Strict mode stays enabled.
- Avoid `any`; if unavoidable, isolate and document.
- Prefer `interface` for shared object shapes.
- Shared contracts: `src/types/` or feature-local `types.ts`.
- Use `import type` for type-only imports.

---

## React and Next.js Rules

- **Server Components** by default in App Router.
- Add `"use client"` only when browser APIs, state, or effects are required.
- Keep `src/app/**/page.tsx` thin — delegate to `widgets`.
- Section UI lives in `features`; composition in `widgets`.
- Extract reusable stateful logic into hooks (`features/.../hooks`, `widgets/.../hooks`, `src/hooks`).

---

## Project Layout Rules (Current)

| Path                    | Responsibility                               |
| ----------------------- | -------------------------------------------- |
| `src/app/`              | Routes, metadata, layouts, `globals.css`     |
| `src/widgets/`          | Page composition, site chrome (`layout/`)    |
| `src/features/`         | Domain section components + feature hooks    |
| `src/shared/ui/`        | shadcn/Radix primitives (**canonical UI**)   |
| `src/shared/ui-v2/`     | V2 design components (glass, neon, 3D cards) |
| `src/shared/utils/`     | `cn`, shared helpers                         |
| `src/shared/hooks/`     | Shared hook barrels                          |
| `src/shared/providers/` | App-wide providers (e.g. theme)              |
| `src/types/`            | Shared type contracts                        |
| `src/hooks/`            | Cross-cutting hooks (`use3d`, toast, …)      |
| `src/lib/`              | Content modules, pure utilities, `lib/3d`    |
| `src/3d/`               | Canonical R3F runtime                        |
| `src/components/3d/`    | Deprecated bridge (re-exports `@/3d`)        |

**There is no root `components/` folder.** Do not recreate it.

### Import policy

- Always use `@/` alias (maps to `src/`).
- **Prefer** `@/shared/ui/*` for primitives.
- `@/components/ui/*` is a **compatibility alias** only (same as `shared/ui`); do not use in new hand-written code.
- 3D: `@/3d` or `@/3d/*` (avoid `@/components/3d/*` in new code).

```ts
// Preferred
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/utils";

// Avoid in new code
import { Button } from "@/components/ui/button";
```

---

## Naming Conventions

### Files and folders

- `kebab-case` for files and directories.
- React components: `PascalCase` export names.
- Hooks: `use` prefix (`use-hero-section.ts`).

### Symbols

- Variables / functions: `camelCase`
- Types / interfaces / components: `PascalCase`
- Constants: `UPPER_SNAKE_CASE`

---

## Dependency Direction Rules

**Allowed:**

```text
app → widgets → features → entities → shared
app | widgets | features → 3d runtime (`src/3d`)
```

**Not allowed:**

- `shared → features | widgets | app`
- Cross-feature deep imports
- Circular dependencies
- Permanent modules outside `src/` (except config, `public`, `docs`, `.github`)

---

## Error Handling Standards

- Handle expected failures explicitly.
- Do not silently swallow errors.
- Provide user-friendly fallback UI when relevant (e.g. WebGL fallback).

---

## Security Standards

- Validate inputs at boundaries (forms, external data).
- `target="_blank"` links must include `rel="noopener noreferrer"`.
- Never commit secrets; use environment variables for client-safe public keys only.

---

## Performance Standards (UI + 3D)

- Avoid unnecessary re-renders in large client sections.
- Memoize only when profiling justifies it.
- Lazy-load heavy 3D entrypoints where possible.
- 3D: respect DPR caps and reduced-motion paths (`src/lib/3d/performance.ts`).
- Do not raise particle/star counts without updating performance docs/tests.

---

## Documentation Standards

- Document intent and trade-offs, not obvious syntax.
- Update `PROJECT_STRUCTURE.md`, `ARCHITECTURE.md`, or this file when conventions change.
- Keep examples aligned with current paths under `src/`.

---

## Pull Request Quality Gates

Before merge:

| Check  | Command                |
| ------ | ---------------------- |
| Lint   | `npm run lint`         |
| Types  | `npm run typecheck`    |
| Tests  | `npm run test`         |
| Format | `npm run format:check` |
| Build  | `npm run build`        |

Update docs when structure, scripts, or import contracts change.

---

## Related Docs

- [`PROJECT_STRUCTURE.md`](./PROJECT_STRUCTURE.md)
- [`ARCHITECTURE.md`](./ARCHITECTURE.md)
- [`DEVELOPMENT_GUIDE.md`](./DEVELOPMENT_GUIDE.md)
