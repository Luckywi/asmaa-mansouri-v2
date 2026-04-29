import { Header } from "./Header";
import { Footer } from "./Footer";

/**
 * Chrome global du site — skip link + Header + Footer autour des
 * `children`. Source unique de vérité pour le shell visuel.
 *
 * Utilisé par :
 *   - `src/app/(site)/layout.tsx` — wrappe toutes les pages contenu.
 *   - `src/app/not-found.tsx` — wrappe la 404 (forcément hors route
 *     group `(site)`, voir les notes du fichier pour le pourquoi).
 *
 * Toute future route hors `(site)` qui voudrait porter le chrome
 * standard doit passer par ce composant — ne pas re-inliner Header /
 * Footer / skip link manuellement.
 *
 * Server Component pur — aucun state. `<Header />` est un wrapper qui
 * rend `HeaderDesktop` (Server) et `HeaderMobile` (Client). Le pattern
 * sticky footer (body `flex flex-col` + main `flex-1`) reste de la
 * responsabilité de la page elle-même via son `<main>` wrapper.
 */
export function SiteChrome({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/*
        Skip link — premier élément focusable. Permet aux utilisateurs
        au clavier ou aux lecteurs d'écran de sauter directement au
        contenu principal sans tabber dans le Header. Visuellement
        caché jusqu'au focus.
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

      <Footer />
    </>
  );
}
