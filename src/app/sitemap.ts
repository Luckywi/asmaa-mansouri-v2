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
 *   0.5  pages légales (mentions, cgv, confidentialité)
 *
 * changeFrequency : monthly par défaut pour le contenu éditorial (peut
 * être réajusté), yearly pour les pages légales.
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

  const legalPages: MetadataRoute.Sitemap = [
    "/mentions-legales",
    "/cgv",
    "/politique-confidentialite",
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [
    ...landing,
    ...hubs,
    ...secondaryPages,
    ...prestationsPages,
    ...specialitesPages,
    ...legalPages,
  ];
}
