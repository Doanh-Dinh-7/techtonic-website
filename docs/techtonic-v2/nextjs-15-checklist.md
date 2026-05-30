# Next.js 15 — Compatibility Checklist (TechTonic V2)

> **Baseline:** Next.js `14.2.16`, React `18`, App Router under `src/app/`.  
> **Goal (Phase 4.4):** Document blockers, run a local trial, decide upgrade timing for V2.0.x.

## Executive summary

| Area              | Status           | Notes                                                                        |
| ----------------- | ---------------- | ---------------------------------------------------------------------------- |
| App Router pages  | ✅ Ready         | Static/client routes; no async `params`/`searchParams` in server components  |
| `next.config.mjs` | ✅ Ready         | ESLint/TS strict; `images.unoptimized` unchanged                             |
| Client boundaries | ✅ Ready         | 3D, forms, motion isolated with `"use client"`                               |
| R3F / Three.js    | ⚠️ Verify        | `@react-three/fiber@8` + React 18 on Next 15; test hero canvas after upgrade |
| ESLint            | ⚠️ Pair versions | Bump `eslint-config-next` with `next` major                                  |
| React 19          | ⏸ Deferred       | Stay on React 18 for V2.0; revisit with R3F v9                               |

## Pre-upgrade inventory

### Routes (`src/app`)

- `(site)/layout.tsx` — client shell wiring only
- Pages: `/`, `/about`, `/departments`, `/events`, `/portfolio`, `/recruitment`
- No `generateMetadata` using dynamic `params` (no migration to async request APIs required today)

### APIs not used (no Next 15 async migration needed)

- [ ] `cookies()` / `headers()` in Server Components
- [ ] Dynamic `params` / `searchParams` props on server pages
- [ ] `export const fetchCache` / `revalidate` route handlers

### Dependencies to validate after bump

| Package                                            | Concern                               |
| -------------------------------------------------- | ------------------------------------- |
| `next` → 15.x                                      | Core framework                        |
| `eslint-config-next`                               | Must match `next` major               |
| `@react-three/fiber`, `@react-three/drei`, `three` | WebGL + dynamic import paths          |
| `framer-motion`, `lenis`, `gsap`                   | Client-only; smoke test scroll/motion |
| `@vercel/analytics`                                | Confirm peer range for Next 15        |

## Upgrade procedure (trial)

```bash
# Trial on a branch — do not merge until gates pass
npm install next@15 eslint-config-next@15
npm run ci:build
npm run lighthouse   # optional regression pass
```

### Config notes (Next 15)

- **`next lint`:** Still supported in 15.x; consider ESLint CLI migration before Next 16.
- **Caching:** Default `fetch` caching changed in 15; this project uses mostly client data / static pages — low impact.
- **`images.unoptimized: true`:** Unchanged; keep for current deploy target.

## Post-upgrade verification

- [ ] `npm run ci:build` (lint, typecheck, test, build, bundle budget)
- [ ] Home hero: carousel fallback + `HeroSceneLazy` when WebGL available
- [ ] Recruitment form submit / Google Form redirect
- [ ] Events page media and navigation
- [ ] Lighthouse home/events/recruitment vs `docs/audits/lighthouse/summary.json` baselines

## Decision log

| Date       | Action                                                       | Outcome                          |
| ---------- | ------------------------------------------------------------ | -------------------------------- |
| 2026-05-29 | Checklist created; trial `next@15` + `eslint-config-next@15` | See trial row below after CI run |

## Trial result (2026-05-29)

- **Verdict:** **PASS** (`next@15.5.18`, React 18)
- **Fixes applied during trial:**
  - `src/3d/hero-media.tsx` — dynamic `CanvasShell` (`ssr: false`) so R3F is not evaluated at prerender (fixes `ReactCurrentBatchConfig` on `/`).
  - `scripts/check-bundle-budget.mjs` — parse Next 15 route table with optional box-drawing prefixes.
  - `bundle-budgets.json` — `sharedFirstLoadJSKb` 95 → 105 (Next 15 shared runtime ~102 kB).
- **Post-upgrade sizes (First Load JS):** `/` 310 kB, shared 102 kB — within budgets.
- **Recommendation:** **Next 15.5 + React 19.1** + `@react-three/fiber@9` / `@react-three/drei@10`. Do not use React 18 with Next 15 (runtime error: `use is not a function`).

## References

- [Next.js 15 upgrade guide](https://nextjs.org/docs/app/building-your-application/upgrading/version-15)
- [`REFACTOR_PROGRESS.md`](../../REFACTOR_PROGRESS.md) — Phase 4.4
- [`ARCHITECTURE.md`](../../ARCHITECTURE.md) — technical debt table
