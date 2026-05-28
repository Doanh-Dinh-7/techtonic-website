/** Các ban — mẫu, chỉnh sửa mô tả và hoạt động khi có thông tin chính thức. */
import type { Department } from "./types";

export const departments: Department[] = [
  {
    id: "events",
    name: "Ban Sự kiện",
    shortName: "SK",
    description:
      "Lên kế hoạch và triển khai workshop, seminar, teambuilding và các sự kiện nội bộ của CLB.",
    highlights: [
      "Điều phối địa điểm, thời gian, checklist chương trình",
      "Phối hợp Ban Truyền thông để quảng bá",
    ],
    isSample: true,
  },
  {
    id: "media",
    name: "Ban Truyền thông",
    shortName: "TT",
    description: "Xây dựng hình ảnh CLB trên mạng xã hội, thiết kế poster và nội dung số.",
    highlights: ["Quản lý fanpage / kênh hình ảnh", "Sản xuất bài đăng, recap sự kiện"],
    isSample: true,
  },
  {
    id: "hr",
    name: "Ban Nhân sự",
    shortName: "NS",
    description: "Tuyển chọn, onboarding và gắn kết thành viên; hỗ trợ văn hóa CLB.",
    highlights: ["Tổ chức các vòng tuyển thành viên", "Theo dõi hoạt động, gắn kết mentor–mentee"],
    isSample: true,
  },
  {
    id: "tech",
    name: "Ban Chuyên môn",
    shortName: "CM",
    description:
      "Định hướng kỹ thuật, dự án code, học nhóm và chuẩn bị thi đấu (ICPC, hackathon, …).",
    highlights: ["Dự án web/app nội bộ", "Lớp chia sẻ kỹ năng lập trình"],
    isSample: true,
  },
];
