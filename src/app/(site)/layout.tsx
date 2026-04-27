import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

/**
 * Layout du groupe de routes `(site)` — héberge le chrome global du site
 * (skip link, Header, Footer). Toutes les pages contenu sont enfants de
 * ce layout. Les routes hors de ce groupe (ex: `/link`) n'héritent pas
 * du chrome — c'est l'intention du route group.
 *
 * Server Component pur — aucun state. `<Header />` est lui-même un
 * wrapper qui rend `HeaderDesktop` (Server) et `HeaderMobile` (Client).
 *
 * Le wrapper `<main id="contenu-principal" className="flex-1">` reste
 * de la responsabilité de chaque page (convention documentée dans
 * Footer.tsx) — c'est lui qui matche l'ancre du skip link et qui
 * porte le pattern sticky footer (body flex-col + main flex-1).
 */
export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/*
        Skip link — premier élément focusable du groupe site. Permet aux
        utilisateurs au clavier ou aux lecteurs d'écran de sauter
        directement au contenu principal sans tabber dans le Header.
        Visuellement caché jusqu'au focus.
      */}
      <a
        href="#contenu-principal"
        className={[
          "sr-only focus:not-sr-only",
          "focus:fixed focus:top-4 focus:left-4 focus:z-50",
          "focus:px-5 focus:py-3 focus:rounded-md",
          "focus:bg-warm-700 focus:text-warm-100",
          "focus:font-body focus:text-[14px] focus:font-medium",
          "focus:outline-2 focus:outline-offset-2 focus:outline-warm-700",
          "focus:shadow-[0_4px_12px_-2px_rgba(60,30,25,0.25)]",
        ].join(" ")}
      >
        Aller au contenu principal
      </a>

      <Header />

      {children}

      {/*
        Footer chrome OS-level (glass effect identique au HeaderDesktop).
        Sticky footer pattern : il colle au bas du viewport sur les pages
        courtes parce que body est `flex flex-col min-h-full` (layout
        racine) et que chaque page wrappe son contenu dans
        `<main className="flex-1">`. Si une nouvelle page oublie ce
        wrapper, le footer remontera contre le contenu.
      */}
      <Footer />
    </>
  );
}
