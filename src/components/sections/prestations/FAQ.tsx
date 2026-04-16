"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

type FAQItem = {
  readonly question: string;
  readonly answer: string;
};

type Props = {
  faq: readonly FAQItem[];
};

/**
 * FAQ des pages /prestations/[slug]. Même mise en page que la FAQ des
 * pages /specialites/[slug] pour conserver la cohérence visuelle du site
 * (recette DESIGN.md : glass + accordéon exclusif + chevron rotate).
 *
 * Client Component (state local + AnimatePresence Framer Motion).
 *
 * Les réponses utilisent `whitespace-pre-line` : Asmaa peut structurer
 * en plusieurs paragraphes avec des `\n` dans le data file sans casser
 * le rendu.
 */
export function FAQ({ faq }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      aria-labelledby="prestation-faq-titre"
      className="relative py-12 lg:py-22"
    >
      <div className="mx-auto max-w-3xl px-6 md:px-8">
        <h2
          id="prestation-faq-titre"
          className="font-display text-3xl lg:text-4xl font-medium tracking-[-0.02em] leading-[1.15] text-warm-900 text-center"
        >
          Questions fréquentes
        </h2>

        <ul className="mt-12 lg:mt-16 space-y-3 lg:space-y-4">
          {faq.map(({ question, answer }, i) => {
            const isOpen = openIndex === i;
            const contentId = `prestation-faq-${i}-content`;
            const headingId = `prestation-faq-${i}`;

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
