import { ExternalLink, Phone } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { association } from "@/data/ateliers";

/**
 * Hero de la page `/ateliers`.
 *
 * H1 "Les ateliers" + paragraphe explicatif (association, thématique,
 * adhésion requise) + 2 CTAs :
 *   - primary : "Réserver un atelier" → tel: de la présidente de l'asso
 *   - secondary : "Voir l'association" → fiche externe mairie de Vaulx
 *
 * Le numéro de l'association est volontairement mis en avant sous les
 * CTAs : la présidente (Jacqueline) est le point de contact pour les
 * réservations, pas Asmaa. Distinction importante pour éviter la
 * confusion avec le téléphone du cabinet (cf. `site.phone`).
 *
 * Server Component — aucun state, aucune interaction côté client.
 */
export function AteliersHero() {
  return (
    <section
      aria-labelledby="ateliers-titre"
      className="relative pt-32 pb-12 md:pt-36 lg:pt-40 lg:pb-16"
    >
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h1
          id="ateliers-titre"
          className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-[-0.02em] leading-[1.05] text-warm-900"
        >
          Les ateliers
        </h1>

        <p className="mt-8 font-body text-lg md:text-xl leading-relaxed text-warm-700">
          Au fil des saisons, j&apos;anime des ateliers d&apos;alimentation
          et de bien-être avec l&apos;association{" "}
          <span className="text-warm-900">{association.name}</span>, à
          Vaulx-en-Velin. Des temps conviviaux pour partager recettes et
          gestes simples.
        </p>

        <div className="mt-10 flex flex-col-reverse sm:flex-row sm:justify-center items-center gap-4">
          <ButtonLink href={association.externalUrl} variant="secondary" external>
            Voir l&apos;association
            <ExternalLink aria-hidden="true" className="w-4 h-4" strokeWidth={1.5} />
          </ButtonLink>
          <ButtonLink href={association.phoneHref} variant="primary">
            Réserver un atelier
            <Phone aria-hidden="true" className="w-4 h-4" strokeWidth={1.5} />
          </ButtonLink>
        </div>

        <p className="mt-6 font-body text-sm text-warm-700/75">
          Informations et réservations au{" "}
          <a
            href={association.phoneHref}
            className="text-warm-900 underline underline-offset-4 decoration-warm-500/60 hover:decoration-warm-900 transition-colors"
          >
            {association.phone}
          </a>
          .
        </p>
      </div>
    </section>
  );
}
