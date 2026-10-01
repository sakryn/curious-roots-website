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
    "Trauma-informed, neurodivergent-affirming therapy for children, teens, adults and families with Sarah Snyder in Sinking Spring, Pennsylvania.",
  robots: site.noIndex ? { index: false, follow: false } : undefined,
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#EFE8D6",
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
