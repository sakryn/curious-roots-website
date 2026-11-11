import { InnerPage, PageHeader } from "@/components/pages/Pages";
import { ConsultGroups, Supervision, NotSure } from "@/components/sections/Extras";
import { Action } from "@/components/ui/Action";
import { consultation } from "@/content/services";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Consultation + Education",
  "ADHD clinical consultation, school and organizational consultation, parent support, training and clinical supervision with Sarah Snyder, LCSW, ADHD-CCSP.",
  "/consultation-training",
);

export default function Page() {
  return (
    <>
      <PageHeader title={consultation.heading} kicker="Beyond the therapy room" intro={consultation.intro} flower="dandelion">
        <div className="page-head__actions">
          <Action link="contact">Let&rsquo;s connect</Action>
        </div>
      </PageHeader>
      <InnerPage closing={false} education={false}>
        <ConsultGroups />
        <Supervision />
        <NotSure heading={consultation.notSure.heading} body={consultation.notSure.body} />
      </InnerPage>
    </>
  );
}
