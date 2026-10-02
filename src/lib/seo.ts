import type { Metadata } from "next";
import { site } from "@/config/site";

/** One place to build page metadata so titles and descriptions stay consistent. */
export function pageMeta(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: `${title} | ${site.name}`, description, url: path, siteName: site.name, type: "website" },
    robots: site.noIndex ? { index: false, follow: false } : undefined,
  };
}

/** Structured data for a solo mental-health practice. Fill in confirmed details before launch. */
export function practiceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    url: site.url,
    founder: { "@type": "Person", name: site.clinician, honorificSuffix: site.postNominals },
    faxNumber: site.fax,
    areaServed: `${site.town}, ${site.state}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.town,
      addressRegion: site.stateAbbr,
      addressCountry: "US",
      streetAddress: "4453 Penn Ave, Suite 4",
      postalCode: "19608",
    },
  };
}
