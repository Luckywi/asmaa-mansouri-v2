/**
 * Types du contenu éditorial modifiable par Asmaa via `/edition`.
 *
 * Stocké sous forme de JSON sur Cloudflare Workers KV (namespace `asmaa`,
 * clé `content`). Ce n'est PAS lu par le site public : le rendu des pages
 * spécialités reste alimenté par `src/data/specialites.ts`. Le KV sert
 * uniquement de tampon de collecte : Asmaa remplit le formulaire, on
 * récupère le JSON côté dev, on le colle dans `specialites.ts`.
 */

export type EditableSpecialite = {
  definition: string;
  symptomesIntro: string;
  symptomesItems: string[];
  approche: string;
  faqAnswers: string[];
};

export type EditableContent = {
  /** Note libre d'Asmaa au dev (Lucky) : ajouts, retraits, remarques. */
  note: string;
  /** Contenu éditorial par spécialité (clé = slug). */
  specialites: Record<string, EditableSpecialite>;
};
