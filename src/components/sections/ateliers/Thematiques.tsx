import { thematiques } from "@/data/atelier-thematiques";
import { ThematiqueSection } from "./ThematiqueSection";

/**
 * Thematiques — conteneur qui itère sur les 5 thématiques d'ateliers
 * et rend une `ThematiqueSection` verticale empilée par entrée.
 *
 * L'ancre globale `#thematiques` sert de cible au CTA du Hero.
 * Chaque thématique a sa propre ancre (`#atelier-diy`, etc.) pour
 * permettre un lien direct vers un atelier précis depuis n'importe
 * où sur le site.
 *
 * Server Component.
 */
export function AteliersThematiques() {
  return (
    <section
      id="thematiques"
      aria-label="Les thématiques d'ateliers proposées"
      className="relative pb-12 lg:pb-22"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-8 lg:px-12">
        {thematiques.map((thematique) => (
          <ThematiqueSection
            key={thematique.slug}
            thematique={thematique}
          />
        ))}
      </div>
    </section>
  );
}
