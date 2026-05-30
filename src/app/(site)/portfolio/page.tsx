import { createPageMetadata, PAGE_SEO } from "@/lib/seo";
import { PageSeo } from "@/shared/seo/page-seo";
import { PortfolioPageContent } from "@/widgets/portfolio/portfolio-page-content";

export const metadata = createPageMetadata(PAGE_SEO.portfolio);

export default function PortfolioPage() {
  return (
    <>
      <PageSeo config={PAGE_SEO.portfolio} />
      <PortfolioPageContent />
    </>
  );
}
