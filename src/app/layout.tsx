import type { Metadata, Viewport } from "next";
import { Outfit, Manrope } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MotionProvider } from "@/components/motion/MotionProvider";
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

// Metadata minimale — la phase 2 SEO viendra plus tard (Open Graph, schema.org…)
export const metadata: Metadata = {
  title: "Asmaa Mansouri — Naturopathe à Décines-Charpieu",
  description:
    "Naturopathie féminine à Décines-Charpieu. Consultations, massages thérapeutiques Tuina, cupping therapy. Prenez rendez-vous en ligne.",
  robots: { index: false, follow: false },
};

// Viewport — themeColor colore la barre d'adresse Safari/Chrome mobile
// sur tout le site. Distinct du `theme_color` du manifest.webmanifest
// (ce dernier n'est lu que lorsque la PWA est installée). Aligné sur
// --color-warm-100 = fond body, pour une barre d'adresse qui fusionne
// visuellement avec la page.
export const viewport: Viewport = {
  themeColor: "#F2E4CF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
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
          Skip link — premier élément focusable de la page. Permet aux
          utilisateurs au clavier ou aux lecteurs d'écran de sauter
          directement au contenu principal sans avoir à tabber dans le
          Header. Visuellement caché jusqu'à ce qu'il reçoive le focus.
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

        <MotionProvider>
          <Header />

          {children}

          {/*
            Footer chrome OS-level (glass effect identique au HeaderDesktop).
            Sticky footer pattern : il colle au bas du viewport sur les pages
            courtes parce que body est `flex flex-col min-h-full` et que chaque
            page wrappe son contenu dans `<main className="flex-1">`. Si une
            nouvelle page oublie ce wrapper, le footer remontera contre le
            contenu — pas un crash, juste un layout dégradé.
          */}
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
