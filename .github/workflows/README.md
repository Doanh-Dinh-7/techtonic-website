# GitHub Actions

## Quality Gates (`quality-gates.yml`)

Runs on **pull requests**, **pushes** to `main`, `master`, and `feature/next-gen-club-website`, and via **workflow_dispatch**.

### Job 1 — `verify` (fast feedback)

| Step      | Command                |
| --------- | ---------------------- |
| Lint      | `npm run lint`         |
| Typecheck | `npm run typecheck`    |
| Format    | `npm run format:check` |
| Test      | `npm run test`         |

### Job 2 — `build` (after verify passes)

| Step           | Command                                                                            |
| -------------- | ---------------------------------------------------------------------------------- |
| Build + budget | `npm run build:check` (log → `build-output.log`, budgets in `bundle-budgets.json`) |

Budgets: [`bundle-budgets.json`](../../bundle-budgets.json). Update when bundle size changes are intentional.

### Local equivalent

```bash
npm run ci          # verify only
npm run ci:build    # full pipeline including bundle budget
```

Concurrency: newer runs on the same ref cancel in-progress workflows.
