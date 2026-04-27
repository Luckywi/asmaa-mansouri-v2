import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  absUrl,
  buildBreadcrumb,
  buildGraph,
  buildWebPage,
} from "@/lib/schema";
import { site } from "@/data/site";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Conditions générales de vente, naturopathe Décines",
  description:
    "Conditions de vente des prestations de naturopathie : consultations, massages Tuina, cupping therapy, accompagnement 3 mois. Tarifs, modalités, annulation.",
  path: "/cgv",
  ogDescription:
    "Conditions générales de vente des prestations de naturopathie.",
  noindex: true,
});

export default function CGVPage() {
  const pageUrl = absUrl("/cgv");
  const jsonLd = buildGraph([
    buildWebPage({
      url: pageUrl,
      name: "Conditions générales de vente, naturopathe Décines",
      description:
        "Conditions de vente des prestations de naturopathie : consultations, massages Tuina, cupping therapy, accompagnement 3 mois.",
      breadcrumb: `${pageUrl}#breadcrumb`,
    }),
    buildBreadcrumb([{ name: "CGV", url: pageUrl }], pageUrl),
  ]);

  return (
    <main id="contenu-principal" className="flex-1">
      <JsonLd data={jsonLd} />
      <Breadcrumbs items={[{ label: "CGV", href: "/cgv" }]} />

      <section
        aria-labelledby="cgv-titre"
        className="relative pt-8 pb-12 md:pt-10 lg:pt-12 lg:pb-16"
      >
        <div className="mx-auto max-w-3xl px-6 md:px-8 lg:px-12">
          <h1
            id="cgv-titre"
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-[-0.02em] leading-[1.05] text-warm-900"
          >
            Conditions générales de vente
          </h1>
          <p className="mt-6 font-body text-base text-warm-700">
            Dernière mise à jour : avril 2026
          </p>
        </div>
      </section>

      <section className="pb-12 lg:pb-22">
        <div className="mx-auto max-w-3xl px-6 md:px-8 lg:px-12 space-y-10">
          <Article num="1" title="Objet">
            <p>
              Les présentes conditions générales de vente régissent les
              relations entre{" "}
              <strong className="font-medium text-warm-900">
                Asmaa Mansouri
              </strong>
              , naturopathe exerçant au {site.address.full}, et toute
              personne réservant l&apos;une de ses prestations. Toute prise
              de rendez-vous vaut acceptation de ces conditions.
            </p>
          </Article>

          <Article num="2" title="Prestations">
            <p>Asmaa Mansouri propose les prestations suivantes :</p>
            <ul className="space-y-2 pl-0">
              <Bullet>Appel découverte</Bullet>
              <Bullet>Consultation naturopathique</Bullet>
              <Bullet>Massage thérapeutique Tuina</Bullet>
              <Bullet>Cupping therapy</Bullet>
              <Bullet>Accompagnement individualisé sur trois mois</Bullet>
              <Bullet>Ateliers thématiques</Bullet>
            </ul>
            <p>
              Le détail de chaque prestation, sa durée et son prix sont
              présentés sur les pages dédiées du site et rappelés au moment de
              la prise de rendez-vous.
            </p>
          </Article>

          <Article num="3" title="Réservation">
            <p>
              La réservation s&apos;effectue via la plateforme Resalib (
              <a
                href={site.resalibUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-warm-900 underline underline-offset-4 decoration-warm-700/40 hover:decoration-warm-900"
              >
                fiche praticienne
              </a>
              ), par téléphone au{" "}
              <a
                href={site.phoneHref}
                className="text-warm-900 underline underline-offset-4 decoration-warm-700/40 hover:decoration-warm-900"
              >
                {site.phone}
              </a>{" "}
              ou par email à{" "}
              <a
                href={`mailto:${site.email}`}
                className="text-warm-900 underline underline-offset-4 decoration-warm-700/40 hover:decoration-warm-900"
              >
                {site.email}
              </a>
              . La confirmation d&apos;un créneau vaut acceptation de la
              prestation et des présentes CGV.
            </p>
          </Article>

          <Article num="4" title="Tarifs et paiement">
            <p>
              Les tarifs sont indiqués en euros sur les pages dédiées du
              site. TVA non applicable, article 293 B du CGI.
            </p>
            <p>
              Le paiement est dû à l&apos;issue de chaque séance, par carte
              bancaire, espèces ou virement. Une facture peut être remise
              sur demande. L&apos;accompagnement sur trois mois fait
              l&apos;objet d&apos;un forfait payable en une ou plusieurs
              fois selon ce qui est convenu lors de la réservation.
            </p>
            <p>
              Les séances ne sont pas prises en charge par l&apos;Assurance
              Maladie. Certaines mutuelles proposent un remboursement
              partiel, à vérifier auprès de la vôtre.
            </p>
          </Article>

          <Article num="5" title="Annulation et report">
            <p>
              Toute annulation ou report doit être communiqué au minimum{" "}
              <strong className="font-medium text-warm-900">
                24 heures avant le rendez-vous
              </strong>
              , par téléphone, SMS ou email. Passé ce délai, ou en cas
              d&apos;absence non prévenue, la séance est due en intégralité.
            </p>
            <p>
              En cas d&apos;empêchement de ma part, je vous propose dans les
              meilleurs délais un nouveau créneau.
            </p>
          </Article>

          <Article num="6" title="Droit de rétractation">
            <p>
              Pour toute réservation en ligne, vous disposez d&apos;un délai
              de rétractation de 14&nbsp;jours à compter de la confirmation
              du rendez-vous, conformément au Code de la consommation. Si la
              séance a lieu avant la fin de ce délai, à votre demande, vous
              renoncez à ce droit.
            </p>
          </Article>

          <Article num="7" title="Responsabilité">
            <p>
              La naturopathie est une pratique de bien-être et
              d&apos;hygiène de vie. Elle ne remplace pas un avis ou un
              traitement médical. Pour tout problème de santé nécessitant
              une prise en charge médicale, consultez un médecin et
              n&apos;interrompez jamais un traitement en cours sans son
              accord.
            </p>
            <p>
              Le client s&apos;engage à fournir des informations exactes
              sur son état de santé et ses traitements en cours. À défaut,
              la responsabilité d&apos;Asmaa Mansouri ne peut être engagée.
            </p>
          </Article>

          <Article num="8" title="Confidentialité">
            <p>
              Les informations échangées en consultation sont couvertes par
              le secret professionnel. Le traitement des données
              personnelles est détaillé dans la{" "}
              <Link
                href="/politique-confidentialite"
                className="text-warm-900 underline underline-offset-4 decoration-warm-700/40 hover:decoration-warm-900"
              >
                politique de confidentialité
              </Link>
              .
            </p>
          </Article>

          <Article num="9" title="Propriété intellectuelle">
            <p>
              Les protocoles, fiches conseils et supports remis au client dans
              le cadre d&apos;une prestation sont strictement personnels. Toute
              reproduction, diffusion ou revente sans accord écrit est
              interdite.
            </p>
          </Article>

          <Article num="10" title="Droit applicable et litiges">
            <p>
              Les présentes CGV sont soumises au droit français. En cas de
              différend, nous privilégions toujours la recherche
              d&apos;une solution amiable avant toute procédure judiciaire.
            </p>
          </Article>

          <Article num="11" title="Contact">
            <p>
              Pour toute question relative aux présentes CGV, contactez-nous à{" "}
              <a
                href={`mailto:${site.email}`}
                className="text-warm-900 underline underline-offset-4 decoration-warm-700/40 hover:decoration-warm-900"
              >
                {site.email}
              </a>{" "}
              ou au{" "}
              <a
                href={site.phoneHref}
                className="text-warm-900 underline underline-offset-4 decoration-warm-700/40 hover:decoration-warm-900"
              >
                {site.phone}
              </a>
              .
            </p>
          </Article>
        </div>
      </section>
    </main>
  );
}

function Article({
  num,
  title,
  children,
}: {
  num: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article>
      <h2 className="font-display text-2xl lg:text-3xl font-medium tracking-[-0.01em] leading-[1.2] text-warm-900">
        Article {num} · {title}
      </h2>
      <div className="mt-4 space-y-3 font-body text-base leading-relaxed text-warm-700">
        {children}
      </div>
    </article>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span
        aria-hidden="true"
        className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
      />
      <span>{children}</span>
    </li>
  );
}
