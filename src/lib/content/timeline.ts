/** Lịch sử hình thành TechTonic Club — nội dung chính thức. */
import type { TimelineEntry } from "./types";

export const clubTimeline: TimelineEntry[] = [
  {
    year: "2024",
    dateLabel: "01/07/2024",
    title: "Khởi nguồn ý tưởng",
    description: "Ý tưởng được hình thành và tinh thần dấn thân chuyển thành hành động thực tế.",
    offset: "high",
    accent: "cyan",
  },
  {
    year: "2024",
    dateLabel: "09/2024",
    title: "Mentor - Mentee mùa đầu",
    description: "Tổ chức chương trình Mentor - Mentee mùa đầu tiên.",
    offset: "low",
    accent: "violet",
  },
  {
    year: "2025",
    dateLabel: "09/04/2025",
    title: "Ra mắt chính thức",
    description: "Câu lạc bộ được chính thức ra mắt.",
    offset: "high",
    accent: "cyan",
  },
  {
    year: "2025",
    dateLabel: "04/2025",
    title: "TechWare mùa đầu",
    description: "Tổ chức chương trình TechWare mùa đầu tiên.",
    offset: "low",
    accent: "violet",
  },
  {
    year: "2025",
    dateLabel: "05/2025",
    title: "Mở chuyên môn",
    description: "Ra mắt chính thức các chuyên môn FE, BE, AI & Data.",
    offset: "high",
    accent: "cyan",
  },
];

export const clubTimelineFooter = "Còn tiếp...";
