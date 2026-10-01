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
    body: "I partner with the Adalyn Rose Foundation and Keegan Cares to support children and families who are grieving. [CONFIRM partnership details and preferred description with Sarah.]",
    link: "partnerAdalynRose",
    linkLabel: "Visit the foundation",
  },
  {
    id: "catapallovr",
    name: "CatapalloVR",
    area: "Immersive tools",
    flower: "vine",
    status: "In development",
    body: "I'm exploring how carefully chosen virtual reality experiences can add to our work, like rehearsing a hard conversation or practicing calming skills somewhere that feels real. VR is always optional, and I'll only suggest it when it's a good clinical fit for you.",
    link: "partnerCatapallo",
    linkLabel: "Visit CatapalloVR",
  },
];
