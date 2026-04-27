"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
 * Client Component — lit `usePathname` pour marquer le lien actif via
 * `aria-current="page"`. Le marquage se fait en exact match ET en préfixe
 * de segment (ex: /qui-suis-je/la-naturopathie active "Qui suis-je").
 *
 * Pour la version mobile (burger nav avec panel collapsible), voir
 * HeaderMobile.tsx.
 */
function isActive(pathname: string | null, href: string): boolean {
  if (!pathname) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function HeaderDesktop() {
  const pathname = usePathname();

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-40 hidden md:block">
      <nav
        aria-label="Menu principal"
        className={[
          "flex items-center gap-10",
          "h-16 pl-3 pr-3",
          "rounded-xl",
          "bg-[var(--glass-bg)]",
          "backdrop-blur-xl backdrop-saturate-[1.8]",
          "border-[0.5px] border-white/50",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-1px_0_rgba(60,30,25,0.04),0_12px_32px_-10px_rgba(60,30,25,0.20),0_2px_6px_-2px_rgba(60,30,25,0.10)]",
        ].join(" ")}
      >
        <Link
          href="/"
          aria-label={`${site.name}, retour à l'accueil`}
          aria-current={pathname === "/" ? "page" : undefined}
          className={[
            "flex items-center justify-center h-10 px-3 rounded-md",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warm-700",
          ].join(" ")}
        >
          <Logo />
        </Link>

        <ul className="flex items-center gap-2">
          {navLinks.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={[
                    "inline-flex items-center h-10 px-4 rounded-md whitespace-nowrap",
                    "font-body text-[14px] font-medium tracking-[0.02em]",
                    active
                      ? "text-warm-900 bg-warm-500/15"
                      : "text-warm-700 hover:text-warm-900 hover:bg-warm-500/8",
                    "transition-colors duration-200 ease-out",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warm-700",
                  ].join(" ")}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <ButtonLink href={site.resalibUrl} variant="primary">
          Prendre RDV
          <CalendarRange aria-hidden="true" className="w-4 h-4" strokeWidth={1.5} />
        </ButtonLink>
      </nav>
    </header>
  );
}
