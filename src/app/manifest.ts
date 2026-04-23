import type { MetadataRoute } from "next";
import { site } from "@/data/site";

/**
 * Web App Manifest — convention Next 15 App Router.
 *
 * Exposé automatiquement sur `/manifest.webmanifest` et injecté via
 * `<link rel="manifest">` dans le `<head>` par Next (pas besoin d'y
 * toucher dans `layout.tsx`).
 *
 * Les PNG 192/512 sont servis depuis `public/` (racine du site). Chaque
 * fichier est déclaré deux fois : une entrée `purpose: "any"` (onglet,
 * launcher classique) et une entrée `purpose: "maskable"` (Android
 * adaptive icon). Déclarer les deux purposes est requis pour passer
 * l'audit Lighthouse PWA installability. Les types Next n'acceptent pas
 * encore la forme combinée `"any maskable"` sur une seule entrée, d'où
 * la duplication — 2 fichiers servis au final, pas 4.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — Naturopathe à Décines-Charpieu`,
    short_name: site.name,
    description:
      "Naturopathie féminine à Décines-Charpieu. Consultations, massages Tuina, cupping therapy.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    lang: "fr",
    dir: "ltr",
    theme_color: "#F2E4CF",
    background_color: "#F2E4CF",
    icons: [
      {
        src: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
