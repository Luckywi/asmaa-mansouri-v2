import type { Metadata } from "next";

/**
 * Fallback alt pour les OG images quand un override n'en fournit pas.
 * Repris tel quel par la convention file-based `opengraph-image.tsx` de
 * chaque route (racine + variantes /prestations, /specialites,
 * /qui-suis-je, /prestations/[slug], /specialites/[slug]).
 */
const DEFAULT_OG_ALT = "Asmaa Mansouri, naturopathe à Décines-Charpieu";

/**
 * Entrée du helper `buildMetadata`. Seuls les champs qui varient par
 * page sont exposés ici : le reste (applicationName, authors, creator,
 * publisher, formatDetection, icons, robots globaux, verification,
 * alternates.languages) est hérité du layout racine.
 *
 * - `ogTitle` / `ogDescription` permettent un ton plus chaud pour les
 *   cartes sociales quand le title SEO est trop kw-dense.
 * - `ogImage` n'est défini que pour override ponctuel : par défaut on
 *   laisse la convention `opengraph-image.tsx` auto-injecter l'image.
 * - `noindex` applique `{ index: false, follow: true }` (pages légales).
 */
export type BuildMetadataInput = {
  title: string;
  description: string;
  path: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: "website" | "article";
  ogImage?: string;
  ogImageAlt?: string;
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  keywords?: string[];
  noindex?: boolean;
};

export function buildMetadata(input: BuildMetadataInput): Metadata {
  const {
    title,
    description,
    path,
    ogTitle,
    ogDescription,
    ogType = "website",
    ogImage,
    ogImageAlt = DEFAULT_OG_ALT,
    publishedTime,
    modifiedTime,
    authors,
    keywords,
    noindex = false,
  } = input;

  const effectiveOgTitle = ogTitle ?? title;
  const effectiveOgDescription = ogDescription ?? description;

  const images = ogImage
    ? [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          type: "image/png",
          alt: ogImageAlt,
        },
      ]
    : undefined;

  const openGraph: Metadata["openGraph"] =
    ogType === "article"
      ? {
          type: "article",
          url: path,
          title: effectiveOgTitle,
          description: effectiveOgDescription,
          ...(publishedTime ? { publishedTime } : {}),
          ...(modifiedTime ? { modifiedTime } : {}),
          ...(authors ? { authors } : {}),
          ...(images ? { images } : {}),
        }
      : {
          type: "website",
          url: path,
          title: effectiveOgTitle,
          description: effectiveOgDescription,
          ...(images ? { images } : {}),
        };

  const metadata: Metadata = {
    title,
    description,
    alternates: { canonical: path },
    openGraph,
    twitter: {
      card: "summary_large_image",
      title: effectiveOgTitle,
      description: effectiveOgDescription,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };

  if (keywords && keywords.length > 0) metadata.keywords = keywords;
  if (noindex) metadata.robots = { index: false, follow: true };

  return metadata;
}
