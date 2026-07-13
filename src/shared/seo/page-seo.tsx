import { JsonLd } from "@/shared/seo/json-ld";
import { pageStructuredData, type PageSeoConfig } from "@/lib/seo";

type PageSeoProps = {
  config: PageSeoConfig;
};

/** Per-route JSON-LD (WebPage + BreadcrumbList). */
export function PageSeo({ config }: PageSeoProps) {
  return <JsonLd data={pageStructuredData(config)} />;
}
