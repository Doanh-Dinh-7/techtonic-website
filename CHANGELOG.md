# Changelog

All notable changes to **TechTonic Website** are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- **Next.js 15.5.18** + **React 19** + R3F v9 / drei v10 (required — React 18 breaks with `use is not a function`).
- Home sections adopt **ui-v2**: `core-values`, `testimonials`, `contact` (`SectionShell`, `GlassCard`, `Card3D`, `GradientOrb`, `NeonButton`).
- Hero 3D via `src/3d/hero-media.tsx` (dynamic `CanvasShell`, `ssr: false`) for prerender safety.
- Bundle budget shared cap 105 kB; parser handles Next 15 build table.
- **A11y (critical flows):** skip link, nav labels, `BackToTop` name, Benefits dialog button, sample-label contrast, registration step announcements; audit docs under `docs/audits/accessibility/`.
- **SEO:** `src/lib/seo` (per-route metadata, Open Graph, Twitter), JSON-LD (Organization, WebSite, WebPage, Breadcrumb), `sitemap.xml`, `robots.txt`; `NEXT_PUBLIC_SITE_URL`.

## [2.0.0] - 2026-05-29

### Summary

Version 2.0 is a **production-readiness release**: Feature-Sliced architecture under `src/`,
canonical 3D runtime, automated quality gates, test coverage for critical hooks and routes,
and CI bundle budgets. User-facing pages and flows are preserved (behavior-safe refactor).

### Added

- **Architecture:** `src/app` → `src/widgets` → `src/features` → `src/shared` composition model.
- **3D runtime:** Canonical `src/3d` (R3F) with `CanvasShell`, scenes, models, effects, and lazy loaders (`HeroSceneLazy`, `BackgroundSceneLazy`).
- **3D policy:** `src/lib/3d/performance.ts` with unit-tested particle/star/DPR/frameloop guards; runbook at `docs/techtonic-v2/3d-performance.md`.
- **Design system:** `src/shared/ui` (shadcn/Radix) and `src/shared/ui-v2` (glass, neon, section shell).
- **Tooling:** ESLint, Prettier, TypeScript strict, Husky, lint-staged, Commitlint (Conventional Commits).
- **Testing:** Vitest + React Testing Library (31 tests): `lib/3d`, feature/widget hooks, `Header`, route smoke (home, recruitment, events).
- **CI/CD:** Split GitHub Actions jobs (`verify` → `build`), npm + Next.js cache, bundle budget enforcement (`bundle-budgets.json`, `scripts/check-bundle-budget.mjs`).
- **Scripts:** `npm run ci`, `npm run ci:build`, `npm run build:check`.
- **Documentation:** `ARCHITECTURE.md`, `PROJECT_STRUCTURE.md`, `DEVELOPMENT_GUIDE.md`, `CODE_STYLE.md`, `DESIGN.md`, `docs/techtonic-v2/README.md` hub.

### Changed

- All application code consolidated under `src/` (no root `components/`).
- Static content centralized in `src/lib/content/*`.
- Cross-cutting hooks in `src/hooks` (`use3d`, timeline, toast).
- Site chrome and navigation in `src/widgets/layout` with extracted hooks.
- Import conventions: `@/shared/ui`, `@/widgets`, `@/features`, `@/3d` (see `PROJECT_STRUCTURE.md`).

### Removed

- Root `components/` directory (Phase 2 closure).
- Deprecated `src/components/3d` re-export bridge (Phase 4.4).
- `tsconfig` path alias `@/components/ui/*` (use `@/shared/ui` only).

### Developer notes

- **Quality gate (local):** `npm run ci:build`
- **Branch:** `feature/next-gen-club-website` (merge to `main` for production deploy per team process).
- **Outstanding (post-2.0.0):** SEO/Open Graph pass, broader a11y audit — tracked in [`REFACTOR_PROGRESS.md`](./REFACTOR_PROGRESS.md).

### ADRs (accepted)

- ADR-007: Decommission root `components/`
- ADR-008: Canonical 3D runtime under `src/3d`
- ADR-009: 3D performance policy as code + docs

---

## [0.3.0] and earlier

Legacy pre-refactor releases on the flat `components/` layout. No detailed changelog entries were kept; see git history before `feature/next-gen-club-website` for prior changes.

[2.0.0]: https://github.com/Doanh-Dinh-7/techtonic-website/compare/v0.3.0...v2.0.0
[0.3.0]: https://github.com/Doanh-Dinh-7/techtonic-website/releases
