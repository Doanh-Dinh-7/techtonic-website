/** Dự án nổi bật của TechTonic Club. */
import type { ProjectItem } from "./types";

export const featuredProjects: ProjectItem[] = [
  {
    id: "live-gesture-puzzle",
    title: "AI Gesture Puzzle",
    description:
      "Mini-game ghép hình 3×3 điều khiển bằng cử chỉ bàn tay qua webcam với MediaPipe AI và bảng xếp hạng realtime, do Ban Chuyên Môn phát triển.",
    stack: ["React", "TypeScript", "MediaPipe AI", "Firebase", "Canvas"],
    demoUrl: "/playground",
    isSample: false,
  },
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
      "Ý tưởng quản lý sự kiện và điểm danh thành viên - đang trong giai đoạn thử nghiệm.",
    stack: ["React", "Node.js"],
    isSample: true,
  },
];
