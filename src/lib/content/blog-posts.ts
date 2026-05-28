/** Blog công nghệ — teaser, mẫu. */
import type { BlogTeaser } from "./types";

export const techBlogTeasers: BlogTeaser[] = [
  {
    id: "b1",
    title: "5 mẹo TypeScript cho người mới",
    excerpt: "any vs unknown, type guard và khi nào nên dùng interface.",
    href: "#",
    date: "2025-03-10",
    isSample: true,
  },
  {
    id: "b2",
    title: "Tối ưu bundle trong dự án Next.js",
    excerpt: "dynamic import, image và phân tích kích thước build.",
    href: "#",
    date: "2025-03-05",
    isSample: true,
  },
  {
    id: "b3",
    title: "Làm việc nhóm với Git flow đơn giản",
    excerpt: "Nhánh main/develop/feature và code review trên GitHub.",
    href: "#",
    date: "2025-02-28",
    isSample: true,
  },
];
