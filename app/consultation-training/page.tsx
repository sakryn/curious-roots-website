import { PageHeader } from "@/components/pages/Pages";
import { Education } from "@/components/sections/LocationEducation";
import { education } from "@/content/home";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Education + consultation",
  "Professional consultation, ADHD and neurodiversity education, parent support and custom training from Sarah Snyder.",
  "/consultation-training",
);

export default function Page() {
  return (
    <>
      <PageHeader title="Education + consultation" intro={education.body} flower="hellebore" />
      <Education />
    </>
  );
}
