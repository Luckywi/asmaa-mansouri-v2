"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { CalendarRange, Phone } from "lucide-react";
import { m, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { navLinks } from "@/data/navigation";
import { site } from "@/data/site";

/**
 * HeaderMobile — burger nav mobile (visible <md uniquement).
 *
 * Client Component : besoin de useState pour le toggle du menu, useEffect
 * pour fermer auto sur changement de pathname, AnimatePresence + motion
 * pour les animations smooth du panel collapsible et du backdrop.
 *
 * Architecture :
 *   - Top bar (toujours visible) : burger gauche, Logo centré, spacer droit
 *   - Panel collapsible (apparaît au tap) : liens nav stackés + 2 CTAs
 *   - Backdrop blur fullscreen quand le menu est ouvert (tap pour fermer)
 *
 * Style : exactement le même glass que HeaderDesktop (--glass-bg, blur,
 * saturate, border 0.5px, shadow 4-layer, rounded-xl) pour cohérence.
 *
 * Accessibilité :
 *   - Burger : aria-label dynamique + aria-expanded
 *   - Logo : aria-label "retour à l'accueil"
 *   - Backdrop : aria-hidden (décoration)
 *   - Auto-close du menu sur changement de pathname (utile Phase 2 quand
 *     les vraies routes existeront ; en Phase 1 anchors, l'auto-close se
 *     fait via onClick sur chaque lien)
 *
 * Pour la version desktop, voir HeaderDesktop.tsx.
 */
export function HeaderMobile() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Auto-close au changement de route. On synchronise une source externe
  // (le pathname exposé par Next.js) avec l'état local du menu — cas
  // légitime d'usage de useEffect documenté par la règle React.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sync router → menuOpen
    setMenuOpen(false);
  }, [pathname]);

  // Escape pour fermer le panel quand il est ouvert (a11y clavier).
  useEffect(() => {
    if (!menuOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  // Téléphone formaté pour le tel: link (sans espaces ni points)
  const phoneHref = `tel:${site.phone.replace(/[\s.]/g, "")}`;

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 pt-4 md:hidden">
      {/* Backdrop blur fullscreen — apparaît quand le menu est ouvert */}
      <AnimatePresence>
        {menuOpen && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed inset-0 -z-10 bg-warm-900/15 backdrop-blur-md"
            onClick={closeMenu}
            aria-hidden
          />
        )}
      </AnimatePresence>

      {/* Nav glass : top bar + panel collapsible dans un seul bloc */}
      <nav
        aria-label="Menu mobile"
        className={[
          // Le bloc englobe top bar + panel — overflow-hidden pour clipper
          // l'animation height du panel sans déborder.
          "relative overflow-hidden rounded-xl",

          // ─── Glass effect (identique à HeaderDesktop) ──
          "bg-[var(--glass-bg)]",
          "backdrop-blur-xl backdrop-saturate-[1.8]",
          "border-[0.5px] border-white/50",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-1px_0_rgba(60,30,25,0.04),0_12px_32px_-10px_rgba(60,30,25,0.20),0_2px_6px_-2px_rgba(60,30,25,0.10)]",
        ].join(" ")}
      >
        {/* ─── Top bar (toujours visible) ──────────────── */}
        <div className="relative flex items-center justify-between h-16 px-4">
          {/* Burger — bouton gauche, animation CSS pure (pas besoin de framer) */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu-panel"
            className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warm-700"
          >
            <span
              className={`block h-[2px] w-5 bg-warm-900 transition-all duration-300 ease-out ${
                menuOpen ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-[2px] w-5 bg-warm-900 transition-all duration-300 ease-out ${
                menuOpen ? "-translate-y-[3.5px] -rotate-45" : ""
              }`}
            />
          </button>

          {/* Logo — centré absolu (indépendant du flex layout) */}
          <Link
            href="/"
            aria-label={`${site.name}, retour à l'accueil`}
            onClick={closeMenu}
            className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center h-10 px-3 rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warm-700"
          >
            <Logo />
          </Link>

          {/* Spacer droit (symétrique au burger pour centrer le logo visuellement) */}
          <div className="h-10 w-10" aria-hidden />
        </div>

        {/* ─── Panel collapsible (animé) ──────────────── */}
        <AnimatePresence>
          {menuOpen && (
            <m.div
              id="mobile-menu-panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="border-t-[0.5px] border-white/50 px-5 pb-5 pt-2">
                {/* Liens nav empilés */}
                <ul className="flex flex-col">
                  {navLinks.map((link) => {
                    const active =
                      link.href === "/"
                        ? pathname === "/"
                        : pathname === link.href ||
                          pathname.startsWith(`${link.href}/`);
                    return (
                      <li
                        key={link.href}
                        className="border-b-[0.5px] last:border-b-0 border-white/40"
                      >
                        <Link
                          href={link.href}
                          onClick={closeMenu}
                          aria-current={active ? "page" : undefined}
                          className="block py-4 font-display text-[20px] font-medium tracking-tight text-warm-900 transition-colors duration-200 hover:text-warm-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warm-700 rounded-md"
                        >
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                {/* CTAs : Resalib primaire + Téléphone secondaire */}
                <div className="mt-6 flex flex-col gap-3">
                  <ButtonLink
                    href={site.resalibUrl}
                    variant="primary"
                    className="w-full h-12"
                  >
                    Prendre RDV
                    <CalendarRange
                      aria-hidden="true"
                      className="w-4 h-4"
                      strokeWidth={1.5}
                    />
                  </ButtonLink>

                  <ButtonLink
                    href={phoneHref}
                    variant="secondary-on-glass"
                    className="w-full h-12"
                  >
                    Appeler Asmaa
                    <Phone
                      aria-hidden="true"
                      className="w-4 h-4"
                      strokeWidth={1.5}
                    />
                  </ButtonLink>
                </div>
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
