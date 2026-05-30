import { createPageMetadata, PAGE_SEO } from "@/lib/seo";
import { PageSeo } from "@/shared/seo/page-seo";
import { AboutPageSections } from "@/widgets/about/about-page-sections";

export const metadata = createPageMetadata(PAGE_SEO.about);

export default function AboutPage() {
  return (
    <>
      <PageSeo config={PAGE_SEO.about} />
      <AboutPageSections />
    </>
  );
}
