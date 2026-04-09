import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkVariant = "primary" | "secondary";

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
 * Bouton-lien primitif réutilisable, déclinaison `primary | secondary`.
 *
 * - **primary** : CTA principal (Resalib, "Prendre RDV") — fond vert-700,
 *   texte rose-100. Utilisé Header, Hero, fin de chaque section, Footer.
 * - **secondary** : action secondaire (En savoir plus, lien vers page) —
 *   bordure vert-500, texte vert-700, fond transparent.
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
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vert-700";

  const variants: Record<ButtonLinkVariant, string> = {
    primary:
      "text-rose-100 bg-vert-700 hover:bg-vert-900 " +
      "shadow-[0_4px_12px_-2px_rgba(11,40,28,0.25),inset_0_1px_0_0_rgba(255,255,255,0.15)]",
    secondary:
      "text-vert-500 bg-transparent border border-vert-500 hover:bg-vert-500/10 hover:text-vert-700",
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
