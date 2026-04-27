"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RefreshCw } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { navLinks } from "@/data/navigation";

/**
 * Error boundary global de l'app — convention App Router (`error.tsx`).
 *
 * Capture toute erreur runtime levée dans les pages enfants du layout
 * racine. Le Header et le Footer du layout restent visibles autour du
 * fallback, ce qui permet à l'utilisateur de naviguer ailleurs sans
 * que le site ne paraisse cassé.
 *
 * Si c'est le layout racine lui-même qui crash (cas extrême :
 * MotionProvider, JsonLd, fonts), `global-error.tsx` prend le relais.
 *
 * Client Component obligatoire (utilise `reset` et un effet de log).
 *
 * Statut HTTP : Next renvoie 500 par défaut quand cette boundary se
 * déclenche côté serveur ; côté client, le statut de la page d'origine
 * est conservé (l'erreur est juste affichée à la place du contenu).
 */
export default function GlobalErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log côté navigateur pour le debug local et pour les outils
    // d'observabilité (Sentry, Vercel) qui captent les console.error
    // automatiquement. Le digest est l'identifiant interne Next.js,
    // utile pour corréler avec les logs serveur.
    console.error(error);
  }, [error]);

  return (
    <main id="contenu-principal" className="flex-1">
      <section
        aria-labelledby="error-titre"
        className="relative pt-32 pb-16 md:pt-36 lg:pt-40 lg:pb-24"
      >
        <div className="mx-auto max-w-3xl px-6 md:px-8 lg:px-12 text-center">
          <p
            aria-hidden="true"
            className="font-display text-7xl sm:text-8xl lg:text-9xl font-medium tracking-[-0.04em] leading-none text-warm-900/15"
          >
            500
          </p>

          <h1
            id="error-titre"
            className="mt-6 font-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-[-0.02em] leading-[1.05] text-warm-900"
          >
            Une erreur est survenue
          </h1>

          <p className="mt-6 max-w-xl mx-auto font-body text-lg leading-relaxed text-warm-700">
            Quelque chose s&apos;est mal passé de notre côté. Vous pouvez
            réessayer le chargement de la page ou revenir à l&apos;accueil.
            Si le problème persiste, n&apos;hésitez pas à contacter Asmaa.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={reset}
              className={[
                "inline-flex items-center justify-center gap-1.5 h-10 px-5 rounded-md",
                "font-body text-[14px] font-medium tracking-[0.01em] whitespace-nowrap",
                "text-warm-100 bg-accent hover:bg-accent-hover",
                "shadow-[0_4px_12px_-2px_rgba(40,60,30,0.25),inset_0_1px_0_0_rgba(255,255,255,0.12)]",
                "transition-colors duration-150 ease-out",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warm-700",
              ].join(" ")}
            >
              Réessayer
              <RefreshCw aria-hidden="true" className="w-4 h-4" strokeWidth={1.5} />
            </button>
            <ButtonLink href="/" variant="secondary">
              Retour à l&apos;accueil
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Contacter Asmaa
            </ButtonLink>
          </div>

          <nav
            aria-label="Sections principales du site"
            className="mt-14 pt-10 border-t border-warm-500/40"
          >
            <p className="font-body text-sm uppercase tracking-[0.08em] text-warm-700/70">
              Ou continuez vers
            </p>
            <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 font-body text-base">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-warm-900 underline underline-offset-4 decoration-warm-700/40 hover:decoration-warm-900 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>
    </main>
  );
}
