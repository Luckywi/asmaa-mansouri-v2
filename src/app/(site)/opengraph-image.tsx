import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE, OG_ALT } from "@/lib/og-image";

export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function RootOGImage() {
  return renderOgImage({
    title: "Asmaa Mansouri",
    subtitle: "Naturopathe · Santé féminine · Décines-Charpieu",
  });
}
