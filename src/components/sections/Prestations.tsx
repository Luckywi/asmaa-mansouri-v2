import { GalleryVerticalEnd, Sparkles } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { PrestationsSelector } from "@/components/sections/PrestationsSelector";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Prestations — section "Mes prestations" sur la landing.
 *
 * Architecture en split server/client (best practice Next 16 / RSC) :
 *
 *   - **Ce composant (Prestations.tsx)** est un Server Component pur :
 *     section wrapper, H2, sous-titre, et les 2 CTAs globaux du bas
 *     (Voir toutes les prestations + Prendre rendez-vous). Aucun state,
 *     aucune interactivité. Render server-side complet, zéro JS expédié
 *     pour cette portion.
 *
 *   - **<PrestationsSelector />** est le seul Client Component, importé
 *     ici. Il encapsule toute l'interactivité (state activeIndex, click
 *     handlers, animations framer-motion). L'hydratation est localisée
 *     à ce sous-arbre, le reste de la section reste pure.
 *
 * Pattern de rendu :
 *   - Desktop : master-detail split (sidebar mini-cards + detail panel)
 *   - Mobile : accordion vertical
 *   Voir docstring de PrestationsSelector pour les détails UX.
 *
 * Pas de background propre sur la section — transparente, hérite du
 * body, conforme à la règle de cohérence du projet.
 */
export function Prestations() {
  return (
    <section
      id="prestations"
      aria-labelledby="prestations-titre"
      className="relative py-12 lg:py-22"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
        {/* ─── Titre + sous-titre centrés + 2 CTAs ─────────── */}
        <Reveal as="div" className="text-center max-w-3xl mx-auto">
          <h2
            id="prestations-titre"
            className="font-display text-4xl lg:text-5xl font-medium tracking-[-0.02em] leading-[1.1] text-warm-900"
          >
            Mes prestations
          </h2>
          <p className="mt-6 font-body text-lg lg:text-xl leading-relaxed text-warm-700">
            Consultations, massages Tuina, cupping therapy et accompagnement
            intensif. Chaque pratique est adaptée à votre histoire et à vos
            besoins du moment.
          </p>

          {/* ─── 2 CTAs globaux centrés sous la description ── */}
          <div className="mt-8 lg:mt-10 flex flex-col-reverse sm:flex-row sm:justify-center items-center gap-4">
            <ButtonLink href="/prestations" variant="secondary">
              Voir toutes les prestations
              <GalleryVerticalEnd
                aria-hidden="true"
                className="w-4 h-4"
                strokeWidth={1.5}
              />
            </ButtonLink>
            <ButtonLink href="/ateliers" variant="primary">
              Découvrir les ateliers
              <Sparkles
                aria-hidden="true"
                className="w-4 h-4"
                strokeWidth={1.5}
              />
            </ButtonLink>
          </div>
        </Reveal>

        {/*
          ─── Selector interactif (client component) ───────
          Pas de Reveal scroll ici : le PrestationsSelector contient un
          glass card par-dessus un LogoMark watermark dans le detail
          panel desktop. Wrapper le selector dans un Reveal qui
          translate créerait un compositor layer englobant, avec un
          flash visible du LogoMark pendant l'animation. On laisse donc
          le selector apparaître statiquement — son animation interne
          d'interaction (switch au click entre prestations) reste
          intacte et gérée en autonomie dans le composant.
        */}
        <div className="mt-16 lg:mt-20">
          <PrestationsSelector />
        </div>
      </div>
    </section>
  );
}
