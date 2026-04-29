import { SiteChrome } from "@/components/layout/SiteChrome";

/**
 * Layout du groupe de routes `(site)` — délègue le rendu du chrome
 * global (skip link, Header, Footer) à `<SiteChrome />`. Toutes les
 * pages contenu sont enfants de ce layout. Les routes hors de ce
 * groupe (ex: `/link`) n'héritent pas du chrome — c'est l'intention
 * du route group.
 *
 * La 404 (`src/app/not-found.tsx`) doit vivre à la racine pour catcher
 * les URLs non matchées (un `not-found.tsx` dans un route group ne
 * couvre que les `notFound()` appelés depuis ses routes), elle utilise
 * donc aussi `<SiteChrome />` directement.
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
  return <SiteChrome>{children}</SiteChrome>;
}
