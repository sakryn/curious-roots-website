import { SpecialtyPage } from "@/components/pages/Pages";
import { specialties } from "@/content/specialties";
import { pageMeta } from "@/lib/seo";

const s = specialties.find((x) => x.id === "trauma")!;

export const metadata = pageMeta(s.page.metaTitle, s.page.metaDescription, "/trauma-therapy");

export default function Page() {
  return <SpecialtyPage s={s} />;
}
