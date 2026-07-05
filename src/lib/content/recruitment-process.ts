import type { RecruitmentRound } from "./types";

export const recruitmentProcessTitle = "Quy trình tuyển chọn";
export const recruitmentProcessSubtitle =
  "Áp dụng cho đợt tuyển thành viên tự do và Ban chủ nhiệm — chi tiết lịch từng đợt sẽ được thông báo qua email.";

export const recruitmentProcessRounds: RecruitmentRound[] = [
  {
    id: "application",
    title: "Vòng đơn",
    description:
      "Ứng viên điền đầy đủ thông tin biểu mẫu ứng tuyển. Ban chủ nhiệm xét chọn vào vòng tiếp theo dựa trên kết quả form, thông báo qua email.",
    appliesTo: "Thành viên tự do & Ban chủ nhiệm",
    icon: "file",
  },
  {
    id: "interview",
    title: "Vòng phỏng vấn",
    description:
      "Ứng viên đậu vòng đơn xác nhận thời gian phỏng vấn qua email, đến đúng giờ và địa điểm được thông báo. Ứng viên đậu vòng phỏng vấn trở thành thành viên tự do chính thức.",
    appliesTo: "Thành viên tự do & Ban chủ nhiệm",
    icon: "message",
  },
  {
    id: "internship",
    title: "Vòng thực tập",
    description:
      "Ứng viên Ban chủ nhiệm đậu vòng phỏng vấn tham gia thực tập tại ban ứng tuyển. Ban chủ nhiệm đánh giá tinh thần, thái độ và kết quả công việc; kết quả chính thức được thông báo qua email.",
    appliesTo: "Ban chủ nhiệm",
    icon: "briefcase",
  },
];

export const recruitmentProcessNote =
  "Nếu bạn ứng tuyển trở thành thành viên Ban chủ nhiệm và đã đậu vòng phỏng vấn, đồng nghĩa bạn đã trở thành thành viên tự do chính thức của CLB TechTonic. Tuy nhiên, bạn vẫn phải vượt qua vòng thực tập để trở thành thành viên chính thức của Ban chủ nhiệm.";
