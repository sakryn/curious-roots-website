import { InnerPage, PageHeader } from "@/components/pages/Pages";
import { AboutSarah } from "@/components/sections/AboutSarah";
import { HowIWork } from "@/components/sections/HowIWork";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "About Sarah Snyder",
  "Meet Sarah Snyder, the therapist behind Curious Roots Wellness in Sinking Spring, Pennsylvania.",
  "/about",
);

export default function Page() {
  return (
    <>
      <PageHeader title="About Sarah" intro="The person you'd actually be working with." flower="bell" />
      <InnerPage>
        <AboutSarah />
        <HowIWork />
      </InnerPage>
    </>
  );
}
