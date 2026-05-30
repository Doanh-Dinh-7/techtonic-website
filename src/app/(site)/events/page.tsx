import { createPageMetadata, PAGE_SEO } from "@/lib/seo";
import { PageSeo } from "@/shared/seo/page-seo";
import { EventsPageContent } from "@/widgets/events/events-page-content";

export const metadata = createPageMetadata(PAGE_SEO.events);

export default function EventsPage() {
  return (
    <>
      <PageSeo config={PAGE_SEO.events} />
      <EventsPageContent />
    </>
  );
}
