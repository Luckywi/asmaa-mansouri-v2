import { CalendarRange } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { site } from "@/data/site";
import type { Specialite } from "@/types";

type Props = {
  title: Specialite["title"];
  intro: Specialite["intro"];
};

/**
 * Hero — section d'accueil d'une page spécialité (/specialites/[slug]).
 *
 * Structure verticale centrée, alignée sur le pattern qui-suis-je/Hero :
 *   1. H1 = nom de la spécialité (ex: "SOPK")
 *   2. Intro descriptive sous le H1 (paragraphe SEO localisé,
 *      mentionnant naturopathe + Décines + mot-clé spécialité)
 *   3. CTA primary "Réserver un appel découverte gratuit" → Resalib
 *
 * Animations FadeInUp retirées : l'intro <p> était systématiquement le
 * candidat LCP des pages spécialité et son `initial: opacity 0` retardait
 * le rendu de plus de 2 s.
 *
 * Server Component pur — props sérialisables, rendu statique.
 */
export function Hero({ title, intro }: Props) {
  return (
    <section
      aria-labelledby="specialite-titre"
      className="relative pt-8 pb-12 md:pt-10 lg:pt-12 lg:pb-16"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
        <div className="text-center max-w-4xl mx-auto">
          <h1
            id="specialite-titre"
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-[-0.02em] leading-[1.05] text-warm-900 text-balance"
          >
            {title}
          </h1>

          <p className="mt-8 max-w-2xl mx-auto font-body text-lg md:text-xl leading-relaxed text-warm-700">
            {intro}
          </p>

          <div className="mt-10 flex justify-center">
            <ButtonLink href={site.resalibUrl} variant="primary">
              Réserver un appel découverte gratuit
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
