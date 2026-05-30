# SEO — TechTonic V2 (Phase 4.4)

## Module

| Path                         | Role                                            |
| ---------------------------- | ----------------------------------------------- |
| `src/lib/seo/site.ts`        | Site URL, org, social                           |
| `src/lib/seo/page-config.ts` | Per-route title & description                   |
| `src/lib/seo/metadata.ts`    | `createPageMetadata()` — OG, Twitter, canonical |
| `src/lib/seo/json-ld.ts`     | Organization, WebSite, WebPage, BreadcrumbList  |
| `src/shared/seo/json-ld.tsx` | `<JsonLd />` script tags                        |
| `src/app/sitemap.ts`         | `/sitemap.xml`                                  |
| `src/app/robots.ts`          | `/robots.txt`                                   |

## Production

Set in `.env` / hosting:

```env
NEXT_PUBLIC_SITE_URL=https://your-production-domain.com
```

Without it, metadata defaults to `http://localhost:3000` (fine for dev).

## Adding a new route

1. Add path to `SITE_ROUTES` in `site.ts`.
2. Add entry in `PAGE_SEO` in `page-config.ts`.
3. In `src/app/(site)/your-route/page.tsx`:

```tsx
import { createPageMetadata, PAGE_SEO } from "@/lib/seo";
import { PageSeo } from "@/shared/seo/page-seo";

export const metadata = createPageMetadata(PAGE_SEO.yourRoute);

export default function Page() {
  return (
    <>
      <PageSeo config={PAGE_SEO.yourRoute} />
      {/* sections */}
    </>
  );
}
```

## Verify

- View source: `<meta property="og:…">`, `<link rel="canonical">`, `<script type="application/ld+json">`
- `https://your-domain/sitemap.xml` and `/robots.txt`
- [Google Rich Results Test](https://search.google.com/test/rich-results) (optional)
