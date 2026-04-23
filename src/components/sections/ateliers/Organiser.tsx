import { Mail, Phone } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { FadeInUp } from "@/components/motion/FadeInUp";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/data/site";

type Props = {
  as?: "hero" | "section";
  title?: string;
};

export function AteliersOrganiser({
  as = "hero",
  title = "Association, collectivité, entreprise ou groupe de particuliers ?",
}: Props) {
  const mailtoHref = `mailto:${site.email}?subject=${encodeURIComponent(
    "Organisation d'un atelier",
  )}&body=${encodeURIComponent(
    "Bonjour Asmaa,\n\nJe représente [nom de la structure] et souhaite organiser un atelier.\n\nThème envisagé : \nPublic : \nLieu : \nDate souhaitée : \n\nMerci,\n",
  )}`;

  const isHero = as === "hero";

  return (
    <section
      aria-labelledby="ateliers-organiser-titre"
      className={isHero ? "relative pt-32 pb-12 md:pt-36 lg:pt-40 lg:pb-16" : "relative py-12 lg:py-22"}
    >
      <div className="mx-auto max-w-3xl px-6 md:px-8 lg:px-12 flex flex-col items-center text-center gap-5">
        {/*
          Deux stratégies d'animation selon l'usage du composant :
          - Hero (`as="hero"`) : FadeInUp cascade au mount, cohérent
            avec les autres Hero du site.
          - Section (`as="section"`, réutilisation bas de page) :
            Reveal unique au scroll pour garder l'animation discrète
            quand le bloc arrive dans le viewport.
        */}
        {isHero ? (
          <>
            <FadeInUp duration={0.6}>
              <h1
                id="ateliers-organiser-titre"
                className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-[-0.02em] leading-[1.05] text-warm-900 text-balance"
              >
                {title}
              </h1>
            </FadeInUp>
            <FadeInUp delay={0.1} duration={0.6}>
              <p className="font-body text-base md:text-lg leading-relaxed text-warm-700">
                J&apos;interviens volontiers en dehors du cabinet pour animer des ateliers autour du bien-être au naturel. Format, durée et thème s&apos;adaptent au public et au lieu. Contactez-moi pour construire ensemble un atelier à votre mesure.
              </p>
            </FadeInUp>
            <FadeInUp delay={0.25} duration={0.6}>
              <div className="flex flex-row items-center gap-3">
                <ButtonLink href={mailtoHref} variant="secondary">
                  Email
                  <Mail aria-hidden="true" className="w-4 h-4" strokeWidth={1.5} />
                </ButtonLink>
                <ButtonLink href={site.phoneHref} variant="primary">
                  Téléphone
                  <Phone aria-hidden="true" className="w-4 h-4" strokeWidth={1.5} />
                </ButtonLink>
              </div>
            </FadeInUp>
          </>
        ) : (
          <Reveal as="div" className="flex flex-col items-center gap-5">
            <h2
              id="ateliers-organiser-titre"
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium tracking-[-0.02em] leading-[1.1] text-warm-900 text-balance"
            >
              {title}
            </h2>
            <p className="font-body text-base md:text-lg leading-relaxed text-warm-700">
              J&apos;interviens volontiers en dehors du cabinet pour animer des ateliers autour du bien-être au naturel. Format, durée et thème s&apos;adaptent au public et au lieu. Contactez-moi pour construire ensemble un atelier à votre mesure.
            </p>
            <div className="flex flex-row items-center gap-3">
              <ButtonLink href={mailtoHref} variant="secondary">
                Email
                <Mail aria-hidden="true" className="w-4 h-4" strokeWidth={1.5} />
              </ButtonLink>
              <ButtonLink href={site.phoneHref} variant="primary">
                Téléphone
                <Phone aria-hidden="true" className="w-4 h-4" strokeWidth={1.5} />
              </ButtonLink>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
