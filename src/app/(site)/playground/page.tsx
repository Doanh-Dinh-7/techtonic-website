import { createPageMetadata, PAGE_SEO } from "@/lib/seo";
import { PageSeo } from "@/shared/seo/page-seo";
import { PlaygroundPageContent } from "@/widgets/playground/playground-page-content";

export const metadata = createPageMetadata(PAGE_SEO.playground);

export default function PlaygroundPage() {
  return (
    <>
      <PageSeo config={PAGE_SEO.playground} />
      <PlaygroundPageContent />
    </>
  );
}
