import type { JsonLdGraph, JsonLdNode } from "./types";

/**
 * Wrappe une liste de nœuds dans un `@graph` avec le `@context` unique
 * `https://schema.org`. Les `undefined` sont filtrés automatiquement —
 * builders individuels peuvent renvoyer `null` / `undefined` quand une
 * entité n'a pas lieu d'exister (ex: Event sans startDate).
 */
export function buildGraph(
  parts: readonly (JsonLdNode | null | undefined)[],
): JsonLdGraph {
  return {
    "@context": "https://schema.org",
    "@graph": parts.filter((n): n is JsonLdNode => n != null),
  };
}
