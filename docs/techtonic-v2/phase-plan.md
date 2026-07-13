# TechTonic V2.0 Phase Plan

> **Disclaimer:** This document describes **product/page delivery phases** from early V2 planning (Vietnamese).  
> **Engineering refactor phases** (Foundation → Tooling → 3D → Release) are tracked in **[`REFACTOR_PROGRESS.md`](../../REFACTOR_PROGRESS.md)**.  
> Current codebase layout: **[`PROJECT_STRUCTURE.md`](../../PROJECT_STRUCTURE.md)** and **[`ARCHITECTURE.md`](../../ARCHITECTURE.md)**.

---

## Phase 1: Foundation & 3D Setup

Muc tieu: xay nen tang 3D va Design System moi cho toan bo V2.0 truoc khi refactor tung page.

Packages can cai:

- `three`
- `@react-three/fiber`
- `@react-three/drei`
- `lenis`
- `gsap`

Folder structure tao moi:

- `components/3d/canvas`: Global canvas wrapper, WebGL fallback, scene boundary.
- `components/3d/scenes`: cac scene cap page nhu hero/background.
- `components/3d/models`: floating logo, mascot meo, primitive models.
- `components/3d/effects`: particle field, glow helpers, camera/parallax effects.
- `components/ui-v2`: `GlassCard`, `NeonButton`, `Card3D`, `SectionShell`, `GradientOrb`.
- `components/timeline`: chuan bi nen cho timeline system dung o Phase 3-4.
- `lib/3d`: constants, materials, scene config, performance config.
- `hooks/use3d.ts`: reduced motion, WebGL support, pointer/camera helpers.
- `hooks/useTimeline.ts`: state/filter helpers cho timeline sau nay.

Design System:

- Dark background: `#0a0a0a`.
- Neon Cyan: `#00f5ff`.
- Purple: `#a855f7`.
- Magenta: `#ff2bd6`.
- Electric Blue: `#3b82f6`.
- Glassmorphism utilities: backdrop blur, border gradient, inner highlight, neon shadow.
- Typography scale va futuristic font: `Inter` cho body, `Satoshi` hoac `Orbitron` cho heading neu asset/license phu hop.
- Lenis smooth scroll tich hop o layout/site shell.
- Theme provider nang cap de uu tien premium dark mode.
- GSAP dung cho timeline/micro-interactions khi Framer Motion khong phu hop.

Deliverables:

- Global 3D Canvas wrapper co DPR cap, fallback va reduced-motion support.
- Reusable `GlassCard`, `NeonButton`, `Card3D`, `SectionShell`.
- Sample 3D floating logo.
- Sample particle system.
- Nen hooks `use3d` va `useTimeline`.

Kiem tra:

- Khong crash neu WebGL khong hoat dong.
- Canvas trang tri co `aria-hidden`; text/CTA/form quan trong la HTML that.
- Reduced motion tat animation nang.
- Layout mobile khong bi horizontal scroll.
- Hover effect co keyboard focus va mobile tap/detail state.

## Phase 2: Homepage Hero 3D

Files chinh:

- `app/(site)/page.tsx`
- `components/hero.tsx` hoac `components/sections/home/home-hero.tsx`
- `components/3d/hero-scene.tsx`
- `lib/content/home.ts`

Cong viec:

- Dung hero 3D voi floating logo, particle field, neon background.
- Dua testimonials Nguyen Van Quang va Phan Nhat Minh Anh len noi bat.
- Tich hop mascot meo nhu companion vui ve.
- Giu CTA tuyen thanh vien va kham pha them.

Kiem tra:

- LCP khong phu thuoc vao canvas.
- CTA keyboard accessible.
- Mobile hero khong qua nang.

## Phase 3: Gioi Thieu Page

Files chinh:

- `app/(site)/about/page.tsx`
- `components/about-timeline.tsx`
- `components/about.tsx`
- `components/team.tsx`
- `components/timeline/yearly-journey-timeline.tsx`
- `lib/content/about.ts`
- `lib/content/timelines.ts`
- `lib/content/team.ts`

Cong viec:

- Thay timeline mau bang Yearly Journey Timeline official.
- Them mission manifesto.
- Hien thi du 7 gia tri cot loi.
- Them culture, community value, member portraits.
- Refactor team tabs thanh tab lon theo nhiem ky va tab con theo ban.

Kiem tra:

- Dung dung moc 7/2024 den 5/2025 va "Con tiep".
- Khong con label `(mau)` o noi dung official.
- Tabs dung duoc bang keyboard.

## Phase 4: Timeline System v2

Files chinh:

- `components/timeline/yearly-journey-timeline.tsx`
- `components/timeline/recurring-activities-timeline.tsx`
- `components/timeline/timeline-card.tsx`
- `components/timeline/timeline-filter.tsx`
- `lib/types/timeline.ts`
- `lib/content/timelines.ts`

Cong viec:

- Tao 2 loai timeline dung chung:
  - Yearly Journey Timeline.
  - Recurring Activities Timeline.
- Them filter theo nam/nhiem ky cho recurring activities.
- Card co anh bia, hover/focus reveal thong tin.

Kiem tra:

- Hover khong phai cach duy nhat de doc thong tin.
- Anh co alt text.
- Filter state on dinh khi resize.

## Phase 5: Hoat Dong Page

Files chinh:

- `app/(site)/events/page.tsx`
- `components/events-content.tsx`
- `components/sections/activities/*`
- `lib/content/activities.ts`
- `lib/content/timelines.ts`

Cong viec:

- Tao academic grid: CSLT & CSDL, FE, BE, AI&Data, Product Team.
- Tao Happy Hour section.
- Dua 6 su kien lon vao Recurring Activities Timeline.

Kiem tra:

- Noi dung dai khong gay card qua cao tren mobile.
- Timeline event co focus/tap state.

## Phase 6: Co Cau & Tuyen Thanh Vien

Files chinh:

- `app/(site)/departments/page.tsx`
- `app/(site)/recruitment/page.tsx`
- `components/departments-content.tsx`
- `components/registration.tsx`
- `components/sections/departments/*`
- `components/sections/recruitment/*`
- `lib/content/departments.ts`
- `lib/content/recruitment.ts`

Cong viec:

- Lam ro thanh vien tu do vs thanh vien Ban chu nhiem.
- Cap nhat 4 ban theo official content.
- Them responsibility timeline truoc/trong/sau.
- Giu Google Form prefill hien co, cai thien UX va validation.

Kiem tra:

- Khong pha env `NEXT_PUBLIC_FORM_ID`.
- Select ban khop voi noi dung moi.
- Form co thong bao loi ro.

## Phase 7: Gallery, Projects, Testimonials, Performance & Polish

Files chinh:

- `components/gallery.tsx`
- `components/testimonials.tsx`
- `components/portfolio-content.tsx`
- `lib/content/projects.ts`
- `next.config.mjs`

Cong viec:

- Dua testimonials official vao home/about.
- Toi uu gallery, bo `priority` hang loat.
- Cap nhat projects tu mau sang du an that.
- Audit performance, accessibility, responsive.
- Sau khi code sach, can nhac tat `ignoreBuildErrors` va `ignoreDuringBuilds`.

Kiem tra:

- `pnpm build` hoac lenh build tu package manager hien tai.
- Lint/typecheck khong bi che boi config khi polish xong.
- Lighthouse mobile dat muc chap nhan duoc.
