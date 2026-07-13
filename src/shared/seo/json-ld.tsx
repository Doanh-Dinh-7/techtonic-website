type JsonLdValue = Record<string, unknown>;

type JsonLdProps = {
  data: JsonLdValue | JsonLdValue[];
};

/**
 * Renders Schema.org JSON-LD (server-safe).
 */
export function JsonLd({ data }: JsonLdProps) {
  const payload = Array.isArray(data) ? data : [data];

  return (
    <>
      {payload.map((entry) => (
        <script
          key={String(entry["@type"] ?? entry["@id"] ?? JSON.stringify(entry).slice(0, 40))}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(entry) }}
        />
      ))}
    </>
  );
}
