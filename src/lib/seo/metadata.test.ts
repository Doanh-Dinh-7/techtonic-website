import { describe, expect, it } from "vitest";

import { createPageMetadata } from "./metadata";
import { PAGE_SEO } from "./page-config";
import { SITE } from "./site";

describe("createPageMetadata", () => {
  it("sets canonical and Open Graph url for a route", () => {
    const meta = createPageMetadata(PAGE_SEO.about);

    expect(meta.alternates?.canonical).toBe(`${SITE.url}/about`);
    expect(meta.openGraph?.url).toBe(`${SITE.url}/about`);
    expect(meta.openGraph?.title).toContain("Giới thiệu");
  });

  it("uses absolute title on home without template", () => {
    const meta = createPageMetadata(PAGE_SEO.home);

    expect(meta.title).toEqual({ absolute: PAGE_SEO.home.absoluteTitle });
  });
});
