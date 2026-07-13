import { createPageMetadata, PAGE_SEO } from "@/lib/seo";
import { PageSeo } from "@/shared/seo/page-seo";
import { RecruitmentPageSections } from "@/widgets/recruitment/recruitment-page-sections";

export const metadata = createPageMetadata(PAGE_SEO.recruitment);

export default function RecruitmentPage() {
  return (
    <>
      <PageSeo config={PAGE_SEO.recruitment} />
      <RecruitmentPageSections />
    </>
  );
}
