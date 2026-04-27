import { site } from "@/data/site";
import {
  absUrl,
  BUSINESS_ID,
  PERSON_ID,
  RESALIB_CANONICAL_URL,
} from "./constants";
import type { JsonLdNode } from "./types";

/**
 * Entité Person d'Asmaa — définie UNE SEULE FOIS, sur /qui-suis-je.
 * Toutes les autres pages s'y réfèrent par `{ @id: PERSON_ID }`.
 *
 * `knowsAbout` enrichi avec `DefinedTerm` pointant Wikipedia FR pour
 * les concepts documentés (signal EEAT plus fort que string simple).
 * Les termes sans Wikipedia fiable restent en `string`.
 *
 * `alumniOf` omis volontairement : école de formation non confirmée
 * à ce stade (règle : pas de donnée inventée).
 */
export function buildPerson(): JsonLdNode {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: site.name,
    givenName: "Asmaa",
    familyName: "Mansouri",
    jobTitle: "Naturopathe",
    description:
      "Naturopathe à Décines-Charpieu spécialisée en santé féminine. Intègre la médecine traditionnelle chinoise (massage Tuina, cupping), la médecine prophétique et la naturopathie occidentale dans ses accompagnements.",
    image: absUrl("/qui-suis-je/portrait-1.jpg"),
    url: absUrl("/qui-suis-je"),
    telephone: site.phone,
    email: site.email,
    worksFor: { "@id": BUSINESS_ID },
    workLocation: { "@id": BUSINESS_ID },
    knowsLanguage: ["fr"],
    knowsAbout: [
      {
        "@type": "DefinedTerm",
        name: "Naturopathie",
        url: "https://fr.wikipedia.org/wiki/Naturopathie",
      },
      {
        "@type": "DefinedTerm",
        name: "Médecine traditionnelle chinoise",
        url: "https://fr.wikipedia.org/wiki/M%C3%A9decine_traditionnelle_chinoise",
      },
      {
        "@type": "DefinedTerm",
        name: "Massage Tui na",
        url: "https://fr.wikipedia.org/wiki/Tui_na",
      },
      {
        "@type": "DefinedTerm",
        name: "Hijama",
        url: "https://fr.wikipedia.org/wiki/Hijama",
      },
      {
        "@type": "DefinedTerm",
        name: "Médecine prophétique",
        url: "https://fr.wikipedia.org/wiki/M%C3%A9decine_proph%C3%A9tique",
      },
      {
        "@type": "DefinedTerm",
        name: "Phytothérapie",
        url: "https://fr.wikipedia.org/wiki/Phytoth%C3%A9rapie",
      },
      "Santé féminine",
      "SOPK",
      "Endométriose",
      "Fertilité",
      "Préménopause",
      "Ménopause",
      "Post-partum",
      "Troubles digestifs",
      "Allergies saisonnières",
      "Stress et burn-out",
    ],
    sameAs: [site.instagramUrl, RESALIB_CANONICAL_URL],
  };
}
