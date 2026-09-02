import { SITE } from "@/lib/constants/site";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export function JsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: SITE.name,
        alternateName: ["ICE UP!", "IceUp!", SITE.tagline],
        url: siteUrl,
        description: SITE.description,
        inLanguage: "es-ES",
      },
      {
        "@type": "ItemList",
        name: `${SITE.name} — páginas principales`,
        itemListElement: [
          {
            "@type": "SiteNavigationElement",
            position: 1,
            name: "Colección",
            url: `${siteUrl}/coleccion`,
          },
          {
            "@type": "SiteNavigationElement",
            position: 2,
            name: "Archivo",
            url: `${siteUrl}/#archivo`,
          },
          {
            "@type": "SiteNavigationElement",
            position: 3,
            name: "Atelier",
            url: `${siteUrl}/#atelier`,
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(graph).replace(/</g, "\\u003c"),
      }}
    />
  );
}
