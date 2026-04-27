import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-image";

export const alt =
  "Parcours et approche d'Asmaa Mansouri, naturopathe à Décines-Charpieu";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function QuiSuisJeOGImage() {
  return renderOgImage({
    eyebrow: "Qui suis-je",
    title: "Asmaa Mansouri",
    subtitle: "Naturopathe, formations et parcours",
  });
}
