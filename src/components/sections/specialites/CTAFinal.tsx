import { CalendarRange, ScanSearch } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/data/site";

/**
 * CTAFinal — bloc de fin d'article (page /specialites/[slug]).
 *
 * Posé juste après la FAQ, le bloc ferme l'article avec deux affordances
 * équilibrées :
 *   - Secondary "Découvrir les prestations" → /prestations
 *     (le lecteur vient de lire ce qu'est la pathologie, on l'invite
 *     à voir ce que je propose concrètement pour l'accompagner).
 *   - Primary "Réserver un appel découverte gratuit" → Resalib
 *     (CTA de conversion, redonné en bas après la lecture complète).
 *
 * Le titre fait écho à la section "Reconnaître les symptômes" de
 * l'article pour créer une continuité éditoriale : après avoir lu la
 * liste des symptômes, le lecteur est directement interpellé.
 *
 * Bloc texte centré max-w-3xl, pattern aligné sur Specialites/Cabinet
 * landing. Server Component pur.
 */
export function CTAFinal() {
  return (
    <section
      aria-label="Passez à l'action"
      className="relative py-12 lg:py-22"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
        <Reveal as="div" className="text-center max-w-3xl mx-auto">
          <h2 className="font-display text-4xl lg:text-5xl font-medium tracking-[-0.02em] leading-[1.1] text-warm-900">
            Vous vous reconnaissez dans ces symptômes&nbsp;?
          </h2>

          <p className="mt-6 font-body text-lg lg:text-xl leading-relaxed text-warm-700">
            L&apos;appel découverte est gratuit et sans engagement. C&apos;est
            l&apos;occasion de me parler de votre situation, de me poser toutes
            vos questions et d&apos;évaluer ensemble si je peux vous
            accompagner.
          </p>

          {/*
            CTA row — primary au-dessus en mobile (flex-col-reverse),
            pattern aligné sur les autres CTA rows du projet.
          */}
          <div className="mt-10 flex flex-col-reverse sm:flex-row sm:justify-center items-center gap-4">
            <ButtonLink href="/prestations" variant="secondary">
              Découvrir les prestations
              <ScanSearch
                aria-hidden="true"
                className="w-4 h-4"
                strokeWidth={1.5}
              />
            </ButtonLink>
            <ButtonLink href={site.resalibUrl} variant="primary">
              Réserver un appel découverte
              <CalendarRange
                aria-hidden="true"
                className="w-4 h-4"
                strokeWidth={1.5}
              />
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
