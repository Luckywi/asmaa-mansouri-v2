import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-image";

export const alt =
  "Spécialités en santé féminine · Asmaa Mansouri, naturopathe à Décines-Charpieu";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function SpecialitesOGImage() {
  return renderOgImage({
    eyebrow: "Spécialités",
    title: "Santé féminine",
    subtitle: "Hormones, digestion, burn-out, allergies",
  });
}
