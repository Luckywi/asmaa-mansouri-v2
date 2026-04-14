import { NextResponse } from "next/server";
import { getContent, putContent } from "@/lib/content-kv";
import type { EditableContent } from "@/types/content";

/**
 * Route handler pour le contenu éditorial stocké dans Cloudflare KV.
 *
 *   GET  /api/content  → JSON du contenu actuellement en KV (ou {})
 *   POST /api/content  → sauvegarde le JSON en body, remplace la clé KV
 *
 * Pas d'auth : URL `/edition` non linkée, usage interne Asmaa ↔ dev.
 * Si besoin plus tard : header partagé ou basic auth Vercel middleware.
 *
 * Runtime Node.js (par défaut) pour accéder aux env vars côté serveur.
 */

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await getContent();
    return NextResponse.json(data);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur inconnue";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as EditableContent;
    await putContent(body);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur inconnue";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
