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
