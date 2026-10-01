import type { MetadataRoute } from "next";
import { site } from "@/config/site";

const paths = [
  "/",
  "/about",
  "/therapy",
  "/trauma-therapy",
  "/adhd-autism-neurodivergence",
  "/children-teens-families",
  "/grief",
  "/consultation-training",
  "/partnerships",
  "/faq",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((p) => ({ url: `${site.url}${p}`, changeFrequency: "monthly", priority: p === "/" ? 1 : 0.7 }));
}
