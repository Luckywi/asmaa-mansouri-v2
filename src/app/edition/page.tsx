import type { Metadata } from "next";
import { specialites } from "@/data/specialites";
import { getContent } from "@/lib/content-kv";
import { EditionForm } from "@/components/edition/EditionForm";
import type { EditableContent } from "@/types/content";

/**
 * /edition — page de saisie du contenu éditorial par Asmaa.
 *
 * URL non linkée (noindex, pas de lien depuis la nav). Asmaa remplit les
 * champs "À compléter" de chaque spécialité, clique sur Enregistrer, le
 * JSON est stocké dans Cloudflare KV. Le dev récupère ensuite le JSON
 * pour alimenter `src/data/specialites.ts`.
 *
 * Le site public n'est pas impacté : il reste 100% statique.
 *
 * Server Component : précharge le JSON KV pour prefill du formulaire
 * quand Asmaa revient finir une session en cours.
 */

export const metadata: Metadata = {
  title: "Édition contenu · Asmaa",
  robots: { index: false, follow: false, nocache: true },
};

// Jamais de cache — on veut toujours le dernier JSON KV au chargement.
export const dynamic = "force-dynamic";

export default async function EditionPage() {
  let initial: EditableContent = { note: "", specialites: {} };
  let initError: string | null = null;

  try {
    initial = await getContent();
  } catch (err) {
    initError = err instanceof Error ? err.message : "Erreur inconnue";
  }

  return (
    <main id="contenu-principal" className="flex-1 pt-32 md:pt-36 lg:pt-40">
      {initError ? (
        <section className="relative pb-8">
          <div className="mx-auto max-w-3xl px-6 md:px-8">
            <p className="rounded-md border border-red-300 bg-red-50 p-4 font-body text-sm text-red-900">
              Impossible de charger le contenu existant : {initError}
              <br />
              Vérifiez que <code>CF_KV_TOKEN</code> est bien configuré dans
              les variables d&apos;environnement.
            </p>
          </div>
        </section>
      ) : null}

      <EditionForm
        specialites={specialites.map((s) => ({
          slug: s.slug,
          title: s.title,
          symptomesItemsCount: s.symptomes.items.length,
          faq: s.faq.map((f) => f.question),
        }))}
        initial={initial}
      />
    </main>
  );
}
