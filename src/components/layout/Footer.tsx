import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { LogoMark } from "@/components/ui/LogoMark";
import { navLinks } from "@/data/navigation";
import { prestations } from "@/data/prestations";
import { site } from "@/data/site";

/**
 * Spécialités individuelles exposées dans le footer.
 *
 * Inlinées ici parce que le Footer est l'unique consommateur en Phase 1.
 * Si on les réutilise ailleurs (page hub /specialites Phase 2, sitemap,
 * schema.org Service), on extraira vers `src/data/specialites.ts` avec
 * un type partagé dans `src/types`.
 *
 * Curation : 5 thématiques tirées de PERSONA.md et de la section
 * Specialites.tsx (qui les regroupe en 3 buckets macro). Le footer
 * affiche la version "individuelle" parce que ce sont les vrais mots-clés
 * SEO long-tail (SOPK, endométriose, etc.) — la lecture macro reste
 * sur la section landing.
 *
 * `href` : ancre vers #specialites de la landing en Phase 1. `futureHref`
 * documente la route dédiée Phase 2 (même pattern que `data/navigation.ts`),
 * pour rendre la migration triviale (search/replace de la colonne).
 */
const specialitesLinks = [
  { label: "SOPK", href: "/#specialites", futureHref: "/specialites/sopk" },
  { label: "Endométriose", href: "/#specialites", futureHref: "/specialites/endometriose" },
  { label: "Ménopause", href: "/#specialites", futureHref: "/specialites/premenopause" },
  { label: "Post-partum", href: "/#specialites", futureHref: "/specialites/post-partum" },
  { label: "Fertilité", href: "/#specialites", futureHref: "/specialites/fertilite" },
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
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Politique de confidentialité", href: "/politique-confidentialite" },
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
  return (
    <div>
      <div className="h-px bg-vert-700/15 lg:hidden" />
      <h3 className="mt-4 lg:mt-0 font-display text-xs font-medium uppercase tracking-[0.18em] text-vert-900">
        {title}
      </h3>
      <nav className="mt-4 flex flex-col gap-2.5 pb-4 lg:pb-0">{children}</nav>
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
      className="font-body text-sm text-vert-700/80 transition-colors duration-150 ease-out hover:text-vert-900"
    >
      {children}
    </Link>
  );
}

/**
 * Footer — composant chrome OS-level, transparent (pas de glass).
 *
 * Architecture en 4 zones, séparées par des hairlines `bg-vert-700/15` :
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
 * une zone du body comme les sections, mais marquée par un hairline `vert-700/15`
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
        // internes du footer (vert-700/15). Pas de glass, pas de bg.
        "border-t border-vert-700/15",
        // Padding interne
        "pt-16 pb-10",
      ].join(" ")}
    >
      {/* Watermark LogoMark — décoratif, masqué par overflow-hidden du parent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -bottom-24 h-[420px] w-[420px] text-vert-700 opacity-[0.08]"
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
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vert-700",
            ].join(" ")}
          >
            {/* Glyphe SVG (LogoMark) à gauche, wordmark texte (Logo) à droite —
                forme un logo lockup horizontal. Les deux composants existent
                déjà et sont réutilisés tels quels. */}
            <LogoMark className="w-10 h-10 text-vert-900" />
            <Logo />
          </Link>

          <p className="mt-5 max-w-md font-body text-sm leading-relaxed text-vert-700">
            {site.baseline}
          </p>
        </div>

        {/* Hairline 1 — sous brand block */}
        <div className="mt-10 h-px bg-vert-700/15" />

        {/* ─── 2. Contact line ────────────────────────────── */}
        <div className="mt-6 flex flex-col items-center justify-center gap-2 lg:flex-row lg:gap-3">
          <a
            href={site.phoneHref}
            className="font-body text-sm text-vert-700/80 transition-colors duration-150 ease-out hover:text-vert-900"
          >
            {site.phone}
          </a>
          <span aria-hidden="true" className="hidden text-vert-700/30 lg:inline">
            ·
          </span>
          <a
            href={`mailto:${site.email}`}
            className="font-body text-sm text-vert-700/80 transition-colors duration-150 ease-out hover:text-vert-900"
          >
            {site.email}
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
              <FooterLink key={p.id} href="/#prestations">
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
          <div className="mt-10 h-px bg-vert-700/15" />

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
                <FooterLink key={p.id} href="/#prestations">
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
        <div className="mt-12 h-px bg-vert-700/15" />

        {/* ─── 4. Copyright centré ─────────────────────────── */}
        <p className="mt-6 text-center font-body text-xs text-vert-700/60">
          &copy; {new Date().getFullYear()} {site.name} — Naturopathe à Décines-Charpieu
        </p>
      </div>
    </footer>
  );
}
