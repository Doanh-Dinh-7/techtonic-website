import { createSiteLayoutMetadata, siteStructuredData } from "@/lib/seo";
import { JsonLd } from "@/shared/seo/json-ld";
import { SiteShell } from "@/widgets/layout/site-shell";

export const metadata = createSiteLayoutMetadata();

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={siteStructuredData()} />
      <SiteShell>{children}</SiteShell>
    </>
  );
}
