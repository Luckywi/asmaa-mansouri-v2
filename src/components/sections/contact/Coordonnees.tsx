import { CalendarRange, CircleFadingPlus, Mail, Phone, Users } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { association } from "@/data/ateliers";
import { site } from "@/data/site";

/**
 * Coordonnees — carte latérale de la section Formulaire.
 *
 * Regroupe l'ensemble des canaux de contact directs, séparés par
 * hairlines `warm-700/15` :
 *
 *   1. Téléphone cabinet (Asmaa, consultations)
 *   2. Email cabinet
 *   3. Instagram (canal informel)
 *   4. Téléphone association Le Cœur du Mas Cuisine (ateliers) —
 *      volontairement distinct du tel cabinet pour éviter la confusion
 *      entre Asmaa et la présidente de l'association, point de contact
 *      officiel pour les réservations d'ateliers.
 *   5. CTA Resalib "Appel découverte gratuit" en bas — conversion.
 *
 * Le conteneur est en `h-full flex flex-col` pour que :
 *   - Sur desktop, la card s'étire à la hauteur du formulaire (grid
 *     align stretch par défaut).
 *   - Le CTA final est épinglé en bas via `mt-auto` sur son wrapper,
 *     les canaux de contact occupent tout l'espace disponible.
 *
 * Server Component.
 */
export function Coordonnees() {
  return (
    <aside
      aria-labelledby="coordonnees-titre"
      className={[
        "relative h-full flex flex-col rounded-md p-6 md:p-8",
        "bg-[var(--glass-bg)]",
        "backdrop-blur-xl backdrop-saturate-[1.8]",
        "border-[0.5px] border-white/50",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-1px_0_rgba(60,30,25,0.04),0_4px_16px_-6px_rgba(60,30,25,0.15)]",
      ].join(" ")}
    >
      <h2
        id="coordonnees-titre"
        className="font-display text-2xl lg:text-3xl font-medium tracking-[-0.01em] text-warm-900"
      >
        Me joindre directement
      </h2>
      <p className="mt-2 font-body text-sm text-warm-700">
        Pour les consultations, massages et cupping thérapie.
      </p>

      <ul className="mt-6 flex flex-col divide-y divide-warm-700/15">
        <li className="py-4 first:pt-0">
          <p className="flex items-center gap-2 font-body text-xs font-medium uppercase tracking-widest text-warm-700/70">
            <Phone
              aria-hidden="true"
              className="w-3.5 h-3.5"
              strokeWidth={1.8}
            />
            Téléphone cabinet
          </p>
          <a
            href={site.phoneHref}
            className="mt-2 inline-block font-body text-base lg:text-lg text-warm-900 underline underline-offset-4 decoration-1 decoration-warm-700/30 hover:decoration-warm-900 transition-colors duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warm-700"
          >
            {site.phone}
          </a>
        </li>

        <li className="py-4">
          <p className="flex items-center gap-2 font-body text-xs font-medium uppercase tracking-widest text-warm-700/70">
            <Mail
              aria-hidden="true"
              className="w-3.5 h-3.5"
              strokeWidth={1.8}
            />
            Email
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-2 inline-block font-body text-base lg:text-lg text-warm-900 underline underline-offset-4 decoration-1 decoration-warm-700/30 hover:decoration-warm-900 transition-colors duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warm-700 break-all"
          >
            {site.email}
          </a>
        </li>

        <li className="py-4">
          <p className="flex items-center gap-2 font-body text-xs font-medium uppercase tracking-widest text-warm-700/70">
            <CircleFadingPlus
              aria-hidden="true"
              className="w-3.5 h-3.5"
              strokeWidth={1.8}
            />
            Instagram
          </p>
          <a
            href={site.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block font-body text-base lg:text-lg text-warm-900 underline underline-offset-4 decoration-1 decoration-warm-700/30 hover:decoration-warm-900 transition-colors duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warm-700"
          >
            {site.instagram}
          </a>
        </li>

        <li className="py-4">
          <p className="flex items-center gap-2 font-body text-xs font-medium uppercase tracking-widest text-warm-700/70">
            <Users
              aria-hidden="true"
              className="w-3.5 h-3.5"
              strokeWidth={1.8}
            />
            Ateliers collectifs
          </p>
          <a
            href={association.phoneHref}
            className="mt-2 inline-block font-body text-base lg:text-lg text-warm-900 underline underline-offset-4 decoration-1 decoration-warm-700/30 hover:decoration-warm-900 transition-colors duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warm-700"
          >
            {association.phone}
          </a>
        </li>
      </ul>

      <div className="pt-6 border-t border-warm-700/15 flex">
        <ButtonLink href={site.resalibUrl} variant="primary">
          Appel découverte gratuit
          <CalendarRange
            aria-hidden="true"
            className="w-4 h-4"
            strokeWidth={1.5}
          />
        </ButtonLink>
      </div>
      {/*
        Spacer `flex-1` placé APRÈS le CTA : quand l'utilisateur agrandit
        le textarea du formulaire, la grid étire la card Coordonnées pour
        matcher la hauteur. Ce spacer absorbe cet espace supplémentaire
        sous le bouton, plutôt qu'au-dessus (ce qui décrocherait le CTA
        du bloc de contacts et casserait le rythme visuel).
      */}
      <div className="flex-1" aria-hidden="true" />
    </aside>
  );
}
