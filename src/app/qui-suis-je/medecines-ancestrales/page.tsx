import type { Metadata } from "next";
import { CalendarRange, Flower2, Leaf, UserRound } from "lucide-react";
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
 * /qui-suis-je/medecines-ancestrales — sous-page du hub identité.
 *
 * Contenu rédigé par Asmaa, assumé pleinement comme demandé :
 *   - Médecine Traditionnelle Chinoise (outils consultation, 5 Éléments,
 *     enseignement Yin/cru-cuit pour les femmes)
 *   - Médecine Prophétique (hadith du Prophète assumé en blockquote,
 *     philosophie du corps-dépôt, outils : nigelle, miel, jeûne)
 *
 * Le PDF d'Asmaa parle au départ de "trois traditions" mais n'en développe
 * que deux (MTC + prophétique). On est passé à "deux traditions" pour
 * rester cohérent avec ce qui est effectivement présenté.
 *
 * Architecture alignée sur /specialites/[slug] :
 *   1. Hero (H1 + intro + CTA primary)
 *   2. Article MTC
 *   3. Article Médecine Prophétique (hadith en blockquote)
 *   4. Section "Ce qui relie ces traditions"
 *   5. Bridges (3 cards maillage interne : la-naturopathie, /specialites, /qui-suis-je)
 *   6. CTA final
 *
 * Server Component pur.
 */

export const metadata: Metadata = {
  title:
    "Mes médecines ancestrales — Asmaa Mansouri, naturopathe à Décines-Charpieu",
  description:
    "Médecine traditionnelle chinoise et médecine prophétique : les deux traditions ancestrales qui nourrissent ma pratique de naturopathe au cabinet de Décines-Charpieu.",
  robots: { index: false, follow: false },
};

const bridges: readonly QuiSuisJeBridge[] = [
  {
    href: "/qui-suis-je/la-naturopathie",
    icon: Leaf,
    title: "La naturopathie",
    description:
      "Définition, principes fondateurs, ce que la naturopathie n'est pas et pourquoi consulter.",
    ctaLabel: "Découvrir la naturopathie",
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

export default function MedecinesAncestralesPage() {
  return (
    <main id="contenu-principal" className="flex-1">
      <Breadcrumbs
        items={[
          { label: "Qui suis-je ?", href: "/qui-suis-je" },
          {
            label: "Médecines ancestrales",
            href: "/qui-suis-je/medecines-ancestrales",
          },
        ]}
      />

      {/* ─── Hero ────────────────────────────────────────────────── */}
      <section
        aria-labelledby="medecines-ancestrales-titre"
        className="relative pt-8 pb-12 md:pt-10 lg:pt-12 lg:pb-16"
      >
        <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
          <div className="text-center max-w-4xl mx-auto">
            <FadeInUp duration={0.6}>
              <h1
                id="medecines-ancestrales-titre"
                className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-[-0.02em] leading-[1.05] text-warm-900 text-balance"
              >
                Mes médecines ancestrales
              </h1>
            </FadeInUp>

            <FadeInUp delay={0.1} duration={0.6} className="mt-8 max-w-2xl mx-auto">
              <p className="font-body text-lg md:text-xl leading-relaxed text-warm-700">
                Ma pratique s&apos;enracine dans deux traditions médicales
                anciennes qui partagent une même conviction fondamentale&nbsp;:
                le corps possède en lui-même les ressources pour guérir, à
                condition qu&apos;on lui en donne les moyens.
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
          {/* ── La Médecine Traditionnelle Chinoise ── */}
          <Reveal as="article">
            <h2 className="font-display text-3xl lg:text-4xl font-medium tracking-[-0.02em] leading-[1.15] text-warm-900">
              La Médecine Traditionnelle Chinoise
            </h2>
            <p className="mt-6 font-body text-base lg:text-lg leading-relaxed text-warm-700">
              Vieille de plus de 3&nbsp;000 ans, la Médecine Traditionnelle
              Chinoise (MTC) repose sur une vision énergétique du corps
              humain. La santé n&apos;est pas l&apos;absence de
              maladie&nbsp;: c&apos;est la circulation fluide et équilibrée
              du Qi, l&apos;énergie vitale, à travers les méridiens et les
              organes.
            </p>

            <div className="mt-10">
              <h3 className="font-display text-2xl lg:text-3xl font-medium tracking-[-0.01em] leading-[1.2] text-warm-900">
                Ce que j&apos;utilise en consultation
              </h3>
              <p className="mt-4 font-body text-base lg:text-lg leading-relaxed text-warm-700">
                L&apos;observation de la langue me donne une lecture directe
                de l&apos;état des organes internes&nbsp;: sa couleur, sa
                forme, son enduit me renseignent sur les grands équilibres
                du corps. Vide ou Plénitude, Froid ou Chaleur, Humidité ou
                Sécheresse. Le pouls, pris aux deux poignets, confirme et
                affine cette lecture énergétique. Le massage Tuina est mon
                outil thérapeutique principal&nbsp;: il travaille sur les
                méridiens, libère les stagnations et permet de relâcher les
                émotions enkystées dans le corps. La théorie des 5 Éléments
                (Bois, Feu, Terre, Métal, Eau) me permet de comprendre le
                profil énergétique de chaque femme.
              </p>
            </div>

            <div className="mt-10">
              <h3 className="font-display text-2xl lg:text-3xl font-medium tracking-[-0.01em] leading-[1.2] text-warm-900">
                Un enseignement clé pour les femmes
              </h3>
              <p className="mt-4 font-body text-base lg:text-lg leading-relaxed text-warm-700">
                La MTC m&apos;a apporté une conviction que j&apos;intègre
                systématiquement&nbsp;: le cru ne convient pas à tous les
                terrains. La femme est de nature Yin, un principe froid,
                humide, intérieur. Un terrain déjà froid n&apos;a pas besoin
                d&apos;être davantage refroidi par une alimentation
                crue&nbsp;: salades en plein hiver, smoothies glacés,
                crudités à chaque repas. Tout ça éteint le Feu digestif et
                crée de l&apos;Humidité interne, ce qui affaiblit la Rate et
                l&apos;Estomac. Le chaud et le cuit sont la base, le
                cru reste une exception estivale.
              </p>
            </div>
          </Reveal>

          {/* ── La Médecine Prophétique ── */}
          <Reveal as="article" className="mt-16 lg:mt-20">
            <h2 className="font-display text-3xl lg:text-4xl font-medium tracking-[-0.02em] leading-[1.15] text-warm-900">
              La Médecine Prophétique{" "}
              <span className="font-body text-lg lg:text-xl text-warm-700 italic">
                (Tibb an-Nabawi)
              </span>
            </h2>

            {/*
              Hadith en blockquote — assumé pleinement, placé en tête
              de la section pour porter le propos. Pattern stylistique
              aligné sur le blockquote Béchamp de /la-naturopathie
              (border-l accent + italic + attribution via <cite>).
            */}
            <blockquote className="mt-8 border-l-2 border-warm-700/40 pl-6 py-2">
              <p className="font-display text-xl lg:text-2xl font-medium italic tracking-tight leading-[1.3] text-warm-900">
                {"\u00AB\u00A0"}Il y a deux bienfaits dont beaucoup de gens
                ne profitent pas&nbsp;: la santé et le temps libre.
                {"\u00A0\u00BB"}
              </p>
              <footer className="mt-3 font-body text-sm text-warm-700">
                {"\u2014 "}
                <cite className="not-italic font-display font-medium text-warm-900">
                  Le Prophète Muhammad
                </cite>{" "}
                (rapporté par Al-Bukhari)
              </footer>
            </blockquote>

            <p className="mt-8 font-body text-base lg:text-lg leading-relaxed text-warm-700">
              Ce qui me touche profondément dans cette tradition, c&apos;est
              la philosophie qui la sous-tend&nbsp;: le corps nous a été
              confié. Ce n&apos;est pas notre propriété, c&apos;est un dépôt
              que Dieu nous a remis. En prendre soin n&apos;est pas un acte
              de vanité, c&apos;est un acte de gratitude et de
              responsabilité. Un corps en bonne santé permet d&apos;être
              pleinement présente à sa vie, à ses proches et à sa pratique
              spirituelle.
            </p>

            <div className="mt-10">
              <h3 className="font-display text-2xl lg:text-3xl font-medium tracking-[-0.01em] leading-[1.2] text-warm-900">
                Les outils utilisés
              </h3>
              <p className="mt-4 font-body text-base lg:text-lg leading-relaxed text-warm-700">
                La nigelle (Nigella sativa), qui agit à la fois sur
                l&apos;inflammation, l&apos;immunité, la digestion et les
                allergies. Le miel, tonique du Qi et du Sang, antibactérien
                et réparateur. Et le jeûne, pratique de purification et
                d&apos;auto-guérison&nbsp;: bien avant que la science
                moderne ne valide ses bienfaits, cette tradition enseignait
                déjà que le jeûne allège les organes émonctoires, met le
                système digestif au repos et remet le corps vers son
                équilibre.
              </p>
            </div>
          </Reveal>

          {/* ── Ce qui relie ces traditions ── */}
          <Reveal as="article" className="mt-16 lg:mt-20">
            <h2 className="font-display text-3xl lg:text-4xl font-medium tracking-[-0.02em] leading-[1.15] text-warm-900">
              Ce qui relie ces traditions
            </h2>
            <p className="mt-6 font-body text-base lg:text-lg leading-relaxed text-warm-700">
              Au-delà de leurs outils et de leurs cultures d&apos;origine,
              ces deux traditions partagent quatre convictions que je fais
              miennes dans ma pratique.
            </p>

            <ul className="mt-6 space-y-3">
              {[
                "Le corps sait guérir, il faut lui en donner les conditions",
                "La maladie est un signal, pas un ennemi à abattre",
                "Prévenir vaut infiniment mieux que guérir",
                "L'être humain est un tout, corps, esprit et âme ne se séparent pas",
              ].map((point) => (
                <li
                  key={point}
                  className="flex gap-3 font-body text-base lg:text-lg leading-relaxed text-warm-700"
                >
                  <span
                    aria-hidden="true"
                    className="mt-3 w-1.5 h-1.5 bg-warm-700 rounded-full shrink-0"
                  />
                  <span className="flex-1">{point}</span>
                </li>
              ))}
            </ul>

            <p className="mt-6 font-body text-base lg:text-lg leading-relaxed text-warm-700">
              C&apos;est cette vision que j&apos;apporte en consultation.
              Pas une seule clé, mais plusieurs, choisies selon le
              terrain, le profil et les besoins de chaque femme que
              j&apos;accompagne.
            </p>
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
