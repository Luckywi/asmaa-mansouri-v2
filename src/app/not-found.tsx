import Link from "next/link";
import type { Metadata } from "next";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { navLinks } from "@/data/navigation";

/**
 * Page 404 racine — convention App Router (`app/not-found.tsx`).
 *
 * Doit vivre à la racine de `app/` (pas dans le route group `(site)`)
 * pour catcher les URLs qui ne matchent aucune route : sans cette
 * version racine, Next sert son 404 par défaut sur tout chemin inconnu
 * (un `not-found.tsx` placé dans un route group ne se déclenche que
 * pour les `notFound()` appelés *depuis* ce groupe, pas pour les URLs
 * non matchées).
 *
 * Comme cette page est rendue hors du groupe `(site)`, elle n'hérite
 * pas du chrome (Header, Footer, skip link) fourni par
 * `(site)/layout.tsx`. On délègue donc à `<SiteChrome />` — même source
 * de vérité que le layout `(site)`, pas de duplication.
 *
 * `robots.index = false` est redondant avec le statut HTTP 404 mais
 * sert de ceinture/bretelles si jamais Next servait la page en 200
 * par erreur.
 */
export const metadata: Metadata = {
  title: "Page introuvable",
  description:
    "La page que vous cherchez n'existe pas ou a été déplacée. Retrouvez les prestations, le cabinet et le contact d'Asmaa Mansouri, naturopathe à Décines-Charpieu.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <SiteChrome>
      <main id="contenu-principal" className="flex-1">
        <section
          aria-labelledby="not-found-titre"
          className="relative pt-32 pb-16 md:pt-36 lg:pt-40 lg:pb-24"
        >
          <div className="mx-auto max-w-3xl px-6 md:px-8 lg:px-12 text-center">
            <p
              aria-hidden="true"
              className="font-display text-7xl sm:text-8xl lg:text-9xl font-medium tracking-[-0.04em] leading-none text-warm-900/15"
            >
              404
            </p>

            <h1
              id="not-found-titre"
              className="mt-6 font-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-[-0.02em] leading-[1.05] text-warm-900"
            >
              Page introuvable
            </h1>

            <p className="mt-6 max-w-xl mx-auto font-body text-lg leading-relaxed text-warm-700">
              La page que vous cherchez n&apos;existe pas ou a été déplacée. Vous
              pouvez revenir à l&apos;accueil ou explorer les sections principales
              ci-dessous.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <ButtonLink href="/" variant="primary">
                Retour à l&apos;accueil
              </ButtonLink>
              <ButtonLink href="/contact" variant="secondary">
                Contacter Asmaa
              </ButtonLink>
            </div>

            <nav
              aria-label="Sections principales du site"
              className="mt-14 pt-10 border-t border-warm-500/40"
            >
              <p className="font-body text-sm uppercase tracking-[0.08em] text-warm-700/70">
                Ou continuez vers
              </p>
              <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 font-body text-base">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-warm-900 underline underline-offset-4 decoration-warm-700/40 hover:decoration-warm-900 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </section>
      </main>
    </SiteChrome>
  );
}
