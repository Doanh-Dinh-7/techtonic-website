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

### Performance Constraints

- Cap DPR adaptively by device capability.
- Limit draw calls and shader complexity.
- Use optimized assets and controlled texture budgets.
- Pause or reduce non-essential animations when offscreen.

## Color System (Baseline)

| Token | Intent |
|---|---|
| `bg/base` | Primary dark canvas |
| `bg/elevated` | Layer depth and cards |
| `text/primary` | High-contrast content |
| `text/secondary` | Supportive content |
| `accent/cyan` | Primary futuristic accent |
| `accent/violet` | Secondary accent |
| `state/success` | Positive status |
| `state/warning` | Warning status |
| `state/error` | Error status |

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
