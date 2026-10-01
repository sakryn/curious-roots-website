import { createRoot } from "react-dom/client";
import "@/styles/globals.css";
import { SiteShell } from "@/components/layout/SiteShell";
import { HomePage } from "@/components/pages/Pages";

createRoot(document.getElementById("root")!).render(
  <SiteShell>
    <HomePage />
  </SiteShell>,
);
