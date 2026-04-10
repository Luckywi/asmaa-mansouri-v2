import { site } from "@/data/site";

/**
 * Logo du site — wordmark stacké (placeholder texte).
 *
 * Layout : titre + sous-titre empilés verticalement, très serrés
 * (mt-0.5 = 2px entre les deux), façon "logo écrit" / wordmark pro.
 * Le sous-titre est en font-light uppercase pour contraster avec le titre
 * tout en restant cohérent (même famille font-display = Outfit).
 *
 * Le SVG définitif viendra via Quiver AI et remplacera ce composant sans
 * changer son API. Penser à passer en aria-hidden une fois que le SVG sera
 * là (le nom accessible reste sur le <Link> parent qui wrap ce composant).
 *
 * Note : "Naturopathe" est en casse normale dans le JSX (lisibilité dev +
 * accessibilité screen readers) — c'est CSS `uppercase` qui rend les
 * majuscules à l'écran.
 *
 * Server Component pur — aucun state, aucune interactivité.
 */
export function Logo() {
  return (
    <span className="inline-flex flex-col items-center leading-none whitespace-nowrap">
      {/* Titre — font-display, warm-900, weight 500 */}
      <span className="font-display text-[17px] font-medium tracking-[-0.01em] text-warm-900">
        {site.name}
      </span>

      {/* Sous-titre — font-display, warm-700, weight 300 (light), uppercase, tracking large */}
      <span className="font-display text-[10px] font-light uppercase tracking-[0.18em] text-warm-700 mt-0.5">
        Naturopathe
      </span>
    </span>
  );
}
