# Accessibility audit — critical flows (Phase 4.4)

Manual + automated review for release **V2.0**. Complements Lighthouse runs in [`../lighthouse/README.md`](../lighthouse/README.md).

## Critical flows

| Flow               | Route / component                                                       | Checks                                                                                     |
| ------------------ | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| **Global chrome**  | `SiteShell`, `Header`, `BackToTop`                                      | Skip link, landmark `<main>`, nav labels, focus ring, back-to-top name                     |
| **Home discovery** | `/` — Hero, Benefits dialog, Activities/Testimonials carousels, Contact | Decorative 3D hidden, dialog trigger is `<button>`, carousel controls ≥44px + `aria-label` |
| **Recruitment**    | `/recruitment` — `Registration`                                         | Labels/`htmlFor`, step `aria-live`, form `aria-label`, sample text contrast                |
| **Events browse**  | `/events`                                                               | Sample badges contrast, keyboard nav                                                       |

Detail checklist: [`critical-flows.md`](./critical-flows.md).

## Automated baseline (Lighthouse mobile)

| Route          | A11y (2026-05-29 post-fix)    | Notes                                                                                      |
| -------------- | ----------------------------- | ------------------------------------------------------------------------------------------ |
| `/recruitment` | **100**                       | Form labels, steps, sample contrast                                                        |
| `/events`      | **100**                       | Sample badge contrast                                                                      |
| `/`            | Re-audit after R3F client fix | One run hit `__next_error__` (R3F/React); webpack `react` alias added in `next.config.mjs` |

Earlier baseline (pre ui-v2 pass): home ~91, recruitment ~91, events ~90.

Re-run after changes:

```bash
npm run lighthouse
```

Update [`../lighthouse/summary.json`](../lighthouse/summary.json) when scores change materially.

## Fixes shipped (2026-05-29)

| Issue                                                   | Fix                                                                   |
| ------------------------------------------------------- | --------------------------------------------------------------------- |
| `aria-allowed-attr` (Benefits `DialogTrigger` on `div`) | Native `<button>` trigger + `DialogTitle`                             |
| `button-name` (`BackToTop`)                             | `aria-label="Cuộn lên đầu trang"`                                     |
| `color-contrast` (`text-amber-600` sample labels)       | `text-amber-800` sitewide                                             |
| `color-contrast` (Activities body)                      | `text-gray-700` / `text-gray-950` heading                             |
| Keyboard / landmarks                                    | Skip link `#main-content`, `nav` `aria-label`, mobile `aria-expanded` |
| Registration steps                                      | `aria-live`, `aria-current="step"`, form `aria-label`                 |

## Manual QA (recommended each release)

1. Tab through Header → main → Footer on `/` and `/recruitment` (no focus trap).
2. Screen reader: Benefits card announces as button; dialog title read on open.
3. Registration: step change announced; required fields block submit when empty.
4. `prefers-reduced-motion`: hero carousel (not 3D) still usable; carousels pausable on hover where applicable.

## Trade-offs (documented)

- Decorative WebGL: `aria-hidden` on `CanvasShell` — copy remains in HTML hero.
- Lenis smooth scroll: ensure skip link and hash links still reach targets (`HashScrollHandler`).
- Custom fonts (`UTM Akashi`): Activities heading uses system-weight fallback stack where contrast failed audits.
