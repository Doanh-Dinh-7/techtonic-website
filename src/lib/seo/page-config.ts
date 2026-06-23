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
    absoluteTitle: "TechTonic Club — Câu lạc bộ Công nghệ | UEH Đà Nẵng",
    title: "Trang chủ",
    description:
      "TechTonic Club — cộng đồng công nghệ UEH Đà Nẵng: workshop, hackathon, mentor và dự án thực tế cho sinh viên CNTT.",
    keywords: ["TechTonic", "câu lạc bộ công nghệ", "UEH Đà Nẵng", "lập trình", "sinh viên CNTT"],
  },
  about: {
    path: "/about",
    title: "Giới thiệu",
    description:
      "Tầm nhìn, sứ mệnh, giá trị cốt lõi, hành trình phát triển, thư viện ảnh và Ban chủ nhiệm TechTonic Club tại UEH Đà Nẵng.",
    keywords: ["giới thiệu", "TechTonic", "ban chủ nhiệm", "UEH"],
  },
  departments: {
    path: "/departments",
    title: "Các ban",
    description:
      "Ban Sự kiện, Truyền thông, Nhân sự và Chuyên môn — hoạt động và định hướng từng ban TechTonic Club.",
    keywords: ["ban CLB", "sự kiện", "truyền thông", "chuyên môn"],
  },
  events: {
    path: "/events",
    title: "Hoạt động & sự kiện",
    description:
      "Hoạt động học thuật hằng tuần, sinh hoạt Happy Hour, chuỗi sự kiện cố định mỗi nhiệm kỳ (Mentor-Mentee, TechXplore, Tech Threads, TechWare) — TechTonic Club UEH Đà Nẵng.",
    keywords: [
      "hoạt động CLB",
      "Happy Hour",
      "TechXplore",
      "Mentor Mentee",
      "TechTonic",
      "UEH Đà Nẵng",
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
    keywords: ["tuyển thành viên", "đăng ký CLB", "TechTonic", "UEH"],
  },
} as const satisfies Record<string, PageSeoConfig>;
