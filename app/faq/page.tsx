import { InnerPage, PageHeader } from "@/components/pages/Pages";
import { Faq } from "@/components/sections/Faq";
import { faqCopy } from "@/content/home";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Frequently asked questions",
  "Answers about working with Sarah Snyder: ages, insurance, telehealth, waitlist and getting started.",
  "/faq",
);

export default function Page() {
  return (
    <>
      <PageHeader title={faqCopy.heading} intro={faqCopy.intro} flower="seedhead" />
      <InnerPage>
        <Faq showHeading={false} showAllLink={false} />
      </InnerPage>
    </>
  );
}
