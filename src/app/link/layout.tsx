/**
 * Layout local de `/link` — court-circuit explicite du chrome global.
 *
 * La page `/link` est destinée à la bio Instagram d'Asmaa : Linktree-like
 * minimaliste, format mobile centré même sur desktop, pas de Header / pas
 * de Footer / pas de skip link / pas de breadcrumbs.
 *
 * Architecturalement, ce layout ne fait rien (passe-plat) : c'est le fait
 * que `/link` ne soit pas dans le route group `(site)` qui retire
 * automatiquement le chrome (cf. `src/app/(site)/layout.tsx`). On
 * matérialise quand même ce layout pour rendre l'intention lisible dans
 * l'arborescence et pour offrir un point d'extension futur (préchargement
 * spécifique, métriques séparées, etc.) sans refacto.
 *
 * Server Component pur — aucun state, zéro JS shipé.
 */
export default function LinkLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
