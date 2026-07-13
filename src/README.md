# Source Directory

Primary application code for TechTonic Website V2.0.

## Layout (current)

| Path                   | Role                                            |
| ---------------------- | ----------------------------------------------- |
| `app/`                 | App Router routes and layouts                   |
| `widgets/`             | Page composition, site shell                    |
| `features/`            | Domain section UI + hooks                       |
| `shared/`              | UI primitives (`ui`, `ui-v2`), utils, providers |
| `3d/`                  | Canonical React Three Fiber runtime             |
| `lib/`                 | Content, pure 3D policy (`lib/3d`)              |
| `hooks/`               | Cross-cutting hooks (`use3d`, …)                |
| `types/`               | Shared contracts                                |
| `entities/`, `config/` | Reserved                                        |

There is **no** `src/components/` folder. 3D imports use `@/3d` only.

## Imports

Use `@/` alias (`tsconfig`: `./src/*`).

See [`PROJECT_STRUCTURE.md`](../PROJECT_STRUCTURE.md) and [`ARCHITECTURE.md`](../ARCHITECTURE.md).
