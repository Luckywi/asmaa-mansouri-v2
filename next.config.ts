import type { NextConfig } from "next";

/**
 * Headers de sécurité statiques appliqués à toutes les routes (y compris
 * `_next/static/*`, `_next/image/*`, sitemap, robots, favicons).
 *
 * CSP statique avec `'unsafe-inline'` sur scripts et styles. Choix
 * pragmatique pour un site vitrine sans auth, sans formulaire, sans
 * contenu user-generated : la menace XSS principale (DOM injection via
 * input utilisateur) est inexistante. Le nonce dynamique opt-out les
 * pages du SSG (perte TTFB de 10-30 ms par requête), trade-off non
 * justifié pour ce profil de site dont l'objectif principal est le SEO.
 *
 * Sources tierces whitelistées :
 *   - `*.basemaps.cartocdn.com` : tuiles + style positron de la map
 *     maplibre du cabinet (`src/components/ui/Map.tsx`).
 *   - `data:` / `blob:` sur img-src : next/image placeholders + SVG
 *     inline des markers map.
 *   - `worker-src 'self' blob:` : maplibre crée des Web Workers via
 *     Blob URLs pour parser les tuiles vectorielles.
 *
 * Permissions-Policy : désactive explicitement toutes les APIs
 * sensibles que le site n'utilise pas. `interest-cohort=()` neutralise
 * Google FLoC (héritage, non-standard mais encore lu par certains
 * crawlers de scoring sécurité).
 *
 * COOP same-origin + CORP same-origin : isolation cross-origin maximale.
 * Le site ne consomme aucun asset cross-origin (Resalib, Google Maps,
 * Instagram sont des liens `<a>`, pas des fetches). Si un embed externe
 * est ajouté plus tard, descendre CORP à same-site.
 *
 * X-Frame-Options DENY redondant avec CSP `frame-ancestors 'none'` —
 * gardé pour compatibilité avec les crawlers qui scorent encore
 * l'ancien header.
 */
// Dev-only : React en mode développement utilise `eval()` pour
// reconstruire les call stacks lisibles, le HMR pour exécuter du code
// hot-reloadé, et React DevTools pour certaines fonctionnalités. En
// production, ni React ni Next n'utilisent eval (vérifié dans les
// release notes de React 19 et Next 16) — on garde donc la CSP stricte
// sans `'unsafe-eval'` côté prod, et on l'autorise uniquement en dev
// pour ne pas bloquer le serveur Turbopack et les overlays d'erreur.
const isDev = process.env.NODE_ENV === "development";

const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://basemaps.cartocdn.com https://*.basemaps.cartocdn.com",
  "font-src 'self'",
  // En dev, Turbopack ouvre une connexion WebSocket vers le serveur dev
  // pour le HMR. Sans cette autorisation, la console crache des
  // erreurs CSP "Refused to connect to ws://localhost:..." à chaque
  // sauvegarde. `ws:` et `wss:` couvrent localhost et tout host de
  // preview ; restriction inutile en prod (pas de WebSocket Turbopack).
  `connect-src 'self' https://basemaps.cartocdn.com https://*.basemaps.cartocdn.com${isDev ? " ws: wss:" : ""}`,
  "media-src 'self'",
  "worker-src 'self' blob:",
  "frame-src 'none'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), accelerometer=(), gyroscope=(), magnetometer=(), interest-cohort=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  { key: "Content-Security-Policy", value: csp },
];

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    // Next 16 : seule la valeur 75 est autorisée par défaut. On déclare
    // explicitement les valeurs utilisées dans le projet (Carousel cabinet
    // = 50, deck Portrait = 70) sinon next/image émet un warning et
    // retombe sur 75.
    qualities: [50, 70, 75],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
