import { CalendarRange, Phone } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { site } from "@/data/site";
import type { PrestationTariff } from "@/types";

type HeroProps = {
  h1: string;
  subtitle: string;
  tariffs: readonly PrestationTariff[];
};

/**
 * Hero de chaque page slug `/prestations/[slug]`.
 *
 * Structure :
 *   1. H1 SEO local (ex: "Consultation naturopathique à Décines-Charpieu")
 *   2. Sous-titre descriptif (contexte cabinet/visio/Lyon)
 *   3. 2 CTAs : Appeler Asmaa (secondary glass) + Prendre rendez-vous (primary)
 *   4. Tableau de tarifs en dessous des CTAs — cards glass horizontales,
 *      stack sur mobile, row sur sm+. 1 à 3 lignes selon la prestation.
 *
 * Le tableau est inline dans le Hero plutôt qu'en section séparée parce
 * qu'il est directement lié à la décision d'achat : on le veut visible
 * au-dessus du pli, sans scroll après les CTAs.
 *
 * Server Component pur, conforme au pattern des autres Hero du projet.
 */
export function Hero({ h1, subtitle, tariffs }: HeroProps) {
  return (
    <section
      aria-labelledby="prestation-titre"
      className="relative pt-32 pb-12 md:pt-36 lg:pt-40 lg:pb-16"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
        <div className="text-center max-w-4xl mx-auto">
          <h1
            id="prestation-titre"
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-[-0.02em] leading-[1.05] text-warm-900 text-balance"
          >
            {h1}
          </h1>

          <p className="mt-8 max-w-2xl mx-auto font-body text-lg md:text-xl leading-relaxed text-warm-700">
            {subtitle}
          </p>

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

        {/* ─── Tableau de tarifs ──────────────────────────────────
            Cards glass horizontales (stack sur mobile, row sur sm+).
            Structure répétée : label en haut, prix dominant (warm-900
            grand), durée + lieu en dessous (warm-700 petit).

            Largeur : grid `w-fit` (fit-content) + colonnes `1fr` (sans
            minmax) → la grille prend la largeur strictement nécessaire
            au contenu, et les `1fr` égalisent les colonnes entre elles.
            Résultat : cards dimensionnées sur la plus large, container
            centré via `mx-auto`. Sur mobile (<sm) les cards prennent
            `w-full` pour un confort de lecture standard. */}
        <div className="mt-14 lg:mt-16 flex justify-center px-2">
          <ul
            className={[
              "grid gap-4 lg:gap-6 w-full sm:w-fit",
              tariffs.length === 1
                ? "grid-cols-1"
                : tariffs.length === 2
                  ? "grid-cols-1 sm:grid-cols-[1fr_1fr]"
                  : "grid-cols-1 sm:grid-cols-[1fr_1fr] lg:grid-cols-[1fr_1fr_1fr]",
            ].join(" ")}
          >
            {tariffs.map(({ label, price, duration, location }) => (
              <li
                key={label}
                className={[
                  "flex flex-col items-center text-center p-5 lg:p-6 rounded-md",
                  "bg-[var(--glass-bg)]",
                  "backdrop-blur-xl backdrop-saturate-[1.8]",
                  "border-[0.5px] border-white/50",
                  "shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-1px_0_rgba(60,30,25,0.04),0_4px_16px_-6px_rgba(60,30,25,0.15)]",
                ].join(" ")}
              >
                <p className="font-body text-xs lg:text-sm font-medium text-warm-700 uppercase tracking-[0.08em]">
                  {label}
                </p>
                <p className="mt-2 font-display text-3xl lg:text-4xl font-medium text-warm-900">
                  {price}
                </p>
                <p className="mt-2 font-body text-sm text-warm-700">
                  {duration}
                  {location ? ` · ${location}` : ""}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
