import { Star } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ResalibLogo } from "@/components/ui/ResalibLogo";
import { GoogleLogo } from "@/components/ui/GoogleLogo";
import { site } from "@/data/site";
import { temoignages } from "@/data/temoignages";

/**
 * Hero de la page `/temoignages`.
 *
 * Pattern repris de la section Temoignages de la landing (DESIGN.md, cf.
 * JSDoc `sections/Temoignages.tsx`) : H1 font-display warm-900, paragraphe
 * d'intro warm-700, bloc "5 étoiles + count" avec le compteur souligné, et
 * 2 CTA "Écrire un avis" (Resalib primary, Google secondary) posés côte à
 * côte. Les logos héritent `currentColor` du bouton, pas de filter CSS.
 *
 * Le compteur d'avis (badge 5 étoiles + paragraphe) est calé sur
 * `temoignages.length` — source de vérité unique qui alimente aussi
 * `site.verifiedReviewsCount` via dérivation dans `data/site.ts`.
 * Ajouter ou retirer une entrée dans `temoignages.ts` propage partout
 * (landing, pages prestations, ce Hero).
 *
 * Server Component pur.
 */
export function TemoignagesHero() {
  return (
    <section
      aria-labelledby="temoignages-titre"
      className="relative pt-32 pb-12 md:pt-36 lg:pt-40 lg:pb-16"
    >
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h1
          id="temoignages-titre"
          className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-[-0.02em] leading-[1.05] text-warm-900"
        >
          Vos témoignages
        </h1>

        <p className="mt-8 font-body text-lg md:text-xl leading-relaxed text-warm-700">
          Depuis l&apos;ouverture de mon cabinet à Décines-Charpieu,
          j&apos;accompagne des femmes à chaque étape de leur parcours de
          santé.{" "}
          {temoignages.length}{" "}
          d&apos;entre elles ont accepté de partager leur expérience après
          être venues consulter.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3 lg:gap-4">
          <span
            className="flex items-center gap-0.5 lg:gap-1"
            aria-hidden="true"
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="w-[18px] h-[18px] lg:w-5 lg:h-5 text-warm-700"
                fill="currentColor"
                stroke="none"
              />
            ))}
          </span>
          <p className="font-body text-base text-warm-700 underline underline-offset-4 decoration-warm-500/60">
            {temoignages.length} avis vérifiés
          </p>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <ButtonLink href={site.resalibReviewsUrl} variant="primary">
            Écrire un avis sur
            <ResalibLogo className="h-5 w-auto" />
          </ButtonLink>
          <ButtonLink href={site.googleReviewsUrl} variant="secondary">
            Écrire un avis sur
            <GoogleLogo className="h-4 w-auto translate-y-[1.5px]" />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
