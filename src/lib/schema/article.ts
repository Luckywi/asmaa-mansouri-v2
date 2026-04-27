import { BUSINESS_ID, PERSON_ID, SITE_LANG } from "./constants";
import type { JsonLdNode } from "./types";

export type ArticleImage = {
  readonly url: string;
  readonly width: number;
  readonly height: number;
};

export type ArticleInput = {
  readonly pageUrl: string;
  readonly headline: string;
  readonly description: string;
  readonly image: ArticleImage;
  readonly datePublished: string;
  readonly dateModified: string;
  readonly articleSection: string;
  readonly keywords?: readonly string[];
};

/**
 * Article long-form. `author` pointe vers la Person (définie dans
 * /qui-suis-je), `publisher` vers le LocalBusiness (layout racine).
 */
export function buildArticle(input: ArticleInput): JsonLdNode {
  const {
    pageUrl,
    headline,
    description,
    image,
    datePublished,
    dateModified,
    articleSection,
    keywords,
  } = input;

  const node: JsonLdNode = {
    "@type": "Article",
    "@id": `${pageUrl}#article`,
    headline,
    description,
    image: {
      "@type": "ImageObject",
      url: image.url,
      width: image.width,
      height: image.height,
    },
    author: { "@id": PERSON_ID },
    publisher: { "@id": BUSINESS_ID },
    datePublished,
    dateModified,
    articleSection,
    inLanguage: SITE_LANG,
    mainEntityOfPage: { "@id": `${pageUrl}#webpage` },
  };

  if (keywords && keywords.length > 0) {
    node.keywords = keywords.join(", ");
  }

  return node;
}
