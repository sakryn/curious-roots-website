import { InnerPage, PageHeader } from "@/components/pages/Pages";
import { AboutSarah } from "@/components/sections/AboutSarah";
import { AboutApproach, Letter, Story, SpecialtyIndex } from "@/components/sections/Extras";
import { HowIWork } from "@/components/sections/HowIWork";
import { aboutPage } from "@/content/services";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "About Sarah Snyder, LCSW",
  "Meet Sarah Snyder, MSW, LCSW, CCTP-II, ADHD-CCSP, CGCS-CA: the therapist behind Curious Roots Wellness in Sinking Spring, Pennsylvania.",
  "/about",
);

export default function Page() {
  return (
    <>
      <PageHeader title={aboutPage.heading} kicker="About" intro={aboutPage.intro} flower="daisy" photo />
      <InnerPage>
        <AboutSarah heading={aboutPage.card.heading} paragraphs={aboutPage.card.paragraphs} showMore={false} />
        <AboutApproach />
        <Letter />
        <Story />
        <SpecialtyIndex />
        <HowIWork />
      </InnerPage>
    </>
  );
}
