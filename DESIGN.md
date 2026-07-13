# TechTonic V2.0 Design Direction

## Vision

TechTonic V2.0 should feel premium, futuristic, and technically sophisticated.  
The visual language is dark cyberpunk with disciplined motion and performance-aware 3D.

## Core Design Principles

- Dark-first, high-contrast interface.
- Futuristic style with practical readability.
- Motion with purpose, not decoration.
- 3D as narrative enhancement, not constant noise.
- Consistency across all sections and devices.
- Accessibility parity across desktop, touch, and keyboard flows.

## UI/UX Guidelines

### Visual Hierarchy

- Keep clear heading and content contrast.
- Preserve spacing rhythm across long-scroll pages.
- Use accents to guide action, not fill space.

### Interaction Quality

- Maintain predictable behavior for hover/focus/active states.
- Keep interaction latency low and transitions smooth.
- Ensure keyboard and screen-reader compatibility in all critical flows.

### Content Experience

- Keep copy concise and actionable.
- Prioritize scan-friendly section structure.
- Use clear CTA hierarchy (primary, secondary, tertiary).

## 3D Design Direction (React Three Fiber / Three.js)

### Placement Strategy

- Use 3D for hero moments, transitions, and high-value storytelling blocks.
- Avoid heavy 3D in every section.
- Always provide fallback for unsupported or reduced-motion scenarios.

### Lighting and Materials

- Use controlled neon accents over deep dark backgrounds.
- Prefer clean geometric forms and intentional highlights.
- Avoid over-detailed materials that reduce clarity on small screens.

### Interaction and Accessibility

- Hover-only affordances are not sufficient; provide equivalent focus and touch states.
- Keep 3D canvas decorative, while critical headings/CTAs/forms stay real HTML.
- Respect reduced-motion preferences without hiding critical information.

### Performance Constraints

- Cap DPR adaptively by device capability.
- Limit draw calls and shader complexity.
- Use optimized assets and controlled texture budgets.
- Pause or reduce non-essential animations when offscreen.

## Color System (Baseline)

Design tokens map to Tailwind/theme and `src/lib/3d/constants.ts` where relevant.

| Token                  | Tailwind / code reference   | Intent                     |
| ---------------------- | --------------------------- | -------------------------- |
| `bg/base`              | `v2-dark` / `#0a0a0a`       | Primary dark canvas        |
| `bg/elevated`          | glass surfaces (`ui-v2`)    | Layer depth and cards      |
| `text/primary`         | `foreground`                | High-contrast content      |
| `text/secondary`       | `muted-foreground`          | Supportive content         |
| `accent/cyan`          | `neon-cyan` / `#00f5ff`     | Primary futuristic accent  |
| `accent/violet`        | `neon-purple` / `#a855f7`   | Secondary accent           |
| `accent/magenta`       | `neon-magenta` / `#ff2bd6`  | Tertiary neon accent       |
| `accent/electric-blue` | `electric-blue` / `#3b82f6` | Technical highlight accent |
| `state/success`        | semantic success            | Positive status            |
| `state/warning`        | semantic warning            | Warning status             |
| `state/error`          | `destructive`               | Error status               |

V2 UI primitives: `src/shared/ui-v2/` (`GlassCard`, `NeonButton`, `SectionShell`, `Card3D`).

## Typography

- Primary font: modern geometric sans-serif.
- Support font: mono for technical labels and compact metadata.
- Keep line length and vertical rhythm readable in dark mode.

## Motion Language

- Prefer smooth, confident easing curves.
- Use consistent duration tiers (micro, standard, emphatic).
- Avoid stacking too many simultaneous infinite animations.
- Respect `prefers-reduced-motion`.

## Component Design Philosophy

- Build composable primitives first.
- Keep variant APIs explicit and typed.
- Separate appearance from business behavior.
- Favor reuse over one-off custom blocks.

## Design QA Checklist

- [ ] Works in dark mode with clear contrast.
- [ ] Interaction states are consistent.
- [ ] Motion supports meaning.
- [ ] 3D fallback works correctly.
- [ ] Performance is acceptable on mid-tier devices.

---

## Implementation References

| Topic               | Location                                    |
| ------------------- | ------------------------------------------- |
| V2 UI primitives    | `src/shared/ui-v2/`                         |
| shadcn primitives   | `src/shared/ui/`                            |
| 3D runtime          | `src/3d/`                                   |
| 3D budgets & guards | `src/lib/3d/performance.ts`                 |
| Capability hook     | `src/hooks/use3d.ts`                        |
| Color tokens (3D)   | `src/lib/3d/constants.ts`                   |
| Tailwind theme      | `tailwind.config.ts`, `src/app/globals.css` |

---

## Related Docs

- [`ARCHITECTURE.md`](./ARCHITECTURE.md) — layers and 3D integration flow
- [`PROJECT_STRUCTURE.md`](./PROJECT_STRUCTURE.md) — where to add UI and scenes
- [`docs/techtonic-v2/3d-performance.md`](./docs/techtonic-v2/3d-performance.md) — performance runbook
- [`REFACTOR_PROGRESS.md`](./REFACTOR_PROGRESS.md) — phase status
- [`docs/techtonic-v2/README.md`](./docs/techtonic-v2/README.md) — documentation hub
