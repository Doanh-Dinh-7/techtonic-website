# TechTonic V2.0 Project Structure

## Purpose

This document is the **source of truth** for repository layout after **V2.0 refactor completion** (Phases 1–4): FSD under `src/`, canonical `src/3d`, CI/testing, SEO, and Next.js 15.

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
| Phase 4.2 — Vitest / RTL (38 tests)               | **Complete** |
| Phase 4.3 — CI/CD (verify → build, bundle budget) | **Complete** |
| Phase 4.4 — SEO, a11y, Next.js 15, release prep   | **Complete** |

**Version:** `2.0.0` · **Stack:** Next.js 15.5 · React 19 · App Router

Details: [`REFACTOR_PROGRESS.md`](./REFACTOR_PROGRESS.md) · [`CHANGELOG.md`](./CHANGELOG.md)

---

## Canonical Tree (Current)

```text
techtonic-website/
├── src/
│   ├── app/                                    # App Router
│   │   ├── layout.tsx                          # Root: metadataBase, fonts, Analytics
│   │   ├── globals.css
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
│   │   │   └── hooks/
│   │   │       ├── use-site-shell-visibility.ts (+ .test.ts)
│   │   │       └── use-header-navigation.ts (+ .test.ts)
│   │   │   └── header.test.tsx
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
│   │   │   ├── hero.tsx (+ hero.test.tsx)      # HeroCanvasShell via @/3d/hero-media
│   │   │   ├── core-values.tsx, benefits.tsx, activities.tsx
│   │   │   ├── achievements.tsx, featured-news.tsx, testimonials.tsx
│   │   │   ├── contact.tsx, video.tsx
│   │   │   └── hooks/use-hero-section.ts (+ .test.ts)
│   │   ├── about/                              # about, timeline, gallery, team
│   │   ├── departments/departments-content.tsx
│   │   ├── events/events-content.tsx
│   │   ├── portfolio/portfolio-content.tsx
│   │   └── recruitment/
│   │       ├── registration.tsx, recruitment-faq.tsx
│   │       ├── recruitment-process-extra.tsx
│   │       └── hooks/use-registration-form.ts (+ .test.ts)
│   │
│   ├── shared/
│   │   ├── ui/                                 # shadcn/Radix (canonical)
│   │   ├── ui-v2/                              # V2: GlassCard, NeonButton, SectionShell, Card3D, GradientOrb
│   │   ├── seo/                                # JsonLd, PageSeo
│   │   ├── a11y/                               # sample-label contrast helper
│   │   ├── hooks/, utils/, providers/
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
│   │   ├── models/                             # floating-logo, cat-mascot
│   │   ├── scenes/                             # hero-scene, background-scene
│   │   ├── scene-lazy.tsx                      # HeroSceneLazy, BackgroundSceneLazy
│   │   ├── hero-media.tsx                      # HeroCanvasShell (dynamic, ssr: false)
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
├── public/                                     # Static assets (logo, fonts, images)
├── docs/
│   ├── techtonic-v2/                             # Product + engineering hub
│   ├── audits/lighthouse/                        # Lighthouse reports + README
│   ├── audits/accessibility/                     # Critical-flow a11y checklist
│   └── releases/v2.0.0.md
├── scripts/
│   ├── build-with-log.mjs, check-bundle-budget.mjs
│   ├── lighthouse-ci.mjs, run-lighthouse.mjs
│   ├── lighthouse-env-run.mjs, lighthouse-audit-local.mjs
├── .github/workflows/quality-gates.yml
├── bundle-budgets.json, lighthouse-budgets.json
├── vitest.config.ts, vitest.setup.ts
├── components.json, tailwind.config.ts, tsconfig.json, next.config.mjs
├── .env.example
└── README.md, ARCHITECTURE.md, PROJECT_STRUCTURE.md, DEVELOPMENT_GUIDE.md, …
```

### Legacy note

- **Do not use** `src/components/` — orphan bridge copies may still exist on disk; **zero imports** in app code. Canonical 3D is `@/3d` only.
- **No** repository-root `components/` folder.

### `src/lib/content/` modules

`awards.ts`, `blog-posts.ts`, `departments.ts`, `events.ts`, `faq.ts`, `news.ts`, `partners.ts`, `projects.ts`, `timeline.ts`, `types.ts`, `index.ts`

### `src/lib/seo/` modules

`site.ts`, `page-config.ts`, `metadata.ts`, `json-ld.ts`, `metadata.test.ts`, `index.ts`

---

## Folder Responsibilities

### `src/app`

Routing, `metadata` / `createPageMetadata`, `sitemap.ts`, `robots.ts`. Route `page.tsx` files stay thin; delegate UI to `widgets` + `PageSeo` JSON-LD.

### `src/widgets`

Per-route section ordering; site chrome (header, footer, shell, Lenis); composition hooks and smoke tests.

### `src/features`

Domain section UI and feature-local hooks. No cross-feature imports.

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

R3F canvas, scenes, effects, models, lazy loaders. Home hero uses `@/3d/hero-media` (`HeroCanvasShell`) for SSR-safe dynamic import.

### `src/test`

Vitest browser mocks (Next.js navigation, framer-motion, `matchMedia`, image).

### `src/entities`, `src/config`

Reserved for future domain modeling and app configuration.

---

## Import Conventions

`tsconfig` maps `@/*` → `./src/*`.

| Alias              | Resolves to          | Usage                         |
| ------------------ | -------------------- | ----------------------------- |
| `@/widgets/*`      | `src/widgets/*`      | Page composition              |
| `@/features/*`     | `src/features/*`     | Section modules               |
| `@/shared/ui/*`    | `src/shared/ui/*`    | UI primitives (**preferred**) |
| `@/shared/ui-v2/*` | `src/shared/ui-v2/*` | V2 design components          |
| `@/shared/seo/*`   | `src/shared/seo/*`   | JSON-LD components            |
| `@/shared/utils`   | `src/shared/utils`   | `cn`, helpers                 |
| `@/3d` / `@/3d/*`  | `src/3d`             | Canonical 3D runtime          |
| `@/3d/hero-media`  | `src/3d/hero-media`  | **Home hero** 3D (SSR-safe)   |
| `@/lib/seo`        | `src/lib/seo`        | Metadata & structured data    |
| `@/lib/*`          | `src/lib/*`          | Content and pure helpers      |
| `@/hooks/*`        | `src/hooks/*`        | Cross-cutting hooks           |
| `@/types/*`        | `src/types/*`        | Shared types                  |

### Recommended imports

```ts
import { Button } from "@/shared/ui/button";
import { SectionShell } from "@/shared/ui-v2";
import { createPageMetadata, PAGE_SEO } from "@/lib/seo";
import { HeroCanvasShell, HeroSceneLazy } from "@/3d/hero-media";
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

| You are building…         | Put it in…                                      |
| ------------------------- | ----------------------------------------------- |
| Route / SEO metadata      | `src/lib/seo/page-config.ts` + `page.tsx`       |
| JSON-LD per route         | `<PageSeo config={PAGE_SEO.x} />` in `page.tsx` |
| Section ordering          | `src/widgets/<route>/`                          |
| Section UI + logic        | `src/features/<domain>/`                        |
| shadcn primitive          | `src/shared/ui/`                                |
| V2 glass / neon / section | `src/shared/ui-v2/`                             |
| Static copy / data        | `src/lib/content/`                              |
| R3F scene / model         | `src/3d/` (+ `scene-lazy.tsx` for lazy routes)  |
| Home hero 3D shell        | `src/3d/hero-media.tsx`                         |
| 3D budget / guard         | `src/lib/3d/performance.ts` (+ tests)           |
| Shared type               | `src/types/`                                    |
| Colocated test            | `*.test.ts(x)` next to module or `__tests__/`   |

---

## Related Docs

- [`ARCHITECTURE.md`](./ARCHITECTURE.md)
- [`DEVELOPMENT_GUIDE.md`](./DEVELOPMENT_GUIDE.md)
- [`CODE_STYLE.md`](./CODE_STYLE.md)
- [`CONTRIBUTING.md`](./CONTRIBUTING.md)
- [`DESIGN.md`](./DESIGN.md)
- [`REFACTOR_PROGRESS.md`](./REFACTOR_PROGRESS.md)
- [`docs/techtonic-v2/README.md`](./docs/techtonic-v2/README.md)
- [`docs/techtonic-v2/seo.md`](./docs/techtonic-v2/seo.md)
- [`docs/techtonic-v2/3d-performance.md`](./docs/techtonic-v2/3d-performance.md)
- [`docs/techtonic-v2/nextjs-15-checklist.md`](./docs/techtonic-v2/nextjs-15-checklist.md)
