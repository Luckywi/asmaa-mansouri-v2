import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { LogoMark } from "@/components/ui/LogoMark";
import { navLinks } from "@/data/navigation";
import { prestations } from "@/data/prestations";
import { site } from "@/data/site";

const specialitesLinks = [
  { label: "Troubles digestifs", href: "/specialites/troubles-digestifs" },
  { label: "Allergies saisonnières", href: "/specialites/allergies-saisonnieres" },
  { label: "Stress et burn-out", href: "/specialites/stress-burn-out" },
  { label: "Déséquilibres hormonaux", href: "/specialites/desequilibres-hormonaux" },
] as const;

/**
 * Override de label pour la colonne Prestations du footer.
 *
 * Les `title` de `data/prestations.ts` sont conçus pour les detail-cards
 * de la section Prestations (ex: "Consultations naturopathiques") et sont
 * trop longs pour une colonne footer étroite. On override par `id` plutôt
 * que de dupliquer la donnée — la source de vérité reste `data/prestations.ts`.
 *
 * Si une nouvelle prestation est ajoutée et qu'elle n'a pas d'override ici,
 * le fallback `?? p.title` s'applique automatiquement (pas de crash, juste
 * un label potentiellement trop long à corriger ensuite).
 */
const PRESTATION_FOOTER_LABELS: Record<string, string> = {
  consultation: "Consultations",
  tuina: "Massage thérapeutique Tuina",
  cupping: "Cupping Therapy",
  accompagnement: "Accompagnement 3 mois",
};

/**
 * Liens légaux affichés en 4e colonne du footer (Navigation / Spécialités /
 * Prestations / Légal). Les deux pages cibles sont des routes Phase 2 —
 * elles 404 en Phase 1, ce qui est cohérent avec le pattern futureHref
 * utilisé partout ailleurs (navLinks, specialitesLinks).
 */
const legalLinks = [
  { label: "Contact", href: "/contact" },
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Politique de confidentialité", href: "/politique-confidentialite" },
  { label: "CGV", href: "/cgv" },
] as const;

/**
 * FooterSection — titre uppercase + liste verticale de liens.
 *
 * Sur mobile, chaque section est précédée d'un séparateur 1px (caché en
 * desktop via `lg:hidden`) qui aide à délimiter visuellement les blocs
 * empilés. En desktop, les sections sont disposées en colonnes côte à
 * côte sans hairline interne.
 */
function FooterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const headingId = `footer-${title
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")}-titre`;
  return (
    <div>
      <div className="h-px bg-warm-700/15 lg:hidden" />
      <h3
        id={headingId}
        className="mt-4 lg:mt-0 font-display text-xs font-medium uppercase tracking-[0.18em] text-warm-900"
      >
        {title}
      </h3>
      <nav
        aria-labelledby={headingId}
        className="mt-4 flex flex-col gap-2.5 pb-4 lg:pb-0"
      >
        {children}
      </nav>
    </div>
  );
}

/**
 * FooterLink — lien interne stylisé du footer.
 *
 * Tous les liens des colonnes du footer partagent exactement le même
 * style. Le composant garantit cette cohérence sans dupliquer 15 fois la
 * même className. Pour les liens externes (Instagram, mailto, tel), on
 * utilise un `<a>` natif inline directement dans le composant Footer.
 */
function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-block py-1 font-body text-sm text-warm-700/80 transition-colors duration-150 ease-out hover:text-warm-900 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warm-700"
    >
      {children}
    </Link>
  );
}

/**
 * Footer — composant chrome OS-level, transparent (pas de glass).
 *
 * Architecture en 4 zones, séparées par des hairlines `bg-warm-700/15` :
 *
 *   1. Brand block centré : LogoMark (glyphe) + Logo (wordmark stacké) + baseline
 *   2. Contact line centrée : téléphone · email · Instagram (séparés par middots)
 *   3. Colonnes de navigation (3) : Navigation / Spécialités / Prestations
 *      - Mobile : empilées verticalement via `<FooterSection>` avec hairline top
 *      - Desktop : grid 3 colonnes (max-w-3xl, gap-12), centré
 *   4. Copyright + Mentions légales sur la même ligne (column → row en lg+)
 *
 * **Background — transparent, hérite du body :**
 * Conforme à la règle d'uniformité du projet (`project_no_section_bg_uniform`).
 * Pas de glass effect, pas de bg propre, pas de backdrop-filter. Le footer est
 * une zone du body comme les sections, mais marquée par un hairline `warm-700/15`
 * en bordure top pour donner un mini repère visuel "fin de page" sans casser
 * l'uniformité.
 *
 * **Sticky footer pattern :**
 * Le composant ne porte pas `mt-auto`. Le sticky footer fonctionne parce que :
 *   - body est `flex flex-col min-h-full` (cf. layout.tsx)
 *   - chaque page wrappe son contenu dans `<main className="flex-1">` qui occupe
 *     l'espace restant, poussant le footer vers le bas du viewport sur les
 *     pages courtes (mentions-legales, etc.) tout en restant immédiatement
 *     après le contenu sur les pages longues (landing).
 *   - **Convention :** toute nouvelle page DOIT wrapper son contenu dans
 *     `<main id="contenu-principal" className="flex-1">` pour que le sticky
 *     footer + le skip link continuent de fonctionner.
 *
 * **Watermark décoratif :**
 * Un LogoMark géant en absolute bottom-right, opacité ~0.08, masqué par
 * `overflow-hidden` du parent. `aria-hidden` parce que purement décoratif —
 * le nom accessible vient du Link "retour accueil" du brand block.
 *
 * Server Component pur — aucun state, aucun JS shipé.
 */
export function Footer() {
  return (
    <footer
      className={[
        "relative overflow-hidden",
        // Hairline top — mini repère "fin de page", aligné sur les hairlines
        // internes du footer (warm-700/15). Pas de glass, pas de bg.
        "border-t border-warm-700/15",
        // Padding interne
        "pt-16 pb-10",
      ].join(" ")}
    >
      {/* Watermark LogoMark — décoratif, masqué par overflow-hidden du parent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -bottom-24 h-[420px] w-[420px] text-warm-700 opacity-[0.08]"
      >
        <LogoMark className="w-full h-full" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6">
        {/* ─── 1. Brand block ─────────────────────────────── */}
        <div className="flex flex-col items-center text-center">
          <Link
            href="/"
            aria-label={`${site.name}, retour à l'accueil`}
            className={[
              "inline-flex items-center gap-3",
              "rounded-md p-2",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warm-700",
            ].join(" ")}
          >
            {/* Glyphe SVG (LogoMark) à gauche, wordmark texte (Logo) à droite —
                forme un logo lockup horizontal. Les deux composants existent
                déjà et sont réutilisés tels quels. */}
            <LogoMark className="w-10 h-10 text-warm-900" />
            <Logo />
          </Link>

          <p className="mt-5 max-w-md font-body text-sm leading-relaxed text-warm-700">
            {site.baseline}
          </p>
        </div>

        {/* Hairline 1 — sous brand block */}
        <div className="mt-10 h-px bg-warm-700/15" />

        {/* ─── 2. Contact line ────────────────────────────── */}
        <div className="mt-6 flex flex-col items-center justify-center gap-2 lg:flex-row lg:gap-3">
          <a
            href={site.phoneHref}
            className="inline-block py-1 font-body text-sm text-warm-700/80 transition-colors duration-150 ease-out hover:text-warm-900 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warm-700"
          >
            {site.phone}
          </a>
          <span aria-hidden="true" className="hidden text-warm-700/30 lg:inline">
            ·
          </span>
          <a
            href={`mailto:${site.email}`}
            className="inline-block py-1 font-body text-sm text-warm-700/80 transition-colors duration-150 ease-out hover:text-warm-900 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warm-700"
          >
            {site.email}
          </a>
          <span aria-hidden="true" className="hidden text-warm-700/30 lg:inline">
            ·
          </span>
          <a
            href={site.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Suivre ${site.instagram} sur Instagram`}
            className="inline-block py-1 font-body text-sm text-warm-700/80 transition-colors duration-150 ease-out hover:text-warm-900 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warm-700"
          >
            {site.instagram}
          </a>
        </div>

        {/* ─── 3a. Mobile : sections empilées ──────────────── */}
        <div className="mt-6 lg:hidden">
          <FooterSection title="Navigation">
            {navLinks.map((link) => (
              <FooterLink key={link.label} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </FooterSection>

          <FooterSection title="Spécialités">
            {specialitesLinks.map((link) => (
              <FooterLink key={link.label} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </FooterSection>

          <FooterSection title="Prestations">
            {prestations.map((p) => (
              <FooterLink key={p.id} href={`/prestations/${p.slug}`}>
                {PRESTATION_FOOTER_LABELS[p.id] ?? p.title}
              </FooterLink>
            ))}
            <FooterLink href="/ateliers">Ateliers</FooterLink>
          </FooterSection>

          <FooterSection title="Légal">
            {legalLinks.map((link) => (
              <FooterLink key={link.label} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </FooterSection>
        </div>

        {/* ─── 3b. Desktop : 4 colonnes ────────────────────── */}
        <div className="hidden lg:block">
          {/* Hairline 2 — sépare contact line des colonnes nav (desktop only,
              en mobile chaque FooterSection a déjà sa hairline interne) */}
          <div className="mt-10 h-px bg-warm-700/15" />

          <div className="mx-auto mt-10 grid max-w-4xl grid-cols-4 gap-10">
            <FooterSection title="Navigation">
              {navLinks.map((link) => (
                <FooterLink key={link.label} href={link.href}>
                  {link.label}
                </FooterLink>
              ))}
            </FooterSection>

            <FooterSection title="Spécialités">
              {specialitesLinks.map((link) => (
                <FooterLink key={link.label} href={link.href}>
                  {link.label}
                </FooterLink>
              ))}
            </FooterSection>

            <FooterSection title="Prestations">
              {prestations.map((p) => (
                <FooterLink key={p.id} href={`/prestations/${p.slug}`}>
                  {PRESTATION_FOOTER_LABELS[p.id] ?? p.title}
                </FooterLink>
              ))}
              <FooterLink href="/ateliers">Ateliers</FooterLink>
            </FooterSection>

            <FooterSection title="Légal">
              {legalLinks.map((link) => (
                <FooterLink key={link.label} href={link.href}>
                  {link.label}
                </FooterLink>
              ))}
            </FooterSection>
          </div>
        </div>

        {/* Hairline 3 — sépare colonnes du copyright */}
        <div className="mt-12 h-px bg-warm-700/15" />

        {/* ─── 4. Copyright centré ─────────────────────────── */}
        <p className="mt-6 text-center font-body text-xs text-warm-700/80">
          &copy; {new Date().getFullYear()} {site.name} — Naturopathe à Décines-Charpieu
        </p>
      </div>
    </footer>
  );
}
