import type { LinkKey } from "@/config/links";
import type { FlowerKind } from "./specialties";

/**
 * Partners. Add a new object to this list and a new card appears on the
 * homepage and the Partnerships page. Nothing else to change.
 */
export interface Partner {
  id: string;
  name: string;
  area: string;
  flower: FlowerKind;
  status?: string;
  body: string;
  link: LinkKey;
  linkLabel: string;
  /** Path under /public once a logo file exists. */
  logo?: string;
}

export const partners: Partner[] = [
  {
    id: "adalyn-rose",
    name: "Adalyn Rose Foundation + Keegan Cares",
    area: "Grief + loss",
    flower: "rose",
    body: "Through the Keegan Cares partnership with the Adalyn Rose Foundation, I offer funded therapy for parents grieving a baby lost during pregnancy, infancy or early childhood, so cost isn't a barrier to support. Reach out to me directly, or complete the referral form through the program.",
    link: "partnerAdalynRose",
    linkLabel: "Learn more about ARF",
  },
  {
    id: "catapallovr",
    name: "CatapalloVR",
    area: "Immersive tools",
    flower: "lilac",
    body: "I'm bringing carefully chosen virtual reality experiences from CatapalloVR into my work, like practicing calming and somatic skills or rehearsing a hard conversation somewhere that feels real. VR is always optional, and I'll only suggest it when it's a good fit for you.",
    link: "partnerCatapallo",
    linkLabel: "Visit CatapalloVR",
  },
];
