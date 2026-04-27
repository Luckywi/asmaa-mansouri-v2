import { Star } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
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
 * Hash stable djb2-like pour dériver des paramètres "aléatoires"
 * déterministes à partir du nom. Stable SSR + même rendu côté client.
 */
function hashName(name: string): number {
  let h = 5381;
  for (let i = 0; i < name.length; i++) {
    h = ((h << 5) + h + name.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
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

  /*
    Watermark Star aléatoire mais déterministe (stable SSR/CSR) :
    - `hasStar`  : ~60 % des cards en portent une (modulo 5 sur le hash).
    - `rotation` : -25° à +25°, varie par card pour casser la symétrie.
    Pattern repris de la card avis sur /cabinet (Experiences) et des
    cards Specialites de la landing.
  */
  const h = hashName(name + body.slice(0, 6));
  const hasStar = h % 5 < 3;
  const rotation = (h % 51) - 25;

  return (
    <div
      className={[
        "group relative w-full rounded-md overflow-hidden",
        "lg:hover:scale-[1.02]",
        "transition-transform duration-200 ease-out",
      ].join(" ")}
    >
      {hasStar && (
        <Star
          aria-hidden="true"
          className="absolute inset-0 w-full h-full text-warm-700/50 pointer-events-none"
          strokeWidth={2}
          style={{ transform: `rotate(${rotation}deg)` }}
        />
      )}
      <button
        type="button"
        onClick={onOpenDetails}
        aria-label={`Voir le témoignage complet de ${name}`}
        className={[
          "relative text-left w-full cursor-pointer",
          "flex flex-col gap-4 p-6",
          "bg-[var(--glass-bg)]",
          "backdrop-blur-xl backdrop-saturate-[1.8]",
          "border-[0.5px] border-white/50",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-1px_0_rgba(60,30,25,0.04),0_4px_16px_-6px_rgba(60,30,25,0.15)]",
          "group-hover:border-white/70",
          "transition-colors duration-200 ease-out",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warm-700",
        ].join(" ")}
      >
      {/*
        Reveal à l'intérieur du button glass — la card et le Star
        watermark restent statiques, seul le contenu texte (header +
        body + "Voir plus") cascade à l'apparition. Pattern partagé
        avec Specialites/FaisonsConnaissance/AllerPlusLoin.
      */}
      <Reveal className="flex flex-col gap-4 w-full">
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
            <p className="font-body text-xs text-warm-700/80 mt-0.5 truncate">
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
      </Reveal>
      </button>
    </div>
  );
}
