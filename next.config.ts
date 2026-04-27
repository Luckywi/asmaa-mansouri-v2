import type { NextConfig } from "next";

/**
 * Headers de sécurité statiques appliqués à toutes les routes (y compris
 * `_next/static/*`, `_next/image/*`, sitemap, robots, favicons). La CSP
 * dynamique avec nonce vit dans `middleware.ts` car elle change par
 * requête ; ces headers-ci ne dépendent pas de la requête.
 *
 * Permissions-Policy : on désactive explicitement toutes les APIs
 * sensibles que le site n'utilise pas. `interest-cohort=()` neutralise
 * Google FLoC (héritage, non-standard mais encore lu par certains
 * crawlers de scoring sécurité).
 *
 * COOP same-origin + CORP same-origin : isolation cross-origin maximale.
 * Le site ne consomme aucun asset cross-origin (Resalib, Google Maps,
 * Instagram sont des liens `<a>`, pas des fetches), donc same-origin est
 * sûr. Si un embed externe est ajouté plus tard, descendre CORP à
 * same-site.
 *
 * X-Frame-Options DENY redondant avec CSP `frame-ancestors 'none'`
 * (middleware) — gardé pour compatibilité avec les crawlers qui scorent
 * encore l'ancien header.
 */
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
