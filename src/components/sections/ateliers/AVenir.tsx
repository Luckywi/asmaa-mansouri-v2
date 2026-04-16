import { Phone } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { association } from "@/data/ateliers";

/**
 * AteliersAVenir — section "Ateliers à venir" affichée au-dessus de la
 * liste des derniers ateliers.
 *
 * Tant qu'aucune date n'est calée avec l'association, on affiche un
 * empty-state sous forme de card glass (même recette que AtelierCard /
 * TemoignageCard) : titre "Pas d'atelier programmé pour le moment",
 * description qui invite à appeler pour connaître les prochaines dates,
 * et CTA primary vers le numéro de l'association.
 *
 * Quand Asmaa communiquera une date à venir, on pourra remplacer cette
 * card par une grille d'ateliers programmés alimentée par `data/ateliers.ts`
 * (flag "upcoming" ou filtre sur `date >= today`).
 *
 * Server Component — aucun state, aucune interaction côté client.
 */
export function AteliersAVenir() {
  return (
    <section
      aria-labelledby="ateliers-a-venir-titre"
      className="relative pb-12 lg:pb-20"
    >
      <div className="mx-auto max-w-3xl px-6 md:px-8 lg:px-12">
        <h2
          id="ateliers-a-venir-titre"
          className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium tracking-[-0.02em] leading-[1.1] text-warm-900 text-center mb-10 lg:mb-14"
        >
          Ateliers à venir
        </h2>

        <div
          className={[
            "flex flex-col items-center text-center gap-5 p-8 sm:p-10",
            "rounded-md",
            "bg-[var(--glass-bg)]",
            "backdrop-blur-xl backdrop-saturate-[1.8]",
            "border-[0.5px] border-white/50",
            "shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-1px_0_rgba(60,30,25,0.04),0_4px_16px_-6px_rgba(60,30,25,0.15)]",
          ].join(" ")}
        >
          <h3 className="font-display text-xl lg:text-2xl font-medium tracking-tight text-warm-900 text-balance">
            Pas d&apos;atelier programmé pour le moment
          </h3>
          <p className="font-body text-[15px] leading-relaxed text-warm-700 max-w-md">
            Les prochaines dates sont en cours de préparation avec
            l&apos;association. Pour connaître le prochain rendez-vous,
            il suffit d&apos;appeler.
          </p>
          <ButtonLink href={association.phoneHref} variant="primary">
            Appeler au {association.phone}
            <Phone aria-hidden="true" className="w-4 h-4" strokeWidth={1.5} />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
