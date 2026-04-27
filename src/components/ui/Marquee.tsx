import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  /** Inverse le sens d'animation */
  reverse?: boolean;
  /** Met en pause l'animation au survol */
  pauseOnHover?: boolean;
  /** Mode vertical (défaut: horizontal) */
  vertical?: boolean;
  /** Nombre de répétitions du contenu pour boucle visuellement infinie */
  repeat?: number;
  /** Contenu à animer */
  children: ReactNode;
}

/**
 * Marquee — défilement infini horizontal ou vertical.
 *
 * Implémentation manuelle inspirée de MagicUI (sans CLI shadcn). Le contenu
 * est répété N fois (default 4) puis animé en CSS pure via les utilitaires
 * `animate-marquee` (horizontal) ou `animate-marquee-vertical` (vertical),
 * définis dans `globals.css` (@theme + @keyframes).
 *
 * Vitesse contrôlée via la CSS variable `--duration` (ex: `[--duration:30s]`).
 * Espacement contrôlé via la CSS variable `--gap` (ex: `[--gap:1rem]`).
 *
 * Server Component : aucun state, aucun listener — animation 100% CSS.
 *
 * Exemple d'usage (vertical, deux colonnes, hauteur fixée par le parent) :
 *
 *   <div className="flex h-[500px] overflow-hidden">
 *     <Marquee pauseOnHover vertical className="[--duration:30s]">
 *       {items.map(...)}
 *     </Marquee>
 *     <Marquee reverse pauseOnHover vertical className="[--duration:30s]">
 *       {moreItems.map(...)}
 *     </Marquee>
 *   </div>
 */
export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  vertical = false,
  repeat = 4,
  children,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        "group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
        vertical ? "flex-col" : "flex-row",
        className,
      )}
    >
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "flex shrink-0 justify-around [gap:var(--gap)]",
            vertical
              ? "animate-marquee-vertical flex-col"
              : "animate-marquee flex-row",
            pauseOnHover && "group-hover:[animation-play-state:paused]",
            reverse && "[animation-direction:reverse]",
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
