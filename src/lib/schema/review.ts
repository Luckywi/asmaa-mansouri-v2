import type { Temoignage } from "@/types";
import { absUrl, BUSINESS_ID } from "./constants";
import type { JsonLdNode } from "./types";

const REVIEWS_PAGE_URL = absUrl("/temoignages");

/**
 * Mapping source → publisher Organization. Transparence sur l'origine
 * des avis (Google Business / Resalib) = conforme règle Google
 * anti-review-spam (l'avis est collecté par un tiers vérifiable, pas
 * publié en self-service).
 */
const PUBLISHER_MAP: Record<
  NonNullable<Temoignage["source"]>,
  { name: string; url: string }
> = {
  google: {
    name: "Google",
    url: "https://www.google.com/business/",
  },
  resalib: {
    name: "Resalib",
    url: "https://www.resalib.fr",
  },
};

/**
 * Convertit une date `Temoignage.date` (ISO YYYY-MM-DD) en valeur
 * `datePublished` honnête pour Schema.org.
 *
 * Convention : les avis Google ne donnent publiquement que « il y a X
 * mois », jamais le jour exact. Le data file utilise `YYYY-MM-15`
 * comme placeholder pour pouvoir trier et afficher une date dans la
 * modale UI. Côté JSON-LD, on tronque ces entrées à `YYYY-MM` (forme
 * partielle ISO 8601 valide) pour ne pas envoyer une fausse précision
 * au crawler. Les avis Resalib gardent leur date au jour près (exacte).
 */
function buildDatePublished(t: Temoignage): string | undefined {
  if (!t.date) return undefined;
  if (t.source === "google" && t.date.endsWith("-15")) {
    return t.date.slice(0, 7);
  }
  return t.date;
}

/**
 * Review individuelle. `itemReviewed` pointe vers le LocalBusiness
 * (pas vers un service précis : le rattachement par `role` n'est pas
 * systématiquement fiable — on reste conservateur).
 */
export function buildReview(temoignage: Temoignage, index: number): JsonLdNode {
  const publisher = PUBLISHER_MAP[temoignage.source ?? "resalib"];

  const node: JsonLdNode = {
    "@type": "Review",
    "@id": `${REVIEWS_PAGE_URL}#review-${index + 1}`,
    author: {
      "@type": "Person",
      name: temoignage.name,
    },
    reviewBody: temoignage.body,
    reviewRating: {
      "@type": "Rating",
      ratingValue: temoignage.rating ?? 5,
      bestRating: 5,
      worstRating: 1,
    },
    itemReviewed: { "@id": BUSINESS_ID },
    publisher: {
      "@type": "Organization",
      name: publisher.name,
      url: publisher.url,
    },
  };

  const datePublished = buildDatePublished(temoignage);
  if (datePublished) node.datePublished = datePublished;

  return node;
}

/**
 * Liste de Review à injecter en bloc. Ordre préservé depuis
 * `temoignages.ts` (décroissant par date).
 */
export function buildReviews(temoignages: readonly Temoignage[]): JsonLdNode[] {
  return temoignages.map((t, i) => buildReview(t, i));
}
