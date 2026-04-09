import Link from "next/link";
import { CalendarRange } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { navLinks } from "@/data/navigation";
import { site } from "@/data/site";

/**
 * HeaderDesktop — pill flottante "Dynamic Island" en glass (visible md+).
 *
 * Composant chrome / OS-level : exempté de la règle radius 4px de DESIGN.md
 * (catégorie d'exception assumée pour les éléments flottants type Header,
 * modales, toasts, tooltips).
 *
 * Server Component pur — aucun state, aucun listener. La détection du lien
 * actif via aria-current est différée Phase 2 (nécessitera IntersectionObserver
 * et donc un Client Component).
 *
 * Pour la version mobile (burger nav avec panel collapsible), voir
 * HeaderMobile.tsx. Les deux composants sont rendus côte à côte par
 * Header.tsx ; un seul est visible à la fois selon le viewport.
 *
 * z-index réservé : Header = 40, futures modales = 50, futurs toasts = 60.
 *
 * Le fond translucide utilise la custom prop --glass-bg définie dans
 * globals.css, qui bascule automatiquement en opaque (~0.95) si le navigateur
 * ne supporte pas backdrop-filter ou si l'utilisateur a "Réduire la
 * transparence" activée.
 */
export function HeaderDesktop() {
  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-40 hidden md:block">
      <nav
        aria-label="Menu principal"
        className={[
          // ─── Layout interne ─────────────────────────────
          // gap-10 (40px) entre logo / nav links / CTA — espacement généreux
          "flex items-center gap-10",
          // h-16 (64px) + pl-3 pr-3 (12px chaque côté) pour avoir un frame
          // uniforme de 12px autour de tous les éléments enfants — match
          // avec le top/bottom 12px naturel d'un h-10 centré dans h-16
          // ((64-40)/2 = 12). Tous les enfants doivent être h-10.
          "h-16 pl-3 pr-3",
          // Pas de max-width : la nav se dimensionne sur son contenu, point.
          // Sur petit viewport elle peut déborder — c'est OK, on est desktop-
          // first et le hidden md:block masque déjà sous 768px.

          // ─── Forme : rounded-xl du système adaptatif (10px) ──
          // Header h-16 (64px) → tier xl du système de radius (cf. DESIGN.md
          // > Composants UI). Ratio 10/64 = 15,6% → cohérent avec les autres
          // composants qui ont tous un ratio radius/hauteur de ~10-15%.
          "rounded-xl",

          // ─── Glass effect ───────────────────────────────
          "bg-[var(--glass-bg)]",
          "backdrop-blur-xl backdrop-saturate-[1.8]",

          // ─── Bordure 0.5px (Apple Retina) ──────────────
          "border-[0.5px] border-white/50",

          // ─── Reflets / shadows (recette 4 layers Apple) ─
          // 1. inset top : highlight blanc pur (la "lèvre de verre")
          // 2. inset bottom : retombée légèrement teintée
          // 3. drop long doux teinté vert
          // 4. micro-contact shadow pour ancrer visuellement
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-1px_0_rgba(11,40,28,0.04),0_12px_32px_-10px_rgba(11,40,28,0.20),0_2px_6px_-2px_rgba(11,40,28,0.10)]",
        ].join(" ")}
      >
        {/* Logo — wrappé dans un Link "retour accueil" qui porte le aria-label */}
        <Link
          href="/"
          aria-label={`${site.name}, retour à l'accueil`}
          className={[
            // Pas de hover pill (le logo n'est pas un lien interactif décoratif,
            // c'est juste un retour accueil). On garde le focus ring pour l'a11y.
            "flex items-center justify-center h-10 px-3 rounded-md",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vert-700",
          ].join(" ")}
        >
          <Logo />
        </Link>

        {/* Liens de navigation */}
        <ul className="flex items-center gap-2">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={[
                  "inline-flex items-center h-10 px-4 rounded-md whitespace-nowrap",
                  "font-body text-[14px] font-medium tracking-[0.02em]",
                  "text-vert-700 hover:text-vert-900 hover:bg-vert-500/8",
                  "transition-colors duration-200 ease-out",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vert-700",
                ].join(" ")}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA primaire — Resalib (lien externe géré automatiquement par ButtonLink) */}
        <ButtonLink href={site.resalibUrl} variant="primary">
          Prendre RDV
          <CalendarRange aria-hidden="true" className="w-4 h-4" strokeWidth={1.5} />
        </ButtonLink>
      </nav>
    </header>
  );
}
