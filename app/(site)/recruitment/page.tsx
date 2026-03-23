import type { Metadata } from "next";
import { RecruitmentProcessExtra } from "@/components/recruitment-process-extra";
import { Registration } from "@/components/registration";
import { RecruitmentFaq } from "@/components/recruitment-faq";

export const metadata: Metadata = {
  title: "Tuyển thành viên",
  description:
    "Đăng ký tham gia TechTonic Club: quy trình, form và câu hỏi thường gặp.",
};

export default function RecruitmentPage() {
  return (
    <>
      <Registration />
      <RecruitmentProcessExtra />
      <RecruitmentFaq />
    </>
  );
}
