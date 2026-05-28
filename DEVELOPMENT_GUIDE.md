# TechTonic V2.0 Development Guide

## Purpose

Guide for setting up the project, running quality gates, and working within the **post–Phase 2** codebase (all code under `src/`).

---

## Requirements

- **Node.js** LTS (recommended ≥ 20)
- **npm** (project default package manager)
- **Git**

---

## Setup

```bash
git clone <repository-url>
cd techtonic-website
npm install
npm run dev
```

Open: [http://localhost:3000](http://localhost:3000)

**Active refactor branch:** `feature/next-gen-club-website`  
**Current phase focus:** Phase 3 — 3D consolidation, testing expansion, performance hardening

### Verify setup (recommended)

```bash
npm run lint
npm run typecheck
npm run test
npm run format:check
npm run build
```

All commands should pass on a clean checkout.

---

## Current Layout (Quick Reference)

| Area                      | Path                                     | Notes                                      |
| ------------------------- | ---------------------------------------- | ------------------------------------------ |
| Routes & layouts          | `src/app/`                               | Thin `page.tsx` files                      |
| Page composition          | `src/widgets/`                           | Includes `layout/` (shell, header, footer) |
| Section UI                | `src/features/`                          | Per-domain sections + hooks                |
| Shared UI                 | `src/shared/ui/`                         | shadcn/Radix primitives                    |
| V2 design UI              | `src/shared/ui-v2/`                      | Glass, neon, section shell                 |
| Shared hooks/utils        | `src/shared/hooks/`, `src/shared/utils/` |                                            |
| Theme provider            | `src/shared/providers/`                  | `next-themes` wrapper                      |
| Types                     | `src/types/`                             |                                            |
| Cross-cutting hooks       | `src/hooks/`                             | `use3d`, toast, timeline, …                |
| Content & helpers         | `src/lib/content/`, `src/lib/3d/`        |                                            |
| 3D runtime (transitional) | `src/components/3d/`                     | Target: `src/3d/`                          |

Use the `@/` alias for imports (resolves to `src/`).

---

## Available Scripts

| Command                | Description                         |
| ---------------------- | ----------------------------------- |
| `npm run dev`          | Start Next.js dev server            |
| `npm run build`        | Production build                    |
| `npm run start`        | Run production server (after build) |
| `npm run lint`         | ESLint (`next lint`)                |
| `npm run lint:fix`     | ESLint with auto-fix                |
| `npm run typecheck`    | TypeScript (`tsc --noEmit`)         |
| `npm run test`         | Vitest single run                   |
| `npm run test:watch`   | Vitest watch mode                   |
| `npm run format`       | Prettier write (all tracked files)  |
| `npm run format:check` | Prettier check (CI)                 |
| `npm run prepare`      | Install Husky git hooks             |

### Git Hooks (Husky)

| Hook         | Action                                            |
| ------------ | ------------------------------------------------- |
| `pre-commit` | `lint-staged` (ESLint + Prettier on staged files) |
| `commit-msg` | `commitlint` (Conventional Commits)               |

### CI Workflow

- File: `.github/workflows/quality-gates.yml`
- Triggers: `pull_request`, `push` to `feature/next-gen-club-website`
- Gate order: **lint → typecheck → format:check → test → build**

### Recommended local gate (before PR)

```bash
npm run lint && npm run typecheck && npm run test && npm run format:check && npm run build
```

---

## TypeScript Paths

From `tsconfig.json`:

```json
{
  "@/*": ["./src/*"],
  "@/shared/*": ["./src/shared/*"],
  "@/types/*": ["./src/types/*"],
  "@/components/ui/*": ["./src/shared/ui/*"]
}
```

**Rules for new code:**

- Import UI from `@/shared/ui/...` (not legacy path names).
- `@/components/ui/*` still works (alias) for shadcn-generated snippets only.
- Do not add files outside `src/` except config, `public`, `docs`.

**Typecheck note:** `*.test.ts` / `*.test.tsx` are excluded from `tsc` (Vitest provides globals at test runtime). Run `npm run test` for test type/runtime validation.

---

## Tooling Baseline

| Tool                             | Version / notes                                    |
| -------------------------------- | -------------------------------------------------- |
| Next.js                          | 14.2.x                                             |
| React                            | 18                                                 |
| TypeScript                       | strict                                             |
| Tailwind CSS                     | 3.x (`tailwind.config.ts` scans `./src/**`)        |
| ESLint + Prettier                | Enforced in CI and pre-commit                      |
| Husky + lint-staged + Commitlint | Conventional Commits                               |
| Vitest                           | `src/**/*.test.{ts,tsx}`                           |
| 3D                               | `three`, `@react-three/fiber`, `@react-three/drei` |
| Motion / scroll                  | `framer-motion`, `lenis`, `gsap`                   |

**shadcn CLI** (`components.json`):

- `ui` → `@/shared/ui`
- `utils` → `@/shared/utils`
- `hooks` → `@/shared/hooks`
- `components` → `@/widgets` (composition target for generated layouts)

---

## Adding UI with shadcn

```bash
npx shadcn@latest add <component>
```

New files are created under `src/shared/ui/`. Prefer importing:

```ts
import { Button } from "@/shared/ui/button";
```

---

## Onboarding Checklist

- [ ] Clone repo, `npm install`, `npm run dev`
- [ ] Read [`PROJECT_STRUCTURE.md`](./PROJECT_STRUCTURE.md) — folder map
- [ ] Read [`ARCHITECTURE.md`](./ARCHITECTURE.md) — layers & ADRs
- [ ] Read [`CODE_STYLE.md`](./CODE_STYLE.md) — conventions
- [ ] Read [`CONTRIBUTING.md`](./CONTRIBUTING.md) — PR & commit rules
- [ ] Trace home flow: `src/app/(site)/page.tsx` → `widgets/home` → `features/home`
- [ ] Find content data in `src/lib/content/`
- [ ] Run full local quality gate (see above)
- [ ] Skim `.github/workflows/quality-gates.yml`
- [ ] Open a small PR with Conventional Commit message

---

## Daily Development Rules

1. **Thin routes** — compose via `widgets`, implement UI in `features`.
2. **Shared UI** — use `@/shared/ui`; add V2 visuals via `@/shared/ui-v2`.
3. **No root `components/`** — all modules go under `src/`.
4. **Behavior-safe migrations** — structure first; avoid drive-by logic changes.
5. **Update docs** when paths, scripts, or layer contracts change.

---

## Debug & Performance

### UI / layout

- Large sections: check re-renders in `features/home/*`.
- Scroll/shell: `widgets/layout/site-shell.tsx`, `lenis-provider.tsx`.

### 3D

- Scenes: `src/components/3d/scenes/`
- Performance guards: `src/lib/3d/performance.ts` (+ unit tests)
- Respect `use3d` / reduced-motion; avoid raising particle counts without review.

### Content

- Edit copy/lists in `src/lib/content/` before hardcoding in components.

---

## Definition of Done (per change)

- [ ] Correct layer (`app` / `widgets` / `features` / `shared` / `lib`)
- [ ] Dependency direction preserved
- [ ] Imports use `@/` canonical paths
- [ ] `lint`, `typecheck`, `test`, `format:check`, `build` pass
- [ ] Docs updated if structure, scripts, or conventions changed

---

## Related Docs

- [`PROJECT_STRUCTURE.md`](./PROJECT_STRUCTURE.md)
- [`ARCHITECTURE.md`](./ARCHITECTURE.md)
- [`CODE_STYLE.md`](./CODE_STYLE.md)
- [`CONTRIBUTING.md`](./CONTRIBUTING.md)
- [`REFACTOR_PROGRESS.md`](./REFACTOR_PROGRESS.md)
