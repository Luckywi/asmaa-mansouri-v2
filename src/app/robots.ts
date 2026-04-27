import type { MetadataRoute } from "next";

/**
 * robots.txt dynamique, servi par Next sur `/robots.txt`.
 *
 * Pré-production : on bloque toute indexation tant que le site n'a pas
 * atteint le score SEO cible. Le disallow `/` est intentionnel et
 * redondant avec `robots: { index: false, follow: false }` côté layout
 * (ceinture + bretelles). La structure complète (sitemap, host, paths
 * défensifs) est posée dès maintenant pour qu'au basculement final il
 * suffise de remplacer `disallow: "/"` par `allow: "/"` et d'ajouter
 * les disallow techniques.
 *
 * Passage en production (quand 10/10 SEO) : remplacer la règle par
 *   { userAgent: "*", allow: "/", disallow: ["/api/", "/_next/", "/edition", "/admin"] }
 * et basculer `robots.index = true` dans layout.tsx.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        disallow: "/",
      },
    ],
    sitemap: "https://naturopathe-decines.fr/sitemap.xml",
    host: "https://naturopathe-decines.fr",
  };
}
