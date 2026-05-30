# TechTonic Website V2.0

Official website for **TechTonic Club** — Da Nang University of Economics IT student community.  
Built with **Next.js 15**, **React 19**, **Tailwind CSS**, and an optional **React Three Fiber** layer for futuristic 3D moments.

## Quick Start

```bash
git clone https://github.com/Doanh-Dinh-7/techtonic-website.git
cd techtonic-website
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

**Active branch:** `feature/next-gen-club-website`  
**Version:** 2.0.0 · **Refactor:** V2.0 complete — [`REFACTOR_PROGRESS.md`](./REFACTOR_PROGRESS.md) · [`CHANGELOG.md`](./CHANGELOG.md)

## Quality Gates

```bash
npm run lint
npm run typecheck
npm run test
npm run format:check
npm run build
```

## Project Structure (Summary)

All application code lives under `src/`:

| Layer       | Path               | Role                                    |
| ----------- | ------------------ | --------------------------------------- |
| Routes      | `src/app/`         | App Router pages & layouts              |
| Composition | `src/widgets/`     | Page orchestration, site shell          |
| Sections    | `src/features/`    | Domain UI (home, about, recruitment, …) |
| Shared      | `src/shared/`      | UI, `ui-v2`, SEO helpers, utils         |
| SEO         | `src/lib/seo/`     | Metadata, OG, JSON-LD, sitemap          |
| 3D runtime  | `src/3d/`          | R3F scenes (lazy-loaded)                |
| Content     | `src/lib/content/` | Static copy & data                      |

See [`PROJECT_STRUCTURE.md`](./PROJECT_STRUCTURE.md) for the full tree.

## Documentation

| Doc                                                            | Purpose                        |
| -------------------------------------------------------------- | ------------------------------ |
| [`ARCHITECTURE.md`](./ARCHITECTURE.md)                         | Layers, flows, ADRs            |
| [`DEVELOPMENT_GUIDE.md`](./DEVELOPMENT_GUIDE.md)               | Setup, scripts, onboarding     |
| [`CODE_STYLE.md`](./CODE_STYLE.md)                             | Coding conventions             |
| [`CONTRIBUTING.md`](./CONTRIBUTING.md)                         | PR & commit workflow           |
| [`DESIGN.md`](./DESIGN.md)                                     | Visual & 3D design direction   |
| [`CHANGELOG.md`](./CHANGELOG.md)                               | Version history & releases     |
| [`REFACTOR_PROGRESS.md`](./REFACTOR_PROGRESS.md)               | Phase status & handoff         |
| [`docs/releases/v2.0.0.md`](./docs/releases/v2.0.0.md)         | Release notes v2.0 (VI)        |
| [`docs/audits/lighthouse/`](./docs/audits/lighthouse/)         | Lighthouse baseline & runbook  |
| [`docs/techtonic-v2/README.md`](./docs/techtonic-v2/README.md) | Doc hub (product + 3D runbook) |

## Tech Stack

- Next.js 15 · React 19 · TypeScript · Tailwind CSS · shadcn/ui (`src/shared/ui`)
- Framer Motion · Lenis · Vitest · Husky · GitHub Actions quality gates
- Three.js · `@react-three/fiber` · `@react-three/drei` (`src/3d`)

## License

Private club project — see repository maintainers for usage terms.
