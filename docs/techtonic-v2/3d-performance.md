# 3D Performance Runbook (Phase 3)

## Purpose

Codify runtime budgets and guardrails for R3F scenes so performance and accessibility do not regress during V2 polish.

## Source of Truth (Code)

| Module                               | Role                                                    |
| ------------------------------------ | ------------------------------------------------------- |
| `src/lib/3d/performance.ts`          | DPR, frameloop, particle/star budgets + guard functions |
| `src/lib/3d/constants.ts`            | Colors, camera defaults                                 |
| `src/hooks/use3d.ts`                 | WebGL support + `prefers-reduced-motion`                |
| `src/3d/canvas/canvas-shell.tsx`     | Applies DPR/frameloop/fallback                          |
| `src/3d/effects/particle-field.tsx`  | Particle cap via `getSafeParticleCount`                 |
| `src/3d/scenes/background-scene.tsx` | Star cap via `getSafeStarCount` / `getSafeStarSpeed`    |

## Runtime Budgets

| Key             | Default    | Reduced motion |
| --------------- | ---------- | -------------- |
| `dpr`           | `[1, 1.5]` | `[1, 1.5]`     |
| `frameloop`     | `always`   | `demand`       |
| `particleCount` | 700        | 120            |
| `stars.count`   | 650        | 180            |
| `stars.speed`   | 0.28       | 0.08           |

Do not raise these values in PRs without profiling notes and test updates.

## Checklist (Per 3D Change)

- [ ] Uses `CanvasShell` (or documents why not).
- [ ] Respects `use3d` / reduced-motion paths.
- [ ] Particle/star counts go through guard helpers.
- [ ] Heavy scenes loaded via `HeroSceneLazy` / `BackgroundSceneLazy`.
- [ ] Critical content remains HTML outside the canvas.
- [ ] `npm run test` includes/updates `performance.test.ts` when budgets change.

## Regression Tests

```bash
npm run test -- src/lib/3d/performance.test.ts
```

## Related Docs

- [`../../src/3d/README.md`](../../src/3d/README.md)
- [`../../DESIGN.md`](../../DESIGN.md)
- [`../../ARCHITECTURE.md`](../../ARCHITECTURE.md)
