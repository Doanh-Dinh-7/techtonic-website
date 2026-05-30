import { createPageMetadata, PAGE_SEO } from "@/lib/seo";
import { PageSeo } from "@/shared/seo/page-seo";
import { DepartmentsPageContent } from "@/widgets/departments/departments-page-content";

export const metadata = createPageMetadata(PAGE_SEO.departments);

export default function DepartmentsPage() {
  return (
    <>
      <PageSeo config={PAGE_SEO.departments} />
      <DepartmentsPageContent />
    </>
  );
}
