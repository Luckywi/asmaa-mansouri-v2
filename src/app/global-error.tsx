"use client";

import { useEffect } from "react";
import "./globals.css";

/**
 * Fallback ultime — convention App Router (`global-error.tsx`).
 *
 * Se déclenche uniquement si le layout racine (`app/layout.tsx`) lui-même
 * crash (next/font qui throw, MotionProvider qui throw, JsonLd builder qui
 * throw avant le rendu). Dans ce cas la boundary `error.tsx` standard ne
 * peut pas afficher le fallback parce qu'elle est contenue dans un layout
 * mort.
 *
 * Contraintes Next.js :
 *   - Doit définir son propre <html> et <body> (remplace le layout racine).
 *   - Doit être un Client Component.
 *   - Pas d'accès au Header / Footer / fonts du layout (qui sont morts).
 *
 * Style minimal, on-brand, sans dépendance autre que globals.css. Pas de
 * lien Next/Link (le routeur peut être instable), juste un `<a>` natif.
 *
 * Le `<html lang="fr">` est répliqué pour préserver l'accessibilité même
 * en mode dégradé (lecteurs d'écran, traduction navigateur).
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="fr" dir="ltr">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          backgroundColor: "#F2E4CF",
          color: "#38512F",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem 1.5rem",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "36rem" }}>
          <p
            aria-hidden="true"
            style={{
              fontSize: "clamp(4rem, 12vw, 7rem)",
              fontWeight: 500,
              lineHeight: 1,
              letterSpacing: "-0.04em",
              margin: 0,
              color: "rgba(30, 55, 21, 0.15)",
            }}
          >
            500
          </p>

          <h1
            style={{
              marginTop: "1.5rem",
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 500,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "#1e3715",
              margin: "1.5rem 0 0 0",
            }}
          >
            Une erreur critique est survenue
          </h1>

          <p
            style={{
              marginTop: "1.25rem",
              fontSize: "1.05rem",
              lineHeight: 1.65,
              color: "#38512F",
              maxWidth: "32rem",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Le site n&apos;a pas pu charger correctement. Vous pouvez essayer
            de recharger la page ou revenir à l&apos;accueil.
          </p>

          <div
            style={{
              marginTop: "2.25rem",
              display: "flex",
              flexWrap: "wrap",
              gap: "0.75rem",
              justifyContent: "center",
            }}
          >
            <button
              type="button"
              onClick={reset}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                height: "2.5rem",
                padding: "0 1.25rem",
                borderRadius: "6px",
                border: 0,
                cursor: "pointer",
                fontSize: "0.875rem",
                fontWeight: 500,
                letterSpacing: "0.01em",
                color: "#F2E4CF",
                backgroundColor: "#38512F",
                boxShadow:
                  "0 4px 12px -2px rgba(40,60,30,0.25), inset 0 1px 0 0 rgba(255,255,255,0.12)",
              }}
            >
              Recharger la page
            </button>
            <a
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                height: "2.5rem",
                padding: "0 1.25rem",
                borderRadius: "6px",
                fontSize: "0.875rem",
                fontWeight: 500,
                letterSpacing: "0.01em",
                color: "#1e3715",
                backgroundColor: "rgba(255, 248, 240, 0.65)",
                border: "0.5px solid rgba(255,255,255,0.5)",
                textDecoration: "none",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.7), 0 4px 16px -6px rgba(60,30,25,0.15)",
              }}
            >
              Retour à l&apos;accueil
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
