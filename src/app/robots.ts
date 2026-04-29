import type { MetadataRoute } from "next";

/**
 * robots.txt dynamique, servi par Next sur `/robots.txt`.
 *
 * Indexation ouverte. Disallow techniques : `/api/` et `/_next/` sont
 * redondants avec le comportement par défaut de Next mais déclarés
 * pour les crawlers qui scorent l'explicite. Les pages légales
 * (`/cgv`, `/mentions-legales`, `/politique-confidentialite`) ne sont
 * PAS listées ici : elles ont leur propre `noindex` via metadata, ce
 * qui est plus propre qu'un disallow robots.txt (un crawler peut
 * indexer une URL même si robots.txt l'interdit, alors que le meta
 * noindex est respecté universellement).
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: "https://naturopathe-decines.fr/sitemap.xml",
    host: "https://naturopathe-decines.fr",
  };
}
