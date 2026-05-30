import type { PageSeoConfig } from "./page-config";
import { SITE } from "./site";

function absoluteUrl(path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/") {
    return SITE.url;
  }
  return `${SITE.url}${normalized}`;
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE.url}/#organization`,
    name: SITE.organization.legalName,
    alternateName: SITE.shortName,
    url: SITE.url,
    logo: `${SITE.url}/logo.png`,
    email: SITE.organization.email,
    sameAs: [SITE.social.facebook, SITE.social.instagram, SITE.social.threads],
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.organization.address.streetAddress,
      addressLocality: SITE.organization.address.addressLocality,
      addressRegion: SITE.organization.address.addressRegion,
      addressCountry: SITE.organization.address.addressCountry,
    },
  };
}

export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    inLanguage: SITE.language,
    publisher: { "@id": `${SITE.url}/#organization` },
  };
}

export function webPageJsonLd(config: PageSeoConfig) {
  const url = absoluteUrl(config.path);
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: config.absoluteTitle ?? `${config.title} | ${SITE.name}`,
    description: config.description,
    isPartOf: { "@id": `${SITE.url}/#website` },
    about: { "@id": `${SITE.url}/#organization` },
    inLanguage: SITE.language,
  };
}

export function breadcrumbJsonLd(config: PageSeoConfig) {
  const items = [
    { name: "Trang chủ", path: "/" },
    ...(config.path === "/" ? [] : [{ name: config.title, path: config.path }]),
  ];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function pageStructuredData(config: PageSeoConfig) {
  return [webPageJsonLd(config), breadcrumbJsonLd(config)];
}

export function siteStructuredData() {
  return [organizationJsonLd(), webSiteJsonLd()];
}
