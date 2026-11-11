import { InnerPage, PageHeader } from "@/components/pages/Pages";
import { FitFinder } from "@/components/sections/FitFinder";
import { IndividualTherapy, TherapyLooks, InsurancePanel, KeeganCares, NotSure } from "@/components/sections/Extras";
import { NextSteps } from "@/components/sections/NextSteps";
import { Action } from "@/components/ui/Action";
import { services } from "@/content/services";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Services",
  "Therapy for ADHD, trauma, anxiety, grief, children, teens and families, plus ADHD assessments, with Sarah Snyder, LCSW, in Sinking Spring, PA and by telehealth across Pennsylvania.",
  "/therapy",
);

export default function Page() {
  return (
    <>
      <PageHeader title={services.heading} kicker="Services" intro={services.intro} flower="lilac">
        <div className="page-head__actions">
          <Action link="requestAppointment">New here? Book now</Action>
          <Action link="insurance" variant="secondary" sprout={false}>
            Insurance + rates
          </Action>
        </div>
      </PageHeader>
      <InnerPage closing={false}>
        <FitFinder />
        <IndividualTherapy />
        <TherapyLooks n="III" />
        <NextSteps />
        <InsurancePanel n="V" />
        <KeeganCares />
        <NotSure heading={services.notSure.heading} body={services.notSure.body} />
      </InnerPage>
    </>
  );
}
