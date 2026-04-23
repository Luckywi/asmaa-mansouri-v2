"use client";

import { m } from "framer-motion";
import type { Variants } from "framer-motion";
import type { ElementType, ReactNode } from "react";

type StaggerProps = {
  children: ReactNode;
  /**
   * Mode de déclenchement :
   *   - "mount"    : démarrage au montage (Hero, above-the-fold).
   *   - "inView"   : démarrage quand le groupe entre dans le viewport.
   */
  trigger?: "mount" | "inView";
  /** Délai avant le premier enfant. Utile pour cascader après un Hero. */
  delay?: number;
  /** Délai entre chaque enfant, en secondes. Défaut : 0.08. */
  staggerChildren?: number;
  /** Décalage vertical initial de chaque enfant. Défaut : 16. */
  y?: number;
  /** Durée de chaque enfant. Défaut : 0.5. */
  duration?: number;
  /** Balise HTML rendue par le parent. Défaut : `div`. */
  as?: ElementType;
  className?: string;
};

/**
 * Stagger — anime une liste d'enfants avec un décalage temporel.
 *
 * Un parent `<Stagger>` orchestre les variants ; chaque enfant direct
 * est un `<StaggerItem>` qui consomme ces variants. Les enfants qui
 * ne sont pas des `<StaggerItem>` sont rendus tels quels (utile pour
 * glisser un élément non animé au milieu).
 *
 * Le rendu reste sémantique : un `<Stagger as="ul">` + `<StaggerItem
 * as="li">` produit un vrai `<ul><li>…</li></ul>`, SEO-safe.
 *
 * Usage typique : liste de boutons CTA dans un Hero, cards dans une
 * grille de spécialités, puces dans un bloc highlight.
 */
export function Stagger({
  children,
  trigger = "mount",
  delay = 0,
  staggerChildren = 0.08,
  y: _y = 16,
  duration: _duration = 0.5,
  as = "div",
  className,
}: StaggerProps) {
  const Tag = m[as as keyof typeof m] as typeof m.div;
  const variants: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren,
        delayChildren: delay,
      },
    },
  };
  const animateProps =
    trigger === "mount"
      ? { initial: "hidden", animate: "show" }
      : {
          initial: "hidden",
          whileInView: "show",
          viewport: { once: true, margin: "-10%" },
        };
  return (
    <Tag variants={variants} {...animateProps} className={className}>
      {children}
    </Tag>
  );
}

type ItemProps = {
  children: ReactNode;
  y?: number;
  duration?: number;
  as?: ElementType;
  className?: string;
};

/**
 * StaggerItem — enfant d'un `<Stagger>`.
 *
 * Déclare ses propres variants (hidden/show) mais sans `transition`
 * complète pour laisser le parent décider du timing collectif
 * (staggerChildren, delayChildren). Chaque item contrôle quand même
 * son `duration` et son `y` individuels.
 */
export function StaggerItem({
  children,
  y = 16,
  duration = 0.5,
  as = "div",
  className,
}: ItemProps) {
  const Tag = m[as as keyof typeof m] as typeof m.div;
  const variants: Variants = {
    hidden: { opacity: 0, y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration, ease: "easeOut" },
    },
  };
  return (
    <Tag variants={variants} className={className}>
      {children}
    </Tag>
  );
}
