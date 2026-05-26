# TechTonic V2.0 Development Rules

## Core Rules

- Tra loi va ghi chu phat trien bang tieng Viet khi phu hop voi ngu canh du an.
- Doc code hien co truoc khi sua, uu tien pattern co san cua repo.
- Khong hardcode noi dung dai trong component; dua vao `lib/content`.
- Khong doi kien truc lon neu khong co ly do ro rang.
- Sau moi thay doi quan trong, tu kiem tra: "Does this code have any breaks?"

## UI Rules

- Mac dinh phong cach: cyber-futuristic, premium dark mode, glassmorphism, neon cyan/purple/magenta/electric blue.
- Component moi nen mobile-first.
- Text chinh phai co contrast tot tren nen glass/dark.
- Hover effect phai co focus/tap fallback.
- Khong lam animation gay kho doc noi dung.

## 3D Rules

- Moi 3D scene dat trong `components/3d`.
- Canvas chi trang tri, khong chua noi dung SEO/heading/form quan trong.
- Lazy-load scene nang bang dynamic import khi can.
- Gioi han DPR va co fallback static.
- Ton trong `prefers-reduced-motion`.

## Content Rules

- Noi dung official tu docx phai mapping vao `lib/content`.
- Khong con nhan `(mau)` o noi dung da duoc thay bang official content.
- Timeline hanh trinh va timeline su kien co dinh phai dung type rieng.
- Anh/logos/event covers nen duoc gom trong content file thay vi rai trong component.

## Timeline Rules

- Yearly Journey Timeline dung cho hanh trinh phat trien CLB.
- Recurring Activities Timeline dung cho cac su kien co dinh qua nhiem ky.
- Recurring timeline can ho tro filter theo nam/nhiem ky neu co du lieu.
- Hover reveal phai co keyboard focus va mobile tap/detail state.

## Performance Rules

- Khong de canvas 3D chan LCP.
- Khong dat `priority` cho nhieu anh gallery.
- Uu tien `next/image` cho anh content.
- Khong them post-processing 3D neu khong co loi ich ro.
- Kiem tra build/lint sau edit lon.

## Accessibility Rules

- Dung semantic heading theo thu tu.
- Button/link phai co focus ring ro.
- Form phai co label va validation message.
- Tabs/accordion nen dung Radix UI co san.
- Canvas trang tri nen `aria-hidden`.
