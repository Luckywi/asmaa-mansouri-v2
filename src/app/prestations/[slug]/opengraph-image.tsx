import { prestations } from "@/data/prestations";
import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE, OG_ALT } from "@/lib/og-image";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = OG_ALT;

type Params = { slug: string };

/**
 * Force la pré-génération des 4 images OG (1 par slug) au build plutôt
 * qu'à la première requête. Sans ça, Next marque la route ƒ (dynamic)
 * et rend l'image au runtime, ce qui ralentit le 1er partage social.
 */
export function generateStaticParams(): Params[] {
  return prestations.map((p) => ({ slug: p.slug }));
}

export default async function PrestationSlugOGImage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const prestation = prestations.find((p) => p.slug === slug);
  if (!prestation) {
    return renderOgImage({
      eyebrow: "Prestation",
      title: "Naturopathie à Décines",
      subtitle: "Asmaa Mansouri",
    });
  }
  return renderOgImage({
    eyebrow: "Prestation",
    title: prestation.title,
    subtitle: "Cabinet à Décines-Charpieu · Asmaa Mansouri",
  });
}
