"use client";

import { m } from "framer-motion";
import type { ElementType, ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Délai avant démarrage quand l'élément entre dans le viewport. */
  delay?: number;
  /** Décalage vertical initial en px. Défaut : 24. */
  y?: number;
  /** Durée de l'animation, en secondes. Défaut : 0.6. */
  duration?: number;
  /**
   * Marge du viewport au sens `IntersectionObserver` (CSS units string).
   * Une valeur négative comme "-10%" déclenche l'animation un peu avant
   * que l'élément n'atteigne le bord. Défaut : "-10%".
   */
  margin?: string;
  /** Balise HTML rendue. Défaut : `div`. */
  as?: ElementType;
  className?: string;
};

/**
 * Reveal — animation d'entrée déclenchée au scroll.
 *
 * Utilise `whileInView` avec `once: true` : l'animation se joue une
 * seule fois quand l'élément entre dans le viewport, jamais au
 * scroll-back (bonne pratique UX, évite les re-déclenchements agaçants).
 *
 * Respecte `prefers-reduced-motion` via le `MotionConfig` racine.
 *
 * Usage typique : sections internes de page (Presentation,
 * Specialites, Temoignages…), cards en grille, blocs CTA secondaires.
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  duration = 0.6,
  margin = "-10%",
  as = "div",
  className,
}: Props) {
  const Tag = m[as as keyof typeof m] as typeof m.div;
  return (
    <Tag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin }}
      transition={{ duration, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </Tag>
  );
}
