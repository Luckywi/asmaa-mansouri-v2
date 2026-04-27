import { SITE_LANG, WEBSITE_ID } from "./constants";
import type { JsonLdNode } from "./types";

export type WebPageType =
  | "WebPage"
  | "CollectionPage"
  | "ContactPage"
  | "ProfilePage";

export type WebPageInput = {
  readonly type?: WebPageType;
  readonly url: string;
  readonly name: string;
  readonly description?: string;
  readonly about?: string;
  readonly mainEntity?: string;
  readonly breadcrumb?: string;
  readonly primaryImage?: string;
  readonly datePublished?: string;
  readonly dateModified?: string;
};

/**
 * Builder WebPage générique. Les références (about, mainEntity,
 * breadcrumb) sont passées en `@id` string, le builder les enrobe
 * en `{ @id: ... }`.
 */
export function buildWebPage(input: WebPageInput): JsonLdNode {
  const {
    type = "WebPage",
    url,
    name,
    description,
    about,
    mainEntity,
    breadcrumb,
    primaryImage,
    datePublished,
    dateModified,
  } = input;

  const node: JsonLdNode = {
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name,
    inLanguage: SITE_LANG,
    isPartOf: { "@id": WEBSITE_ID },
  };

  if (description) node.description = description;
  if (about) node.about = { "@id": about };
  if (mainEntity) node.mainEntity = { "@id": mainEntity };
  if (breadcrumb) node.breadcrumb = { "@id": breadcrumb };
  if (primaryImage) node.primaryImageOfPage = { "@type": "ImageObject", url: primaryImage };
  if (datePublished) node.datePublished = datePublished;
  if (dateModified) node.dateModified = dateModified;

  return node;
}
