# TechTonic Refactor Progress

> Repository: `Doanh-Dinh-7/techtonic-website`  
> Branch: `feature/next-gen-club-website`  
> Last updated: `2026-05-28`

## Current Phase

**Phase 3 — 3D & Performance Hardening** | Status: **In Progress**

---

## Completed (Summary)

- **Phase 1:** Foundation & structure migration to `src/` completed.
- **Phase 2.1:** Tooling baseline completed (`lint`, `typecheck`, `format`, Husky, lint-staged, Commitlint).
- **Phase 2.2:** Shared layer + UI primitive mapping + shared contracts completed.
- **Phase 2.3:** Route composition migration to `widgets` + `features` completed.
- **Phase 2.4:** Behavior-safe quality refactor completed (hook extraction, client-boundary optimization, 3D reduced-motion/DPR tuning, JSDoc).
- **Post-2.4 initial hardening:** CI quality gates + Vitest baseline + first unit test completed.
- **Phase 2 closure:** Root `components/` decommissioned; implementations consolidated under `src/shared`, `src/features`, `src/widgets`.

---

## Current Status & Next Steps (Detailed)

### Phase 3.1 — 3D Runtime Consolidation (`src/components/3d` -> `src/3d`)

- [x] Define full migration map for canvas/scenes/effects/models/helpers.
- [ ] Migrate by safe batches with temporary compatibility re-exports.
- [ ] Keep import contracts stable during transition.
- [ ] Replace internal transitional imports with canonical target paths.
- [ ] Remove temporary re-exports only after reference validation.
- [ ] Sync `PROJECT_STRUCTURE.md` and `ARCHITECTURE.md` after completion.

#### Phase 3.1 Migration Map (Draft v1)

Source modules (`src/components/3d/*`):

- `canvas/canvas-shell.tsx`
- `canvas/webgl-fallback.tsx`
- `effects/camera-rig.tsx`
- `effects/particle-field.tsx`
- `models/cat-mascot.tsx`
- `models/floating-logo.tsx`
- `scenes/background-scene.tsx`
- `scenes/hero-scene.tsx`
- `index.ts`

Target structure (`src/3d/*`):

- `src/3d/canvas/*`
- `src/3d/effects/*`
- `src/3d/models/*`
- `src/3d/scenes/*`
- `src/3d/index.ts`

Behavior-safe execution batches:

1. **Batch A (Scaffold + compatibility):** create target folders and add re-export bridge from old paths.
2. **Batch B (Low-risk leaf modules):** migrate `effects/*` and `models/*`.
3. **Batch C (Scene modules):** migrate `scenes/*` and verify runtime behavior under reduced motion.
4. **Batch D (Canvas boundary):** migrate `canvas/*`, preserve fallback and hydration behavior.
5. **Batch E (Import cleanup):** switch canonical imports to `@/3d/*` and remove obsolete bridges.

### Phase 3.2 — 3D Performance Guardrails

- [ ] Define explicit runtime budgets (DPR, particles/stars caps, frameloop policy).
- [ ] Verify reduced-motion behavior across all active scenes.
- [ ] Ensure heavy 3D entrypoints are intentionally lazy-loaded.
- [ ] Add concise 3D performance runbook for maintainers.

#### Phase 3.2 Runtime Budget Baseline (Draft v1)

- DPR budget: keep adaptive cap at `1 -> 1.5` by default.
- Motion policy: enforce `"demand"` frameloop in reduced-motion mode.
- Particle/star budgets:
  - default: `particles 700`, `stars 650`
  - reduced motion: `particles 120`, `stars 180`
- Device awareness: maintain capability gate via `use3d` (`supportsWebGL`, `reducedMotion`).
- Action item: codify these values in docs/runbook and guard against accidental regressions with tests.

### Phase 3.3 — Testing Expansion

- [ ] Add unit tests for critical shared utilities (`src/lib/3d/*`, deterministic mappers/formatters).
- [ ] Add tests for extracted hooks:
  - [ ] `use-registration-form`
  - [ ] `use-site-shell-visibility`
  - [ ] `use-header-navigation`
  - [ ] `use-hero-section`
- [ ] Add smoke tests for critical routes (`/`, `/recruitment`, `/events`).
- [ ] Define minimum coverage target by layer (`shared`, `features`, `widgets`).

### Phase 3.4 — Legacy Bridge Reduction

- [x] Remove root `components/` directory; consolidate under `src/`.
- [x] Migrate section modules to `src/features/*` (full implementations, no re-export bridges).
- [x] Migrate UI primitives to `src/shared/ui`; V2 components to `src/shared/ui-v2`.
- [x] Migrate layout chrome to `src/widgets/layout/*`.
- [ ] Audit remaining `@/components/ui/*` imports in docs/snippets; prefer `@/shared/ui/*` in new code.
- [ ] Remove `@/components/ui/*` tsconfig alias after shadcn/snippets fully migrated (optional).

### Phase 3.5 — Next.js 15 Readiness

- [ ] Build compatibility checklist for dependencies/plugins.
- [ ] Create trial upgrade branch.
- [ ] Run full quality gates and compare with baseline behavior/performance.
- [ ] Capture breakpoints + mitigation actions.
- [ ] Prepare rollback notes + ADR update.

### Known Technical Debt

- [ ] `@/components/ui/*` alias still exists for shadcn compatibility (maps to `src/shared/ui`).
- [ ] 3D runtime consolidation to `src/3d` is pending.
- [ ] Test coverage is still baseline-level only.
- [ ] CI smoke tests for critical routes are not integrated yet.
- [ ] Phase 3 execution plan details for 3D migration batches are not finalized yet.

---

## Session Handoff (For AI/Developer)

### Current Codebase Snapshot

- Phase 1, 2.1, 2.2, 2.3, 2.4 are complete.
- Post-2.4 baseline hardening is active:
  - `.github/workflows/quality-gates.yml`
  - `vitest.config.ts`
  - `src/lib/3d/performance.test.ts`
- Architecture direction:
  - `app -> widgets -> features -> entities -> shared`
  - `app/widgets/features -> 3d` (transitional)

### Important Constraints

- Keep all refactors behavior-safe by default.
- Prefer canonical imports: `@/widgets/*`, `@/features/*`, `@/shared/ui/*`.
- All application code lives under `src/`; no root `components/` folder.
- Preserve reduced-motion/fallback behavior for 3D updates.
- Sync docs whenever architecture/workflow contracts change.

### Mandatory Quality Gates Per Meaningful Batch

```bash
npm run lint
npm run typecheck
npm run test
npm run format:check
npm run build
```

### Recommended Immediate Execution Order

1. Execute first safe batch for 3D folder consolidation.
2. Expand tests for extracted hooks and critical routes.
3. Continue 3D consolidation (`src/components/3d` → `src/3d`).
4. Start Next.js 15 readiness branch and compatibility validation.

---

## Changelog (Concise)

| Date       | Phase/Batch                                      | Summary                                                                                                                                      |
| ---------- | ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-05-28 | Phase 2.4 Complete                               | Hook extraction + client-boundary optimization + 3D reduced-motion/DPR tuning + JSDoc                                                        |
| 2026-05-28 | Post-Phase 2.4 Hardening (Init)                  | Added CI quality gates + Vitest baseline + initial unit test                                                                                 |
| 2026-05-28 | Documentation Sync                               | Synced architecture/structure/development/code-style docs with current codebase                                                              |
| 2026-05-28 | Documentation Consistency Pass (Phase 3 kickoff) | Harmonized PROJECT_STRUCTURE/ARCHITECTURE/DEVELOPMENT_GUIDE/CODE_STYLE/CONTRIBUTING/DESIGN and aligned dependency + quality gate terminology |
| 2026-05-28 | Phase 2 closure + docs sync                      | Removed root `components/`; updated PROJECT_STRUCTURE, ARCHITECTURE, DEVELOPMENT_GUIDE, CODE_STYLE; ADR-007                                  |
