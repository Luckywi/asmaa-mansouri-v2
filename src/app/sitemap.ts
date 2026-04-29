import type { MetadataRoute } from "next";
import { prestations } from "@/data/prestations";
import { specialites } from "@/data/specialites";

/**
 * Sitemap dynamique, servi par Next sur `/sitemap.xml`.
 *
 * Priorité :
 *   1.0  landing
 *   0.9  hubs niveau 1 (prestations, specialites, ateliers, qui-suis-je, cabinet, contact, temoignages)
 *   0.8  pages détail (slugs, sous-pages qui-suis-je, ateliers/passes, ateliers/thematiques)
 *
 * changeFrequency : monthly par défaut pour le contenu éditorial.
 *
 * Les pages légales (mentions, cgv, politique-confidentialite) sont
 * volontairement EXCLUES du sitemap car elles portent un `noindex: true`
 * via leur metadata individuelle. Lister une page noindex dans le sitemap
 * est un signal mixte ("crawle ça mais n'indexe pas") que Google traite
 * comme une faute SEO mineure ; on l'évite. Ces pages restent accessibles
 * via les liens internes du Footer.
 *
 * `lastModified: new Date()` est évalué à chaque génération du sitemap,
 * suffisant tant que le contenu évolue sous git. Une stratégie par
 * fichier (stat mtime) n'apporterait rien à ce stade.
 */

const BASE_URL = "https://naturopathe-decines.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const landing: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1.0,
    },
  ];

  const hubs: MetadataRoute.Sitemap = [
    "/qui-suis-je",
    "/cabinet",
    "/prestations",
    "/specialites",
    "/ateliers",
    "/temoignages",
    "/contact",
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const secondaryPages: MetadataRoute.Sitemap = [
    "/qui-suis-je/la-naturopathie",
    "/qui-suis-je/medecines-ancestrales",
    "/ateliers/passes",
    "/ateliers/thematiques",
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const prestationsPages: MetadataRoute.Sitemap = prestations.map((p) => ({
    url: `${BASE_URL}/prestations/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const specialitesPages: MetadataRoute.Sitemap = specialites.map((s) => ({
    url: `${BASE_URL}/specialites/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    ...landing,
    ...hubs,
    ...secondaryPages,
    ...prestationsPages,
    ...specialitesPages,
  ];
}
