import type { Metadata } from "next";
import { RecruitmentPageSections } from "@/widgets/recruitment/recruitment-page-sections";

export const metadata: Metadata = {
  title: "Tuyển thành viên",
  description: "Đăng ký tham gia TechTonic Club: quy trình, form và câu hỏi thường gặp.",
};

export default function RecruitmentPage() {
  return <RecruitmentPageSections />;
}
