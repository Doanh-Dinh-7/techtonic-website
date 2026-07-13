# TechTonic V2.0 Cursor Rule Draft

> Ghi chu: Cursor project rule co hieu luc nen dung duoi `.cursor/rules/*.mdc`.
> File `.md` nay la ban draft Markdown de giu trong Plan Mode. Khi duoc phep chinh file `.mdc`, hay doi sang `techtonic-v2.mdc` va them frontmatter Cursor rule.

## Scope

Rule nay ap dung cho moi cong viec phat trien TechTonic Website V2.0.

## Development Standards

- Tra loi bang tieng Viet tru khi user yeu cau ngon ngu khac.
- Doc code hien co truoc khi sua; uu tien pattern cua repo Next.js App Router, Tailwind, shadcn/Radix va Framer Motion.
- Noi dung official phai nam trong `lib/content/*`; khong hardcode text dai tu docx trong component.
- Huong thiet ke mac dinh: cyber-futuristic, premium dark mode, glassmorphism, neon cyan/purple/magenta/electric blue.
- Component moi phai mobile-first, semantic va accessible.
- Moi 3D scene dat trong `src/3d/*`; import `@/3d` (khong con `src/components/3d`).
- Canvas 3D chi trang tri; heading, CTA, form va noi dung quan trong phai la HTML that.
- Lazy-load 3D nang, cap DPR, co fallback static va ton trong `prefers-reduced-motion`.
- Dung `components/timeline/*` cho 2 timeline: Yearly Journey Timeline va Recurring Activities Timeline.
- Hover-only interaction khong du; phai co keyboard focus va mobile tap/detail state.
- Sau edit lon, tu kiem tra: "Does this code have any breaks?" va chay lint/build khi phu hop.

## Suggested Active `.mdc` Frontmatter

```md
---
description: TechTonic V2.0 development standards for futuristic 3D website work
alwaysApply: true
---
```
