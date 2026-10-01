import { SpecialtyPage } from "@/components/pages/Pages";
import { specialties } from "@/content/specialties";
import { pageMeta } from "@/lib/seo";

const s = specialties.find((x) => x.id === "grief")!;

export const metadata = pageMeta(s.page.metaTitle, s.page.metaDescription, "/grief");

export default function Page() {
  return <SpecialtyPage s={s} />;
}
