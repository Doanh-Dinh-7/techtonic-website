# Critical flows — accessibility checklist

Use before tagging a release. Mark **Pass / Fail / N/A**.

## 1. Global chrome

- [ ] **Skip link** — Tab once from load: “Bỏ qua đến nội dung chính” focuses and jumps to `#main-content`.
- [ ] **Header** — Desktop `nav` has accessible name; current page distinguishable (color + context).
- [ ] **Mobile menu** — Toggle exposes `aria-expanded`; menu closes on link activate; focus not trapped.
- [ ] **Back to top** — Button has name “Cuộn lên đầu trang”; visible focus ring; min 44×44px target.
- [ ] **Footer** — Links readable; external links use `rel="noopener noreferrer"` where applicable.

## 2. Home (`/`)

- [ ] **Hero** — Single `h1`; scroll control labeled; carousel images have `alt`; 3D canvas not in a11y tree.
- [ ] **Benefits** — Each benefit opens dialog via **button**; dialog has title; Esc closes.
- [ ] **Activities / Testimonials** — Dot controls have `aria-label` + `aria-current`; 44×44 hit area.
- [ ] **Contact** — Social icons have `aria-label`; contact text meets contrast on glass card.
- [ ] **Motion** — With `prefers-reduced-motion: reduce`, no essential info only in animation.

## 3. Recruitment (`/recruitment`)

- [ ] **Registration form** — Every control has visible `<label htmlFor>` or `aria-label`.
- [ ] **Steps** — Step change communicated (`aria-live`); step indicators use `aria-current="step"`.
- [ ] **Validation** — Cannot advance/submit with empty required fields; errors perceivable.
- [ ] **Submit** — Opens Google Form in new tab; success/error toast readable.
- [ ] **Sample copy** — `(mẫu)` labels use `text-amber-800` (contrast on white).

## 4. Events (`/events`)

- [ ] **Headings** — Logical order (`h1` → `h2`).
- [ ] **Sample badges** — Contrast pass on cards.
- [ ] **Links** — Event links descriptive (not “click here” only).

## 5. Regression triggers

Re-run Lighthouse a11y + spot-check above when changing:

- `Header`, `SiteShell`, `BackToTop`
- `benefits.tsx`, `activities.tsx`, `testimonials.tsx`, `registration.tsx`
- `ui-v2` dark sections or global color tokens
