import type { RecruitmentRound } from "./types";

export const recruitmentProcessTitle = "Quy trình tuyển chọn";
export const recruitmentProcessSubtitle =
  "Áp dụng cho đợt tuyển thành viên tự do và Ban Chủ Nhiệm - chi tiết lịch từng đợt sẽ được thông báo qua email.";

export const recruitmentProcessRounds: RecruitmentRound[] = [
  {
    id: "application",
    title: "Vòng đơn",
    description:
      "Ứng viên điền đầy đủ thông tin biểu mẫu ứng tuyển. Ban Chủ Nhiệm xét chọn vào vòng tiếp theo dựa trên kết quả form, thông báo qua email.",
    appliesTo: "Thành viên tự do & Ban Chủ Nhiệm",
    icon: "file",
  },
  {
    id: "interview",
    title: "Vòng phỏng vấn",
    description:
      "Ứng viên đậu vòng đơn xác nhận thời gian phỏng vấn qua email, đến đúng giờ và địa điểm được thông báo. Ứng viên đậu vòng phỏng vấn trở thành thành viên tự do chính thức.",
    appliesTo: "Thành viên tự do & Ban Chủ Nhiệm",
    icon: "message",
  },
  {
    id: "internship",
    title: "Vòng thực tập",
    description:
      "Ứng viên Ban Chủ Nhiệm đậu vòng phỏng vấn tham gia thực tập tại ban ứng tuyển. Ban Chủ Nhiệm đánh giá tinh thần, thái độ và kết quả công việc; kết quả chính thức được thông báo qua email.",
    appliesTo: "Ban Chủ Nhiệm",
    icon: "briefcase",
  },
];

export const recruitmentProcessNote =
  "Nếu bạn ứng tuyển trở thành thành viên Ban Chủ Nhiệm và đã đậu vòng phỏng vấn, đồng nghĩa bạn đã trở thành thành viên tự do chính thức của CLB TechTonic. Tuy nhiên, bạn vẫn phải vượt qua vòng thực tập để trở thành thành viên chính thức của Ban Chủ Nhiệm.";
