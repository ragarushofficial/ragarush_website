import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "ProfessionalService"],
      "@id": `${SITE_URL}/#business`,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      url: SITE_URL,
      image: `${SITE_URL}/og-image.png`,
      telephone: "++919970155508",
      email: "hello@ragarush.studio",
      priceRange: "₹999–₹6999+",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
      },
      areaServed: [
        { "@type": "Country", name: "India" },
        { "@type": "Place", name: "Worldwide (remote)" },
      ],
      knowsLanguage: ["Hindi", "Marathi", "English"],
      slogan: "Har Kahani Ko Mile Apna Sur",
      sameAs: [
        "https://www.instagram.com/ragarush_official/",
        "https://www.youtube.com/",
        "https://open.spotify.com/",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: ["en-IN", "hi", "mr"],
      publisher: { "@id": `${SITE_URL}/#business` },
    },
  ],
};

export function OrganizationJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
