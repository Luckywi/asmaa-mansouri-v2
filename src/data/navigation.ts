import type { NavLink } from "@/types";

/**
 * Liens de navigation principale (Header).
 *
 * Phase actuelle (landing-only) : `href` pointe vers les sections ancrées
 * de la page d'accueil. Le champ `futureHref` documente la vraie route
 * qui sera utilisée Phase 2 quand les pages dédiées existeront.
 *
 * "Blog" est volontairement omis : prévu Phase 2 (cf. STRUCTURE.md),
 * sans pertinence en phase de validation d'image de marque.
 */
export const navLinks: NavLink[] = [
  {
    label: "Qui suis-je",
    href: "#presentation",
    futureHref: "/qui-suis-je",
  },
  {
    label: "Spécialités",
    href: "#specialites",
    futureHref: "/specialites",
    // Hub vers les pages SEO par condition (SOPK, endométriose, périménopause,
    // post-partum, troubles du cycle, fertilité…). Phase 2 : créer la page hub
    // /specialites + une page article par spécialité (/specialites/sopk, etc.).
    // ⚠️ Liste des spécialités à valider avec Asmaa avant publication.
  },
  {
    label: "Cabinet",
    href: "#cabinet",
    futureHref: "/cabinet",
  },
  {
    label: "Prestations",
    href: "#prestations",
    futureHref: "/prestations",
  },
  {
    label: "Témoignages",
    href: "#temoignages",
    // Pas de futureHref : les témoignages restent une section landing,
    // pas une page dédiée même Phase 2.
  },
];
