"use client";

import { RecruitmentPageBackdrop } from "@/features/recruitment/components/recruitment-page-backdrop";
import { RecruitmentFaq } from "@/features/recruitment/recruitment-faq";
import { RecruitmentProcessExtra } from "@/features/recruitment/recruitment-process-extra";
import { Registration } from "@/features/recruitment/registration";

export function RecruitmentContent() {
  return (
    <div className="v2-dark-shell relative min-h-screen">
      <RecruitmentPageBackdrop />
      <div className="relative z-10">
        <Registration />
        <RecruitmentProcessExtra />
        <RecruitmentFaq />
      </div>
    </div>
  );
}
