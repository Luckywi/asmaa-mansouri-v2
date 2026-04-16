import { Coordonnees } from "./Coordonnees";
import { Formulaire } from "./Formulaire";

/**
 * Section 2-colonnes qui assemble le formulaire et les coordonnées
 * directes côte à côte (desktop) ou empilés (mobile).
 *
 * Répartition :
 *   - Mobile (< lg) : stack vertical. Ordre voulu = coordonnées
 *     d'abord (accès rapide tel / mail / insta sans scroll du form),
 *     formulaire ensuite. Sur desktop on inverse visuellement avec
 *     `lg:order-*` pour mettre le formulaire à gauche (zone de
 *     lecture F-pattern) et les coordonnées à droite.
 *   - Desktop (lg+) : grid 2 col, formulaire 60 % / coordonnées 40 %
 *     pour que l'action dominante (écrire) ait plus d'espace visuel.
 *
 * Server Component — le Formulaire interne gère l'interactivité.
 */
export function FormulaireEtCoordonnees() {
  return (
    <section
      id="formulaire"
      aria-labelledby="formulaire-titre"
      className="relative py-12 lg:py-22"
    >
      <h2 id="formulaire-titre" className="sr-only">
        Formulaire et coordonnées directes
      </h2>
      <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
          <div className="lg:col-span-2 lg:order-1 order-1">
            <Coordonnees />
          </div>
          <div className="lg:col-span-3 lg:order-2 order-2">
            <Formulaire />
          </div>
        </div>
      </div>
    </section>
  );
}
