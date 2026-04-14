import type { EditableContent } from "@/types/content";

/**
 * Client minimal pour Cloudflare Workers KV via l'API REST.
 *
 * Server-only : ce module ne doit jamais être importé côté client (il
 * manipule le token API Cloudflare, secret). Utilisé exclusivement par
 * les route handlers `src/app/api/content/route.ts`.
 *
 * Une seule clé `content` stocke tout le contenu éditorial en JSON.
 */

const ACCOUNT_ID = process.env.CF_ACCOUNT_ID;
const NAMESPACE_ID = process.env.CF_KV_NAMESPACE_ID;
const API_TOKEN = process.env.CF_KV_TOKEN;
const KEY = "content";

const endpoint = () =>
  `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/storage/kv/namespaces/${NAMESPACE_ID}/values/${KEY}`;

function assertEnv() {
  if (!ACCOUNT_ID || !NAMESPACE_ID || !API_TOKEN) {
    throw new Error(
      "Cloudflare KV non configuré : vérifier CF_ACCOUNT_ID, CF_KV_NAMESPACE_ID, CF_KV_TOKEN dans les env vars."
    );
  }
}

const emptyContent: EditableContent = { note: "", specialites: {} };

export async function getContent(): Promise<EditableContent> {
  assertEnv();
  const res = await fetch(endpoint(), {
    headers: { Authorization: `Bearer ${API_TOKEN}` },
    cache: "no-store",
  });

  if (res.status === 404) return emptyContent;
  if (!res.ok) {
    throw new Error(`KV GET ${res.status}: ${await res.text()}`);
  }

  const text = await res.text();
  if (!text) return emptyContent;

  try {
    const parsed = JSON.parse(text);
    if (!parsed || typeof parsed !== "object") return emptyContent;
    return {
      note: typeof parsed.note === "string" ? parsed.note : "",
      specialites:
        parsed.specialites && typeof parsed.specialites === "object"
          ? parsed.specialites
          : {},
    };
  } catch {
    return emptyContent;
  }
}

export async function putContent(data: EditableContent): Promise<void> {
  assertEnv();
  const res = await fetch(endpoint(), {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      "Content-Type": "text/plain",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(`KV PUT ${res.status}: ${await res.text()}`);
  }
}
