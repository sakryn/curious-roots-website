import { InnerPage, PageHeader } from "@/components/pages/Pages";
import { Faq } from "@/components/sections/Faq";
import { faqCopy } from "@/content/home";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Frequently asked questions",
  "Answers about working with Sarah Snyder: insurance, telehealth, hours, location, getting started, ADHD assessments and supervision.",
  "/faq",
);

export default function Page() {
  return (
    <>
      <PageHeader title={faqCopy.heading} kicker="FAQ" intro={faqCopy.intro} flower="seedhead" />
      <InnerPage>
        <Faq showHeading={false} showAllLink={false} />
      </InnerPage>
    </>
  );
}
