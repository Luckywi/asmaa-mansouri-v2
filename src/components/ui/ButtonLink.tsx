import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkVariant = "primary" | "secondary" | "secondary-on-glass";

type ButtonLinkProps = {
  href: string;
  variant?: ButtonLinkVariant;
  children: ReactNode;
  className?: string;
  /**
   * Force `target="_blank"`. Par défaut, on détecte automatiquement les URLs
   * externes (commençant par `http`) et on les ouvre dans un nouvel onglet
   * avec `rel="noopener noreferrer"`.
   */
  external?: boolean;
};

/**
 * Bouton-lien primitif réutilisable — 3 déclinaisons.
 *
 * - **primary** : CTA principal (Resalib, "Prendre RDV") — fond accent
 *   olive, texte warm-100. Utilisé Header, Hero, fin de chaque section,
 *   Footer.
 * - **secondary** : action secondaire (En savoir plus, etc.) — glass
 *   avec `backdrop-filter`, `--glass-bg` (65% warm white) + border
 *   white/50. **À utiliser UNIQUEMENT sur le body du site** (fond
 *   warm-100 beige) où le backdrop-filter peut échantillonner la
 *   couleur chaude du body.
 * - **secondary-on-glass** : même intention visuelle que `secondary`
 *   mais pour les surfaces déjà en glass (modale, panel mobile du
 *   Header, et plus largement tout conteneur qui a lui-même
 *   `--glass-bg` + `backdrop-filter`). La recette est identique à
 *   `secondary` à une exception : pas de `backdrop-filter`. Les
 *   backdrop-filter ne se composent pas à travers les stacking
 *   contexts — un glass dans un glass échantillonne l'output déjà
 *   dilué du parent, ce qui efface la teinte warm du body. En
 *   retirant juste le filtre, le fond semi-transparent `--glass-bg`
 *   (65% warm white) se compose naturellement avec le cream du
 *   conteneur parent et le bouton ressort ~10 % plus clair que sa
 *   surface — exactement le même écart que `secondary` vs body
 *   warm-100. Border et shadows sont inchangées pour garder le
 *   highlight "vitre" attendu.
 *
 * Toutes les CTA du site doivent passer par ce composant pour garantir
 * la cohérence visuelle (radius, padding, transitions, focus rings,
 * styles hover) et faciliter une éventuelle évolution globale.
 *
 * Utilise `next/link` pour les liens internes (prefetch automatique) et
 * un `<a>` natif pour les externes (Resalib, Instagram, mailto, tel).
 *
 * Server Component — aucun state.
 */
export function ButtonLink({
  href,
  variant = "primary",
  children,
  className = "",
  external,
}: ButtonLinkProps) {
  const isExternal =
    external ?? (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:"));

  const base =
    "inline-flex items-center justify-center gap-1.5 h-10 px-5 rounded-md " +
    "font-body text-[14px] font-medium tracking-[0.01em] whitespace-nowrap " +
    "transition-colors duration-150 ease-out " +
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warm-700";

  const variants: Record<ButtonLinkVariant, string> = {
    primary:
      "text-warm-100 bg-accent hover:bg-accent-hover " +
      "shadow-[0_4px_12px_-2px_rgba(40,60,30,0.25),inset_0_1px_0_0_rgba(255,255,255,0.12)]",
    secondary:
      "text-warm-700 bg-[var(--glass-bg)] " +
      "backdrop-blur-xl backdrop-saturate-[1.8] " +
      "border-[0.5px] border-white/50 " +
      "shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-1px_0_rgba(60,30,25,0.04),0_4px_16px_-6px_rgba(60,30,25,0.15)] " +
      "hover:border-white/70 hover:text-warm-900",
    // Identique à `secondary` moins `backdrop-filter` (cf. JSDoc).
    // Le fond `--glass-bg` se compose directement avec la couleur
    // composite du parent glass → bouton ~10 % plus clair que sa
    // surface, même rapport que secondary vs body warm-100.
    "secondary-on-glass":
      "text-warm-700 bg-[var(--glass-bg)] " +
      "border-[0.5px] border-white/50 " +
      "shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-1px_0_rgba(60,30,25,0.04),0_4px_16px_-6px_rgba(60,30,25,0.15)] " +
      "hover:border-white/70 hover:text-warm-900",
  };

  const classes = `${base} ${variants[variant]} ${className}`.trim();

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
