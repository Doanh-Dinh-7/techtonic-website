# TechTonic V2.0 Development Guide

## Purpose

This guide helps contributors set up the project, run workflows, work with the post–Phase 1 `src/` layout, and debug UI/3D performance.

---

## Requirements

- **Node.js** LTS (recommended >= 20)
- **npm** (project default; `pnpm-lock.yaml` may exist — use one package manager consistently)
- **Git**

---

## Environment Setup

```bash
git clone <repository-url>
cd techtonic-website
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Branch

Active development: `feature/next-gen-club-website` (or your team’s integration branch).

---

## Project Layout (Quick Reference)

After **Phase 1**, canonical paths are under `src/`:

| What | Where |
|---|---|
| Routes & layouts | `src/app/` |
| Global styles | `src/app/globals.css` |
| Hooks | `src/hooks/` |
| Utils & content | `src/lib/` |
| 3D (R3F) | `src/components/3d/` |
| Page UI (legacy) | `components/` (root) |

Imports use `@/` → resolves to `src/*` first, then root fallback. See [`PROJECT_STRUCTURE.md`](./PROJECT_STRUCTURE.md).

**Important:** Migrated modules live only under `src/` (`app`, `hooks`, `lib`, `components/3d`). Root `components/` remains legacy until Phase 2.

---

## Available Scripts

From `package.json`:

| Command | Description |
|---|---|
| `npm run dev` | Start Next.js development server |
| `npm run build` | Production build |
| `npm run start` | Run production server (after `build`) |
| `npm run lint` | Run ESLint via `next lint` |
| `npm run typecheck` | TypeScript check (`tsc --noEmit`) |

### Recommended local checks

```bash
npm run lint
npm run typecheck
npm run build
```

**Planned scripts (Phase 2):**

- `npm run test` / `npm run test:watch`

---

## TypeScript Path Alias

```json
"@/*": ["./src/*", "./*"]
```

Examples:

```ts
import { use3d } from "@/hooks/use3d";
import { featuredNews } from "@/lib/content";
import { HeroScene } from "@/components/3d/scenes/hero-scene";
import { Hero } from "@/components/hero"; // legacy root components/
```

---

## Tooling Baseline

### Current

- **Next.js** 14.2.x (App Router; target upgrade: 15)
- **React** 18
- **TypeScript** strict mode
- **Tailwind CSS** 3.x (`tailwind.config.ts` scans `./src/**/*` and legacy `./components/**/*`, `./app/**/*`)
- **ESLint** (`eslint-config-next`)
- **3D:** `@react-three/fiber`, `@react-three/drei`, `three`

### Known config notes

- `next.config.mjs`: `ignoreDuringBuilds` / `ignoreBuildErrors` are **enabled** (temporary — fix in Phase 2).
- `components.json` (shadcn): may still reference `app/globals.css`; canonical CSS is `src/app/globals.css`.

### Recommended (Phase 2)

- Prettier
- Husky + lint-staged
- Commitlint (Conventional Commits)
- CI: `lint` + `typecheck` + `test` + `build`

---

## Working with 3D Components

- Scene code: `src/components/3d/` (`canvas/`, `scenes/`, `effects/`, `models/`).
- Shared 3D config: `src/lib/3d/` (`constants`, `materials`, `performance`).
- Capability hook: `@/hooks/use3d` (WebGL check, reduced motion).
- Use `CanvasShell` for consistent DPR, frameloop, and fallback UI.
- Lazy-load heavy scenes on routes that need them.
- Always respect `prefers-reduced-motion`.

---

## Debugging Performance

### UI (2D)

- React DevTools: unnecessary re-renders in large sections (`hero`, `gallery`, `registration`).
- Scroll: `SiteShell` scroll listener, Lenis in `components/lenis-provider.tsx`.
- Images: avoid excessive `priority` flags; use responsive `sizes`.

### Three.js / R3F

- Monitor FPS and frame time under interaction.
- Review particle counts via `getSafeParticleCount` (`src/lib/3d/performance.ts`).
- Cap DPR; pause offscreen rendering when possible.

### Debugging workflow

1. Reproduce with minimal steps.
2. Isolate layer: route (`src/app`) vs component vs hook vs 3D.
3. Confirm you are editing the **`src/`** file, not a legacy duplicate.
4. Fix, re-run `lint` + `tsc --noEmit` + `build`.
5. Document impact in the PR.

---

## Onboarding Checklist

- [ ] Clone repo and run `npm install` + `npm run dev`.
- [ ] Read [`PROJECT_STRUCTURE.md`](./PROJECT_STRUCTURE.md) (Phase 1 layout + alias rules).
- [ ] Read [`ARCHITECTURE.md`](./ARCHITECTURE.md) (current vs target).
- [ ] Read [`CODE_STYLE.md`](./CODE_STYLE.md).
- [ ] Read [`CONTRIBUTING.md`](./CONTRIBUTING.md).
- [ ] Read [`DESIGN.md`](./DESIGN.md).
- [ ] Locate routes in `src/app/(site)/`.
- [ ] Locate content data in `src/lib/content/`.
- [ ] Run `npm run lint` and `npx tsc --noEmit` locally.
- [ ] Open a small PR (docs/chore/fix) using Conventional Commits.

---

## Definition of Done

- Changes respect architecture boundaries ([`ARCHITECTURE.md`](./ARCHITECTURE.md)).
- New migrated code lives under `src/`; imports use `@/`.
- Code style followed ([`CODE_STYLE.md`](./CODE_STYLE.md)).
- Local checks pass (`lint`, `tsc --noEmit`, `build` when applicable).
- Docs updated if structure, scripts, or conventions change.
- PR includes verification notes and screenshots for UI/3D changes.

---

## Related Docs

- [`ARCHITECTURE.md`](./ARCHITECTURE.md)
- [`PROJECT_STRUCTURE.md`](./PROJECT_STRUCTURE.md)
- [`CODE_STYLE.md`](./CODE_STYLE.md)
- [`CONTRIBUTING.md`](./CONTRIBUTING.md)
