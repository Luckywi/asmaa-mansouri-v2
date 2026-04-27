import type { JsonLdGraph, JsonLdNode } from "@/lib/schema/types";

/**
 * Server Component injecteur de JSON-LD.
 *
 * Échappe `<`, `>` et `&` dans la sortie pour éviter toute injection
 * XSS même si les données sont contrôlées. Minifié (JSON.stringify
 * sans espaces) pour réduire le poids du DOM.
 *
 * Usage : <JsonLd data={buildGraph([...])} /> dans une page Server
 * Component ou dans le layout racine.
 */
export function JsonLd({ data }: { data: JsonLdGraph | JsonLdNode }) {
  const json = JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
