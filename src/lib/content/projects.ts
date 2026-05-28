/** Dự án nổi bật — mẫu. */
import type { ProjectItem } from "./types";

export const featuredProjects: ProjectItem[] = [
  {
    id: "p1",
    title: "Website giới thiệu CLB",
    description: "Trang thông tin đa trang cho TechTonic, tích hợp form tuyển thành viên.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    demoUrl: "/",
    isSample: true,
  },
  {
    id: "p2",
    title: "Ứng dụng nội bộ (demo)",
    description:
      "Ý tưởng quản lý sự kiện và điểm danh thành viên — đang trong giai đoạn thử nghiệm.",
    stack: ["React", "Node.js"],
    isSample: true,
  },
];
