/**
 * Types JSON-LD minimaux, maison (pas de dépendance schema-dts).
 *
 * Volontairement permissifs sur les unions `@type` : Schema.org a des
 * milliers de sous-types dont peu sont utiles ici. On type strictement
 * les champs qu'on injecte (URLs, nombres, dates ISO) et on laisse
 * `string | readonly string[]` sur les `@type` pour autoriser les
 * doubles-typages rares (ex: `["Service", "MedicalTherapy"]`).
 */

export type JsonLdRef = { readonly "@id": string };

/**
 * Valeur d'une propriété JSON-LD : scalaire, ref, nœud imbriqué ou
 * tableau. Type récursif strict — pas d'`any`. Les builders peuvent
 * tout produire de représentable en JSON, contraint par la signature.
 */
export type JsonLdValue =
  | string
  | number
  | boolean
  | null
  | JsonLdRef
  | JsonLdNode
  | readonly JsonLdValue[];

export type JsonLdNode = {
  "@type": string | readonly string[];
  "@id"?: string;
  [key: string]: JsonLdValue | undefined;
};

export type JsonLdGraph = {
  readonly "@context": "https://schema.org";
  readonly "@graph": readonly JsonLdNode[];
};

/* ─── Types utilitaires pour les builders ─────────────────────────── */

export type BreadcrumbItem = {
  readonly name: string;
  readonly url: string;
};

export type FaqEntry = {
  readonly question: string;
  readonly answer: string;
};
