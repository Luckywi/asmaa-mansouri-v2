"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ScanSearch } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { LogoMark } from "@/components/ui/LogoMark";
import { prestations } from "@/data/prestations";

/**
 * PrestationsSelector — selector interactif des prestations.
 *
 * **Pattern desktop (lg+) : Master-detail split**
 *
 *   ┌────────────┬─────────────────────────────┐
 *   │ Mini-card  │                             │
 *   │ Mini-card  │      DETAIL PANEL           │
 *   │ Mini-card  │      (animé au swap)        │
 *   │ Mini-card  │                             │
 *   └────────────┴─────────────────────────────┘
 *
 *   Sidebar gauche (col-span-4) avec les 4 mini-cards en liste verticale,
 *   chacune cliquable. Right (col-span-8) affiche le détail du service
 *   sélectionné, animé via framer-motion AnimatePresence en mode "wait"
 *   (le panneau sortant disparaît avant l'entrée du nouveau).
 *
 * **Pattern mobile (< lg) : Accordion**
 *
 *   ┌─ ❀ Consultation ─────── ▶ ─┐
 *   ├─ ✋ Tuina ───────────── ▶ ─┤
 *   ├─ ⊙ Cupping ─────────── ▶ ─┤
 *   └─ ♥ Accompagnement ──── ▶ ─┘
 *
 *   Liste verticale de 4 items, chacun avec un header cliquable. Au
 *   chargement, **tous les tiroirs sont fermés** (pas de "contenu par
 *   défaut" qui imposerait un choix éditorial arbitraire). Un seul
 *   tiroir peut être ouvert à la fois : cliquer sur un item fermé ouvre
 *   celui-ci et ferme tout autre précédemment ouvert. Cliquer sur
 *   l'item actuellement ouvert le referme (toggle). Animation height
 *   auto via framer-motion AnimatePresence pour l'expand/collapse.
 *
 * **States séparés entre les deux layouts — intentionnel :**
 *   - Desktop (`activeIndex: number`, démarre à 0) : master-detail impose
 *     qu'une sélection soit toujours active, sinon le panneau de droite
 *     serait vide. Pas de notion de "fermé" côté desktop.
 *   - Mobile (`mobileOpenIndex: number | null`, démarre à null) : accordion
 *     classique, tout fermé par défaut, toggle sur re-tap.
 *
 * Séparer ces deux states évite qu'un tap mobile influence l'état desktop
 * (et vice-versa), et garantit la sémantique propre de chaque pattern.
 *
 * **SEO** : les deux layouts coexistent dans le DOM (l'un est masqué par
 * `lg:hidden` / `hidden lg:block`). Le panneau desktop rend toujours la
 * description de `activeIndex=0` côté SSR, donc au moins cette description
 * est crawlable. Les 3 autres descriptions ne sont dans le DOM que si
 * l'utilisateur les active — acceptable en Phase 1, à revoir en Phase 2
 * SEO si besoin (option : toutes les rendre via height 0 plutôt que
 * conditional mount).
 *
 * Client Component obligatoire — useState + framer-motion.
 */
export function PrestationsSelector() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileOpenIndex, setMobileOpenIndex] = useState<number | null>(null);
  const active = prestations[activeIndex];
  const ActiveIcon = active.icon;

  return (
    <>
      {/* ═══ DESKTOP : master-detail split (lg+) ═══════════════════ */}
      <div className="hidden lg:grid lg:grid-cols-12 lg:gap-8 lg:items-center">
        {/* Sidebar — liste verticale de mini-cards */}
        <ul className="lg:col-span-4 flex flex-col gap-3">
          {prestations.map((p, i) => {
            const Icon = p.icon;
            const isActive = i === activeIndex;
            return (
              <li key={p.id} className="relative isolate">
                <button
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  aria-pressed={isActive}
                  className={[
                    "group relative w-full flex items-center gap-4 p-5 rounded-md text-left",
                    // Glass effect (recette Header / Specialites)
                    "bg-[var(--glass-bg)]",
                    "backdrop-blur-xl backdrop-saturate-[1.8]",
                    "border-[0.5px]",
                    // Transition globale : couleurs, opacity, filtre, transform, shadow
                    // pour que l'état actif/inactif glisse en douceur.
                    "transition-[color,background-color,border-color,opacity,filter,transform,box-shadow] duration-300 ease-out",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warm-700",
                    isActive
                      ? // ── ACTIF : pleine intensité, légèrement scalé en avant,
                        // shadow externe plus marquée pour qu'il "sorte" du plan.
                        "border-white/95 opacity-100 saturate-100 scale-[1.015] " +
                        "shadow-[inset_0_1px_0_rgba(255,255,255,0.85),inset_0_-1px_0_rgba(60,30,25,0.04),0_8px_24px_-8px_rgba(60,30,25,0.25)]"
                      : // ── INACTIF : estompé + désaturé. Hover remonte
                        // partiellement pour signaler l'interactivité.
                        "border-white/40 opacity-50 saturate-75 hover:opacity-80 hover:border-white/60 " +
                        "shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-1px_0_rgba(60,30,25,0.04),0_4px_16px_-6px_rgba(60,30,25,0.15)]",
                  ].join(" ")}
                >
                  <Icon
                    aria-hidden="true"
                    className={[
                      "w-7 h-7 shrink-0 transition-colors duration-200 ease-out",
                      isActive ? "text-warm-900" : "text-warm-700",
                    ].join(" ")}
                    strokeWidth={1.5}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-display text-lg font-medium text-warm-900">
                      {p.category}
                    </div>
                    <div className="font-body text-sm text-warm-700">
                      {p.tagline}
                    </div>
                  </div>
                </button>
                {/*
                  Indicateur actif — barre carrée qui SORT de sous le bouton
                  et s'étend dans le gap (lg:gap-8 = 32px) entre sidebar et
                  detail panel. Sibling du <button> (pas enfant), avec
                  `-z-10` + le `isolate` du <li> parent : la barre vit dans
                  le stacking context du <li> et passe sous le bouton, seul
                  ce qui dépasse à droite reste visible. `left-[calc(100%-10px)]`
                  = 10px chevauchent le bord droit du bouton (cachés derrière).
                  `layoutId` partagé entre toutes les cards : framer-motion
                  fait un FLIP automatique et glisse l'indicateur de
                  l'ancienne position vers la nouvelle quand activeIndex
                  change. Spring transition pour un mouvement fluide.
                */}
                {isActive && (
                  <motion.div
                    layoutId="prestation-active-indicator"
                    transition={{
                      type: "spring",
                      stiffness: 220,
                      damping: 26,
                    }}
                    style={{
                      // Pointe (effet "feuille") uniquement côté droit, vers
                      // la card de detail. Le côté gauche reste plat (de
                      // toute façon caché sous le bouton via -z-10).
                      clipPath:
                        "polygon(0% 0%, calc(100% - 8px) 0%, 100% 50%, calc(100% - 8px) 100%, 0% 100%)",
                    }}
                    className="absolute left-[calc(100%-10px)] top-1/2 -translate-y-1/2 h-1.5 w-14 bg-warm-700 pointer-events-none -z-10"
                    aria-hidden="true"
                  />
                )}
              </li>
            );
          })}
        </ul>

        {/* Detail panel — contenu animé + LogoMark watermark à droite */}
        <div className="lg:col-span-8 relative overflow-hidden rounded-md">
          {/*
            COUCHE 1 — LogoMark en background, anchré à droite.
            Square aligné sur le bord droit, hauteur = 110% de la card pour
            déborder légèrement haut/bas (le overflow-hidden du parent crop).
            text-warm-500/40 + le backdrop-blur-xl de la card glass par-dessus
            produisent le même effet "ghost watermark flouté" que dans
            Specialites — recette identique, seul le positionnement change
            (right-aligned au lieu de inset-0 centered).
          */}
          {/*
            Taille fixe en px (pas en `%`) : sans ça, le LogoMark se
            redimensionne à chaque switch d'activeIndex parce que son
            parent change de hauteur selon la longueur de la
            description active. Une taille absolue garantit un
            watermark visuellement identique sur les 4 prestations.
          */}
          <LogoMark
            className="absolute right-0 top-1/2 -translate-y-1/2 h-72 aspect-square text-warm-700/50 pointer-events-none"
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={[
                "relative p-8 lg:p-10 rounded-md",
                // Glass effect (recette Header / Specialites)
                "bg-[var(--glass-bg)]",
                "backdrop-blur-xl backdrop-saturate-[1.8]",
                "border-[0.5px] border-white/50",
                "shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-1px_0_rgba(60,30,25,0.04),0_4px_16px_-6px_rgba(60,30,25,0.15)]",
              ].join(" ")}
            >
              <div className="flex items-center gap-4">
                <ActiveIcon
                  aria-hidden="true"
                  className="w-10 h-10 text-warm-700 shrink-0"
                  strokeWidth={1.5}
                />
                <h3 className="font-display text-2xl lg:text-3xl font-medium tracking-tight text-warm-900">
                  {active.title}
                </h3>
              </div>
              <p className="mt-6 font-body text-base lg:text-lg leading-relaxed text-warm-700">
                {active.description}
              </p>
              <div className="mt-8">
                <ButtonLink href={active.detailHref} variant="primary">
                  {active.ctaLabel}
                  <ScanSearch
                    aria-hidden="true"
                    className="w-4 h-4"
                    strokeWidth={1.5}
                  />
                </ButtonLink>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ═══ MOBILE : accordion (< lg) ═════════════════════════════ */}
      <ul className="lg:hidden flex flex-col gap-3">
        {prestations.map((p, i) => {
          const Icon = p.icon;
          const isOpen = i === mobileOpenIndex;
          const contentId = `prestation-${p.id}-content`;
          return (
            <li
              key={p.id}
              className={[
                "rounded-md overflow-hidden",
                // Glass effect (recette Header / Specialites)
                "bg-[var(--glass-bg)]",
                "backdrop-blur-xl backdrop-saturate-[1.8]",
                "border-[0.5px] transition-colors duration-200 ease-out",
                "shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-1px_0_rgba(60,30,25,0.04),0_4px_16px_-6px_rgba(60,30,25,0.15)]",
                isOpen ? "border-white/80" : "border-white/40",
              ].join(" ")}
            >
              <button
                type="button"
                // Toggle : tap sur item fermé → ouvre (et ferme l'autre
                // qui était ouvert, puisque c'est un unique index) ; tap
                // sur item déjà ouvert → ferme (retour à null).
                onClick={() => setMobileOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={contentId}
                className={[
                  // min-h-14 = 56px tap target minimum (WCAG 2.5.5, iOS HIG 44pt)
                  "w-full flex items-center gap-4 p-5 min-h-14 text-left",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warm-700",
                ].join(" ")}
              >
                <Icon
                  aria-hidden="true"
                  className="w-7 h-7 text-warm-700 shrink-0"
                  strokeWidth={1.5}
                />
                <div className="flex-1 min-w-0">
                  <div className="font-display text-lg font-medium text-warm-900">
                    {p.category}
                  </div>
                  <div className="font-body text-sm text-warm-700">
                    {p.tagline}
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
                        {p.description}
                      </p>
                      <div className="mt-6">
                        <ButtonLink href={p.detailHref} variant="primary">
                          {p.ctaLabel}
                          <ScanSearch
                            aria-hidden="true"
                            className="w-4 h-4"
                            strokeWidth={1.5}
                          />
                        </ButtonLink>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </>
  );
}
