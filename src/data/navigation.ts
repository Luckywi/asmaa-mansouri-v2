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
    // \u00A0 = espace insécable (typo française : pas de retour à la ligne
    // entre "je" et "?", et l'espace ne peut pas tomber en fin de ligne).
    label: "Qui suis-je\u00A0?",
    href: "/qui-suis-je",
    futureHref: "/qui-suis-je",
  },
  {
    label: "Spécialités",
    href: "/specialites",
    futureHref: "/specialites",
    // Hub des 4 spécialités parapluies : troubles digestifs, allergies
    // saisonnières, stress & burn-out, déséquilibres hormonaux. Cette
    // dernière regroupe SOPK, endométriose, fertilité, post-partum et
    // cycles irréguliers en sous-sections ancrées (#sopk, #endometriose…).
  },
  {
    label: "Cabinet",
    href: "/cabinet",
    futureHref: "/cabinet",
  },
  {
    label: "Prestations",
    href: "/prestations",
    futureHref: "/prestations",
  },
  {
    label: "Témoignages",
    href: "/temoignages",
    futureHref: "/temoignages",
    // Page dédiée avec liste complète et modale de détail par avis.
    // La section `#temoignages` de la landing reste présente (preuve
    // sociale inline) et reste joignable en URL directe si besoin.
  },
];
