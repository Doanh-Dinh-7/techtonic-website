# TechTonic V2.0 Project Structure

## Purpose

This document is the source of truth for repository layout after **Phase 2 refactor completion** and the start of **Phase 3** (3D consolidation, testing expansion, performance hardening).

Use it for onboarding, code review, and deciding where new files should be created.

---

## Current Status

| Milestone                                                 | Status          |
| --------------------------------------------------------- | --------------- |
| Phase 1 — Foundation under `src/`                         | **Complete**    |
| Phase 2.1 — Tooling baseline                              | **Complete**    |
| Phase 2.2 — Shared layer + UI primitives                  | **Complete**    |
| Phase 2.3 — `widgets` + `features` route composition      | **Complete**    |
| Phase 2.4 — Hook extraction, client boundaries, 3D guards | **Complete**    |
| Post-2.4 — CI quality gates, Vitest, Prettier baseline    | **Complete**    |
| Phase 2 closure — Legacy `components/` decommission       | **Complete**    |
| Phase 3 — 3D runtime (`src/3d`), tests, performance       | **In progress** |

---

## Canonical Tree (Current)

```text
techtonic-website/
├── src/
│   ├── app/                              # App Router (routes, layouts, global CSS)
│   │   ├── layout.tsx
│   │   ├── globals.css
│   │   └── (site)/
│   │       ├── layout.tsx                # SiteShell wrapper
│   │       ├── page.tsx                  # Home
│   │       ├── about/page.tsx
│   │       ├── departments/page.tsx
│   │       ├── events/page.tsx
│   │       ├── portfolio/page.tsx
│   │       └── recruitment/page.tsx
│   │
│   ├── widgets/                          # Page-level composition (thin orchestration)
│   │   ├── layout/
│   │   │   ├── site-shell.tsx
│   │   │   ├── header.tsx
│   │   │   ├── footer.tsx
│   │   │   ├── lenis-provider.tsx
│   │   │   └── hooks/
│   │   │       ├── use-site-shell-visibility.ts
│   │   │       └── use-header-navigation.ts
│   │   ├── home/
│   │   │   ├── home-page-sections.tsx
│   │   │   └── hash-scroll-handler.tsx
│   │   ├── about/about-page-sections.tsx
│   │   ├── departments/departments-page-content.tsx
│   │   ├── events/events-page-content.tsx
│   │   ├── portfolio/portfolio-page-content.tsx
│   │   └── recruitment/recruitment-page-sections.tsx
│   │
│   ├── features/                         # Domain section UI + feature hooks
│   │   ├── home/
│   │   │   ├── hero.tsx
│   │   │   ├── core-values.tsx, benefits.tsx, activities.tsx
│   │   │   ├── achievements.tsx, featured-news.tsx, testimonials.tsx
│   │   │   ├── contact.tsx, video.tsx
│   │   │   └── hooks/use-hero-section.ts
│   │   ├── about/
│   │   │   ├── about.tsx, about-timeline.tsx, gallery.tsx, team.tsx
│   │   ├── departments/departments-content.tsx
│   │   ├── events/events-content.tsx
│   │   ├── portfolio/portfolio-content.tsx
│   │   └── recruitment/
│   │       ├── registration.tsx, recruitment-faq.tsx
│   │       ├── recruitment-process-extra.tsx
│   │       └── hooks/use-registration-form.ts
│   │
│   ├── shared/                           # Reusable, low-coupling building blocks
│   │   ├── ui/                           # shadcn/Radix primitives (canonical)
│   │   ├── ui-v2/                         # V2 design system (glass, neon, 3D cards)
│   │   ├── hooks/                        # Shared hook re-exports
│   │   ├── utils/                        # `cn` and shared helpers
│   │   ├── providers/theme-provider.tsx
│   │   ├── constants/, config/, styles/   # Reserved / placeholders
│   │
│   ├── types/                            # Shared TS contracts
│   │   ├── common.ts, ui.ts, index.ts
│   │
│   ├── hooks/                            # Cross-cutting hooks
│   │   ├── use3d.ts, useTimeline.ts
│   │   ├── use-toast.ts, use-mobile.tsx
│   │
│   ├── lib/                              # Content, utilities, 3D helpers
│   │   ├── content/                      # Static content modules
│   │   ├── 3d/                           # Testable performance/constants
│   │   ├── utils.ts
│   │   └── analytics/, api-client/, security/  # Reserved placeholders
│   │
│   ├── components/3d/                    # R3F runtime (transitional → `src/3d`)
│   │   ├── canvas/, scenes/, effects/, models/
│   │   └── index.ts
│   │
│   ├── 3d/                               # Reserved target for 3D consolidation
│   ├── entities/                         # Reserved (Phase 3+)
│   └── config/                           # Reserved (Phase 3+)
│
├── public/                               # Static assets
├── docs/techtonic-v2/                    # Product/phase planning docs
├── .github/workflows/quality-gates.yml   # CI pipeline
├── .husky/                               # Git hooks
├── vitest.config.ts
├── components.json                       # shadcn CLI → `@/shared/ui`
├── tailwind.config.ts
├── tsconfig.json
├── next.config.mjs
├── ARCHITECTURE.md
├── PROJECT_STRUCTURE.md
├── DEVELOPMENT_GUIDE.md
└── CODE_STYLE.md
```

> **Note:** Root `components/` no longer exists. All UI and section code lives under `src/`.

---

## Folder Responsibilities

### `src/app`

- Routing, metadata, root and site layouts.
- Route files stay thin; delegate to `src/widgets/*`.

### `src/widgets`

- Per-route composition: which features render, in what order.
- Site chrome: `layout/` (header, footer, shell, smooth scroll).
- Small composition hooks (hash scroll, shell visibility, header nav).

### `src/features`

- Self-contained section components per domain (`home`, `about`, `recruitment`, …).
- Feature-scoped hooks co-located under `features/<domain>/hooks/`.

### `src/shared`

- **ui** — Canonical shadcn/Radix primitives; import via `@/shared/ui` or `@/shared/ui/<file>`.
- **ui-v2** — V2 visual components (`GlassCard`, `NeonButton`, `SectionShell`, …).
- **hooks / utils / providers** — Shared utilities without domain knowledge.

### `src/types`

- Cross-cutting TypeScript contracts (`common`, `ui`, barrel `index`).

### `src/hooks` and `src/lib`

- **hooks** — App-wide hooks (`use3d`, `useTimeline`, toast, mobile).
- **lib/content** — Static copy/data for sections.
- **lib/3d** — Pure 3D helpers (performance guards, constants); unit-tested.

### `src/components/3d` (transitional)

- React Three Fiber scenes, canvas shell, effects, models.
- **Target:** migrate to `src/3d/` (Phase 3.1).

### `src/entities`, `src/config`, `src/3d`

- Reserved placeholders for upcoming phases.

### `.github/workflows`

- Automated quality gates on PR/push.

---

## Import Conventions

`tsconfig` maps `@/*` → `./src/*` only (no root fallback).

| Alias               | Resolves to           | Usage                                              |
| ------------------- | --------------------- | -------------------------------------------------- |
| `@/widgets/*`       | `src/widgets/*`       | Page composition                                   |
| `@/features/*`      | `src/features/*`      | Section modules                                    |
| `@/shared/ui/*`     | `src/shared/ui/*`     | UI primitives (**preferred**)                      |
| `@/shared/ui-v2/*`  | `src/shared/ui-v2/*`  | V2 design components                               |
| `@/shared/utils`    | `src/shared/utils`    | `cn`, helpers                                      |
| `@/shared/hooks/*`  | `src/shared/hooks/*`  | Shared hooks                                       |
| `@/types/*`         | `src/types/*`         | Shared types                                       |
| `@/lib/*`           | `src/lib/*`           | Content & utilities                                |
| `@/hooks/*`         | `src/hooks/*`         | Cross-cutting hooks                                |
| `@/components/ui/*` | `src/shared/ui/*`     | **Compatibility alias only** (shadcn legacy paths) |
| `@/components/3d/*` | `src/components/3d/*` | 3D runtime (via `@/*` + path segment)              |

### Recommended imports (new code)

```ts
import { Button } from "@/shared/ui/button";
import { Hero } from "@/features/home/hero";
import { SiteShell } from "@/widgets/layout/site-shell";
import { clubTimeline } from "@/lib/content/timeline";
```

### Avoid

- New modules outside `src/` (except config, `public`, `docs`, `.github`).
- Deep imports across unrelated features.
- Re-introducing a root `components/` folder.

---

## Dependency Direction

**Allowed:**

```text
app → widgets → features → entities → shared
app | widgets | features → src/components/3d (or future src/3d)
features → lib/content, hooks, types, shared
```

**Disallowed:**

- `shared → features | widgets | app`
- Cross-feature internal imports (import via widget composition or shared contracts)
- Circular dependencies

---

## Where to Put New Code

| You are building…           | Put it in…                                      |
| --------------------------- | ----------------------------------------------- |
| New route / page metadata   | `src/app/(site)/<route>/page.tsx`               |
| Page section ordering       | `src/widgets/<route>/`                          |
| Section UI + section logic  | `src/features/<domain>/`                        |
| Reusable button/card/dialog | `src/shared/ui/` (shadcn CLI)                   |
| V2 glass/neon/3D card       | `src/shared/ui-v2/`                             |
| Static copy / lists         | `src/lib/content/`                              |
| R3F scene or model          | `src/components/3d/` (until `src/3d` migration) |
| Shared type                 | `src/types/`                                    |

---

## Related Docs

- [`ARCHITECTURE.md`](./ARCHITECTURE.md)
- [`DEVELOPMENT_GUIDE.md`](./DEVELOPMENT_GUIDE.md)
- [`CODE_STYLE.md`](./CODE_STYLE.md)
- [`REFACTOR_PROGRESS.md`](./REFACTOR_PROGRESS.md)
- [`docs/techtonic-v2/`](./docs/techtonic-v2/)
