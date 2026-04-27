import type { JsonLdNode } from "./types";

export type ItemListEntry = {
  readonly url: string;
  readonly name: string;
  readonly description?: string;
};

/**
 * ItemList pour les pages hub (CollectionPage). Chaque item est un
 * ListItem avec position + item (URL absolue ou ref `@id`).
 */
export function buildItemList(
  entries: readonly ItemListEntry[],
  pageUrl: string,
): JsonLdNode {
  return {
    "@type": "ItemList",
    "@id": `${pageUrl}#itemlist`,
    numberOfItems: entries.length,
    itemListElement: entries.map((entry, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: entry.url,
      name: entry.name,
      ...(entry.description ? { description: entry.description } : {}),
    })),
  };
}
