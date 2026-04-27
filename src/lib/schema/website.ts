import {
  BUSINESS_ID,
  SITE_LANG,
  SITE_NAME,
  SITE_URL,
  WEBSITE_ID,
} from "./constants";
import type { JsonLdNode } from "./types";

/**
 * WebSite canonique du site. Pas de `potentialAction SearchAction` :
 * aucun moteur de recherche interne — mentir au crawler pénaliserait.
 */
export function buildWebSite(): JsonLdNode {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    inLanguage: SITE_LANG,
    publisher: { "@id": BUSINESS_ID },
  };
}
