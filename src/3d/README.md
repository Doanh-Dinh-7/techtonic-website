# 3D Runtime (`src/3d`)

Canonical React Three Fiber runtime for TechTonic V2.0.

## Structure

| Path                         | Responsibility                                  |
| ---------------------------- | ----------------------------------------------- |
| `canvas/`                    | `CanvasShell`, `WebGLFallback`                  |
| `effects/`                   | `CameraRig`, `ParticleField`                    |
| `models/`                    | `FloatingLogo`, `CatMascot`                     |
| `scenes/`                    | `HeroScene`, `BackgroundScene`                  |
| `scene-lazy.tsx`             | `BackgroundSceneLazy` (`next/dynamic`, SSR off) |
| `hero-canvas-with-scene.tsx` | `CanvasShell` + `HeroScene` (one client chunk)  |
| `hero-media.tsx`             | Home hero: dynamic `HeroCanvasWithScene`        |
| `index.ts`                   | Public barrel exports                           |

Pure performance budgets and guards live in `src/lib/3d/*` (unit-tested).

## Canonical Imports

```ts
// Home hero (recommended — avoids R3F in SSR/prerender)
import { HeroCanvasWithScene } from "@/3d/hero-media";

// Other routes / advanced
import { CanvasShell, BackgroundSceneLazy } from "@/3d";
```

## Related Docs

- [`docs/techtonic-v2/3d-performance.md`](../../docs/techtonic-v2/3d-performance.md)
- [`ARCHITECTURE.md`](../../ARCHITECTURE.md)
- [`REFACTOR_PROGRESS.md`](../../REFACTOR_PROGRESS.md)

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
import { HeroCanvasWithScene } from "@/3d/hero-media";
import { use3d } from "@/hooks/use3d";

const { shouldRenderMotion } = use3d();

{
  shouldRenderMotion ? (
    <HeroCanvasWithScene className="absolute inset-0 -z-10" />
  ) : (
    /* static fallback */
  );
}
```

Use lazy scene exports for route-level heroes; keep headings/CTAs as real HTML outside the canvas.
