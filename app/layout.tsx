import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { site } from "@/config/site";
import { SiteShell } from "@/components/layout/SiteShell";
import { practiceJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Therapy with Sarah Snyder in Sinking Spring, PA`,
    template: `%s | ${site.name}`,
  },
  description:
    "Healing from the roots up. Trauma-informed, neurodivergent-affirming therapy for children, teens and adults with Sarah Snyder, LCSW, in Sinking Spring, PA and by telehealth across Pennsylvania.",
  robots: site.noIndex ? { index: false, follow: false } : undefined,
  openGraph: {
    type: "website",
    siteName: site.name,
    images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: "Curious Roots Wellness" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#F8F6F1",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(practiceJsonLd()) }}
        />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
