import { buildGraph } from "./graph";
import { buildLocalBusiness } from "./localBusiness";
import { buildPerson } from "./person";
import { buildWebSite } from "./website";
import type { JsonLdGraph } from "./types";

/**
 * Graphe JSON-LD global injecté UNE SEULE FOIS dans le layout racine.
 * Contient les entités transversales : LocalBusiness (#business),
 * WebSite (#website) et Person (#person).
 *
 * Person est centrale au business (cabinet en nom propre, Asmaa =
 * praticienne unique) : la définir partout permet à Google de la
 * consolider avec toutes ses références cross-page (Article.author,
 * Review, etc.) sans dépendre d'un crawl multi-pages. Pratique
 * standard pour les sites de praticien-en-nom-propre 2024+.
 */
export function buildGlobalGraph(): JsonLdGraph {
  return buildGraph([buildLocalBusiness(), buildPerson(), buildWebSite()]);
}
