# TechTonic V2.0 Architecture (Legacy Proposal)

> **Superseded.** Canonical architecture for the current codebase: **[`ARCHITECTURE.md`](../../ARCHITECTURE.md)**.  
> Folder map: **[`PROJECT_STRUCTURE.md`](../../PROJECT_STRUCTURE.md)**.  
> Kept for historical product planning context only.

---

## Folder Structure De Xuat

```txt
app/
  (site)/
    page.tsx
    about/page.tsx
    departments/page.tsx
    events/page.tsx
    portfolio/page.tsx
    recruitment/page.tsx
components/
  3d/
    canvas/
      canvas-shell.tsx
      webgl-fallback.tsx
    scenes/
      hero-scene.tsx
      background-scene.tsx
    models/
      floating-logo.tsx
      cat-mascot.tsx
    effects/
      particle-field.tsx
      camera-rig.tsx
  ui-v2/
    glass-card.tsx
    neon-button.tsx
    card-3d.tsx
    section-shell.tsx
    gradient-orb.tsx
  sections/
    home/
    about/
    activities/
    departments/
    portfolio/
    recruitment/
  timeline/
    yearly-journey-timeline.tsx
    recurring-activities-timeline.tsx
    timeline-card.tsx
    timeline-filter.tsx
lib/
  content/
    home.ts
    about.ts
    activities.ts
    departments.ts
    recruitment.ts
    projects.ts
    team.ts
    timelines.ts
  motion/
    variants.ts
  3d/
    constants.ts
    materials.ts
    performance.ts
  types/
    content.ts
    timeline.ts
hooks/
  use3d.ts
  useTimeline.ts
```

## Tech Stack Bo Sung

- `three`
- `@react-three/fiber`
- `@react-three/drei`
- `lenis`
- `gsap`
- `maath` neu can easing/math utilities cho particle hoac camera.

Chi them `@react-three/postprocessing` khi co nhu cau thuc su ve bloom/post-processing, vi goi nay co the tang chi phi render.

## Design System

Tokens can them:

- Background: dark base `#0a0a0a`, slate/black gradient, radial orbs.
- Neon: cyan `#00f5ff`, purple `#a855f7`, magenta `#ff2bd6`, electric blue `#3b82f6`.
- Surface: glass card, glass border, backdrop blur.
- Shadow: neon glow nhe, khong lam text bi mo.
- Motion: fade-up, reveal, parallax nhe, hover lift.
- Typography: `Inter` cho body, `Satoshi` hoac `Orbitron` cho heading neu asset/license phu hop.

Components nen dung chung:

- `SectionShell`: layout section, badge, title, description.
- `GlassCard`: surface chuan cho cards.
- `NeonButton`: CTA chinh.
- `Card3D`: card co depth/tilt nhe, co reduced-motion fallback.
- `CanvasShell`: wrapper R3F co fallback va performance guard.

## Timeline Types

```ts
export type TimelineMedia = {
  cover: string;
  logo?: string;
  alt: string;
};

export type YearlyJourneyTimelineItem = {
  id: string;
  dateLabel: string;
  sortDate: string;
  term?: "founding" | "2024-2025" | "2025-2026" | "future";
  title: string;
  description: string;
  highlight?: boolean;
  media?: TimelineMedia;
};

export type RecurringActivityTimelineItem = {
  id: string;
  name: string;
  slug: string;
  season: string;
  cycle: "yearly" | "monthly" | "weekly";
  category: "orientation" | "recruitment" | "internal" | "volunteer" | "governance";
  targetAudience: string[];
  goals: string[];
  content: string[];
  years: Array<{
    year: string;
    cover: string;
    logo?: string;
    recapUrl?: string;
  }>;
};
```

## 3D Strategy

- 3D components phai la client components va nen dynamic import voi `ssr: false`.
- Text quan trong phai la HTML, khong dat trong canvas.
- Canvas phai co fallback static khi WebGL loi hoac thiet bi yeu.
- Gioi han DPR `[1, 1.5]`.
- Ton trong `prefers-reduced-motion`.
- Khong dung 3D de thay the navigation, form, headings hoac noi dung chinh.

## Data Strategy

- Khong hardcode noi dung docx dai trong component.
- Moi page doc content tu `lib/content`.
- Moi array content can co `id` on dinh.
- Anh nen gom URL trong content file de de thay Cloudinary/local asset.

## Accessibility

- Hover reveal phai co `focus` hoac button detail tuong duong.
- Tabs/accordion nen dung Radix UI co san.
- Canvas nen `aria-hidden` neu chi trang tri.
- Form phai co label ro, validation ro, focus ring ro.
- Contrast text tren glass surface phai du cao.
