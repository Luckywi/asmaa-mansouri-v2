"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

const questions = [
  {
    question: "Comment se passe une séance ?",
    answer:
      "La première consultation dure 1h30. Nous y faisons le point ensemble sur votre santé et votre mode de vie à partir d'un questionnaire approfondi.",
  },
  {
    question: "Quelle est mon approche ?",
    answer:
      "Pendant ce bilan, je propose différentes techniques issues de la naturopathie adaptées à votre situation. L'objectif : vous transmettre des clés concrètes pour devenir actrice de votre santé.",
  },
  {
    question: "Pour quels troubles me consulter ?",
    answer:
      "Je suis spécialisée dans l'accompagnement des maux féminins et des troubles digestifs, avec une approche naturopathique complétée par le massage Tuina et la cupping therapy. J'accompagne les femmes aux différentes étapes de leur vie (SOPK, endométriose, post-partum, préménopause, ménopause) ainsi que sur les troubles digestifs (ballonnements, syndrome de l'intestin irritable). Mon approche allie alimentation, phytothérapie et techniques manuelles.",
  },
  {
    question: "Quels bénéfices en attendre ?",
    answer:
      "La naturopathie propose une approche globale qui vise à soutenir l'énergie, apaiser le stress et accompagner la digestion, en s'appuyant sur la nutrition, la phytothérapie et des techniques manuelles. Le massage Tuina, que je pratique également, libère les tensions et relance la circulation selon les principes de la médecine traditionnelle chinoise.",
  },
] as const;

export function Demarche() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mq.matches);
    // Desktop : ouvre la deuxième ligne (Q3 + Q4) par défaut au chargement.
    // La row-sync de isOpenFor fait que setOpenIndex(2) déploie aussi Q3.
    // Ne s'applique qu'au mount — les resize ultérieurs ne réouvrent pas
    // pour respecter la main de l'utilisateur.
    if (mq.matches) {
      setOpenIndex(2);
    }
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const isOpenFor = (i: number) => {
    if (openIndex === null) return false;
    if (!isDesktop) return i === openIndex;
    return Math.floor(i / 2) === Math.floor(openIndex / 2);
  };

  return (
    <section
      id="demarche"
      aria-labelledby="demarche-titre"
      className="relative py-12 lg:py-22"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
        <Reveal as="div" className="text-center max-w-3xl mx-auto">
          <h2
            id="demarche-titre"
            className="font-display text-4xl lg:text-5xl font-medium tracking-[-0.02em] leading-[1.1] text-warm-900"
          >
            Ma démarche
          </h2>
          <p className="mt-6 font-body text-lg lg:text-xl leading-relaxed text-warm-700">
            Quatre questions pour comprendre ma pratique au quotidien.
          </p>
        </Reveal>

        <ul className="mt-16 lg:mt-20 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {questions.map(({ question, answer }, i) => {
            const isOpen = isOpenFor(i);
            const contentId = `demarche-q-${i}-content`;
            const headingId = `demarche-q-${i}`;

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
                  className="group w-full flex items-center gap-5 p-5 lg:p-6 min-h-14 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warm-700"
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
                        <p className="font-body text-base leading-relaxed text-warm-700">
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
