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
  title: "Politique de confidentialité, naturopathe Décines",
  description:
    "Traitement des données personnelles sur naturopathe-decines.fr : formulaire de contact, cookies, droits RGPD et coordonnées du responsable de traitement.",
  path: "/politique-confidentialite",
  ogDescription:
    "Traitement des données personnelles et droits RGPD sur le site.",
  noindex: true,
});

export default function PolitiqueConfidentialitePage() {
  const pageUrl = absUrl("/politique-confidentialite");
  const jsonLd = buildGraph([
    buildWebPage({
      url: pageUrl,
      name: "Politique de confidentialité, naturopathe Décines",
      description:
        "Traitement des données personnelles sur naturopathe-decines.fr : formulaire de contact, cookies, droits RGPD.",
      breadcrumb: `${pageUrl}#breadcrumb`,
    }),
    buildBreadcrumb(
      [
        {
          name: "Politique de confidentialité",
          url: pageUrl,
        },
      ],
      pageUrl,
    ),
  ]);

  return (
    <main id="contenu-principal" className="flex-1">
      <JsonLd data={jsonLd} />
      <Breadcrumbs
        items={[
          {
            label: "Politique de confidentialité",
            href: "/politique-confidentialite",
          },
        ]}
      />

      <section
        aria-labelledby="politique-confidentialite-titre"
        className="relative pt-8 pb-12 md:pt-10 lg:pt-12 lg:pb-16"
      >
        <div className="mx-auto max-w-3xl px-6 md:px-8 lg:px-12">
          <h1
            id="politique-confidentialite-titre"
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-[-0.02em] leading-[1.05] text-warm-900"
          >
            Politique de confidentialité
          </h1>
          <p className="mt-6 font-body text-base text-warm-700">
            Dernière mise à jour : avril 2026
          </p>
        </div>
      </section>

      <section className="pb-12 lg:pb-22">
        <div className="mx-auto max-w-3xl px-6 md:px-8 lg:px-12 space-y-10">
          <LegalBlock title="Responsable du traitement">
            <p>
              Le responsable du traitement des données personnelles est{" "}
              <strong className="font-medium text-warm-900">
                Asmaa Mansouri
              </strong>
              , micro-entrepreneur exerçant en qualité de naturopathe au{" "}
              {site.address.full}. Contact :{" "}
              <a
                href={`mailto:${site.email}`}
                className="text-warm-900 underline underline-offset-4 decoration-warm-700/40 hover:decoration-warm-900"
              >
                {site.email}
              </a>
              .
            </p>
          </LegalBlock>

          <LegalBlock title="Données collectées">
            <p>
              Selon votre parcours, les données suivantes peuvent être
              collectées :
            </p>
            <ul className="space-y-2 pl-0">
              <Bullet>Nom et prénom</Bullet>
              <Bullet>Adresse email</Bullet>
              <Bullet>Numéro de téléphone</Bullet>
              <Bullet>
                Informations de santé recueillies en consultation
              </Bullet>
            </ul>
            <p>
              La prise de rendez-vous en ligne est assurée par Resalib, qui
              applique sa propre politique de confidentialité.
            </p>
          </LegalBlock>

          <LegalBlock title="Finalités du traitement">
            <p>Vos données sont utilisées exclusivement pour :</p>
            <ul className="space-y-2 pl-0">
              <Bullet>
                Répondre à vos demandes de contact et gérer vos rendez-vous
              </Bullet>
              <Bullet>
                Réaliser le bilan et le suivi naturopathique dans le cadre de la
                prestation convenue
              </Bullet>
              <Bullet>
                Respecter les obligations comptables et fiscales liées à
                l&apos;activité
              </Bullet>
            </ul>
            <p>
              Vos données ne sont jamais cédées, vendues ni louées à des
              tiers, et ne font l&apos;objet d&apos;aucune publicité ciblée.
            </p>
          </LegalBlock>

          <LegalBlock title="Durée de conservation">
            <p>
              Les données de contact sont conservées le temps de la relation
              commerciale, puis trois ans après le dernier échange. Les
              données comptables sont conservées dix ans conformément aux
              obligations légales. Les informations de santé recueillies en
              consultation sont conservées le temps nécessaire au suivi.
            </p>
          </LegalBlock>

          <LegalBlock title="Vos droits">
            <p>
              Conformément au <abbr title="Règlement général sur la protection des données">RGPD</abbr>, vous disposez d&apos;un droit d&apos;accès,
              de rectification, d&apos;effacement, de limitation, d&apos;opposition
              et de portabilité de vos données. Vous pouvez exercer ces droits à
              tout moment en écrivant à{" "}
              <a
                href={`mailto:${site.email}`}
                className="text-warm-900 underline underline-offset-4 decoration-warm-700/40 hover:decoration-warm-900"
              >
                {site.email}
              </a>
              .
            </p>
            <p>
              En cas de réclamation, vous avez également la possibilité de
              saisir la Commission nationale de l&apos;informatique et des
              libertés (<abbr title="Commission nationale de l'informatique et des libertés">CNIL</abbr>) via{" "}
              <a
                href="https://www.cnil.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-warm-900 underline underline-offset-4 decoration-warm-700/40 hover:decoration-warm-900"
              >
                cnil.fr
              </a>
              .
            </p>
          </LegalBlock>

          <LegalBlock title="Secret professionnel">
            <p>
              Les informations de santé confiées lors d&apos;une consultation
              sont couvertes par le secret professionnel. Elles ne sont en
              aucun cas transmises à des tiers sans votre consentement explicite.
            </p>
          </LegalBlock>

          <LegalBlock title="Cookies">
            <p>
              Ce site n&apos;utilise aucun cookie de traçage publicitaire.
              Seuls des cookies techniques strictement nécessaires au
              fonctionnement du site sont utilisés.
            </p>
          </LegalBlock>

          <LegalBlock title="Contact">
            <p>
              Pour toute question relative à cette politique de confidentialité,
              contactez-nous à{" "}
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
          </LegalBlock>
        </div>
      </section>
    </main>
  );
}

function LegalBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article>
      <h2 className="font-display text-2xl lg:text-3xl font-medium tracking-[-0.01em] leading-[1.2] text-warm-900">
        {title}
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
