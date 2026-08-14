import type { SiteRoute } from "./site";

export type PageSeoConfig = {
  path: SiteRoute;
  title: string;
  description: string;
  /** If set, used as document title without layout template suffix. */
  absoluteTitle?: string;
  keywords?: string[];
};

export const PAGE_SEO = {
  home: {
    path: "/",
    absoluteTitle: "TechTonic Club - Câu lạc bộ Công nghệ | DUE Đà Nẵng",
    title: "Trang chủ",
    description:
      "TechTonic Club - cộng đồng công nghệ DUE Đà Nẵng: workshop, hackathon, mentor và dự án thực tế cho sinh viên CNTT.",
    keywords: ["TechTonic", "câu lạc bộ công nghệ", "DUE Đà Nẵng", "lập trình", "sinh viên CNTT"],
  },
  about: {
    path: "/about",
    title: "Giới thiệu",
    description:
      "Tầm nhìn, sứ mệnh, giá trị cốt lõi, hành trình phát triển, thư viện ảnh và Ban Chủ Nhiệm TechTonic Club tại DUE Đà Nẵng.",
    keywords: ["giới thiệu", "TechTonic", "ban chủ nhiệm", "DUE"],
  },
  departments: {
    path: "/departments",
    title: "Các ban",
    description:
      "Ban Sự Kiện, Truyền Thông, Nhân Sự và Chuyên Môn - hoạt động và định hướng từng ban TechTonic Club.",
    keywords: ["ban CLB", "sự kiện", "truyền thông", "chuyên môn"],
  },
  events: {
    path: "/events",
    title: "Hoạt động & Sự kiện",
    description:
      "Hoạt động học thuật hằng tuần, sinh hoạt Happy Hour, chuỗi sự kiện cố định mỗi nhiệm kỳ (Mentor - Mentee, TechXplore, Tech Threads, TechWare) - TechTonic Club DUE Đà Nẵng.",
    keywords: [
      "hoạt động CLB",
      "Happy Hour",
      "TechXplore",
      "Mentor Mentee",
      "TechTonic",
      "DUE Đà Nẵng",
    ],
  },
  portfolio: {
    path: "/portfolio",
    title: "Dự án & thành tích",
    description: "Sản phẩm nổi bật, giải thưởng và liên kết mã nguồn GitHub của TechTonic Club.",
    keywords: ["dự án", "portfolio", "giải thưởng", "GitHub"],
  },
  recruitment: {
    path: "/recruitment",
    title: "Tuyển thành viên",
    description:
      "Đăng ký tham gia TechTonic Club: quy trình tuyển thành viên, form đăng ký và câu hỏi thường gặp.",
    keywords: ["tuyển thành viên", "đăng ký CLB", "TechTonic", "DUE"],
  },
} as const satisfies Record<string, PageSeoConfig>;
