import { CalendarRange, Phone } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
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
 * Animations FadeInUp retirées : le sous-titre était l'élément LCP de la page
 * et son `initial: opacity 0` retardait le LCP de ~2 s sur mobile. Les blocs
 * apparaissent maintenant immédiatement, sans cascade. Cohérent avec les
 * autres pages internes qui ne dépendent plus de framer-motion sur le Hero.
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
          <blockquote>
            <h1
              id="qui-suis-je-titre"
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-[-0.02em] leading-[1.1] text-warm-900 italic"
            >
              {"« "}Maintenir en bonne santé vaut mieux que guérir.
              {" »"}
            </h1>
            <footer className="mt-6 font-body text-base text-warm-700">
              {"— "}
              <cite className="not-italic font-display font-medium text-warm-900">
                Asmaa Mansouri
              </cite>
            </footer>
          </blockquote>

          <div className="mt-12 max-w-2xl mx-auto">
            <p className="font-body text-lg md:text-xl leading-relaxed text-warm-700">
              Naturopathe à Décines-Charpieu, j&apos;accompagne exclusivement les
              femmes. Cycles, SOPK, endométriose, post-partum, préménopause,
              troubles digestifs : mon approche associe naturopathie, médecine
              traditionnelle chinoise et massage Tuina.
            </p>
          </div>

          <div className="mt-10 flex flex-col-reverse sm:flex-row sm:justify-center items-center gap-4">
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
        </div>
      </div>
    </section>
  );
}
