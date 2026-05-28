# TechTonic V2.0 Development Guide

## Purpose

This guide helps contributors set up the project, follow daily workflows, and work correctly with the current Phase 3-ready architecture baseline.

---

## Requirements

- Node.js LTS (recommended >= 20)
- npm (project default)
- Git

---

## Setup

```bash
git clone <repository-url>
cd techtonic-website
npm install
npm run dev
```

Open: [http://localhost:3000](http://localhost:3000)

Active branch (main refactor line): `feature/next-gen-club-website`
Current phase focus: `Phase 3 — 3D Performance & Futuristic Polish`

For quality verification after setup:

```bash
npm run lint
npm run typecheck
npm run test
npm run format:check
npm run build
```

---

## Current Layout (Quick Reference)

| Area | Canonical path |
|---|---|
| Routes & layout | `src/app/` |
| Page composition | `src/widgets/` |
| Feature sections | `src/features/` |
| Shared UI/hooks/utils | `src/shared/` |
| Shared types | `src/types/` |
| Shared hooks | `src/hooks/` |
| Content & utilities | `src/lib/` |
| 3D runtime (transitional) | `src/components/3d/` |
| Legacy transitional modules | `components/` |

Use `@/` alias for all imports.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Next.js dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | ESLint check |
| `npm run lint:fix` | ESLint auto-fix |
| `npm run typecheck` | TypeScript check (`tsc --noEmit`) |
| `npm run test` | Run unit tests with Vitest |
| `npm run test:watch` | Run Vitest in watch mode |
| `npm run format` | Format all files with Prettier |
| `npm run format:check` | Prettier check mode |
| `npm run prepare` | Initialize Husky hooks |

### Git Hooks (Husky)

- `pre-commit` -> `lint-staged`
- `commit-msg` -> `commitlint`

### CI Workflow

- GitHub Actions workflow: `.github/workflows/quality-gates.yml`
- Default gate order: `lint` -> `typecheck` -> `format:check` -> `test` -> `build`

### Recommended Local Quality Gate

```bash
npm run lint
npm run typecheck
npm run test
npm run format:check
npm run build
```

---

## TypeScript Alias

```json
"@/*": ["./src/*", "./*"]
```

Practical rule:

- Prefer `src/*` canonical modules in new code.
- Legacy root modules are compatibility only.

---

## Tooling Baseline (Current)

- Next.js 14.2.x
- React 18
- TypeScript strict mode
- Tailwind CSS 3.x
- ESLint + Prettier
- Husky + lint-staged + Commitlint
- 3D stack: `three`, `@react-three/fiber`, `@react-three/drei`

Config highlights:

- `next.config.mjs` keeps lint/typecheck enabled during build (`ignore* = false`).
- `components.json` aliases point to shared layer (`@/shared/ui`, `@/shared/utils`, `@/shared/hooks`).

---

## Onboarding Checklist

- [ ] Clone, install, run `npm run dev`
- [ ] Read `PROJECT_STRUCTURE.md`
- [ ] Read `ARCHITECTURE.md`
- [ ] Read `CODE_STYLE.md`
- [ ] Read `CONTRIBUTING.md`
- [ ] Understand route composition flow: `app -> widgets -> features`
- [ ] Locate content source in `src/lib/content/`
- [ ] Run local quality gate (`lint`, `typecheck`, `test`, `format:check`, `build`)
- [ ] Check CI workflow definition in `.github/workflows/quality-gates.yml`
- [ ] Open a small Conventional Commit PR

---

## Daily Development Rules

- Keep route files thin; compose through widgets/features.
- Prefer `@/shared/ui` instead of `@/components/ui` in new code.
- Avoid adding permanent modules under root `components/`.
- Keep migration PRs behavior-safe (structure first, logic second).

---

## Debug & Performance Notes

### UI

- Check unnecessary re-renders in large sections.
- Watch scroll behavior in `src/widgets/layout/site-shell.tsx`.

### 3D

- Keep heavy scene logic under `src/components/3d/` (until `src/3d` migration).
- Respect reduced motion and DPR limits.

---

## Definition of Done

- Correct layer placement (`app/widgets/features/shared`).
- Dependency direction preserved (`app -> widgets -> features -> entities -> shared`, plus `app/widgets/features -> 3d`).
- Imports use `@/` and canonical paths.
- Quality gate passes locally.
- Documentation updated if structure or workflow changed.

---

## Related Docs

- [`PROJECT_STRUCTURE.md`](./PROJECT_STRUCTURE.md)
- [`ARCHITECTURE.md`](./ARCHITECTURE.md)
- [`CODE_STYLE.md`](./CODE_STYLE.md)
- [`CONTRIBUTING.md`](./CONTRIBUTING.md)
