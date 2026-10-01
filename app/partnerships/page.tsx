import { InnerPage, PageHeader } from "@/components/pages/Pages";
import { Partnerships } from "@/components/sections/Partnerships";
import { partnershipsCopy } from "@/content/home";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Partnerships",
  "Organizations Curious Roots Wellness partners with, including grief support and immersive learning.",
  "/partnerships",
);

export default function Page() {
  return (
    <>
      <PageHeader title={partnershipsCopy.heading} intro={partnershipsCopy.intro} flower="umbel" />
      <InnerPage>
        <Partnerships showHeading={false} />
      </InnerPage>
    </>
  );
}
