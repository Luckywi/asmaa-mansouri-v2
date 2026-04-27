"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import type { FAQItem } from "@/types";

type Props = {
  /** Liste des paires question/réponse à afficher. */
  readonly faq: readonly FAQItem[];
  /**
   * Préfixe utilisé pour les IDs `aria-labelledby` / `aria-controls` afin
   * d'éviter les collisions quand plusieurs FAQs cohabitent sur la même
   * page (ex : "prestation-faq", "specialite-faq", "ateliers-faq",
   * "passes-faq"). Aussi utilisé comme `aria-labelledby` du titre H2.
   */
  readonly idPrefix: string;
  /** Titre affiché au-dessus de l'accordéon. Défaut : "Questions fréquentes". */
  readonly title?: string;
};

/**
 * AccordionFAQ — accordéon glass des questions/réponses. Source unique
 * pour toutes les FAQs du site (pages `/prestations/[slug]`,
 * `/specialites/[slug]`, `/ateliers`, `/ateliers/passes`).
 *
 * Recette accordéon (DESIGN.md) :
 *   - Glass card par item
 *   - Toggle exclusif (un seul item ouvert à la fois)
 *   - Chevron qui rotate sur ouverture
 *   - Animation height auto + opacity (Framer Motion)
 *   - Hairline warm-700/15 entre header et contenu déplié
 *
 * Les réponses utilisent `whitespace-pre-line` : Asmaa peut structurer
 * en plusieurs paragraphes avec des `\n` dans le data file sans casser
 * le rendu.
 *
 * Client Component — state local + AnimatePresence.
 */
export function AccordionFAQ({
  faq,
  idPrefix,
  title = "Questions fréquentes",
}: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const titleId = `${idPrefix}-titre`;

  return (
    <section
      aria-labelledby={titleId}
      className="relative py-12 lg:py-22"
    >
      <div className="mx-auto max-w-3xl px-6 md:px-8">
        <Reveal>
          <h2
            id={titleId}
            className="font-display text-3xl lg:text-4xl font-medium tracking-[-0.02em] leading-[1.15] text-warm-900 text-center"
          >
            {title}
          </h2>
        </Reveal>

        <ul className="mt-12 lg:mt-16 space-y-3 lg:space-y-4">
          {faq.map(({ question, answer }, i) => {
            const isOpen = openIndex === i;
            const contentId = `${idPrefix}-${i}-content`;
            const headingId = `${idPrefix}-${i}`;

            return (
              <li
                key={question}
                className={[
                  "rounded-md overflow-hidden",
                  "bg-[var(--glass-bg)]",
                  "backdrop-blur-xl backdrop-saturate-[1.8]",
                  "border-[0.5px] transition-colors duration-200 ease-out",
                  "shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-1px_0_rgba(60,30,25,0.04),0_4px_16px_-6px_rgba(60,30,25,0.15)]",
                  isOpen ? "border-white/80" : "border-white/40",
                ].join(" ")}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                  className="w-full flex items-center gap-5 p-5 lg:p-6 min-h-14 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warm-700"
                >
                  <h3
                    id={headingId}
                    className="flex-1 font-display text-lg lg:text-xl font-medium tracking-tight text-warm-900"
                  >
                    {question}
                  </h3>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="shrink-0"
                  >
                    <ChevronDown
                      aria-hidden="true"
                      className="w-5 h-5 text-warm-700"
                      strokeWidth={1.5}
                    />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={contentId}
                      role="region"
                      aria-labelledby={headingId}
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      style={{ overflow: "hidden" }}
                    >
                      <div className="px-5 pb-5 lg:px-6 lg:pb-6 pt-1">
                        <div className="h-px bg-warm-700/15 mb-5" />
                        <p className="font-body text-base leading-relaxed text-warm-700 whitespace-pre-line">
                          {answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
