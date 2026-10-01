import { SpecialtyPage } from "@/components/pages/Pages";
import { specialties } from "@/content/specialties";
import { pageMeta } from "@/lib/seo";

const s = specialties.find((x) => x.id === "neurodivergence")!;

export const metadata = pageMeta(s.page.metaTitle, s.page.metaDescription, "/adhd-autism-neurodivergence");

export default function Page() {
  return <SpecialtyPage s={s} />;
}
