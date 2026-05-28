# Source Directory

Primary application code for TechTonic Website V2.0.

## Phase 1 (complete)

Migrated into `src/`:

- `app/` — App Router routes and layouts

- `hooks/` — shared React hooks (canonical; `components/ui/use-*` re-exports)

- `lib/` — utilities, content, 3D helpers

- `components/3d/` — React Three Fiber scenes

Duplicate root copies of the above were removed. Root `components/` (page UI) remains until Phase 2.

## Phase 2 (next)

- Migrate root `components/` → `features/` / `widgets/` / `shared/ui`

- Scaffold folders: `features/`, `widgets/`, `entities/`, `shared/`, `types/`, `config/`, `3d/`

## Imports

Use `@/` alias (`tsconfig`: `./src/*` first, then `./*`).

See [`PROJECT_STRUCTURE.md`](../PROJECT_STRUCTURE.md) and [`ARCHITECTURE.md`](../ARCHITECTURE.md).
