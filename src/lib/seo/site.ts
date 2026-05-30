/** Canonical site identity for metadata & structured data. */
export const SITE = {
  name: "TechTonic Club",
  shortName: "TechTonic",
  tagline: "Câu lạc bộ Công nghệ",
  description:
    "Câu lạc bộ công nghệ thông tin tại Đại học Kinh tế - Đại học Đà Nẵng (UEH). Workshop, dự án thực tế và cộng đồng lập trình.",
  locale: "vi_VN",
  language: "vi",
  /** Set in production: NEXT_PUBLIC_SITE_URL=https://your-domain.com */
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "http://localhost:3000",
  organization: {
    legalName: "TechTonic Club",
    university: "Đại học Kinh tế - Đại học Đà Nẵng",
    email: "techtonic.clb@gmail.com",
    address: {
      streetAddress: "71 Ngũ Hành Sơn",
      addressLocality: "Phường Ngũ Hành Sơn",
      addressRegion: "Đà Nẵng",
      addressCountry: "VN",
    },
  },
  social: {
    facebook: "https://www.facebook.com/TechTonic.Club17",
    instagram: "https://www.instagram.com/techtonic.club",
    threads: "https://www.threads.com/@techtonic.club",
  },
  defaultOgImage: "/thumbnail.jpg",
} as const;

export const SITE_ROUTES = [
  "/",
  "/about",
  "/departments",
  "/events",
  "/portfolio",
  "/recruitment",
] as const;

export type SiteRoute = (typeof SITE_ROUTES)[number];
