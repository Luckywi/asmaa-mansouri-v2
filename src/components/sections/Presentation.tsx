import Image from "next/image";
import { Microscope } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";

/**
 * Presentation — section "Qui suis-je" (extrait) sur la landing.
 *
 * Layout :
 *   - Desktop (lg+) : grid 12 cols, photo à gauche (col-span-5),
 *     content à droite (col-span-7), gap-16
 *   - Mobile : stack vertical (photo en haut, content en dessous)
 *
 * Pas de background propre : la section est transparente et hérite du
 * body (warm-100 uniforme + le wash warm-300 du gradient si on est dans
 * la zone top/bottom). Règle de cohérence : sur ce projet, AUCUNE section
 * n'a son propre bg, tout reste uniforme avec le body.
 *
 * Le H2 porte un id="presentation-titre" référencé par aria-labelledby
 * sur la section, et la section a id="presentation" pour matcher l'anchor
 * du Header (#presentation).
 *
 * Photo : `<Image>` next/image en mode `fill` dans un parent à aspect-ratio
 * fixe. Source : `/public/asmaa-mansouri.jpg` (951×1280, ratio ~3/4).
 * Mobile : aspect-[3/2] (paysage). On crop volontairement bas de la photo
 * pour réduire la hauteur de moitié vs. ratio natif (la photo plein ratio
 * prenait trop d'écran sur mobile). `object-top` ancre la tête en haut
 * du cadre pour que le visage reste pleinement visible malgré le crop.
 * Desktop : aspect-auto + h-full pour que la colonne photo s'aligne sur
 * la hauteur de la colonne content (object-cover + object-top gère le
 * crop si la hauteur du content dépasse le ratio naturel).
 *
 * CTA "Découvrir mon approche" : variant secondary, lien vers la future
 * page /qui-suis-je (Phase 2). En Phase 1 le lien 404era — c'est conforme
 * au pattern qu'on a partout (les futures routes sont déjà câblées).
 *
 * Server Component pur — aucun state, aucune interactivité.
 */
export function Presentation() {
  return (
    <section
      id="presentation"
      aria-labelledby="presentation-titre"
      className="relative py-12 lg:py-22"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* ─── Colonne photo ────────────────────────────── */}
          <div className="lg:col-span-5">
            {/*
              Container avec aspect-ratio fixe + overflow-hidden pour clip
              le radius. `relative` est requis par next/image en mode `fill`.
              Mobile : aspect-[3/2] (paysage) — on coupe volontairement
              le bas de la photo pour réduire la hauteur de moitié vs. le
              ratio natif 3/4 qui prenait trop de scroll sur mobile.
              Desktop : aspect-auto + h-full pour épouser la hauteur de
              la colonne content. `object-top` ancre le visage en haut du
              cadre dans les deux cas, garantissant qu'il reste visible
              quel que soit le crop appliqué par object-cover.
            */}
            <div className="relative aspect-[3/2] lg:aspect-auto lg:h-full w-full overflow-hidden rounded-xl border border-warm-900">
              <Image
                src="/asmaa-mansouri.jpg"
                alt="Portrait d'Asmaa Mansouri, naturopathe à Décines-Charpieu"
                fill
                className="object-cover object-top"
                sizes="(min-width: 1024px) 42vw, 100vw"
              />
            </div>
          </div>

          {/* ─── Colonne content ─────────────────────────── */}
          {/* text-center sur mobile pour centrer titre/sous-titre/description/CTA,
              text-left sur desktop pour le layout côte-à-côte avec la photo */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* H2 + sous-titre mission */}
            <h2
              id="presentation-titre"
              className="font-display text-4xl lg:text-5xl font-medium tracking-[-0.02em] leading-[1.1] text-warm-900"
            >
              Asmaa Mansouri
            </h2>
            <p className="font-display text-xl lg:text-2xl font-light tracking-tight text-warm-700">
              Au service de la santé des femmes
            </p>

            {/* Chips spécialités — info factuelle + SEO keywords
                justify-center sur mobile (text-center ne marche pas sur les
                flex containers, faut le justify explicite) */}
            <ul className="mt-6 flex flex-wrap gap-2 justify-center lg:justify-start">
              {[
                "Naturopathie",
                "Médecine traditionnelle chinoise",
                "Massage thérapeutique Tuina",
              ].map((label) => (
                <li
                  key={label}
                  className="rounded-md bg-[var(--glass-bg)] backdrop-blur-xl backdrop-saturate-[1.8] border-[0.5px] border-white/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-1px_0_rgba(60,30,25,0.04),0_4px_16px_-6px_rgba(60,30,25,0.15)] px-2 lg:px-3 py-1 lg:py-1.5 font-body text-xs lg:text-sm text-warm-700"
                >
                  {label}
                </li>
              ))}
            </ul>

            {/* Description courte */}
            <p className="mt-8 max-w-2xl font-body text-lg leading-relaxed text-warm-700">
              Spécialisée en santé féminine, j&apos;accompagne les femmes
              confrontées aux déséquilibres hormonaux, troubles du cycle et
              grandes transitions de vie. Mon approche combine naturopathie,
              médecine traditionnelle chinoise et techniques manuelles du
              Tuina, pour un suivi sur-mesure qui vous rend actrice autonome
              de votre santé.
            </p>

            {/* CTA secondary — découverte, pas conversion */}
            <div className="mt-10">
              <ButtonLink href="/qui-suis-je" variant="secondary">
                Découvrir mon approche
                <Microscope
                  aria-hidden="true"
                  className="w-4 h-4"
                  strokeWidth={1.5}
                />
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
