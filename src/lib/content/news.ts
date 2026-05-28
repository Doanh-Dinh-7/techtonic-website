/** Tin nổi bật — mẫu, cập nhật sau. */
import type { NewsItem } from "./types";

export const featuredNews: NewsItem[] = [
  {
    id: "1",
    title: "TechTonic mở đợt tuyển thành viên mới",
    excerpt:
      "Chào đón các bạn tân sinh viên đam mê công nghệ tham gia cộng đồng học tập và dự án thực tế.",
    date: "2025-03-01",
    href: "/recruitment",
    badge: "Tuyển dụng",
    isSample: true,
  },
  {
    id: "2",
    title: "Workshop: Làm quen với Git & GitHub",
    excerpt: "Buổi chia sẻ ngắn về quy trình làm việc nhóm và quản lý mã nguồn cho người mới.",
    date: "2025-02-15",
    href: "/events",
    badge: "Sự kiện",
    isSample: true,
  },
  {
    id: "3",
    title: "Cập nhật website CLB",
    excerpt: "Giao diện mới, nhiều trang thông tin hơn để các bạn dễ tìm hiểu về TechTonic.",
    date: "2025-03-20",
    href: "#",
    badge: "Thông báo",
    isSample: true,
  },
];
