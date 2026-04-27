import type { FAQItem } from "@/types";
import type { JsonLdNode } from "./types";

/**
 * FAQPage. Chaque question/réponse doit apparaître textuellement sur
 * la page (règle anti-cloaking Google).
 *
 * Note : depuis 2023 Google a restreint les rich results FAQ aux
 * sites d'autorité gouvernementale ou santé officielle. Sur un site
 * de naturopathe en cabinet privé, le rich result ne s'affiche plus.
 * On injecte quand même : utile pour le knowledge graph et la
 * recherche vocale.
 */
export function buildFaqPage(
  faq: readonly FAQItem[],
  pageUrl: string,
): JsonLdNode | null {
  if (!faq || faq.length === 0) return null;

  return {
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
