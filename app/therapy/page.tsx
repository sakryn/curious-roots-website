import { InnerPage, PageHeader } from "@/components/pages/Pages";
import { FitFinder } from "@/components/sections/FitFinder";
import { HowIWork } from "@/components/sections/HowIWork";
import { NextSteps } from "@/components/sections/NextSteps";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Therapy",
  "Therapy for trauma, ADHD, autism, grief and emotional regulation with Sarah Snyder in Sinking Spring, PA.",
  "/therapy",
);

export default function Page() {
  return (
    <>
      <PageHeader title="Therapy" intro="Who I work with, how I work, and what starting looks like." flower="fern" />
      <InnerPage>
        <FitFinder />
        <HowIWork />
        <NextSteps />
      </InnerPage>
    </>
  );
}
