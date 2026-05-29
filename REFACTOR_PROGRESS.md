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
- **Post-2.4 hardening:** CI quality gates + Vitest + Prettier baseline — **complete**.
- **Phase 2 closure:** Root `components/` decommissioned; implementations under `src/shared`, `src/features`, `src/widgets`.
- **Phase 3.1:** Canonical `src/3d` runtime + `src/components/3d` deprecated bridge — **complete**.
- **Phase 3.2:** Performance guardrails (`getSafeStarCount`, runbook, expanded tests) — **complete**.
- **Documentation consistency pass (Phase 3):** Root docs + README synced — **complete**.

---

## Current Status & Next Steps (Detailed)

### Phase 3.1 — 3D Runtime Consolidation (`src/components/3d` → `src/3d`)

- [x] Define full migration map for canvas/scenes/effects/models/helpers.
- [x] Migrate implementations to `src/3d/*`.
- [x] Add deprecated re-export bridge under `src/components/3d/*`.
- [x] Add `@/3d/*` tsconfig path.
- [x] Add lazy scene entrypoints (`HeroSceneLazy`, `BackgroundSceneLazy`).
- [x] Sync `PROJECT_STRUCTURE.md` and `ARCHITECTURE.md` (ADR-008).
- [ ] Remove `src/components/3d` bridge after all imports use `@/3d`.

### Phase 3.2 — 3D Performance Guardrails

- [x] Codify runtime budgets in `src/lib/3d/performance.ts`.
- [x] Apply star/particle guards in scenes (`BackgroundScene`, `ParticleField`).
- [x] Lazy-load scene entrypoints via `src/3d/scene-lazy.tsx`.
- [x] Add maintainer runbook: `docs/techtonic-v2/3d-performance.md`.
- [x] Expand unit tests for star count/speed guards.
- [ ] Integrate 3D into home hero when design sign-off (optional polish batch).

#### Runtime Budget Baseline (Enforced)

| Setting    | Default    | Reduced motion |
| ---------- | ---------- | -------------- |
| DPR        | `[1, 1.5]` | `[1, 1.5]`     |
| Frameloop  | `always`   | `demand`       |
| Particles  | 700        | 120            |
| Stars      | 650        | 180            |
| Star speed | 0.28       | 0.08           |

### Phase 3.3 — Testing Expansion

- [x] Star/particle guard tests in `src/lib/3d/performance.test.ts`.
- [ ] Add tests for extracted hooks (`use-registration-form`, `use-site-shell-visibility`, `use-header-navigation`, `use-hero-section`).
- [ ] Add smoke tests for critical routes (`/`, `/recruitment`, `/events`).
- [ ] Define minimum coverage target by layer.

### Phase 3.4 — Legacy Bridge Reduction

- [x] Remove root `components/` directory.
- [x] Full implementations in `src/features/*` (no re-export bridges).
- [ ] Remove `src/components/3d` bridge after import audit.
- [ ] Optional: remove `@/components/ui/*` tsconfig alias after shadcn migration.

### Phase 3.5 — Next.js 15 Readiness

- [ ] Build compatibility checklist for dependencies/plugins.
- [ ] Create trial upgrade branch.
- [ ] Run full quality gates and compare with baseline behavior/performance.
- [ ] Capture breakpoints + mitigation actions.
- [ ] Prepare rollback notes + ADR update.

### Known Technical Debt

- [ ] `src/components/3d` deprecated bridge still present.
- [ ] `@/components/ui/*` alias for shadcn compatibility.
- [ ] Home hero not yet wired to `HeroSceneLazy` (3D-ready but optional).
- [ ] CI route smoke tests not integrated.
- [ ] `src/entities` layer unused.

---

## Session Handoff (For AI/Developer)

### Current Codebase Snapshot

- Phase 1, 2.x, Post-2.4 hardening: **complete**.
- Phase 3.1–3.2: **complete** (`src/3d`, performance runbook, lazy loaders).
- Architecture: `app → widgets → features → entities → shared` and `app/widgets/features → src/3d`.
- Canonical imports: `@/widgets/*`, `@/features/*`, `@/shared/ui/*`, `@/3d/*`.
- No root `components/` folder.

### Important Constraints

- Behavior-safe refactors by default.
- Preserve reduced-motion and WebGL fallback behavior.
- Do not raise 3D budgets without updating tests + `docs/techtonic-v2/3d-performance.md`.
- Sync docs when paths or layer contracts change.

### Mandatory Quality Gates Per Meaningful Batch

```bash
npm run lint
npm run typecheck
npm run test
npm run format:check
npm run build
```

### Recommended Immediate Execution Order

1. Wire `HeroSceneLazy` into `features/home/hero` behind `use3d().shouldRenderMotion` (design-approved).
2. Expand hook/route tests (Phase 3.3).
3. Audit and remove `src/components/3d` bridge.
4. Start Next.js 15 readiness branch.

---

## Changelog (Concise)

| Date       | Phase/Batch                        | Summary                                                                                   |
| ---------- | ---------------------------------- | ----------------------------------------------------------------------------------------- |
| 2026-05-28 | Phase 2.4 Complete                 | Hook extraction + client-boundary optimization + 3D reduced-motion/DPR tuning + JSDoc     |
| 2026-05-28 | Post-Phase 2.4 Hardening           | CI quality gates + Vitest baseline + initial unit test                                    |
| 2026-05-28 | Phase 2 closure + docs sync        | Removed root `components/`; ADR-007; updated core docs                                    |
| 2026-05-28 | Phase 3.1–3.2 + documentation pass | `src/3d` canonical runtime, lazy loaders, star guards, runbook, ADR-008, README/docs sync |
