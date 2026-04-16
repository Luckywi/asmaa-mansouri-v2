import { Star } from "lucide-react";
import type { Temoignage } from "@/types";

/**
 * Seuil de caractères au-dessus duquel le texte de l'avis est tronqué et le
 * bouton "Voir plus" devient utile pour ouvrir la modale. En dessous, on
 * montre tout directement mais on laisse le bouton visible pour garder
 * l'accès à la date et à la source (modale = source de vérité détaillée).
 */
const TRUNCATE_THRESHOLD = 220;

type CardProps = {
  temoignage: Temoignage;
  /** Callback fourni par la liste parente pour ouvrir la modale */
  onOpenDetails: () => void;
};

/**
 * Extrait 2 initiales max à partir du `name` (ex: "Gwen S." → "GS").
 * Utilisé pour l'avatar rond quand on n'a pas de photo.
 */
function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase())
    .slice(0, 2)
    .join("");
}

/**
 * TemoignageCard — carte individuelle sur la page `/temoignages`.
 *
 * Recette glass standard (DESIGN.md — même que les cards Specialites,
 * ReviewCard du landing, Header). Header avec avatar initiales + nom +
 * étoiles, texte de l'avis tronqué par `line-clamp-5` si > 220 caractères,
 * bouton "Voir plus" toujours présent pour ouvrir la modale (qui porte la
 * date et le lien vers l'avis source).
 *
 * Server Component pur — l'état de la modale est tenu par la liste parente.
 */
export function TemoignageCard({ temoignage, onOpenDetails }: CardProps) {
  const { name, role, body, rating = 5 } = temoignage;
  const isLong = body.length > TRUNCATE_THRESHOLD;

  return (
    <button
      type="button"
      onClick={onOpenDetails}
      aria-label={`Voir le témoignage complet de ${name}`}
      className={[
        // Toute la card est le bouton : `text-left w-full` pour garder le
        // layout, `cursor-pointer` explicite, `group` pour propager le
        // hover sur les enfants (chevron "Voir plus" qui change de teinte).
        "group text-left w-full cursor-pointer",
        "flex flex-col gap-4 p-6",
        "rounded-md",
        "bg-[var(--glass-bg)]",
        "backdrop-blur-xl backdrop-saturate-[1.8]",
        "border-[0.5px] border-white/50",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-1px_0_rgba(60,30,25,0.04),0_4px_16px_-6px_rgba(60,30,25,0.15)]",
        // Signaux d'interactivité : bordure qui gagne en opacité + léger
        // zoom desktop uniquement (même pattern que les cards /specialites).
        "hover:border-white/70",
        "lg:hover:scale-[1.02]",
        "transition-all duration-200 ease-out",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warm-700",
      ].join(" ")}
    >
      <header className="flex items-center gap-3">
        <div
          aria-hidden="true"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-warm-500/15 font-display text-sm font-medium text-warm-700"
        >
          {getInitials(name)}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-display text-sm font-medium text-warm-900 truncate">
            {name}
          </p>
          {role && (
            <p className="font-body text-xs text-warm-700/60 mt-0.5 truncate">
              {role}
            </p>
          )}
          <div
            className="mt-1 flex gap-0.5"
            aria-label={`Note : ${rating} sur 5`}
          >
            {Array.from({ length: rating }).map((_, i) => (
              <Star
                key={i}
                aria-hidden="true"
                className="w-3 h-3 text-warm-700"
                fill="currentColor"
                stroke="none"
              />
            ))}
          </div>
        </div>
      </header>

      <p
        className={[
          "font-body text-sm leading-relaxed text-warm-700 whitespace-pre-line",
          isLong ? "line-clamp-5" : "",
        ]
          .join(" ")
          .trim()}
      >
        {body}
      </p>

      {/*
        "Voir plus" — rendu en <span>, plus un bouton interne (nested button
        non valide HTML). Affordance visuelle du clic qui est désormais
        porté par toute la card via le <button> racine. `aria-hidden` car
        l'aria-label du <button> racine couvre déjà l'intention.
      */}
      <span
        aria-hidden="true"
        className="self-start font-body text-xs font-medium text-warm-700 underline underline-offset-2 decoration-warm-500/60 transition-colors group-hover:text-warm-900"
      >
        Voir plus
      </span>
    </button>
  );
}
