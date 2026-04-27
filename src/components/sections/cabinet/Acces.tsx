"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { accessModes, zonesDesservies } from "@/data/cabinet-acces";
import type { AccessMode } from "@/types";

/**
 * Acces — section "Accessibilité du cabinet" de la page /cabinet.
 *
 * Structure :
 *   1. Header centré : H2 + sous-titre + chips de zones desservies.
 *      Les chips alternent glass (index pair) et accent olive plein
 *      (index impair) pour créer un rythme visuel monochrome sans
 *      sortir de la palette warm/accent.
 *   2. Desktop (sm+) : grid 2 colonnes, 4 cards toujours déployées.
 *   3. Mobile (< sm) : accordion mutuellement exclusif (une seule
 *      card ouverte à la fois). Mirroir du pattern PrestationsSelector.
 *
 * Client Component — useState pour l'accordion mobile. Le desktop
 * est statique mais vit dans le même fichier (bundle négligeable,
 * cohérence avec PrestationsSelector).
 */
export function Acces() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="acces"
      aria-labelledby="acces-titre"
      className="relative py-12 lg:py-22"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
        {/* ─── Header ─────────────────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto">
          <Reveal>
            <h2
              id="acces-titre"
              className="font-display text-4xl lg:text-5xl font-medium tracking-[-0.02em] leading-[1.1] text-warm-900"
            >
              Accessibilité du cabinet
            </h2>
            <p className="mt-6 font-body text-lg lg:text-xl leading-relaxed text-warm-700">
              Le cabinet se trouve sur la rue Francisco Ferrer à Décines-Charpieu,
              desservie par le tramway T3, la ligne de bus 85 et un Parc Relais
              TCL. Il accueille des femmes venues de toute la métropole
              lyonnaise. Si vous habitez l&apos;une de ces communes, vous êtes au
              bon endroit.
            </p>
          </Reveal>

          {/* Chips — toutes en glass, recette tag standard (cf DESIGN.md) */}
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-2 lg:gap-2.5">
            {zonesDesservies.map((zone) => (
              <li
                key={zone}
                className={[
                  "inline-flex items-center whitespace-nowrap px-3 py-1.5 rounded-md",
                  "font-body text-xs lg:text-sm font-medium text-warm-700",
                  "bg-[var(--glass-bg)] backdrop-blur-xl backdrop-saturate-[1.8]",
                  "border-[0.5px] border-white/50",
                  "shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-1px_0_rgba(60,30,25,0.04),0_4px_16px_-6px_rgba(60,30,25,0.15)]",
                ].join(" ")}
              >
                {zone}
              </li>
            ))}
          </ul>
        </div>

        {/* ─── Desktop (sm+) : cards toujours déployées
             Layout 2 + 1 centré : les deux premières cards en row 2 cols,
             la 3ᵉ centrée sur la largeur d'une colonne (même taille que
             les deux du haut). gap-6 = 1.5rem → chaque col = calc(50% - 0.75rem). */}
        <div className="mt-12 lg:mt-16 hidden sm:flex sm:flex-col gap-6">
          <div className="grid grid-cols-2 gap-6">
            <AccessCard mode={accessModes[0]} revealDelay={0} />
            <AccessCard mode={accessModes[1]} revealDelay={0.08} />
          </div>
          <div className="flex justify-center">
            <div className="w-[calc(50%-0.75rem)]">
              <AccessCard mode={accessModes[2]} revealDelay={0.16} />
            </div>
          </div>
        </div>

        {/* ─── Mobile (< sm) : accordion mutuellement exclusif ─── */}
        <ul className="mt-12 sm:hidden flex flex-col gap-3">
          {accessModes.map((mode, i) => {
            const Icon = mode.icon;
            const isOpen = i === openIndex;
            const contentId = `acces-${i}-content`;
            return (
              <li
                key={mode.title}
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
                  className="w-full flex items-center gap-4 p-5 min-h-14 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warm-700"
                >
                  <Icon
                    aria-hidden="true"
                    className="w-7 h-7 text-warm-700 shrink-0"
                    strokeWidth={1.5}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-display text-lg font-medium text-warm-900">
                      {mode.title}
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="shrink-0"
                  >
                    <ChevronDown
                      aria-hidden="true"
                      className="w-5 h-5 text-warm-700"
                      strokeWidth={1.5}
                    />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={contentId}
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      style={{ overflow: "hidden" }}
                    >
                      <div className="px-5 pb-5 pt-1">
                        <p className="font-body text-base leading-relaxed text-warm-700">
                          {mode.description}
                        </p>
                        <ul className="mt-4 ml-4 list-disc space-y-1.5 marker:text-warm-700/40">
                          {mode.details.map((detail) => (
                            <li
                              key={detail}
                              className="font-body text-sm leading-relaxed text-warm-700/90"
                            >
                              {detail}
                            </li>
                          ))}
                        </ul>
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

/**
 * AccessCard — card d'un mode de venue (desktop uniquement).
 * Toujours déployée : icon + titre, description, liste de faits pratiques.
 * Recette glass standard (cf DESIGN.md).
 *
 * La card glass reste statique (évite le flash du backdrop-filter au
 * premier paint) ; le contenu interne est animé via `<Reveal>` avec un
 * délai passé en prop pour obtenir un effet cascade entre les 3 cards.
 */
function AccessCard({
  mode,
  revealDelay = 0,
}: {
  mode: AccessMode;
  revealDelay?: number;
}) {
  const Icon = mode.icon;
  return (
    <div
      className={[
        "p-6 lg:p-7 rounded-md",
        "bg-[var(--glass-bg)]",
        "backdrop-blur-xl backdrop-saturate-[1.8]",
        "border-[0.5px] border-white/50",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-1px_0_rgba(60,30,25,0.04),0_4px_16px_-6px_rgba(60,30,25,0.15)]",
      ].join(" ")}
    >
      <Reveal delay={revealDelay}>
        <div className="flex items-center gap-4">
          <Icon
            aria-hidden="true"
            className="w-8 h-8 text-warm-700 shrink-0"
            strokeWidth={1.5}
          />
          <h3 className="font-display text-xl lg:text-2xl font-medium tracking-tight text-warm-900">
            {mode.title}
          </h3>
        </div>
        {/*
          min-h-[3lh] = hauteur de 3 lignes du `<p>` courant. Toutes les
          descriptions occupent au moins cette hauteur, quelle que soit
          la longueur du texte, pour que les bullets démarrent à la même
          hauteur sur les 3 cards (les descriptions les plus longues en
          comptent 3, les plus courtes gardent l'espace en blanc).
        */}
        <p className="mt-4 min-h-[3lh] font-body text-base leading-relaxed text-warm-700">
          {mode.description}
        </p>
        <ul className="mt-5 ml-4 list-disc space-y-1.5 marker:text-warm-700/40">
          {mode.details.map((detail) => (
            <li
              key={detail}
              className="font-body text-sm leading-relaxed text-warm-700/90"
            >
              {detail}
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}
