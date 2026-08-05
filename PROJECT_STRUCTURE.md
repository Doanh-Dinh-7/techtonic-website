# TechTonic V2.0 Project Structure

## Purpose

This document is the **source of truth** for repository layout after **V2.0** and post-release page expansion: FSD under `src/`, canonical `src/3d` (Home / Events / Departments / Recruitment), CI/testing, SEO, and Next.js 15.

Use it for onboarding, code review, and deciding where new files belong.

---

## Current Status

| Milestone                                         | Status       |
| ------------------------------------------------- | ------------ |
| Phase 1 — Foundation under `src/`                 | **Complete** |
| Phase 2.1–2.4 — Tooling, layers, hooks, 3D motion | **Complete** |
| Phase 2 closure — Root `components/` decommission | **Complete** |
| Phase 3 — 3D runtime + performance hardening      | **Complete** |
| Phase 4.1 — Documentation polish                  | **Complete** |
| Phase 4.2 — Vitest / RTL (48 tests, 14 files)     | **Complete** |
| Phase 4.3 — CI/CD (verify → build, bundle budget) | **Complete** |
| Phase 4.4 — SEO, a11y, Next.js 15, release prep   | **Complete** |
| Post-V2.0 — Page 3D + domain expansion            | **In tree**  |

**Version:** `2.0.0` · **Stack:** Next.js 15.5 · React 19 · App Router · **pnpm**  
**Default branch:** `main`

Details: [`CHANGELOG.md`](./CHANGELOG.md) · [`docs/techtonic-v2/phase-plan.md`](./docs/techtonic-v2/phase-plan.md)

---

## Canonical Tree (Current)

```text
techtonic-website/
├── src/
│   ├── app/                                    # App Router
│   │   ├── layout.tsx                          # Root: metadataBase, fonts, Analytics, SpeedInsights
│   │   ├── globals.css                         # Canonical global styles
│   │   ├── robots.ts                           # /robots.txt
│   │   ├── sitemap.ts                          # /sitemap.xml
│   │   └── (site)/
│   │       ├── layout.tsx                      # SiteShell + site JSON-LD
│   │       ├── page.tsx                        # Home (+ PageSeo)
│   │       ├── about/page.tsx
│   │       ├── departments/page.tsx
│   │       ├── events/page.tsx
│   │       ├── portfolio/page.tsx
│   │       └── recruitment/page.tsx
│   │
│   ├── widgets/                                # Page-level composition
│   │   ├── layout/
│   │   │   ├── site-shell.tsx                  # Skip link, main landmark
│   │   │   ├── header.tsx, footer.tsx
│   │   │   ├── lenis-provider.tsx
│   │   │   ├── animation-ready-provider.tsx
│   │   │   ├── theme-toggle.tsx
│   │   │   ├── header.test.tsx
│   │   │   └── hooks/
│   │   │       ├── use-site-shell-visibility.ts (+ .test.ts)
│   │   │       └── use-header-navigation.ts (+ .test.ts)
│   │   ├── home/
│   │   │   ├── home-page-sections.tsx
│   │   │   └── hash-scroll-handler.tsx
│   │   ├── about/about-page-sections.tsx
│   │   ├── departments/departments-page-content.tsx
│   │   ├── events/events-page-content.tsx
│   │   ├── portfolio/portfolio-page-content.tsx
│   │   ├── recruitment/recruitment-page-sections.tsx
│   │   └── __tests__/page-sections.smoke.test.tsx
│   │
│   ├── features/                               # Domain sections + hooks
│   │   ├── home/
│   │   │   ├── hero.tsx (+ hero.test.tsx)      # HeroRubiksCube via @/3d/hero-media
│   │   │   ├── core-values.tsx, benefits.tsx, activities.tsx (+ activities.test.tsx)
│   │   │   ├── achievements.tsx, featured-news.tsx, testimonials.tsx
│   │   │   ├── contact.tsx, video.tsx
│   │   │   ├── components/                     # testimonial-cat-avatar, …
│   │   │   └── hooks/use-hero-section.ts (+ .test.ts)
│   │   ├── about/
│   │   │   ├── about-content.tsx, about-hero.tsx, about-intro.tsx
│   │   │   ├── about-identity-section.tsx, about-timeline.tsx
│   │   │   ├── about-culture.tsx, about-benefits.tsx, about-fit.tsx
│   │   │   ├── about-video.tsx, gallery.tsx, team.tsx
│   │   │   ├── components/                     # team-org-*, about-hero-*, timeline-*, …
│   │   │   ├── hooks/use-about-team-tabs.ts (+ .test.ts)
│   │   │   └── lib/team-level.ts
│   │   ├── departments/
│   │   │   ├── departments-content.tsx, departments-hero.tsx
│   │   │   ├── departments-book-section.tsx
│   │   │   ├── departments-structure-section.tsx
│   │   │   ├── departments-recruitment-section.tsx
│   │   │   ├── components/                     # book, org-chart, …
│   │   │   └── lib/department-colors.ts
│   │   ├── events/
│   │   │   ├── events-content.tsx, events-hero.tsx
│   │   │   ├── weekly-academic-section.tsx, happy-hour-section.tsx
│   │   │   ├── event-timeline-section.tsx, stellar-gallery-section.tsx
│   │   │   ├── moments-gallery-section.tsx
│   │   │   ├── components/                     # activity-card, timeline-event-row (+ test), …
│   │   │   └── lib/accent-styles.ts
│   │   ├── portfolio/portfolio-content.tsx
│   │   └── recruitment/
│   │       ├── recruitment-content.tsx         # Backdrop + registration + FAQ
│   │       ├── registration.tsx, recruitment-faq.tsx
│   │       ├── recruitment-process-extra.tsx
│   │       ├── components/recruitment-page-backdrop.tsx
│   │       └── hooks/use-registration-form.ts (+ .test.ts)
│   │
│   ├── shared/
│   │   ├── ui/                                 # shadcn/Radix (canonical)
│   │   ├── ui-v2/                              # V2: GlassCard, NeonButton, SectionShell, Card3D, GradientOrb
│   │   ├── seo/                                # JsonLd, PageSeo
│   │   ├── a11y/                               # sample-label contrast helper
│   │   ├── hooks/                              # use-mobile, use-toast, use-shift-wheel-horizontal-scroll
│   │   ├── utils/, providers/
│   │   └── constants/, config/, styles/        # Reserved placeholders
│   │
│   ├── types/                                  # common.ts, ui.ts, index.ts
│   │
│   ├── hooks/                                  # Cross-cutting
│   │   └── use3d.ts, useTimeline.ts, use-toast.ts, use-mobile.tsx
│   │
│   ├── lib/
│   │   ├── content/                            # Static data (see list below)
│   │   ├── seo/                                # site, page-config, metadata, json-ld
│   │   ├── 3d/                                 # Pure 3D policy (tested)
│   │   │   ├── performance.ts, constants.ts, materials.ts
│   │   │   └── performance.test.ts
│   │   ├── utils.ts
│   │   └── analytics/, api-client/, security/   # Reserved
│   │
│   ├── 3d/                                     # Canonical R3F runtime
│   │   ├── canvas/                             # canvas-shell, webgl-fallback
│   │   ├── effects/                            # camera-rig, particle-field
│   │   ├── models/
│   │   │   ├── floating-logo.tsx, cat-mascot.tsx
│   │   │   └── rubiks-cube/                    # model, scene, controller, hooks, utils
│   │   ├── scenes/                             # hero, background, events, departments, recruitment
│   │   ├── scene-lazy.tsx                      # BackgroundSceneLazy, EventsHeroSceneLazy
│   │   ├── hero-media.tsx                      # HeroRubiksCube (home, dynamic, ssr: false)
│   │   ├── events-hero-canvas.tsx              # EventsHeroCanvas (/events)
│   │   ├── departments-hero-canvas.tsx         # DepartmentsHeroCanvas (/departments)
│   │   ├── recruitment-page-canvas.tsx         # RecruitmentPageCanvas (/recruitment)
│   │   ├── index.ts
│   │   └── README.md
│   │
│   ├── test/                                   # Vitest shared mocks
│   │   ├── setup-browser-mocks.ts
│   │   └── mocks.ts
│   │
│   ├── entities/                               # Reserved (post–V2.0)
│   └── config/                                 # Reserved (post–V2.0)
│
├── public/
│   ├── rubik-faces/                            # 6 JPG textures for Rubik 3D model
│   ├── hero/, gallery/, founders/, ban_chu_nhiem/
│   ├── activity/, achievement/, testimonials/
│   └── element/, fonts/, …
│
├── styles/
│   └── globals.css                             # Legacy — not imported; use src/app/globals.css
│
├── docs/
│   ├── techtonic-v2/                           # Product + engineering hub
│   ├── audits/lighthouse/                      # Lighthouse reports + README
│   ├── audits/accessibility/                   # Critical-flow a11y checklist
│   └── releases/v2.0.0.md
│
├── scripts/
│   ├── build-with-log.mjs, check-bundle-budget.mjs
│   ├── lighthouse-ci.mjs, run-lighthouse.mjs
│   ├── lighthouse-env-run.mjs, lighthouse-audit-local.mjs
│
├── .github/workflows/quality-gates.yml
├── .husky/                                     # pre-commit, commit-msg hooks
├── .agents/skills/                             # Cursor agent skills (deploy, optimize, …)
│
├── bundle-budgets.json, lighthouse-budgets.json
├── pnpm-lock.yaml                              # Lockfile (packageManager: pnpm@10.32.1)
├── vitest.config.ts, vitest.setup.ts
├── components.json, tailwind.config.ts, tsconfig.json, next.config.mjs
├── .env.example
└── README.md, ARCHITECTURE.md, PROJECT_STRUCTURE.md, DEVELOPMENT_GUIDE.md, …
```

### Legacy note

- **No** repository-root `components/` folder and **no** `src/components/` — fully decommissioned.
- Canonical CSS: `src/app/globals.css`. Root `styles/globals.css` is legacy and not imported.

### `src/lib/content/` modules

`about.ts`, `about-team.ts` (+ `about-team.test.ts`), `awards.ts`, `blog-posts.ts`, `departments.ts`, `events.ts`, `faq.ts`, `home.ts`, `home-activities.ts`, `news.ts`, `partners.ts`, `projects.ts`, `recruitment.ts`, `recruitment-process.ts`, `timeline.ts`, `types.ts`, `index.ts`

> `index.ts` re-exports most modules; `recruitment.ts` / `recruitment-process.ts` may be imported directly until exported from the barrel.

### `src/lib/seo/` modules

`site.ts`, `page-config.ts`, `metadata.ts`, `json-ld.ts`, `metadata.test.ts`, `index.ts`

### Test files (14 files, 48 tests)

`lib/3d/performance.test.ts`, `lib/seo/metadata.test.ts`, `lib/content/about-team.test.ts`, `features/home/hero.test.tsx`, `features/home/activities.test.tsx`, `features/home/hooks/use-hero-section.test.ts`, `features/about/hooks/use-about-team-tabs.test.ts`, `features/events/components/timeline-event-row.test.tsx`, `features/recruitment/hooks/use-registration-form.test.ts`, `widgets/layout/header.test.tsx`, `widgets/layout/hooks/use-header-navigation.test.ts`, `widgets/layout/hooks/use-site-shell-visibility.test.ts`, `widgets/__tests__/page-sections.smoke.test.tsx`, `shared/ui/back-to-top.test.tsx`

---

## Folder Responsibilities

### `src/app`

Routing, `metadata` / `createPageMetadata`, `sitemap.ts`, `robots.ts`. Root layout mounts Vercel Analytics + Speed Insights. Route `page.tsx` files stay thin; delegate UI to `widgets` + `PageSeo` JSON-LD.

### `src/widgets`

Per-route section ordering; site chrome (header, footer, shell, Lenis, theme toggle, animation-ready); composition hooks and smoke tests.

### `src/features`

Domain section UI and feature-local hooks. No cross-feature imports.

- **`components/`** — UI scoped to one feature (org chart, book, backdrop, gallery tiles).
- **`lib/`** — Pure helpers scoped to one feature (e.g. `team-level.ts`, `accent-styles.ts`, `department-colors.ts`).

### `src/shared`

- **ui** — shadcn/Radix (`@/shared/ui`).
- **ui-v2** — V2 visuals (`SectionShell` with `tone`, `GlassCard`, …).
- **seo** — `JsonLd`, `PageSeo` wrappers.
- **a11y** — shared a11y tokens/helpers.
- **hooks / utils / providers** — dependency-light shared code.

### `src/types`

Shared TypeScript contracts.

### `src/hooks` and `src/lib`

- **hooks** — `use3d`, `useTimeline`, toast, mobile.
- **lib/content** — static copy and structured lists.
- **lib/seo** — metadata builders and Schema.org JSON-LD.
- **lib/3d** — testable performance budgets (no React).

### `src/3d`

R3F canvas, scenes, effects, models, lazy loaders. Prefer **per-route SSR-safe canvas entry points**:

| Route          | Entry                                                    |
| -------------- | -------------------------------------------------------- |
| `/` (home)     | `@/3d/hero-media` → `HeroRubiksCube`                     |
| `/events`      | `@/3d/events-hero-canvas` → `EventsHeroCanvas`           |
| `/departments` | `@/3d/departments-hero-canvas` → `DepartmentsHeroCanvas` |
| `/recruitment` | `@/3d/recruitment-page-canvas` → `RecruitmentPageCanvas` |

Textures for Rubik: `public/rubik-faces/`.

### `src/test`

Vitest browser mocks (Next.js navigation, framer-motion, `matchMedia`, image).

### `src/entities`, `src/config`

Reserved for future domain modeling and app configuration.

---

## Import Conventions

`tsconfig` maps `@/*` → `./src/*`.

| Alias                          | Resolves to                      | Usage                          |
| ------------------------------ | -------------------------------- | ------------------------------ |
| `@/widgets/*`                  | `src/widgets/*`                  | Page composition               |
| `@/features/*`                 | `src/features/*`                 | Section modules                |
| `@/shared/ui/*`                | `src/shared/ui/*`                | UI primitives (**preferred**)  |
| `@/shared/ui-v2/*`             | `src/shared/ui-v2/*`             | V2 design components           |
| `@/shared/seo/*`               | `src/shared/seo/*`               | JSON-LD components             |
| `@/shared/utils`               | `src/shared/utils`               | `cn`, helpers                  |
| `@/3d` / `@/3d/*`              | `src/3d`                         | Canonical 3D runtime           |
| `@/3d/hero-media`              | `src/3d/hero-media`              | **Home hero** Rubik (SSR-safe) |
| `@/3d/events-hero-canvas`      | `src/3d/events-hero-canvas`      | **Events** 3D                  |
| `@/3d/departments-hero-canvas` | `src/3d/departments-hero-canvas` | **Departments** 3D             |
| `@/3d/recruitment-page-canvas` | `src/3d/recruitment-page-canvas` | **Recruitment** 3D backdrop    |
| `@/lib/seo`                    | `src/lib/seo`                    | Metadata & structured data     |
| `@/lib/*`                      | `src/lib/*`                      | Content and pure helpers       |
| `@/hooks/*`                    | `src/hooks/*`                    | Cross-cutting hooks            |
| `@/types/*`                    | `src/types/*`                    | Shared types                   |

### Recommended imports

```ts
import { Button } from "@/shared/ui/button";
import { SectionShell } from "@/shared/ui-v2";
import { createPageMetadata, PAGE_SEO } from "@/lib/seo";
import { HeroRubiksCube } from "@/3d/hero-media";
import { EventsHeroCanvas } from "@/3d/events-hero-canvas";
import { DepartmentsHeroCanvas } from "@/3d/departments-hero-canvas";
import { RecruitmentPageCanvas } from "@/3d/recruitment-page-canvas";
import { use3d } from "@/hooks/use3d";
import { clubTimeline } from "@/lib/content/timeline";
```

---

## Dependency Direction

**Allowed:**

```text
app → widgets → features → entities → shared
app | widgets | features → src/3d
features → lib, hooks, types, shared
src/3d → lib/3d, hooks, shared/utils
```

**Disallowed:**

- `shared → features | widgets | app`
- Cross-feature deep imports
- Circular dependencies
- `@/components/*` or new permanent modules outside `src/` (except tooling, `public`, `docs`, `.github`)

---

## Where to Put New Code

| You are building…              | Put it in…                                      |
| ------------------------------ | ----------------------------------------------- |
| Route / SEO metadata           | `src/lib/seo/page-config.ts` + `page.tsx`       |
| JSON-LD per route              | `<PageSeo config={PAGE_SEO.x} />` in `page.tsx` |
| Section ordering               | `src/widgets/<route>/`                          |
| Section UI + logic             | `src/features/<domain>/`                        |
| Feature-only UI                | `src/features/<domain>/components/`             |
| Feature-only pure helper       | `src/features/<domain>/lib/`                    |
| shadcn primitive               | `src/shared/ui/`                                |
| V2 glass / neon / section      | `src/shared/ui-v2/`                             |
| Static copy / data             | `src/lib/content/`                              |
| R3F scene / model              | `src/3d/` (+ lazy/`dynamic` for route entry)    |
| Home hero 3D (Rubik)           | `src/3d/hero-media.tsx`                         |
| Events / Departments / Recruit | matching `*-canvas.tsx` under `src/3d/`         |
| 3D model (Rubik, mascot)       | `src/3d/models/`                                |
| 3D budget / guard              | `src/lib/3d/performance.ts` (+ tests)           |
| Shared type                    | `src/types/`                                    |
| Colocated test                 | `*.test.ts(x)` next to module or `__tests__/`   |

---

## Related Docs

- [`ARCHITECTURE.md`](./ARCHITECTURE.md)
- [`DEVELOPMENT_GUIDE.md`](./DEVELOPMENT_GUIDE.md)
- [`CODE_STYLE.md`](./CODE_STYLE.md)
- [`CONTRIBUTING.md`](./CONTRIBUTING.md)
- [`DESIGN.md`](./DESIGN.md)
- [`CHANGELOG.md`](./CHANGELOG.md)
- [`docs/techtonic-v2/phase-plan.md`](./docs/techtonic-v2/phase-plan.md)
- [`docs/techtonic-v2/README.md`](./docs/techtonic-v2/README.md)
- [`docs/techtonic-v2/seo.md`](./docs/techtonic-v2/seo.md)
- [`docs/techtonic-v2/3d-performance.md`](./docs/techtonic-v2/3d-performance.md)
- [`docs/techtonic-v2/nextjs-15-checklist.md`](./docs/techtonic-v2/nextjs-15-checklist.md)
