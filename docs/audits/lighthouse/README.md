# Lighthouse audits (TechTonic V2.0)

Production build (`next build` + `next start`). Default profile: **mobile + throttling** (closer to field data, harder on local Windows).

## Recommended setup (Windows — đủ điểm, ít `INCOMPLETE`)

### Cách A — Một lệnh (khuyên dùng trên máy dev)

```powershell
npm run lighthouse:local
```

- Bật `LIGHTHOUSE_LOCAL=1`: desktop, CPU throttle ×1, timeout dài hơn.
- Vẫn **enforce** budget trong `lighthouse-budgets.json`.

Chỉ cần report, không fail khi miss budget:

```powershell
npm run lighthouse:local:soft
```

### Cách B — Hai terminal (server ấm, ổn định nhất)

**Terminal 1:**

```powershell
npm run build
$env:PORT = "3000"; npm run start
```

Đợi `Ready`, mở http://127.0.0.1:3000/ trên browser (optional, giúp cache ấm).

**Terminal 2:**

```powershell
$env:BASE_URL = "http://127.0.0.1:3000"
npm run lighthouse:audit:local
```

Hoặc mobile profile (khó hơn trên Windows):

```powershell
npm run lighthouse:audit
```

## Tất cả lệnh npm

| Lệnh                             | Mô tả                                                               |
| -------------------------------- | ------------------------------------------------------------------- |
| `npm run lighthouse`             | Build + server tạm + audit **mobile** + fail nếu dưới budget        |
| `npm run lighthouse:local`       | Giống trên nhưng **local/desktop** (điểm đầy đủ hơn)                |
| `npm run lighthouse:soft`        | Mobile; ghi report, **exit 0** dù miss budget                       |
| `npm run lighthouse:local:soft`  | Local + exit 0                                                      |
| `npm run lighthouse:audit`       | Chỉ audit (cần server); `BASE_URL` mặc định `http://localhost:3000` |
| `npm run lighthouse:audit:local` | Audit local profile                                                 |

### Biến môi trường (PowerShell)

```powershell
$env:LIGHTHOUSE_SOFT = "1"      # không fail budget
$env:LIGHTHOUSE_LOCAL = "1"     # desktop, throttle nhẹ
$env:LIGHTHOUSE_VERBOSE = "1"   # log chi tiết
$env:BASE_URL = "http://127.0.0.1:3000"
```

Không dùng cú pháp bash `LIGHTHOUSE_SOFT=1 npm run ...` trên PowerShell.

Reports: `docs/audits/lighthouse/*.report.{html,json}`  
Snapshot: [`summary.json`](./summary.json)

## Configuration

- [`lighthouse-budgets.json`](../../../lighthouse-budgets.json) — score floors
- [`scripts/run-lighthouse.mjs`](../../../scripts/run-lighthouse.mjs)
- [`scripts/lighthouse-ci.mjs`](../../../scripts/lighthouse-ci.mjs)

## Baseline (mobile, khi chạy thành công)

| Route          | Performance      | Accessibility | Best practices | SEO     |
| -------------- | ---------------- | ------------- | -------------- | ------- |
| `/`            | 44–84 (variable) | **91**        | 92–96          | **100** |
| `/recruitment` | 69–92            | 91–100        | 88–96          | **100** |
| `/events`      | 74–77            | 90–100        | 88–96          | **100** |

`npm run lighthouse` (mobile) dùng cho CI/release gate; `lighthouse:local` dùng khi dev trên Windows bị `NO_LCP`.

## `INCOMPLETE` / `NO_LCP` — không phải site 0 điểm

| Triệu chứng              | Ý nghĩa                                                          |
| ------------------------ | ---------------------------------------------------------------- |
| `performance=—`          | Lighthouse không chấm xong category (score `null`)               |
| `LanternError: NO_LCP`   | Trace không có LCP (thường do throttle/timeout/headless Windows) |
| `SPEEDINDEX_OF_ZERO`     | Chrome không chụp filmstrip                                      |
| `best-practices=96` only | Audit không cần trace vẫn chạy                                   |

**Xử lý:** dùng `npm run lighthouse:local` hoặc Cách B (server ấm). Xem `runWarnings` trong `home.report.json`.

## Phase 4.4 a11y fixes

See [`docs/audits/accessibility/README.md`](../accessibility/README.md).
