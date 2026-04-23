import type { Metadata } from "next";
import { CalendarRange, Flame, Flower2, UserRound } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import {
  Bridges,
  type QuiSuisJeBridge,
} from "@/components/sections/qui-suis-je/Bridges";
import { FadeInUp } from "@/components/motion/FadeInUp";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/data/site";

/**
 * /qui-suis-je/la-naturopathie — sous-page du hub identité.
 *
 * Contenu pédagogique : définition FENA, principes fondateurs, ce que
 * la naturopathie n'est pas, pourquoi consulter. Source : document
 * rédigé par Asmaa (section "Qu'est-ce que la naturopathie ?"), filtré
 * pour retirer les tournures AI-typiques et les em-dashes.
 *
 * Architecture alignée sur les pages `/specialites/[slug]` :
 *   1. Hero (H1 + intro + CTA primary)
 *   2. Article long-form (max-w-3xl, H2/H3, citation en blockquote)
 *   3. Bridges (3 cards maillage interne : medecines-ancestrales, /specialites, /qui-suis-je)
 *   4. CTA final (primary Resalib + secondary /prestations)
 *
 * Server Component pur.
 */

export const metadata: Metadata = {
  title: "La naturopathie — Asmaa Mansouri, naturopathe à Décines-Charpieu",
  description:
    "Définition FENA, principes fondateurs (Primum non nocere, Sequara Natura), ce que la naturopathie n'est pas et pourquoi consulter.",
  robots: { index: false, follow: false },
};

const bridges: readonly QuiSuisJeBridge[] = [
  {
    href: "/qui-suis-je/medecines-ancestrales",
    icon: Flame,
    title: "Mes médecines ancestrales",
    description:
      "Les deux traditions qui nourrissent ma pratique : la médecine traditionnelle chinoise et la médecine prophétique.",
    ctaLabel: "Voir les traditions",
  },
  {
    href: "/specialites",
    icon: Flower2,
    title: "Mes spécialités",
    description:
      "Troubles digestifs, allergies saisonnières, stress et burn-out, déséquilibres hormonaux : les quatre grands univers que j'accompagne.",
    ctaLabel: "Voir les spécialités",
  },
  {
    href: "/qui-suis-je",
    icon: UserRound,
    title: "Qui suis-je\u00A0?",
    description:
      "Mon parcours, ma démarche et la manière dont j'accompagne les femmes au cabinet.",
    ctaLabel: "Me découvrir",
  },
] as const;

export default function LaNaturopathiePage() {
  return (
    <main id="contenu-principal" className="flex-1">
      <Breadcrumbs
        items={[
          { label: "Qui suis-je ?", href: "/qui-suis-je" },
          { label: "La naturopathie", href: "/qui-suis-je/la-naturopathie" },
        ]}
      />

      {/* ─── Hero ────────────────────────────────────────────────── */}
      <section
        aria-labelledby="la-naturopathie-titre"
        className="relative pt-8 pb-12 md:pt-10 lg:pt-12 lg:pb-16"
      >
        <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
          <div className="text-center max-w-4xl mx-auto">
            <FadeInUp duration={0.6}>
              <h1
                id="la-naturopathie-titre"
                className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-[-0.02em] leading-[1.05] text-warm-900 text-balance"
              >
                Qu&apos;est-ce que la naturopathie&nbsp;?
              </h1>
            </FadeInUp>

            <FadeInUp delay={0.1} duration={0.6} className="mt-8 max-w-2xl mx-auto">
              <p className="font-body text-lg md:text-xl leading-relaxed text-warm-700">
                Une approche globale et personnalisée de la santé, qui considère
                chaque femme comme un tout plutôt que comme une liste de
                symptômes à faire taire. Voici ce qu&apos;est, et ce que
                n&apos;est pas, la naturopathie.
              </p>
            </FadeInUp>

            <FadeInUp delay={0.25} duration={0.6} className="mt-10">
              <div className="flex justify-center">
                <ButtonLink href={site.resalibUrl} variant="primary">
                  Réserver un appel découverte gratuit
                  <CalendarRange
                    aria-hidden="true"
                    className="w-4 h-4"
                    strokeWidth={1.5}
                  />
                </ButtonLink>
              </div>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* ─── Article long-form ───────────────────────────────────── */}
      <section className="relative pb-12 lg:pb-22">
        <div className="mx-auto max-w-3xl px-6 md:px-8">
          {/* ── Définition ── */}
          <Reveal as="article">
            <h2 className="font-display text-3xl lg:text-4xl font-medium tracking-[-0.02em] leading-[1.15] text-warm-900">
              Une définition à partager
            </h2>
            <p className="mt-6 font-body text-base lg:text-lg leading-relaxed text-warm-700">
              Selon la Fédération Française de Naturopathie (FENA), la
              naturopathie est l&apos;art d&apos;aider une personne à
              maintenir et parfois à retrouver sa santé grâce à un ensemble
              de méthodes naturelles, qui respectent la personne dans son
              ensemble ainsi que les forces de guérison que son corps
              possède.
            </p>
            <p className="mt-6 font-body text-base lg:text-lg leading-relaxed text-warm-700">
              Ce mot, «&nbsp;art&nbsp;», n&apos;est pas choisi par hasard. La
              naturopathie n&apos;est pas une médecine de protocoles
              standardisés. C&apos;est une approche globale et personnalisée,
              qui considère chaque femme comme un tout&nbsp;: corps,
              émotions, énergie, histoire de vie. Pas une liste de symptômes
              à faire taire, une personne à comprendre.
            </p>
          </Reveal>

          {/* ── Principes fondateurs ── */}
          <Reveal as="article" className="mt-16 lg:mt-20">
            <h2 className="font-display text-3xl lg:text-4xl font-medium tracking-[-0.02em] leading-[1.15] text-warm-900">
              Les principes fondateurs
            </h2>
            <p className="mt-6 font-body text-base lg:text-lg leading-relaxed text-warm-700">
              Trois principes structurent toute la pratique naturopathique,
              transmis depuis l&apos;Antiquité et toujours d&apos;actualité.
            </p>

            <div className="mt-10 space-y-10 lg:space-y-12">
              <div>
                <h3 className="font-display text-2xl lg:text-3xl font-medium tracking-[-0.01em] leading-[1.2] text-warm-900">
                  Primum non nocere&nbsp;: d&apos;abord, ne pas nuire
                </h3>
                <p className="mt-4 font-body text-base lg:text-lg leading-relaxed text-warm-700">
                  Avant toute chose, ne pas aggraver. Les méthodes utilisées
                  en naturopathie respectent l&apos;intégrité de
                  l&apos;organisme. On ne cherche pas à forcer, à supprimer
                  ou à contourner ce que le corps exprime&nbsp;: on
                  l&apos;accompagne.
                </p>
              </div>

              <div>
                <h3 className="font-display text-2xl lg:text-3xl font-medium tracking-[-0.01em] leading-[1.2] text-warm-900">
                  Sequara Natura&nbsp;: suivre la nature
                </h3>
                <p className="mt-4 font-body text-base lg:text-lg leading-relaxed text-warm-700">
                  La nature a mis en place dans chaque organisme des
                  processus naturels de guérison. La naturopathie ne s&apos;y
                  substitue pas&nbsp;: elle les favorise, les stimule, les
                  soutient. Ce principe invite à respecter la force vitale
                  propre à chaque individu, ce que l&apos;on appelle parfois
                  le médecin intérieur, cette intelligence du corps qui
                  sait, au fond, ce dont il a besoin pour retrouver
                  l&apos;équilibre.
                </p>
              </div>

              <div>
                <h3 className="font-display text-2xl lg:text-3xl font-medium tracking-[-0.01em] leading-[1.2] text-warm-900">
                  Stimuler les processus d&apos;auto-guérison
                </h3>
                <p className="mt-4 font-body text-base lg:text-lg leading-relaxed text-warm-700">
                  Les grands processus de guérison sont avant tout des
                  processus d&apos;élimination. Le corps cherche à se
                  débarrasser de ce qui l&apos;encombre, à se purifier, à se
                  régénérer. La naturopathie ne contrarie pas ces
                  processus&nbsp;: elle les stimule quand ils sont présents
                  et les fait naître quand ils tardent à se manifester.
                </p>
              </div>
            </div>
          </Reveal>

          {/* ── Ce que la naturopathie n'est pas ── */}
          <Reveal as="article" className="mt-16 lg:mt-20">
            <h2 className="font-display text-3xl lg:text-4xl font-medium tracking-[-0.02em] leading-[1.15] text-warm-900">
              Ce que la naturopathie n&apos;est pas
            </h2>
            <p className="mt-6 font-body text-base lg:text-lg leading-relaxed text-warm-700">
              La naturopathie ne pose pas de diagnostic médical au sens
              conventionnel. Elle ne prescrit pas de médicaments et ne
              remplace pas un suivi médical. Elle travaille en
              complémentarité avec la médecine, en s&apos;intéressant au
              terrain plutôt qu&apos;aux seuls symptômes.
            </p>
            <p className="mt-6 font-body text-base lg:text-lg leading-relaxed text-warm-700">
              Cette phrase, reprise par Antoine Béchamp, résume à elle seule
              la philosophie naturopathique.
            </p>

            {/*
              Blockquote stylée — même pattern que le Hero de /qui-suis-je
              (italic + cite). Mise en avant typographique plutôt que
              décorative : la citation porte la proposition de valeur
              centrale de la naturopathie, elle mérite le relief.
            */}
            <blockquote className="mt-8 border-l-2 border-warm-700/40 pl-6 py-2">
              <p className="font-display text-xl lg:text-2xl font-medium italic tracking-tight leading-[1.3] text-warm-900">
                {"\u00AB\u00A0"}Le virus n&apos;est rien, le terrain est
                tout.{"\u00A0\u00BB"}
              </p>
              <footer className="mt-3 font-body text-sm text-warm-700">
                {"\u2014 "}
                <cite className="not-italic font-display font-medium text-warm-900">
                  Antoine Béchamp
                </cite>
              </footer>
            </blockquote>
          </Reveal>

          {/* ── Pourquoi consulter ── */}
          <Reveal as="article" className="mt-16 lg:mt-20">
            <h2 className="font-display text-3xl lg:text-4xl font-medium tracking-[-0.02em] leading-[1.15] text-warm-900">
              Pourquoi consulter une naturopathe&nbsp;?
            </h2>
            <p className="mt-6 font-body text-base lg:text-lg leading-relaxed text-warm-700">
              Vous n&apos;avez pas besoin d&apos;être malade pour consulter.
              On vient en naturopathie pour plusieurs raisons.
            </p>

            <ul className="mt-6 space-y-3">
              {[
                "Comprendre pourquoi on est souvent fatiguée, même sans maladie déclarée",
                "Accompagner une transition hormonale (préménopause, ménopause, post-partum)",
                "Sortir d'un état de stress chronique ou de burn-out",
                "Retrouver un confort digestif durable",
                "Préparer son terrain avant une saison difficile",
                "Apprendre à mieux s'écouter, tout simplement",
              ].map((motif) => (
                <li
                  key={motif}
                  className="flex gap-3 font-body text-base lg:text-lg leading-relaxed text-warm-700"
                >
                  <span
                    aria-hidden="true"
                    className="mt-3 w-1.5 h-1.5 bg-warm-700 rounded-full shrink-0"
                  />
                  <span className="flex-1">{motif}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ─── Pour aller plus loin (3 cards maillage interne) ─────── */}
      <Bridges bridges={bridges} />

      {/* ─── CTA final ───────────────────────────────────────────── */}
      <section
        aria-label="Passez à l'action"
        className="relative py-12 lg:py-22"
      >
        <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
          <Reveal as="div" className="text-center max-w-3xl mx-auto">
            <h2 className="font-display text-4xl lg:text-5xl font-medium tracking-[-0.02em] leading-[1.1] text-warm-900">
              Envie d&apos;en parler concrètement&nbsp;?
            </h2>

            <p className="mt-6 font-body text-lg lg:text-xl leading-relaxed text-warm-700">
              L&apos;appel découverte est gratuit et sans engagement.
              C&apos;est l&apos;occasion de me parler de votre situation, de
              me poser toutes vos questions et d&apos;évaluer ensemble si je
              peux vous accompagner.
            </p>

            <div className="mt-10 flex flex-col-reverse sm:flex-row sm:justify-center items-center gap-4">
              <ButtonLink href="/prestations" variant="secondary">
                Découvrir les prestations
              </ButtonLink>
              <ButtonLink href={site.resalibUrl} variant="primary">
                Réserver un appel découverte
                <CalendarRange
                  aria-hidden="true"
                  className="w-4 h-4"
                  strokeWidth={1.5}
                />
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
