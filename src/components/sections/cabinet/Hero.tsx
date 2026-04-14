"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CalendarRange, MapPin, Phone } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { site } from "@/data/site";

/**
 * Mots-clés qui défilent dans le H1. L'ordre suit la hiérarchie éditoriale
 * d'Asmaa (naturopathie = cœur de métier en premier, MTC et Tuina ensuite).
 *
 * Inlinés ici parce qu'ils ne servent que dans ce Hero. Si on les réutilise
 * ailleurs (meta description, footer, autre page), extraire vers
 * `src/data/site.ts` ou un fichier dédié.
 */
const rotatingKeywords = [
  "naturopathie",
  "médecine chinoise",
  "massage Tuina",
] as const;

const ROTATION_INTERVAL_MS = 2600;

// Courbe easeOutQuart — douce sans être molle. Utilisée partout dans le
// Hero pour que tout ait le même "feel" temporel.
const SWAP_EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Hero — entête de la page /cabinet.
 *
 * H1 dynamique : "Mon cabinet de [keyword] à Décines-Charpieu" où
 * [keyword] tourne toutes les ~2.6 s entre les 3 mots-clés cœur
 * (naturopathie / médecine chinoise / massage Tuina).
 *
 * Pattern d'animation : on anime la **phrase entière** (ligne 1) comme
 * un seul élément à chaque changement de keyword, puis on ajoute une
 * **animation spécifique** au keyword par-dessus. C'est la pratique web
 * classique pour éviter de gérer à la fois le swap du mot et le
 * repositionnement du texte environnant — le nouvel élément entier
 * remonte, text-center le place naturellement au centre, et le keyword
 * reçoit un effet dédié pour capter l'œil sur le mot qui change vraiment.
 *
 * SEO / accessibilité :
 *   - Un <span className="sr-only"> contient les 3 keywords pour que les
 *     crawlers et les lecteurs d'écran voient la phrase complète.
 *   - La partie animée est `aria-hidden`.
 *   - `useReducedMotion` : anim neutralisées si l'utilisateur le préfère.
 *
 * Sous le titre : adresse cliquable (→ Google Maps itinéraire) avec
 * icône `MapPin`, puis 2 CTAs (Prendre RDV primary + Appeler secondary).
 *
 * Client Component — nécessaire pour le setInterval et AnimatePresence.
 */
export function Hero() {
  const [index, setIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const id = setInterval(() => {
      setIndex((current) => (current + 1) % rotatingKeywords.length);
    }, ROTATION_INTERVAL_MS);
    return () => clearInterval(id);
  }, [prefersReducedMotion]);

  const currentKeyword = rotatingKeywords[index];

  return (
    <section
      aria-labelledby="cabinet-hero-titre"
      className="relative pt-32 pb-12 md:pt-36 lg:pt-40 lg:pb-22"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
        <div className="text-center max-w-4xl mx-auto">
          <h1
            id="cabinet-hero-titre"
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-[-0.02em] leading-[1.1] text-warm-900"
          >
            {/* Version accessibilité / SEO — phrase complète, invisible */}
            <span className="sr-only">
              Mon cabinet de naturopathie, médecine traditionnelle chinoise et
              massage Tuina à Décines-Charpieu
            </span>

            {/*
              Version visuelle — deux layouts mutuellement exclusifs via
              Tailwind, chacun avec sa propre stratégie d'animation :

              ─── Mobile (< sm) : 3 lignes empilées ───────────────
                Ligne 1 : "Mon cabinet de"         (statique)
                Ligne 2 : [keyword en accent]       (animé en place)
                Ligne 3 : "à Décines-Charpieu"      (statique)

                Le keyword est seul sur sa ligne → sa largeur peut changer
                sans impacter les lignes voisines. On anime donc seulement
                le mot (fade + slide + scale), pas besoin d'englober toute
                la phrase.

              ─── Desktop (≥ sm) : 2 lignes, phrase 1 animée en bloc ──
                Ligne 1 : "Mon cabinet de [keyword]" (phrase animée)
                Ligne 2 : "à Décines-Charpieu"      (statique)

                Ligne 1 partagée → un changement de keyword modifierait la
                largeur de la ligne et donc le recentrage. On anime la
                phrase entière comme un nouvel élément pour esquiver le
                problème, puis on ajoute un effet scale subtil dédié au
                mot-clé pour le mettre en valeur.
            */}
            <span aria-hidden="true">
              {/* ─── Mobile : 3 lignes, seul le keyword anime ──── */}
              <span className="sm:hidden">
                <span className="block">Mon cabinet de</span>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={currentKeyword}
                    initial={
                      prefersReducedMotion
                        ? { opacity: 1, y: 0, scale: 1 }
                        : { opacity: 0, y: "0.4em", scale: 0.94 }
                    }
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={
                      prefersReducedMotion
                        ? { opacity: 1, y: 0, scale: 1 }
                        : { opacity: 0, y: "-0.4em", scale: 0.94 }
                    }
                    transition={{ duration: 0.5, ease: SWAP_EASE }}
                    className="block text-accent origin-center"
                  >
                    {currentKeyword}
                  </motion.span>
                </AnimatePresence>
                <span className="block">à Décines-Charpieu</span>
              </span>

              {/* ─── Desktop : 2 lignes, phrase 1 animée en bloc ── */}
              <span className="hidden sm:block">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={currentKeyword}
                    initial={
                      prefersReducedMotion
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: "0.4em" }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    exit={
                      prefersReducedMotion
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: "-0.4em" }
                    }
                    transition={{ duration: 0.5, ease: SWAP_EASE }}
                    className="block"
                  >
                    Mon cabinet de{" "}
                    <motion.span
                      initial={
                        prefersReducedMotion
                          ? { opacity: 1, scale: 1 }
                          : { opacity: 0, scale: 0.92 }
                      }
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.55,
                        delay: prefersReducedMotion ? 0 : 0.18,
                        ease: SWAP_EASE,
                      }}
                      className="inline-block text-accent origin-[50%_80%]"
                    >
                      {currentKeyword}
                    </motion.span>
                  </motion.span>
                </AnimatePresence>
                <span className="block">à Décines-Charpieu</span>
              </span>
            </span>
          </h1>

          {/* Adresse cliquable — ouvre Google Maps itinéraire.

              Sur mobile l'adresse est longue et passe sur 2 lignes.
              Layout `inline` (pas `inline-flex`) : l'icône MapPin est une
              inline-block qui flotte naturellement avec le premier mot
              du texte. Quand l'adresse wrap, seule la ligne 1 a l'icône,
              et l'icône reste alignée sur cette ligne (pas recentrée
              entre les deux lignes comme le faisait items-center). */}
          <a
            href={site.googleMapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={[
              "mt-8 inline-block rounded-md px-2 py-1 -mx-2 -my-1",
              "font-body text-base md:text-lg text-warm-700",
              "underline underline-offset-4 decoration-1 decoration-warm-700/40",
              "hover:text-warm-900 hover:decoration-warm-900",
              "transition-colors duration-200 ease-out",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warm-700",
            ].join(" ")}
          >
            <MapPin
              aria-hidden="true"
              strokeWidth={1.5}
              // `align-[-0.2em]` → icône centrée visuellement sur la
              // x-height du texte, pas sur la baseline (trop basse) ni
              // sur la cap-height (trop haute).
              className="inline-block mr-1.5 w-4 h-4 align-[-0.2em]"
            />
            <address className="inline not-italic">{site.address.full}</address>
          </a>

          {/* CTAs — mêmes que Hero landing, même ordre (secondary à gauche,
              primary à droite en desktop ; flex-col-reverse en mobile pour
              garder le primary au-dessus) */}
          <div className="mt-10 flex flex-col-reverse sm:flex-row sm:justify-center items-center gap-4">
            <ButtonLink href={site.phoneHref} variant="secondary">
              Appeler Asmaa
              <Phone aria-hidden="true" className="w-4 h-4" strokeWidth={1.5} />
            </ButtonLink>
            <ButtonLink href={site.resalibUrl} variant="primary">
              Prendre rendez-vous
              <CalendarRange
                aria-hidden="true"
                className="w-4 h-4"
                strokeWidth={1.5}
              />
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
