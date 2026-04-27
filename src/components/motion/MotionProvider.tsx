"use client";

import { LazyMotion, domAnimation, MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * MotionProvider — racine d'animation du site.
 *
 * Deux rôles :
 *   1. `LazyMotion features={domAnimation}` : charge le sous-ensemble
 *      d'animations DOM standard (opacity, transform, variants, gestures
 *      basiques) sans inclure les animations de layout ni le drag
 *      avancé. Bundle cible ~15 KB gzippé au lieu des ~50-60 KB du
 *      bundle complet. Suffisant pour toutes les animations d'entrée
 *      premium du site.
 *
 *   2. `MotionConfig reducedMotion="user"` : baseline d'accessibilité.
 *      Respecte automatiquement le réglage "Réduire les animations" du
 *      système d'exploitation de l'utilisateur. Aucun composant n'a
 *      besoin de reproduire cette logique localement.
 *
 * Mode `strict` activé : tous les composants animés doivent utiliser
 * `<m.*>` importé de `framer-motion`. Tout import de `motion.*` lèverait
 * une erreur runtime — c'est volontaire pour garantir que le tree-shaking
 * de LazyMotion reste effectif et que `domAnimation` (~15 KB) ne se
 * fasse pas écraser par le bundle complet (~50-60 KB).
 *
 * Package `framer-motion` v12+ conservé (cohérent avec le reste du
 * projet). API identique à `motion/react`.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
