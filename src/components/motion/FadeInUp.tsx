"use client";

import { m } from "framer-motion";
import type { ElementType, ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Délai avant démarrage, en secondes. Utile pour cascader plusieurs éléments. */
  delay?: number;
  /** Décalage vertical initial en px. Défaut : 16 (entrée discrète). */
  y?: number;
  /** Durée de l'animation, en secondes. Défaut : 0.5. */
  duration?: number;
  /** Balise HTML rendue. Défaut : `div`. */
  as?: ElementType;
  className?: string;
};

/**
 * FadeInUp — animation d'entrée classique et légère.
 *
 * Opacité 0 → 1 avec une translation verticale de `y` px. Timing
 * par défaut calibré pour une sensation premium : 0.5 s easeOut.
 *
 * Respecte automatiquement `prefers-reduced-motion` via le
 * `MotionConfig reducedMotion="user"` monté à la racine (cf.
 * `MotionProvider.tsx`) : en mode réduit, la translation est neutralisée
 * par Framer Motion, seul l'opacité reste (mouvement acceptable a11y).
 *
 * Usage typique : titres de Hero, paragraphes d'intro, CTAs.
 */
export function FadeInUp({
  children,
  delay = 0,
  y = 16,
  duration = 0.5,
  as = "div",
  className,
}: Props) {
  const Tag = m[as as keyof typeof m] as typeof m.div;
  return (
    <Tag
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </Tag>
  );
}
