import { absUrl } from "./constants";
import type { BreadcrumbItem, JsonLdNode } from "./types";

/**
 * BreadcrumbList conforme Google. Le `@id` est calé sur l'URL de la
 * page courante (dernier item) + fragment `#breadcrumb` pour pouvoir
 * être référencé depuis un WebPage sur la même page.
 *
 * Convention : items passés dans l'ordre Home → ... → page courante.
 * Le builder injecte automatiquement "Accueil" en position 1.
 */
export function buildBreadcrumb(
  items: readonly BreadcrumbItem[],
  pageUrl: string,
): JsonLdNode {
  const fullItems: readonly BreadcrumbItem[] = [
    { name: "Accueil", url: absUrl("/") },
    ...items,
  ];

  return {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: fullItems.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
