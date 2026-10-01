"use client";

import type { ReactNode } from "react";
import { ExperienceProvider } from "@/lib/experience";
import { Header, MobileCTA } from "./Header";
import { Footer } from "./Footer";
import { Toast } from "@/components/ui/Toast";
import { FlowerDefs } from "@/components/botanicals/Wildflowers";

/** Everything that wraps every page: providers, header, footer, sticky CTA. */
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <ExperienceProvider>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <FlowerDefs />
      <Header />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <Footer />
      <MobileCTA />
      <Toast />
      <div className="grain" aria-hidden="true" />
    </ExperienceProvider>
  );
}
