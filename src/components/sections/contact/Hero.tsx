import { CalendarRange, Phone } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { InstagramLogo } from "@/components/ui/InstagramLogo";
import { FadeInUp } from "@/components/motion/FadeInUp";
import { site } from "@/data/site";

/**
 * Hero de la page `/contact`.
 *
 * H1 "Prendre contact" + paragraphe explicatif + 3 CTAs directs,
 * dans l'ordre hiérarchique voulu côté parcours utilisateur :
 *   1. Prendre rendez-vous (primary, Resalib) — action principale.
 *   2. Appeler (secondary, tel:) — rassurant, immédiat.
 *   3. Instagram (secondary, externe) — canal informel pour suivre l'activité.
 *
 * Server Component — aucun state.
 */
export function ContactHero() {
  return (
    <section
      aria-labelledby="contact-titre"
      className="relative pt-32 pb-12 md:pt-36 lg:pt-40 lg:pb-22"
    >
      <div className="mx-auto max-w-3xl px-6 text-center">
        <FadeInUp duration={0.6}>
          <h1
            id="contact-titre"
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-[-0.02em] leading-[1.05] text-warm-900"
          >
            Prendre contact
          </h1>
        </FadeInUp>

        <FadeInUp delay={0.1} duration={0.6} className="mt-8">
          <p className="font-body text-lg md:text-xl leading-relaxed text-warm-700">
            Pour une question, une prise de rendez-vous ou un échange avant
            votre première séance, écrivez-moi ou téléphonez. Je vous réponds
            personnellement sous 48 heures ouvrées.
          </p>
        </FadeInUp>

        <FadeInUp delay={0.25} duration={0.6} className="mt-10">
          <div className="flex flex-col-reverse sm:flex-row sm:flex-wrap sm:justify-center items-center gap-4">
            <ButtonLink href={site.instagramUrl} variant="secondary" external>
              Suivre sur
              <InstagramLogo className="h-4 w-auto translate-y-[1.5px]" />
            </ButtonLink>
            <ButtonLink href={site.phoneHref} variant="secondary">
              Appelez-moi
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
    </section>
  );
}
