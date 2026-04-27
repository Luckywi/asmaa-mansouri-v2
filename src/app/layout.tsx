import type { Metadata, Viewport } from "next";
import { Outfit, Manrope } from "next/font/google";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildGlobalGraph } from "@/lib/schema";
import { site } from "@/data/site";
import "./globals.css";

// Outfit — titres H1/H2/H3 (variable font)
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

// Manrope — body, nav, boutons, UI (variable font)
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://naturopathe-decines.fr";
const SITE_NAME = "Asmaa Mansouri Naturopathe";
const ROOT_DESCRIPTION =
  "Naturopathe à Décines-Charpieu (69150) spécialisée en santé féminine. Consultations, massages Tuina, cupping therapy. Cabinet à 10 minutes de Lyon.";

/**
 * Metadata racine — Phase A fondations SEO.
 *
 * Pré-production : `robots.index = false` et `robots.follow = false`
 * maintiennent le site hors des moteurs tant que la qualité 10/10 n'est
 * pas atteinte. Bascule à true uniquement au go final (synchrone avec
 * `src/app/robots.ts` qui passera `disallow: "/"` -> `allow: "/"`).
 *
 * `metadataBase` résout toutes les URLs relatives des pages filles
 * (canonical, OG images) contre le domaine de production.
 *
 * `title.template` s'applique aux pages qui exportent un `title` string
 * dans leur propre `metadata`. La landing passe par `title.default`.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Asmaa Mansouri, Naturopathe à Décines-Charpieu",
  description: ROOT_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: site.name, url: SITE_URL }],
  creator: site.name,
  publisher: site.name,
  generator: "Next.js",
  category: "health",
  classification: "Naturopathie, santé féminine, médecine naturelle",
  keywords: [
    "naturopathe Décines",
    "naturopathe Décines-Charpieu",
    "naturopathe Lyon Est",
    "naturopathie féminine Lyon",
    "massage Tuina Décines",
    "cupping therapy Lyon Est",
    "Asmaa Mansouri",
  ],
  referrer: "origin-when-cross-origin",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/",
    languages: {
      "fr-FR": "/",
    },
  },
  // Placeholders : à renseigner quand Search Console et Bing Webmaster
  // Tools auront validé la propriété du domaine (Phase B).
  // verification: {
  //   google: "google-site-verification-token",
  //   other: { "msvalidate.01": "bing-verification-token" },
  // },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: SITE_NAME,
    url: SITE_URL,
    title: "Asmaa Mansouri, Naturopathe à Décines-Charpieu",
    description: ROOT_DESCRIPTION,
    // `images` est géré par la convention Next : `src/app/opengraph-image.tsx`
    // (racine) + variantes `/prestations`, `/specialites`, `/qui-suis-je`
    // + dynamiques `/prestations/[slug]`, `/specialites/[slug]`. Chaque
    // route sert son image 1200×630 propre via ImageResponse ; Next injecte
    // automatiquement le `<meta property="og:image">` correspondant.
    // (Ancien asset statique `/asmaa-mansouri.jpg` retiré : le fichier
    // réel est 951×1280 en portrait, incompatible OG 1.91:1.)
  },
  twitter: {
    card: "summary_large_image",
    title: "Asmaa Mansouri, Naturopathe à Décines-Charpieu",
    description: ROOT_DESCRIPTION,
    // `images` est géré par la convention Next : `src/app/twitter-image.tsx`
    // ré-exporte `opengraph-image.tsx` pour les pages de racine. Les
    // routes avec leur propre `opengraph-image.tsx` produisent aussi un
    // Twitter image dérivé automatiquement.
    // Pas de `creator` : Asmaa n'a pas de compte X/Twitter. Ne jamais
    // mettre un handle Instagram ici, les crawlers X pointeraient vers
    // un compte inexistant. À ajouter si un jour un compte X est créé.
  },
  // Next 16 n'injecte automatiquement que `favicon.ico` (+ manifest via
  // `manifest.ts`). Les autres fichiers convention (`icon0.svg`,
  // `icon1.png`, `apple-icon.png`) sont bien servis en route mais pas
  // liés en `<head>` quand `favicon.ico` coexiste. On déclare donc
  // explicitement pour garantir l'injection.
  icons: {
    // `favicon.ico` est auto-injecté par la convention Next (hash
    // immutable), on ne le redéclare pas ici pour éviter le doublon.
    icon: [
      { url: "/icon0.svg", type: "image/svg+xml" },
      { url: "/icon1.png", sizes: "96x96", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#5a6b3c",
      },
    ],
  },
};

/**
 * Viewport racine.
 *
 * `themeColor` colore la barre d'adresse Safari/Chrome mobile. Aligné
 * sur `--color-warm-100` (fond body) pour que la barre fusionne
 * visuellement avec la page. Scope `prefers-color-scheme: light` car
 * le site n'a pas de thème sombre (colorScheme: 'light' plus bas).
 *
 * `maximumScale: 5` laisse l'utilisateur zoomer (accessibilité WCAG
 * 1.4.4). Ne pas descendre à 1 même si c'est souvent vu en prod.
 *
 * Note Next 16 : viewport reste un export du layout (pas de
 * convention de fichier `viewport.ts` séparée, contrairement à
 * `robots.ts` / `sitemap.ts` / `manifest.ts`).
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F2E4CF" },
  ],
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      dir="ltr"
      data-scroll-behavior="smooth"
      className={`${outfit.variable} ${manrope.variable} h-full antialiased`}
    >
      {/*
        suppressHydrationWarning : neutralise les warnings React causés par
        des extensions de navigateur qui injectent des attributs sur <body>
        (ex: data-cjcrx vu dans les logs dev). N'affecte que l'élément body
        lui-même, pas ses enfants. API React officielle pour ce cas précis.
      */}
      <body
        className="min-h-full flex flex-col"
        suppressHydrationWarning
      >
        {/*
          JSON-LD global (LocalBusiness + WebSite) injecté une seule fois
          dans le layout racine pour toutes les routes. Les pages enfants
          du groupe `(site)` ajoutent leurs propres graphes locaux
          (WebPage, Service, FAQPage, BreadcrumbList...) qui référencent
          ces entités par `@id`. La page `/link` (hors `(site)`) hérite
          aussi de ce graphe global, ce qui est sans effet puisqu'elle
          est `noindex`.
        */}
        <JsonLd data={buildGlobalGraph()} />

        {/*
          Skip link, Header et Footer sont rendus par `src/app/(site)/layout.tsx`
          et ne s'appliquent qu'aux routes du groupe `(site)`. Les routes
          hors groupe (ex: `/link`, page Linktree pour la bio Instagram)
          court-circuitent ainsi le chrome global tout en gardant accès
          au `<html>`, fonts, JSON-LD et MotionProvider.
        */}
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
