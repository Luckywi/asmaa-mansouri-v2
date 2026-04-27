import { CalendarRange, Phone } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { FadeInUp } from "@/components/motion/FadeInUp";
import { site } from "@/data/site";

/**
 * Hero — section d'accueil de la page /qui-suis-je.
 *
 * Structure verticale centrée :
 *   1. Citation d'Asmaa en H1, italic, encadrée dans un <blockquote>
 *   2. Attribution "— Asmaa Mansouri" via <footer>/<cite> dans le blockquote
 *   3. Sous-titre descriptif concret : rôle, spécialisation, conditions
 *      accompagnées, techniques. Factuel, sans slogans marketing.
 *   4. 2 CTAs directement sous la description (Appeler / Prendre RDV),
 *      pattern identique au Hero landing (flex-col-reverse sm:flex-row).
 *
 * Le H1 vit à l'intérieur du <blockquote> — sémantique valide HTML5, garde
 * la structure de heading pour le SEO tout en respectant la nature "citation"
 * du bloc. Le <cite> porte le `not-italic` parce que le parent est italic :
 * on veut que le nom de l'auteure reste droit pour distinguer citation / source.
 *
 * Server Component pur.
 */
export function Hero() {
  return (
    <section
      aria-labelledby="qui-suis-je-titre"
      className="relative pt-32 pb-12 md:pt-36 lg:pt-40 lg:pb-22"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
        <div className="text-center max-w-4xl mx-auto">
          <FadeInUp duration={0.6}>
            <blockquote>
            <h1
              id="qui-suis-je-titre"
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-[-0.02em] leading-[1.1] text-warm-900 italic"
            >
              {"\u00AB\u00A0"}Maintenir en bonne santé vaut mieux que guérir.
              {"\u00A0\u00BB"}
            </h1>
            <footer className="mt-6 font-body text-base text-warm-700">
              {"\u2014 "}
              <cite className="not-italic font-display font-medium text-warm-900">
                Asmaa Mansouri
              </cite>
            </footer>
          </blockquote>
          </FadeInUp>

          <FadeInUp delay={0.1} duration={0.6} className="mt-12 max-w-2xl mx-auto">
          <p className="font-body text-lg md:text-xl leading-relaxed text-warm-700">
            Naturopathe à Décines-Charpieu, j&apos;accompagne exclusivement les
            femmes. Cycles, SOPK, endométriose, post-partum, préménopause,
            troubles digestifs : mon approche associe naturopathie, médecine
            traditionnelle chinoise et massage Tuina.
          </p>
          </FadeInUp>

          <FadeInUp delay={0.25} duration={0.6} className="mt-10">
          <div className="flex flex-col-reverse sm:flex-row sm:justify-center items-center gap-4">
            <ButtonLink href={site.phoneHref} variant="secondary">
              Appeler Asmaa
              <Phone aria-hidden="true" className="w-4 h-4" strokeWidth={1.5} />
            </ButtonLink>
            <ButtonLink href={site.resalibUrl} variant="primary">
              Prendre rendez-vous
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
  );
}
