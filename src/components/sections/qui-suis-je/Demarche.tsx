"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, m } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { demarcheFaq } from "@/data/qui-suis-je-faq";

const DESKTOP_QUERY = "(min-width: 1024px)";

/**
 * Subscribe au media query desktop. Défini hors du composant pour que
 * `useSyncExternalStore` considère la fonction stable d'un render à
 * l'autre (si elle changeait, la subscription serait recréée en boucle).
 */
function subscribeDesktopQuery(callback: () => void) {
  const mq = window.matchMedia(DESKTOP_QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

const getDesktopSnapshot = () => window.matchMedia(DESKTOP_QUERY).matches;
const getDesktopServerSnapshot = () => false;

export function Demarche() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  // API React idiomatique pour lire un store externe (matchMedia) avec
  // hydratation SSR-safe : `false` au serveur, valeur réelle au client.
  const isDesktop = useSyncExternalStore(
    subscribeDesktopQuery,
    getDesktopSnapshot,
    getDesktopServerSnapshot,
  );
  // Desktop : ouvre la deuxième ligne (Q3 + Q4) par défaut au premier
  // render client sur desktop. La row-sync de isOpenFor fait que
  // setOpenIndex(2) déploie aussi Q3. On utilise un ref pour ne déclencher
  // qu'une fois — on respecte la main de l'utilisateur si la fenêtre passe
  // desktop → mobile → desktop. useEffect nécessaire : isDesktop n'est pas
  // connu au SSR, donc openIndex ne peut pas être initialisé lazy.
  const initDoneRef = useRef(false);
  useEffect(() => {
    if (isDesktop && !initDoneRef.current) {
      initDoneRef.current = true;
      setOpenIndex(2);
    }
  }, [isDesktop]);

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
          {demarcheFaq.map(({ question, answer }, i) => {
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
                  <m.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="shrink-0"
                  >
                    <ChevronDown
                      aria-hidden="true"
                      className="w-5 h-5 text-warm-700"
                      strokeWidth={1.5}
                    />
                  </m.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <m.div
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
                    </m.div>
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
