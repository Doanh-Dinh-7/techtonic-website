/** Lịch workshop / sự kiện — mẫu. */
import type { WorkshopEvent } from "./types";

export const upcomingWorkshops: WorkshopEvent[] = [
  {
    id: "e1",
    title: "Git & GitHub cho người mới",
    date: "2025-04-05T14:00:00",
    location: "Phòng lab (cập nhật)",
    description: "Làm quen branch, PR và làm việc nhóm.",
    isSample: true,
  },
  {
    id: "e2",
    title: "Buổi chia sẻ Frontend cơ bản",
    date: "2025-04-12T14:00:00",
    location: "Trực tuyến / tại trường (sẽ thông báo)",
    description: "HTML/CSS/JS và giới thiệu React.",
    isSample: true,
  },
];
