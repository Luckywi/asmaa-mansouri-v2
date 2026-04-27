/**
 * Façade publique du module schema. Tous les imports JSON-LD dans les
 * pages passent par ce fichier pour que les refactors internes soient
 * invisibles côté appelant.
 */

export { buildGraph } from "./graph";
export { buildGlobalGraph } from "./globalGraph";
export { buildLocalBusiness } from "./localBusiness";
export { buildPerson } from "./person";
export { buildWebSite } from "./website";
export { buildWebPage, type WebPageInput, type WebPageType } from "./webPage";
export { buildBreadcrumb } from "./breadcrumb";
export { buildFaqPage } from "./faqPage";
export { buildService } from "./service";
export { buildArticle, type ArticleInput } from "./article";
export { buildReview, buildReviews } from "./review";
export { buildEvent, buildEvents } from "./event";
export { buildItemList, type ItemListEntry } from "./itemList";
export {
  SITE_URL,
  SITE_NAME,
  SITE_LANG,
  BUSINESS_ID,
  PERSON_ID,
  WEBSITE_ID,
  absUrl,
  pageId,
} from "./constants";
export type {
  JsonLdGraph,
  JsonLdNode,
  JsonLdRef,
  BreadcrumbItem,
} from "./types";
