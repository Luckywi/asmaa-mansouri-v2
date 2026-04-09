import { HeaderDesktop } from "@/components/layout/HeaderDesktop";
import { HeaderMobile } from "@/components/layout/HeaderMobile";

/**
 * Header — wrapper qui rend deux composants frères :
 *
 *   - HeaderDesktop : pill flottante au top (Server Component, hidden md:block)
 *   - HeaderMobile  : burger nav avec panel collapsible (Client Component, md:hidden)
 *
 * Au runtime, un seul des deux est visible selon le viewport. Le `display: none`
 * cache aussi des screen readers, donc pas de duplicate banner pour les ATs.
 *
 * Ce wrapper Header.tsx reste un **Server Component pur** — c'est seulement
 * HeaderMobile qui est Client (à cause du state du burger). HeaderDesktop est
 * Server, donc zéro JS shipé pour la version desktop.
 *
 * Importé une fois dans `app/layout.tsx` comme premier enfant du body (juste
 * après le skip link), au-dessus de `{children}`.
 */
export function Header() {
  return (
    <>
      <HeaderDesktop />
      <HeaderMobile />
    </>
  );
}
