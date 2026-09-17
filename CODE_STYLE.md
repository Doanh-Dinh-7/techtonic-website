# TechTonic V2.0 Code Style Guide

## Objective

Keep code maintainable, scalable, and consistent across the layered `src/` architecture **after V2.0** (canonical `src/3d`, SEO module, Next.js 15 + React 19, performance and a11y guardrails).

---

## General Engineering Rules

- Apply SOLID, DRY, KISS pragmatically.
- Prefer readability over clever abstractions.
- Keep modules focused and composable.
- Keep structural refactors **behavior-safe** by default.

---

## TypeScript Rules

- Strict mode stays enabled.
- Avoid `any`; if unavoidable, isolate and document.
- Prefer `interface` for shared object shapes.
- Shared contracts: `src/types/` or feature-local `types.ts`.
- Use `import type` for type-only imports.

---

## React and Next.js Rules

- **Server Components** by default in App Router.
- Add `"use client"` only when browser APIs, state, or effects are required.
- Keep `src/app/**/page.tsx` thin — `createPageMetadata`, `<PageSeo />`, delegate UI to `widgets`.
- Section UI in `features`; composition in `widgets`.
- Extract reusable stateful logic into hooks (`features/.../hooks`, `widgets/.../hooks`, `src/hooks`).

---

## Project Layout Rules (V2.0)

| Path                                 | Responsibility                               |
| ------------------------------------ | -------------------------------------------- |
| `src/app/`                           | Routes, metadata, sitemap, robots, layouts   |
| `src/widgets/`                       | Page composition, site chrome                |
| `src/features/`                      | Domain sections + feature hooks              |
| `src/features/<domain>/components/`  | Feature-scoped UI (org chart, gallery tiles) |
| `src/features/<domain>/lib/`         | Feature-scoped pure helpers                  |
| `src/shared/ui/`                     | shadcn/Radix (**canonical UI**)              |
| `src/shared/ui-v2/`                  | V2 design system                             |
| `src/shared/seo/`                    | JSON-LD presentation components              |
| `src/shared/a11y/`                   | Shared a11y helpers (e.g. sample labels)     |
| `src/shared/utils/`                  | `cn`, helpers                                |
| `src/lib/seo/`                       | Metadata + Schema.org builders               |
| `src/lib/content/`                   | Static content                               |
| `src/lib/3d/`                        | Pure 3D budgets (tested)                     |
| `src/3d/`                            | Canonical R3F runtime                        |
| `src/3d/hero-media.tsx`              | Home hero Rubik (`HeroRubiksCube`, SSR-safe) |
| `src/3d/events-hero-canvas.tsx`      | Events hero canvas (SSR-safe)                |
| `src/3d/departments-hero-canvas.tsx` | Departments hero canvas (SSR-safe)           |
| `src/3d/recruitment-page-canvas.tsx` | Recruitment backdrop canvas (SSR-safe)       |

**No `@/components/*` imports.** `src/components/` has been fully decommissioned.

### Import policy

| Use case            | Import                               |
| ------------------- | ------------------------------------ |
| UI primitive        | `@/shared/ui/...`                    |
| V2 component        | `@/shared/ui-v2/...`                 |
| Page SEO            | `@/lib/seo`, `@/shared/seo/...`      |
| Utils               | `@/shared/utils`                     |
| Home hero 3D        | `@/3d/hero-media` (`HeroRubiksCube`) |
| Events hero 3D      | `@/3d/events-hero-canvas`            |
| Departments hero 3D | `@/3d/departments-hero-canvas`       |
| Recruitment 3D      | `@/3d/recruitment-page-canvas`       |
| Other 3D            | `@/3d` or `@/3d/...`                 |
| 3D policy           | `@/lib/3d/performance`               |
| 3D capability       | `@/hooks/use3d`                      |

```ts
import { Button } from "@/shared/ui/button";
import { SectionShell } from "@/shared/ui-v2";
import { createPageMetadata, PAGE_SEO } from "@/lib/seo";
import { HeroRubiksCube } from "@/3d/hero-media";
import { EventsHeroCanvas } from "@/3d/events-hero-canvas";
import { DepartmentsHeroCanvas } from "@/3d/departments-hero-canvas";
import { RecruitmentPageCanvas } from "@/3d/recruitment-page-canvas";
import { getSafeParticleCount } from "@/lib/3d/performance";
import { use3d } from "@/hooks/use3d";
```

---

## 3D Conventions

- Home hero: **`HeroRubiksCube`** from `@/3d/hero-media` (dynamic `RubiksCubeController`, `ssr: false`).
- Events / Departments / Recruitment: dedicated `*-canvas.tsx` entry points (same dynamic / `ssr: false` pattern).
- Other scenes: `CanvasShell` + lazy loaders from `@/3d`.
- Gate with `use3d()` — respect `shouldRenderMotion` and `reducedMotion`.
- Home may also defer mount via `shouldMountRubik` from `use-hero-section`.
- Particle/star counts via `getSafeParticleCount` / `getSafeStarCount` only.
- Headings, CTAs, forms stay real HTML outside the canvas (`aria-hidden` on decorative canvas).
- 3D textures for models live in `public/` under a model namespace (e.g. `public/rubik-faces/`).

---

## SEO Conventions

- Per-route copy in `PAGE_SEO` (`src/lib/seo/page-config.ts`).
- `export const metadata = createPageMetadata(PAGE_SEO.x)` in `page.tsx`.
- `<PageSeo config={PAGE_SEO.x} />` for WebPage + Breadcrumb JSON-LD.
- Production deploy must set `NEXT_PUBLIC_SITE_URL`.

---

## Accessibility Conventions

- Site shell: skip link, `<main id="main-content">`, labeled `<nav>`.
- Interactive controls: visible focus, `aria-label` where icon-only.
- Sample content labels: `text-amber-800` via `@/shared/a11y/sample-label` or equivalent.
- Dialog triggers: use `<button>`, not `div` with `role="button"`.

---

## Naming Conventions

- **Files/folders:** `kebab-case`
- **Components:** `PascalCase`
- **Hooks:** `use` prefix (`use-hero-section.ts`)
- **Variables/functions:** `camelCase`
- **Constants:** `UPPER_SNAKE_CASE`

---

## Dependency Direction Rules

**Allowed:**

```text
app → widgets → features → entities → shared
app | widgets | features → src/3d
features → lib, hooks, types, shared
src/3d → lib/3d, hooks, shared/utils
```

**Not allowed:**

- `shared →` upper layers
- `lib/3d →` React in `src/3d` (keep policy pure)
- Cross-feature deep imports
- `@/components/*`

---

## Error Handling Standards

- Handle expected failures explicitly.
- User-friendly fallbacks (`WebGLFallback`, form toasts).

---

## Security Standards

- Validate inputs at boundaries.
- `target="_blank"` → `rel="noopener noreferrer"`.
- Never commit secrets (`.env` gitignored).

---

## Performance Standards

- Lazy-load 3D (`hero-media`, `*-hero-canvas`, `recruitment-page-canvas`, `scene-lazy`).
- Respect `src/lib/3d/performance.ts` budgets.
- Run `pnpm run build:check` when changing large client bundles.

---

## Testing Standards

- Colocate `*.test.ts(x)` with hooks/components or under `__tests__/`.
- Pure policy: `lib/3d`, `lib/seo`, `lib/content` — Vitest `node`.
- UI/hooks: Vitest + RTL + `src/test/setup-browser-mocks.ts`.
- Run `pnpm run test` before PR (48 tests, 14 files).

---

## Documentation Standards

- Update `PROJECT_STRUCTURE.md`, `ARCHITECTURE.md`, or this file when conventions change.
- Update `docs/techtonic-v2/seo.md` or `3d-performance.md` when those contracts change.

---

## Pull Request Quality Gates

| Check  | Command                 |
| ------ | ----------------------- |
| Lint   | `pnpm run lint`         |
| Types  | `pnpm run typecheck`    |
| Tests  | `pnpm run test`         |
| Format | `pnpm run format:check` |
| Build  | `pnpm run build`        |
| Full   | `pnpm run ci:build`     |

---

## Related Docs

- [`PROJECT_STRUCTURE.md`](./PROJECT_STRUCTURE.md)
- [`ARCHITECTURE.md`](./ARCHITECTURE.md)
- [`DEVELOPMENT_GUIDE.md`](./DEVELOPMENT_GUIDE.md)
- [`DESIGN.md`](./DESIGN.md)
- [`CONTRIBUTING.md`](./CONTRIBUTING.md)
- [`CHANGELOG.md`](./CHANGELOG.md)
- [`docs/techtonic-v2/README.md`](./docs/techtonic-v2/README.md)
- [`docs/techtonic-v2/seo.md`](./docs/techtonic-v2/seo.md)
- [`docs/techtonic-v2/3d-performance.md`](./docs/techtonic-v2/3d-performance.md)
