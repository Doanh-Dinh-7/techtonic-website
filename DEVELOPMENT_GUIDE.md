# TechTonic V2.0 Development Guide

## Purpose

Guide for setting up the project, running quality gates, and working within the **V2.0** codebase (FSD layers, canonical `src/3d`, SEO, CI, Next.js 15 + React 19).

---

## Requirements

- **Node.js** LTS (recommended ≥ 20; CI uses Node 20)
- **pnpm** (canonical package manager — `packageManager: pnpm@10.32.1` in `package.json`)
- **Git**
- **Chrome** (for Lighthouse scripts — uses `chrome-launcher`)

Enable pnpm via Corepack (recommended):

```bash
corepack enable
```

---

## Setup

```bash
git clone https://github.com/Doanh-Dinh-7/techtonic-website.git
cd techtonic-website
pnpm install
cp .env.example .env   # optional: form ID, site URL, chatbot keys
pnpm run dev
```

Open: [http://localhost:3000](http://localhost:3000)

**Active branch:** `feature/next-gen-club-website` (or `main` after merge)  
**Version:** `2.0.0` · **Baseline:** Phases 1–4 complete

### Environment variables

| Variable                                   | Required   | Purpose                                                                                   |
| ------------------------------------------ | ---------- | ----------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`                     | Production | Canonical URL, OG, sitemap (`https://…`) — set manually in `.env` (not in `.env.example`) |
| `NEXT_PUBLIC_FORM_ID`                      | Optional   | Google Form prefill for recruitment                                                       |
| `NEXT_PUBLIC_REGISTER_URL`                 | Optional   | External register link in header CTA                                                      |
| `NEXT_PUBLIC_GITHUB_ORG`                   | Optional   | Portfolio GitHub org link                                                                 |
| `GEMINI_API_KEY`                           | Server     | Chatbot (future API — no routes yet)                                                      |
| `SUPABASE_URL`                             | Server     | Chatbot backend                                                                           |
| `SUPABASE_SERVICE_ROLE_KEY`                | Server     | Chatbot backend (service role)                                                            |
| `GEMINI_EMBED_MODEL` / `GEMINI_CHAT_MODEL` | Optional   | Model overrides (defaults in `.env.example`)                                              |

### Verify setup (before first PR)

```bash
pnpm run lint
pnpm run typecheck
pnpm run test
pnpm run format:check
pnpm run build
```

Or single gate:

```bash
pnpm run ci:build
```

---

## Current Layout (Quick Reference)

| Area                | Path                                | Notes                                                              |
| ------------------- | ----------------------------------- | ------------------------------------------------------------------ |
| Routes & layouts    | `src/app/`                          | Thin `page.tsx`, sitemap, robots                                   |
| Page composition    | `src/widgets/`                      | Shell, header, footer, smoke tests                                 |
| Section UI          | `src/features/`                     | Per-domain sections + hooks                                        |
| Feature-local UI    | `src/features/<domain>/components/` | Org chart, gallery tiles, …                                        |
| Feature-local lib   | `src/features/<domain>/lib/`        | Pure helpers (team-level, accents)                                 |
| Shared UI           | `src/shared/ui/`                    | shadcn/Radix                                                       |
| V2 design UI        | `src/shared/ui-v2/`                 | `SectionShell`, `GlassCard`, …                                     |
| SEO                 | `src/lib/seo/` + `shared/seo/`      | Metadata + JSON-LD                                                 |
| Theme               | `src/shared/providers/`             | `theme-provider.tsx`                                               |
| Types               | `src/types/`                        | Shared contracts                                                   |
| Cross-cutting hooks | `src/hooks/`                        | **`use3d`** for 3D capability                                      |
| Content & 3D policy | `src/lib/content/`, `src/lib/3d/`   | Static data + performance guards                                   |
| **3D runtime**      | `src/3d/`                           | `@/3d`; home: `@/3d/hero-media`; events: `@/3d/events-hero-canvas` |
| Test mocks          | `src/test/`                         | Vitest browser setup                                               |

Use the `@/` alias (resolves to `src/`).

---

## Available Scripts

| Command                            | Description                                |
| ---------------------------------- | ------------------------------------------ |
| `pnpm run dev`                     | Next.js dev server                         |
| `pnpm run build`                   | Production build                           |
| `pnpm run start`                   | Production server (after `build`)          |
| `pnpm run lint` / `lint:fix`       | ESLint (`next lint`)                       |
| `pnpm run typecheck`               | TypeScript (`tsc --noEmit`)                |
| `pnpm run test`                    | Vitest single run (**48 tests**, 13 files) |
| `pnpm run test:watch`              | Vitest watch                               |
| `pnpm run format` / `format:check` | Prettier                                   |
| `pnpm run prepare`                 | Husky hooks                                |
| `pnpm run ci`                      | lint → typecheck → format:check → test     |
| `pnpm run ci:build`                | `ci` + build + bundle budget               |
| `pnpm run build:check`             | Build log + `bundle-budgets.json` check    |

### Lighthouse (Phase 4.4)

| Command                           | Description                                       |
| --------------------------------- | ------------------------------------------------- |
| `pnpm run lighthouse`             | Build + ephemeral server + mobile audit + budgets |
| `pnpm run lighthouse:local`       | Desktop / light throttle (Windows-friendly)       |
| `pnpm run lighthouse:local:soft`  | Local audit, exit 0 if budgets miss               |
| `pnpm run lighthouse:soft`        | Mobile audit, exit 0 if budgets miss              |
| `pnpm run lighthouse:audit`       | Audit only (`BASE_URL` required)                  |
| `pnpm run lighthouse:audit:local` | Audit only, local profile                         |

PowerShell soft mode: `pnpm run lighthouse:local:soft` (not `LIGHTHOUSE_SOFT=1 pnpm run …`).

Docs: [`docs/audits/lighthouse/README.md`](./docs/audits/lighthouse/README.md)

### Focused test runs

```bash
pnpm run test -- src/lib/3d/performance.test.ts
pnpm run test -- src/lib/seo/metadata.test.ts
pnpm run test -- src/lib/content/about-team.test.ts
pnpm run test -- src/features/about/hooks/use-about-team-tabs.test.ts
pnpm run test -- src/widgets/layout/header.test.tsx
```

### Git Hooks (Husky)

| Hook         | Action                              |
| ------------ | ----------------------------------- |
| `pre-commit` | `lint-staged` (ESLint + Prettier)   |
| `commit-msg` | `commitlint` (Conventional Commits) |

### CI Workflow

- **File:** [`.github/workflows/quality-gates.yml`](./.github/workflows/quality-gates.yml)
- **Triggers:** `pull_request`, `push` to `main` / `master` / `feature/next-gen-club-website` / `feature/activities-pages`, `workflow_dispatch`
- **Job `verify`:** lint → typecheck → format:check → test
- **Job `build`:** `next build` + bundle budget (`bundle-budgets.json`)
- **Cache:** pnpm + `.next/cache`

---

## Testing

| Layer         | Tool                   | Status                                              |
| ------------- | ---------------------- | --------------------------------------------------- |
| `lib/3d`      | Vitest (`node`)        | Performance policy tests                            |
| `lib/seo`     | Vitest (`node`)        | Metadata helpers                                    |
| `lib/content` | Vitest (`node`)        | `about-team.test.ts` (term logic)                   |
| Hooks         | Vitest + RTL (`jsdom`) | hero, header, shell, registration, about-team tabs  |
| Components    | RTL                    | `Header`, `BackToTop`, `Hero`, `timeline-event-row` |
| Widget smoke  | RTL                    | home, recruitment, events                           |
| E2E           | Playwright             | Optional (deferred)                                 |
| Lighthouse    | Scripts above          | `docs/audits/lighthouse/`                           |

**Total:** 48 tests across 13 files.

Config: `vitest.config.ts`, `vitest.setup.ts`, `src/test/setup-browser-mocks.ts`.

Mocks: `mockUsePathname` from `src/test/mocks.ts`.

### Coverage targets

| Layer               | Target              | Notes                        |
| ------------------- | ------------------- | ---------------------------- |
| `lib/3d`, `lib/seo` | High                | Pure functions               |
| `lib/content`       | Medium              | Team term resolution logic   |
| Hooks               | Medium              | Navigation, form, visibility |
| Features/widgets    | Smoke + critical UI | Headings, CTAs, 3D gate      |
| `src/3d`            | Policy + manual QA  | Runbook + Lighthouse         |

---

## TypeScript Paths

```json
{
  "@/*": ["./src/*"],
  "@/3d/*": ["./src/3d/*"],
  "@/shared/*": ["./src/shared/*"],
  "@/types/*": ["./src/types/*"]
}
```

**Rules:**

- UI: `@/shared/ui/...` only (no `@/components/ui/*`).
- 3D home: `@/3d/hero-media`; events: `@/3d/events-hero-canvas`.
- SEO: `@/lib/seo`, `<PageSeo />` from `@/shared/seo/page-seo`.
- No new app modules outside `src/`.

`*.test.ts(x)` excluded from `tsc`; run `pnpm run test`.

---

## Tooling Baseline

| Tool                     | Version / notes                                  |
| ------------------------ | ------------------------------------------------ |
| Package manager          | pnpm 10.32.1                                     |
| Next.js                  | 15.5.x                                           |
| React / React DOM        | 19.x                                             |
| TypeScript               | strict                                           |
| Tailwind CSS             | 3.x — scans `./src/**`                           |
| ESLint + Prettier        | CI + pre-commit                                  |
| Vitest + Testing Library | 48 tests (13 files)                              |
| R3F                      | `@react-three/fiber` v9, `@react-three/drei` v10 |
| Motion / scroll          | framer-motion, lenis, gsap                       |

**shadcn** (`components.json`): outputs to `@/shared/ui`.

---

## Adding UI with shadcn

```bash
pnpm dlx shadcn@latest add <component>
```

```ts
import { Button } from "@/shared/ui/button";
```

---

## SEO (new route)

1. Add path to `SITE_ROUTES` in `src/lib/seo/site.ts`.
2. Add `PAGE_SEO` entry in `src/lib/seo/page-config.ts`.
3. In `page.tsx`:

```tsx
import { createPageMetadata, PAGE_SEO } from "@/lib/seo";
import { PageSeo } from "@/shared/seo/page-seo";

export const metadata = createPageMetadata(PAGE_SEO.yourRoute);

export default function Page() {
  return (
    <>
      <PageSeo config={PAGE_SEO.yourRoute} />
      {/* widget content */}
    </>
  );
}
```

See [`docs/techtonic-v2/seo.md`](./docs/techtonic-v2/seo.md).

---

## Working with 3D

1. Read [`docs/techtonic-v2/3d-performance.md`](./docs/techtonic-v2/3d-performance.md).
2. Gate with `use3d()` from `@/hooks/use3d`.
3. **Home hero:** `@/3d/hero-media` (`HeroCanvasShell` + `HeroSceneLazy`).
4. **Events hero:** `@/3d/events-hero-canvas` (`EventsHeroCanvas`).
5. Other routes: `CanvasShell` from `@/3d` if needed.
6. Use `getSafeParticleCount` / `getSafeStarCount` from `@/lib/3d/performance`.

```tsx
"use client";

import { HeroCanvasShell, HeroSceneLazy } from "@/3d/hero-media";
import { use3d } from "@/hooks/use3d";

export function Hero() {
  const { shouldRenderMotion } = use3d();
  // …
  return shouldRenderMotion ? (
    <HeroCanvasShell className="absolute inset-0">
      <HeroSceneLazy />
    </HeroCanvasShell>
  ) : (
    /* image fallback */
  );
}
```

---

## Onboarding Checklist

- [ ] Clone, `pnpm install`, `pnpm run dev`
- [ ] Copy `.env.example` → `.env`; set `NEXT_PUBLIC_SITE_URL` if testing OG locally
- [ ] Read [`PROJECT_STRUCTURE.md`](./PROJECT_STRUCTURE.md)
- [ ] Read [`ARCHITECTURE.md`](./ARCHITECTURE.md) (ADRs 008–015)
- [ ] Read [`CODE_STYLE.md`](./CODE_STYLE.md)
- [ ] Read [`CONTRIBUTING.md`](./CONTRIBUTING.md)
- [ ] Read [`docs/techtonic-v2/seo.md`](./docs/techtonic-v2/seo.md) + [`3d-performance.md`](./docs/techtonic-v2/3d-performance.md)
- [ ] Trace home: `page.tsx` → `widgets/home` → `features/home`
- [ ] Trace about: `widgets/about` → `features/about/team` → `components/team-org-chart`
- [ ] Trace events: `widgets/events` → `features/events` → `events-hero-canvas`
- [ ] Run `pnpm run ci:build`
- [ ] Skim `.github/workflows/quality-gates.yml`
- [ ] Open a small Conventional Commit PR

---

## Daily Development Rules

1. Thin routes — compose in `widgets`, implement in `features`.
2. `@/shared/ui` + `@/shared/ui-v2`; home 3D via `@/3d/hero-media`, events via `@/3d/events-hero-canvas`.
3. No `@/components/*` imports.
4. Update `PAGE_SEO` + tests when adding routes.
5. Update docs when paths, budgets, or workflows change.

---

## Debug & Performance

| Topic       | Location                                                       |
| ----------- | -------------------------------------------------------------- |
| UI / layout | `src/features/home/*`, `src/widgets/layout/site-shell.tsx`     |
| About team  | `src/features/about/team.tsx`, `src/lib/content/about-team.ts` |
| Events      | `src/features/events/*`, `src/3d/events-hero-canvas.tsx`       |
| 3D runtime  | `src/3d/`, `src/lib/3d/performance.ts`, `src/hooks/use3d.ts`   |
| SEO         | `src/lib/seo/`, view source / Rich Results Test                |
| Content     | `src/lib/content/*`                                            |
| Bundle      | `pnpm run build:check`, `bundle-budgets.json`                  |

---

## Definition of Done (per change)

- [ ] Correct layer (`app` / `widgets` / `features` / `shared` / `lib` / `3d`)
- [ ] Dependency direction preserved
- [ ] Canonical `@/` imports
- [ ] `pnpm run ci` or `pnpm run ci:build` passes
- [ ] SEO / 3D docs + tests updated if contracts changed

---

## Related Docs

- [`PROJECT_STRUCTURE.md`](./PROJECT_STRUCTURE.md)
- [`ARCHITECTURE.md`](./ARCHITECTURE.md)
- [`CODE_STYLE.md`](./CODE_STYLE.md)
- [`CONTRIBUTING.md`](./CONTRIBUTING.md)
- [`DESIGN.md`](./DESIGN.md)
- [`CHANGELOG.md`](./CHANGELOG.md)
- [`docs/techtonic-v2/phase-plan.md`](./docs/techtonic-v2/phase-plan.md)
- [`docs/techtonic-v2/README.md`](./docs/techtonic-v2/README.md)
- [`README.md`](./README.md)
