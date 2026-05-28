# TechTonic Refactor Progress - Phase 1

> **Purpose:** Single handoff document for developers and AI agents continuing the refactor.  
> **Repository:** `Doanh-Dinh-7/techtonic-website`  
> **Branch:** `feature/next-gen-club-website`  
> **Last updated:** Phase 1 complete (cleanup, config, verification)

---

## Current Phase

**Phase 1 — Foundation & Structure Migration**  
Status: **Complete**

**Next:** Phase 2 — Core configuration & tooling + migrate root `components/`

---

## Completed

### Documentation pack (pre / during Phase 1)

- [x] `ARCHITECTURE.md` — current vs target architecture, ADRs, scorecard
- [x] `CONTRIBUTING.md` — git workflow, PR checklist, review guidelines
- [x] `DESIGN.md` — futuristic / dark / 3D design direction
- [x] `CODE_STYLE.md` — TypeScript, React/Next, naming, performance rules
- [x] `PROJECT_STRUCTURE.md` — accurate tree after Phase 1, import map
- [x] `DEVELOPMENT_GUIDE.md` — setup, scripts, onboarding, 3D debugging
- [x] Docs synced with post–Phase 1 codebase

### Foundation

- [x] Created `src/` layered scaffold: `features/`, `widgets/`, `entities/`, `shared/`, `3d/`, `types/`, `config/`, `lib/*` placeholders
- [x] Updated `tsconfig.json` path alias: `@/*` → `["./src/*", "./*"]` (backward-compatible)
- [x] Updated `tailwind.config.ts` to scan `./src/**/*` (removed legacy `./app/**/*`)
- [x] Updated `src/README.md` with Phase 1 status

### Structure migration (Batches A–D)

- [x] **Batch A:** `hooks/` → `src/hooks/` (4 files)
- [x] **Batch B:** `lib/` → `src/lib/` (15 files: `utils`, `3d/*`, `content/*`)
- [x] **Batch C:** `components/3d/` → `src/components/3d/` (9 files)
- [x] **Batch D:** `app/` → `src/app/` (9 files: layouts, globals, all `(site)` routes)

### Phase 1 cleanup & config (exit criteria)

- [x] Removed duplicate root folders: `app/`, `hooks/`, `lib/`, `components/3d/`
- [x] Next.js uses `src/app` only (no dual `app/` confusion)
- [x] `components.json` → `src/app/globals.css`
- [x] Hooks deduplicated: canonical `src/hooks/*`; `components/ui/use-toast.ts` & `use-mobile.tsx` re-export
- [x] Added `npm run typecheck` (`tsc --noEmit`)
- [x] Re-enabled ESLint + TypeScript in `next.config.mjs` (`ignoreDuringBuilds` / `ignoreBuildErrors` → `false`)

### Verification (passed)

```bash
npm run lint        # ✔ No ESLint warnings or errors
npm run typecheck   # ✔ tsc --noEmit
npm run build       # ✔ 7 app routes: /, /about, /departments, /events, /portfolio, /recruitment
```

---

## Current Status

### Batch tracker

| Batch | Source | Destination | Status | Notes |
|:---:|---|---|:---:|---|
| **A** | `hooks/` | `src/hooks/` | **Done** | Root `hooks/` removed |
| **B** | `lib/` | `src/lib/` | **Done** | Root `lib/` removed |
| **C** | `components/3d/` | `src/components/3d/` | **Done** | Root `components/3d/` removed |
| **D** | `app/` | `src/app/` | **Done** | Root `app/` removed |

### What is canonical today

`@/*` resolves **`./src/*` first**, then `./*` fallback.

| Import example | Resolves to |
|---|---|
| `@/hooks/use3d` | `src/hooks/use3d.ts` |
| `@/lib/content` | `src/lib/content/index.ts` |
| `@/components/3d/scenes/hero-scene` | `src/components/3d/scenes/hero-scene.tsx` |
| `@/components/hero` | `components/hero.tsx` (**legacy root**) |
| `@/components/ui/button` | `components/ui/button.tsx` (**legacy root**) |

### Layout after Phase 1

```
CANONICAL (edit these)          LEGACY (Phase 2 migration)
─────────────────────          ───────────────────────────
src/app/                         components/  (~90+ files)
src/hooks/
src/lib/
src/components/3d/
```

**Not migrated in Phase 1:** entire root `components/` tree (page sections, `ui/`, `ui-v2/`, `site-shell`, etc.).

**Scaffold only (empty except README):** `src/features/`, `src/widgets/`, `src/entities/`, `src/shared/*`, `src/types/`, `src/config/`, `src/3d/`.

### Remaining technical debt (Phase 2+)

- [ ] Migrate root `components/` → `src/features/`, `src/widgets/`, `src/shared/ui`
- [ ] Prettier, Husky, lint-staged, Commitlint, CI pipeline
- [ ] `npm run test` script
- [ ] Target stack docs mention Next.js 15; runtime is **Next.js 14.2.16**
- [ ] Consolidate `src/components/3d` → `src/3d/`

---

## Decisions đã thống nhất (Agreed decisions)

| Topic | Decision |
|---|---|
| **Path alias** | Use `@/*` with `tsconfig` order: `./src/*` then `./*` |
| **Target architecture** | Layered + Feature-Sliced Design under `src/` |
| **Migration strategy** | Incremental batches (A→D); no big-bang rewrite |
| **Phase 1 scope** | Move `hooks`, `lib`, `components/3d`, `app` only; keep root `components/` until Phase 2 |
| **3D location (transitional)** | `src/components/3d/` now; consolidate to `src/3d/` later |
| **Logic changes** | Forbidden during structure moves (except lint-safe hook cleanup) |
| **Documentation** | English, professional; cross-linked root MD files |
| **Commits** | Conventional Commits (`refactor(scope): ...`) |
| **Quality gates** | Lint + typecheck block production build (enabled end of Phase 1) |

---

## Architecture snapshot (quick)

```text
src/app          → routes (canonical)
src/hooks        → shared hooks (canonical)
src/lib          → utils + content + 3d helpers (canonical)
src/components/3d → R3F scenes (canonical)

components/      → legacy page UI + shadcn (Phase 2 migration)
```

See [`ARCHITECTURE.md`](./ARCHITECTURE.md) and [`PROJECT_STRUCTURE.md`](./PROJECT_STRUCTURE.md).

---

## Next Steps

### Phase 2 — Core configuration & tooling

- Prettier, Husky, lint-staged, Commitlint
- CI: lint + typecheck + build
- `.cursor/rules` from `CODE_STYLE.md`
- `npm run test`

### Phase 2 — Core refactor (structure)

- Migrate root `components/` → `src/features/`, `src/widgets/`, `src/shared/ui`
- Split large files (`registration.tsx`, `gallery.tsx`, `team.tsx`, `hero.tsx`)
- Introduce `src/types/` shared contracts

### Phase 3+

- 3D performance budget, lazy-load scenes
- Consolidate `src/components/3d` → `src/3d`
- Next.js 15 upgrade (planned)

---

## For AI agents / new developers — how to continue

1. Read this file first, then [`PROJECT_STRUCTURE.md`](./PROJECT_STRUCTURE.md) and [`ARCHITECTURE.md`](./ARCHITECTURE.md).
2. **Edit `src/`** for migrated modules (`app`, `hooks`, `lib`, `components/3d`).
3. **Root `components/`** is legacy until Phase 2 — do not add long-term modules there.
4. **New code** → prefer `src/`; use `@/` imports.
5. Run `npm run lint`, `npm run typecheck`, `npm run build` after structural changes.
6. Update **this file** when completing a batch or phase.

---

## Related files

| File | Role |
|---|---|
| [`PROJECT_STRUCTURE.md`](./PROJECT_STRUCTURE.md) | Folder tree & import rules |
| [`ARCHITECTURE.md`](./ARCHITECTURE.md) | Layers, ADRs, scorecard |
| [`DEVELOPMENT_GUIDE.md`](./DEVELOPMENT_GUIDE.md) | Setup & scripts |
| [`CODE_STYLE.md`](./CODE_STYLE.md) | Coding standards |
| [`CONTRIBUTING.md`](./CONTRIBUTING.md) | PR & branch workflow |
| [`src/README.md`](./src/README.md) | Short `src/` overview |

---

## Changelog (progress log)

| Date | Change |
|---|---|
| Phase 1 start | Scaffold `src/`, docs pack, `tsconfig` alias |
| Batch A | `hooks/` → `src/hooks/` |
| Batch B | `lib/` → `src/lib/` |
| Batch C | `components/3d/` → `src/components/3d/` |
| Batch D | `app/` → `src/app/` |
| Docs sync | Updated ARCHITECTURE, PROJECT_STRUCTURE, DEVELOPMENT_GUIDE, CODE_STYLE |
| — | Created `REFACTOR_PROGRESS.md` (this file) |
| Phase 1 exit | Removed duplicate root folders; `components.json`; hooks re-exports; `typecheck` script; lint/TS gates in `next.config.mjs`; build verified (7 routes) |
