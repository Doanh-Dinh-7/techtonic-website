# TechTonic V2.0 Project Structure

## Purpose

This document describes the **current repository layout** after Phase 1 (Foundation & Project Structure) and the **target layout** for ongoing migration.

Use this as the source of truth when adding files, reviewing PRs, or onboarding new developers.

---

## Phase 1 Status (Completed)

The following modules were migrated under `src/` (Batches A–D):

| Batch | From | To | Status |
|---|---|---|---|
| A | `hooks/` | `src/hooks/` | Migrated |
| B | `lib/` | `src/lib/` | Migrated |
| C | `components/3d/` | `src/components/3d/` | Migrated |
| D | `app/` | `src/app/` | Migrated |

**Alias resolution:** `tsconfig.json` maps `@/*` to `./src/*` first, then `./*` as fallback.

```json
"@/*": ["./src/*", "./*"]
```

Always import with `@/` (for example `@/hooks/use3d`, `@/lib/content`, `@/components/3d`). New code must live under `src/` unless explicitly noted as legacy.

### Phase 1 cleanup (done)

Duplicate root folders (`app/`, `hooks/`, `lib/`, `components/3d/`) were removed after build verification. Next.js App Router runs from `src/app/` only.

---

## Current Repository Tree (Accurate)

```text
techtonic-website/
├── src/                              # Primary application source (canonical)
│   ├── app/                          # Next.js App Router (migrated)
│   │   ├── layout.tsx
│   │   ├── globals.css
│   │   └── (site)/
│   │       ├── layout.tsx
│   │       ├── page.tsx              # Home
│   │       ├── about/page.tsx
│   │       ├── departments/page.tsx
│   │       ├── events/page.tsx
│   │       ├── portfolio/page.tsx
│   │       └── recruitment/page.tsx
│   │
│   ├── hooks/                        # Shared hooks (migrated)
│   │   ├── use3d.ts
│   │   ├── use-toast.ts
│   │   ├── use-mobile.tsx
│   │   └── useTimeline.ts
│   │
│   ├── lib/                          # Utilities & content (migrated)
│   │   ├── utils.ts
│   │   ├── 3d/
│   │   │   ├── constants.ts
│   │   │   ├── materials.ts
│   │   │   └── performance.ts
│   │   ├── content/
│   │   │   ├── index.ts
│   │   │   ├── types.ts
│   │   │   ├── news.ts
│   │   │   ├── partners.ts
│   │   │   ├── timeline.ts
│   │   │   ├── departments.ts
│   │   │   ├── projects.ts
│   │   │   ├── awards.ts
│   │   │   ├── events.ts
│   │   │   ├── blog-posts.ts
│   │   │   └── faq.ts
│   │   ├── api-client/               # Scaffold (README)
│   │   ├── analytics/                # Scaffold (README)
│   │   └── security/                 # Scaffold (README)
│   │
│   ├── components/
│   │   └── 3d/                       # R3F scenes & canvas (migrated)
│   │       ├── index.ts
│   │       ├── canvas/
│   │       ├── scenes/
│   │       ├── effects/
│   │       └── models/
│   │
│   ├── features/                     # Scaffold (Phase 2+)
│   ├── widgets/                      # Scaffold (Phase 2+)
│   ├── entities/                     # Scaffold (Phase 2+)
│   ├── shared/                       # Scaffold (Phase 2+)
│   │   ├── ui/
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── constants/
│   │   ├── config/
│   │   └── styles/
│   ├── 3d/                           # Scaffold — future dedicated runtime layer
│   ├── types/                        # Scaffold (Phase 2+)
│   └── config/                       # Scaffold (Phase 2+)
│
├── components/                       # Legacy UI (not yet migrated to src/)
│   ├── site-shell.tsx
│   ├── hero.tsx
│   ├── registration.tsx
│   ├── ui/                           # shadcn/Radix primitives
│   ├── ui-v2/                        # V2 design primitives
│   └── ...                           # Page sections & feature UI
│
├── public/                           # Static assets
├── docs/techtonic-v2/                # Earlier planning docs
├── styles/globals.css                # Legacy global styles (prefer src/app/globals.css)
│
├── ARCHITECTURE.md
├── CODE_STYLE.md
├── CONTRIBUTING.md
├── DESIGN.md
├── DEVELOPMENT_GUIDE.md
├── PROJECT_STRUCTURE.md              # This file
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.mjs
└── components.json                   # shadcn config (CSS: src/app/globals.css)
```

---

## Target Tree (End State)

Phase 2+ will move remaining root `components/` into layered modules:

```text
src/
  app/
  widgets/
  features/
  entities/
  shared/
  3d/                    # Consolidated R3F runtime (from src/components/3d)
  lib/
  types/
  config/
```

---

## Folder Roles

### `src/app`
- Next.js routing, root layout, metadata, global styles.
- Route group `(site)` wraps all public pages via `SiteShell`.
- Keep page files thin; compose sections from components/features.

### `src/hooks`
- Cross-cutting React hooks (`use3d`, `use-toast`, `useTimeline`, `use-mobile`).
- Feature-specific hooks move to `src/features/<name>/hooks/` in Phase 2.

### `src/lib`
- **`lib/utils.ts`**: shared utilities (`cn`, etc.).
- **`lib/content/*`**: typed static content for pages.
- **`lib/3d/*`**: 3D constants, materials, performance helpers (not scene components).
- **`lib/api-client`**, **`lib/analytics`**, **`lib/security`**: reserved for integrations.

### `src/components/3d` (transitional)
- React Three Fiber UI: canvas shell, scenes, effects, models.
- **Target:** consolidate under `src/3d/` in a later phase.

### `components/` (root, legacy)
- Page sections and shadcn UI still live here until Phase 2 migration.
- Resolved via `@/components/*` fallback in `tsconfig` paths.
- **Do not add new long-term modules here.**

### Scaffold folders (`src/features`, `src/widgets`, `src/entities`, `src/shared`, `src/types`, `src/config`)
- Placeholders with README files.
- Populate during Phase 2 (core refactor).

---

## Import Conventions

| Import | Resolves to (priority) |
|---|---|
| `@/app/...` | `src/app/...` |
| `@/hooks/...` | `src/hooks/...` |
| `@/lib/...` | `src/lib/...` |
| `@/components/3d/...` | `src/components/3d/...` |
| `@/components/hero` | `components/hero` (legacy root) |
| `@/components/ui/button` | `components/ui/button` (legacy root) |

**Rule:** Prefer creating new files under `src/`. When touching migrated modules, edit only the `src/` copy.

---

## Naming Rules

- Files and folders: `kebab-case` (legacy exception: `useTimeline.ts` — rename in Phase 2).
- React components: `PascalCase`.
- Hooks: file `use-*.ts` / `use-*.tsx`, symbol `useXxx`.
- Content types: `src/lib/content/types.ts` and domain files in `src/lib/content/`.
- Future feature modules: `<domain>.types.ts`, `<domain>.schema.ts`, `<domain>.api.ts`.

---

## Dependency Direction

**Allowed:**
- `app -> widgets -> features -> entities -> shared`
- `app/widgets/features -> 3d` (or transitional `components/3d`)
- `app -> @/components/*` (legacy, until migrated)

**Disallowed:**
- `shared -> features/entities/widgets/app`
- Cross-feature deep internal imports
- Circular dependencies
- New permanent modules at repository root outside `src/`, `public/`, or config files

---

## Example: Adding a New Feature (Phase 2+)

```text
src/features/sponsor-program/
  ui/
    sponsor-program-section.tsx
  model/
    sponsor-program.types.ts
    sponsor-program.schema.ts
  hooks/
    use-sponsor-program.ts
  api/
    sponsor-program.api.ts
```

Route integration:

```text
src/app/(site)/sponsors/page.tsx
```

Widget composition (optional):

```text
src/widgets/home-sponsor/
  home-sponsor-widget.tsx
```

---

## Related Docs

- Architecture: [`ARCHITECTURE.md`](./ARCHITECTURE.md)
- Development setup: [`DEVELOPMENT_GUIDE.md`](./DEVELOPMENT_GUIDE.md)
- Code standards: [`CODE_STYLE.md`](./CODE_STYLE.md)
