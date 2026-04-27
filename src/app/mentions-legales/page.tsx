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
  title: "Mentions légales, Asmaa Mansouri naturopathe",
  description:
    "Informations légales du site naturopathe-decines.fr : éditeur, hébergeur, propriété intellectuelle, responsabilité. Conformité LCEN et RGPD.",
  path: "/mentions-legales",
  ogDescription:
    "Informations légales, éditeur et hébergeur du site naturopathe-decines.fr.",
  noindex: true,
});

export default function MentionsLegalesPage() {
  const pageUrl = absUrl("/mentions-legales");
  const jsonLd = buildGraph([
    buildWebPage({
      url: pageUrl,
      name: "Mentions légales, Asmaa Mansouri naturopathe",
      description:
        "Informations légales du site naturopathe-decines.fr : éditeur, hébergeur, propriété intellectuelle, responsabilité.",
      breadcrumb: `${pageUrl}#breadcrumb`,
    }),
    buildBreadcrumb([{ name: "Mentions légales", url: pageUrl }], pageUrl),
  ]);

  return (
    <main id="contenu-principal" className="flex-1">
      <JsonLd data={jsonLd} />
      <Breadcrumbs
        items={[{ label: "Mentions légales", href: "/mentions-legales" }]}
      />

      <section
        aria-labelledby="mentions-legales-titre"
        className="relative pt-8 pb-12 md:pt-10 lg:pt-12 lg:pb-16"
      >
        <div className="mx-auto max-w-3xl px-6 md:px-8 lg:px-12">
          <h1
            id="mentions-legales-titre"
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-[-0.02em] leading-[1.05] text-warm-900"
          >
            Mentions légales
          </h1>
          <p className="mt-6 font-body text-base text-warm-700">
            Dernière mise à jour : avril 2026
          </p>
        </div>
      </section>

      <section className="pb-12 lg:pb-22">
        <div className="mx-auto max-w-3xl px-6 md:px-8 lg:px-12 space-y-10">
          <LegalBlock title="Éditeur du site">
            <p>
              <strong className="font-medium text-warm-900">
                Asmaa Mansouri
              </strong>{" "}
              · Micro-entrepreneur
            </p>
            <p>Activité : naturopathe</p>
            <p>{site.address.full}</p>
            <p>SIRET : 952 583 466 00018</p>
            <p>Code APE : 96.09Z · Autres services personnels n.c.a.</p>
            <p>
              Téléphone :{" "}
              <a
                href={site.phoneHref}
                className="text-warm-900 underline underline-offset-4 decoration-warm-700/40 hover:decoration-warm-900"
              >
                {site.phone}
              </a>
            </p>
            <p>
              Email :{" "}
              <a
                href={`mailto:${site.email}`}
                className="text-warm-900 underline underline-offset-4 decoration-warm-700/40 hover:decoration-warm-900"
              >
                {site.email}
              </a>
            </p>
            <p>Directrice de la publication : Asmaa Mansouri</p>
          </LegalBlock>

          <LegalBlock title="Hébergeur">
            <p>
              <strong className="font-medium text-warm-900">Vercel Inc.</strong>
            </p>
            <p>440 N Barranca Avenue #4133</p>
            <p>Covina, CA 91723, États-Unis</p>
            <p>
              Site :{" "}
              <a
                href="https://vercel.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-warm-900 underline underline-offset-4 decoration-warm-700/40 hover:decoration-warm-900"
              >
                vercel.com
              </a>
            </p>
          </LegalBlock>

          <LegalBlock title="Propriété intellectuelle">
            <p>
              L&apos;ensemble des contenus du site est la propriété exclusive
              d&apos;Asmaa Mansouri, sauf mention contraire. Toute
              reproduction, diffusion ou réutilisation sans autorisation
              écrite est interdite.
            </p>
          </LegalBlock>

          <LegalBlock title="Données personnelles">
            <p>
              Les modalités de traitement des données personnelles collectées
              sur le site et en consultation sont détaillées dans la{" "}
              <Link
                href="/politique-confidentialite"
                className="text-warm-900 underline underline-offset-4 decoration-warm-700/40 hover:decoration-warm-900"
              >
                politique de confidentialité
              </Link>
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
      <div className="mt-4 space-y-2 font-body text-base leading-relaxed text-warm-700">
        {children}
      </div>
    </article>
  );
}
