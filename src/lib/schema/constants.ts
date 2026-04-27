/**
 * Constantes partagées par tous les builders JSON-LD.
 *
 * SITE_URL doit rester IDENTIQUE à celui du layout (metadataBase) et
 * du sitemap — toute divergence casserait les résolutions d'@id et les
 * refs inter-pages.
 */

export const SITE_URL = "https://naturopathe-decines.fr";
export const SITE_NAME = "Asmaa Mansouri Naturopathe";
export const SITE_LANG = "fr-FR";

/** @id des entités globales définies une seule fois dans tout le graphe. */
export const BUSINESS_ID = `${SITE_URL}/#business`;
export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

/**
 * URL canonique de la fiche Resalib d'Asmaa (slug `decines-charpieu`).
 * Utilisée en `sameAs[]`, `contactPoint[].url` et dans `Person.sameAs`.
 * Source unique pour éviter toute divergence entre LocalBusiness et Person.
 */
export const RESALIB_CANONICAL_URL =
  "https://www.resalib.fr/praticien/104874-asmaa-mansouri-naturopathe-decines-charpieu";

/**
 * Helpers de construction d'URLs absolues — jamais d'URL relative dans
 * les schemas (règle Google).
 */
export const absUrl = (path: string): string => {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
};

/** @id fragment helper : absUrl + fragment (#service, #faq, #article...). */
export const pageId = (path: string, fragment: string): string =>
  `${absUrl(path)}#${fragment}`;
