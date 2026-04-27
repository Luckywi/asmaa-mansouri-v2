import type { Metadata } from "next";
import Image from "next/image";
import { AtSign, CalendarDays, Globe, Mail, Phone } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Logo } from "@/components/ui/Logo";
import { ResalibLogo } from "@/components/ui/ResalibLogo";
import { site } from "@/data/site";

/**
 * /link — page Linktree-style pour la bio Instagram d'Asmaa.
 *
 * Hors du route group `(site)` : pas de Header, pas de Footer, pas de
 * skip link, pas de breadcrumbs. Le layout local `link/layout.tsx` est
 * un passe-plat ; le layout racine fournit `<html>`, fonts, JSON-LD
 * global et `MotionProvider`.
 *
 * Mobile-only même sur desktop : container `max-w-[440px]` centré, fond
 * `warm-100` hérité du body. Aucun breakpoint n'élargit ou ne modifie
 * le layout au-delà.
 *
 * Tous les liens (internes ET externes) ouvrent dans un nouvel onglet
 * pour ne pas perdre le contexte de l'app Instagram. Pour les hrefs
 * internes (`/`, `/ateliers`), on passe par l'URL absolue de production
 * — `ButtonLink` détecte alors `href.startsWith("http")` et applique
 * automatiquement `target="_blank" rel="noopener noreferrer"`. Les
 * `tel:` et `mailto:` sont également traités comme externes par
 * `ButtonLink` (cf. ButtonLink.tsx).
 *
 * `noindex` : la page existe pour l'usage Instagram bio, pas pour le
 * SEO. Pas de canonical exposé, pas d'OG, pas de JSON-LD propre. Pas
 * référencée dans `sitemap.ts`, pas dans `navLinks`, aucun lien interne
 * du site ne pointe vers `/link`.
 */
export const metadata: Metadata = {
  title: "Liens — Asmaa Mansouri",
  description:
    "Liens utiles pour Asmaa Mansouri, naturopathe à Décines-Charpieu.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

const SITE_URL = "https://naturopathe-decines.fr";

export default function LinkPage() {
  return (
    <main
      id="contenu-principal"
      className="flex-1 flex items-center justify-center px-6 py-12"
    >
      {/*
        H1 sr-only : le brief impose un H1 unique pour cohérence a11y, mais
        visuellement c'est le `Logo` (wordmark texte non-sémantique) qui
        porte l'identité. Le H1 caché donne le nom accessible attendu par
        les lecteurs d'écran sans concurrencer le logo visuel.
      */}
      <h1 className="sr-only">Asmaa Mansouri, naturopathe à Décines-Charpieu</h1>

      <div className="w-full max-w-[440px] flex flex-col items-center text-center">
        {/* ─── Avatar ────────────────────────────────────────── */}
        <div
          className={[
            "relative size-28 overflow-hidden rounded-full",
            "border-[0.5px] border-white/50",
            "shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_8px_24px_-8px_rgba(60,30,25,0.20)]",
          ].join(" ")}
        >
          <Image
            src="/asmaa-mansouri.jpg"
            alt="Asmaa Mansouri, naturopathe à Décines-Charpieu"
            width={224}
            height={224}
            priority
            className="w-full h-full object-cover object-top"
          />
        </div>

        {/* ─── Logo wordmark ─────────────────────────────────── */}
        <div className="mt-6">
          <Logo />
        </div>

        {/* ─── Sous-titre ────────────────────────────────────── */}
        <p className="mt-3 font-body text-sm text-warm-700">
          Naturopathe à Décines-Charpieu
        </p>

        {/* ─── Stack boutons CTA ─────────────────────────────── */}
        <div className="mt-10 w-full flex flex-col gap-3">
          <ButtonLink
            href={site.resalibUrl}
            variant="primary"
            className="w-full h-12 gap-2"
          >
            <ResalibLogo className="h-4 w-auto" />
            <span>Prendre RDV</span>
          </ButtonLink>

          <ButtonLink
            href={`${SITE_URL}/`}
            variant="secondary"
            className="w-full h-12 gap-2"
          >
            <Globe aria-hidden="true" className="w-4 h-4" strokeWidth={1.5} />
            <span>Mon site internet</span>
          </ButtonLink>

          <ButtonLink
            href={`${SITE_URL}/ateliers`}
            variant="secondary"
            className="w-full h-12 gap-2"
          >
            <CalendarDays
              aria-hidden="true"
              className="w-4 h-4"
              strokeWidth={1.5}
            />
            <span>Mes ateliers</span>
          </ButtonLink>

          <ButtonLink
            href={site.phoneHref}
            variant="secondary"
            className="w-full h-12 gap-2"
          >
            <Phone aria-hidden="true" className="w-4 h-4" strokeWidth={1.5} />
            <span>Appeler Asmaa</span>
          </ButtonLink>

          <ButtonLink
            href={`mailto:${site.email}`}
            variant="secondary"
            className="w-full h-12 gap-2"
          >
            <Mail aria-hidden="true" className="w-4 h-4" strokeWidth={1.5} />
            <span>Email</span>
          </ButtonLink>

          <ButtonLink
            href={site.instagramUrl}
            variant="secondary"
            className="w-full h-12 gap-2"
          >
            <AtSign aria-hidden="true" className="w-4 h-4" strokeWidth={1.5} />
            <span>Instagram</span>
          </ButtonLink>
        </div>

        {/* ─── Footer micro-text ─────────────────────────────── */}
        <p className="mt-12 font-body text-xs text-warm-700/60">
          &copy; {new Date().getFullYear()} Asmaa Mansouri Naturopathe
        </p>
      </div>
    </main>
  );
}
