import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-image";

export const alt =
  "Prestations et tarifs · Asmaa Mansouri, naturopathe à Décines-Charpieu";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function PrestationsOGImage() {
  return renderOgImage({
    eyebrow: "Prestations",
    title: "Consultations, Tuina, cupping",
    subtitle: "Naturopathie à Décines-Charpieu",
  });
}
