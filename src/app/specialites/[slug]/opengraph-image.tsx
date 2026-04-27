import { specialites } from "@/data/specialites";
import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE, OG_ALT } from "@/lib/og-image";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = OG_ALT;

type Params = { slug: string };

/**
 * Force la pré-génération des 4 images OG (1 par slug) au build.
 */
export function generateStaticParams(): Params[] {
  return specialites.map((s) => ({ slug: s.slug }));
}

export default async function SpecialiteSlugOGImage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const specialite = specialites.find((s) => s.slug === slug);
  if (!specialite) {
    return renderOgImage({
      eyebrow: "Spécialité",
      title: "Naturopathie féminine",
      subtitle: "Décines-Charpieu · Asmaa Mansouri",
    });
  }
  return renderOgImage({
    eyebrow: "Spécialité",
    title: specialite.title,
    subtitle: "Naturopathie à Décines-Charpieu · Asmaa Mansouri",
  });
}
