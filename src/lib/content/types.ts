/** Dữ liệu mẫu — thay bằng nội dung chính thức khi có. */

export type NewsItem = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  href: string;
  external?: boolean;
  badge?: string;
  isSample?: boolean;
};

export type PartnerLogo = {
  src: string;
  alt: string;
};

export type TimelineEntry = {
  year: string;
  title: string;
  description: string;
  isSample?: boolean;
};

export type Department = {
  id: string;
  name: string;
  shortName: string;
  description: string;
  highlights: string[];
  isSample?: boolean;
};

export type ProjectItem = {
  id: string;
  title: string;
  description: string;
  stack: string[];
  demoUrl?: string;
  repoUrl?: string;
  isSample?: boolean;
};

export type AwardItem = {
  id: string;
  name: string;
  year: string;
  detail?: string;
  isSample?: boolean;
};

export type WorkshopEvent = {
  id: string;
  title: string;
  date: string;
  location?: string;
  description?: string;
  isSample?: boolean;
};

export type ActivityAccent = "cyan" | "violet" | "blue" | "emerald" | "amber" | "pink" | "orange";

export type AcademicActivityIcon = "database" | "web" | "dns" | "psychology" | "groups";

export type AcademicActivity = {
  id: string;
  icon: AcademicActivityIcon;
  title: string;
  summary: string;
  description: string;
  tags: string[];
  accent: ActivityAccent;
  colSpan?: "wide";
};

export type TermEventSide = "left" | "right";

export type ContentDetailSection = {
  id: string;
  title: string;
  items: string[];
  note?: string;
};

export type TermEvent = {
  id: string;
  order: number;
  label: string;
  title: string;
  summary: string;
  tagline: string;
  description: string;
  detailSections: ContentDetailSection[];
  side: TermEventSide;
  accent: ActivityAccent;
  imageSrc: string;
  imageAlt: string;
};

export type MomentGlow = "cyan" | "purple";

export type TermEventGalleryItem = {
  id: string;
  order: number;
  title: string;
  imageSrc: string;
  imageAlt: string;
  glow: MomentGlow;
  imageClassName?: string;
};

export type BlogTeaser = {
  id: string;
  title: string;
  excerpt: string;
  href: string;
  date?: string;
  isSample?: boolean;
};

export type FaqItem = {
  q: string;
  a: string;
  isSample?: boolean;
};
