import { ArrowUpRight } from "lucide-react";
import type { Atelier } from "@/types";

type CardProps = {
  atelier: Atelier;
  onOpenDetails: () => void;
};

/**
 * AtelierCard — carte cliquable sur la page `/ateliers`.
 *
 * Recette glass standard (DESIGN.md — même que TemoignageCard,
 * Specialites, Reviews landing). Toute la card est un <button> pour
 * maximiser la zone de clic et améliorer l'accessibilité mobile.
 *
 * Structure : tag theme (optionnel) → titre → description courte →
 * "Voir le détail" aligné à droite, visible au hover, avec une petite
 * flèche nord-est (ArrowUpRight) qui signale l'ouverture d'une surface
 * détaillée (modale, pas nouvelle page).
 *
 * Server Component — state de sélection porté par la liste parente.
 */
export function AtelierCard({ atelier, onOpenDetails }: CardProps) {
  const { title, theme, shortDescription } = atelier;

  return (
    <button
      type="button"
      onClick={onOpenDetails}
      aria-label={`Voir le détail de l'atelier ${title}`}
      className={[
        "group text-left w-full cursor-pointer",
        "flex flex-col gap-4 p-6 lg:p-7",
        "rounded-md",
        "bg-[var(--glass-bg)]",
        "backdrop-blur-xl backdrop-saturate-[1.8]",
        "border-[0.5px] border-white/50",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-1px_0_rgba(60,30,25,0.04),0_4px_16px_-6px_rgba(60,30,25,0.15)]",
        "hover:border-white/70",
        "lg:hover:scale-[1.02]",
        "transition-all duration-200 ease-out",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warm-700",
      ].join(" ")}
    >
      {theme && (
        <span
          className={[
            "self-start inline-flex items-center h-7 px-3 rounded-md",
            "bg-warm-500/15 border-[0.5px] border-warm-500/35",
            "font-body text-xs font-medium text-warm-700",
          ].join(" ")}
        >
          {theme}
        </span>
      )}

      <h3 className="font-display text-xl lg:text-2xl font-medium tracking-tight text-warm-900 whitespace-nowrap">
        {title}
      </h3>

      <p className="font-body text-[15px] leading-relaxed text-warm-700">
        {shortDescription}
      </p>

      <span
        aria-hidden="true"
        className="mt-auto inline-flex items-center gap-1.5 self-start font-body text-sm font-medium text-warm-700 transition-colors group-hover:text-warm-900"
      >
        Voir le détail
        <ArrowUpRight
          className="w-4 h-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          strokeWidth={1.75}
        />
      </span>
    </button>
  );
}
