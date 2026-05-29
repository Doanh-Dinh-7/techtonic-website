# 3D Runtime (`src/3d`)

Canonical React Three Fiber runtime for TechTonic V2.0.

## Structure

| Path             | Responsibility                       |
| ---------------- | ------------------------------------ |
| `canvas/`        | `CanvasShell`, `WebGLFallback`       |
| `effects/`       | `CameraRig`, `ParticleField`         |
| `models/`        | `FloatingLogo`, `CatMascot`          |
| `scenes/`        | `HeroScene`, `BackgroundScene`       |
| `scene-lazy.tsx` | `next/dynamic` entrypoints (SSR off) |
| `index.ts`       | Public barrel exports                |

Pure performance budgets and guards live in `src/lib/3d/*` (unit-tested).

## Canonical Imports

```ts
import { CanvasShell, HeroSceneLazy } from "@/3d";
```

`@/components/3d/*` remains a **deprecated bridge** during Phase 3.1; prefer `@/3d` in new code.

## Performance Runbook (Summary)

| Setting    | Default                              | Reduced motion |
| ---------- | ------------------------------------ | -------------- |
| DPR        | `[1, 1.5]`                           | `[1, 1.5]`     |
| Frameloop  | `always`                             | `demand`       |
| Particles  | 700 (cap via `getSafeParticleCount`) | 120            |
| Stars      | 650 (`getSafeStarCount`)             | 180            |
| Star speed | 0.28                                 | 0.08           |

Capability gating: `use3d()` from `@/hooks/use3d` (`supportsWebGL`, `reducedMotion`, `shouldRenderMotion`).

Full details: [`docs/techtonic-v2/3d-performance.md`](../../docs/techtonic-v2/3d-performance.md).

## Integration Pattern

```tsx
import { CanvasShell, HeroSceneLazy } from "@/3d";

<CanvasShell className="absolute inset-0 -z-10">
  <HeroSceneLazy />
</CanvasShell>;
```

Use lazy scene exports for route-level heroes; keep headings/CTAs as real HTML outside the canvas.
