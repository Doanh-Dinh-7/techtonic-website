import { createPageMetadata, PAGE_SEO } from "@/lib/seo";
import { PageSeo } from "@/shared/seo/page-seo";
import { HomePageSections } from "@/widgets/home/home-page-sections";

export const metadata = createPageMetadata(PAGE_SEO.home);

export default function HomePage() {
  return (
    <>
      <PageSeo config={PAGE_SEO.home} />
      <HomePageSections />
    </>
  );
}
