import type { Metadata } from "next";

import type { PageSeoConfig } from "./page-config";
import { SITE } from "./site";

function absoluteUrl(path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/") {
    return SITE.url;
  }
  return `${SITE.url}${normalized}`;
}

function absoluteImageUrl(imagePath: string) {
  if (imagePath.startsWith("http")) {
    return imagePath;
  }
  return `${SITE.url}${imagePath.startsWith("/") ? imagePath : `/${imagePath}`}`;
}

function displayTitle(config: PageSeoConfig) {
  if (config.absoluteTitle) {
    return config.absoluteTitle;
  }
  return `${config.title} | ${SITE.name}`;
}

/**
 * Per-route Metadata: title, description, canonical, Open Graph, Twitter.
 */
export function createPageMetadata(
  config: PageSeoConfig,
  options?: { ogImage?: string; noIndex?: boolean }
): Metadata {
  const canonical = absoluteUrl(config.path);
  const ogImage = absoluteImageUrl(options?.ogImage ?? SITE.defaultOgImage);
  const title = config.absoluteTitle ?? config.title;
  const ogTitle = displayTitle(config);

  return {
    title: config.absoluteTitle ? { absolute: config.absoluteTitle } : title,
    description: config.description,
    keywords: config.keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "website",
      locale: SITE.locale,
      url: canonical,
      siteName: SITE.name,
      title: ogTitle,
      description: config.description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${SITE.name} - ${config.title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: config.description,
      images: [ogImage],
    },
    robots: options?.noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}

/** Defaults for `(site)` layout — title template + shared OG fallbacks. */
export function createSiteLayoutMetadata(): Metadata {
  return {
    title: {
      default: `${SITE.shortName} - ${SITE.tagline}`,
      template: `%s | ${SITE.name}`,
    },
    description: SITE.description,
    openGraph: {
      type: "website",
      locale: SITE.locale,
      siteName: SITE.name,
      title: `${SITE.shortName} - ${SITE.tagline}`,
      description: SITE.description,
      images: [
        {
          url: absoluteImageUrl(SITE.defaultOgImage),
          width: 1200,
          height: 630,
          alt: SITE.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${SITE.shortName} - ${SITE.tagline}`,
      description: SITE.description,
      images: [absoluteImageUrl(SITE.defaultOgImage)],
    },
  };
}
