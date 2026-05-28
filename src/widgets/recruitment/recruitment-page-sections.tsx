import { RecruitmentFaq } from "@/features/recruitment/recruitment-faq";
import { RecruitmentProcessExtra } from "@/features/recruitment/recruitment-process-extra";
import { Registration } from "@/features/recruitment/registration";

export function RecruitmentPageSections() {
  return (
    <>
      <Registration />
      <RecruitmentProcessExtra />
      <RecruitmentFaq />
    </>
  );
}
