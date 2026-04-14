"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { EditableContent, EditableSpecialite } from "@/types/content";

type SpecialiteMeta = {
  slug: string;
  title: string;
  symptomesItemsCount: number;
  faq: string[];
};

type Props = {
  specialites: SpecialiteMeta[];
  initial: EditableContent;
};

type SaveStatus = "saved" | "saving" | "error";

/** Délai d'attente avant auto-save après la dernière frappe. */
const AUTOSAVE_DEBOUNCE_MS = 800;

function emptyFor(meta: SpecialiteMeta): EditableSpecialite {
  return {
    definition: "",
    symptomesIntro: "",
    symptomesItems: Array(meta.symptomesItemsCount).fill(""),
    approche: "",
    faqAnswers: Array(meta.faq.length).fill(""),
  };
}

function hydrate(
  specialites: SpecialiteMeta[],
  initial: EditableContent
): EditableContent {
  const specialitesOut: Record<string, EditableSpecialite> = {};
  for (const meta of specialites) {
    const existing = initial.specialites[meta.slug];
    if (!existing) {
      specialitesOut[meta.slug] = emptyFor(meta);
      continue;
    }
    // Merge défensif : pad au bon nombre d'éléments si la shape KV diverge.
    specialitesOut[meta.slug] = {
      definition: existing.definition ?? "",
      symptomesIntro: existing.symptomesIntro ?? "",
      symptomesItems: Array.from(
        { length: meta.symptomesItemsCount },
        (_, i) => existing.symptomesItems?.[i] ?? ""
      ),
      approche: existing.approche ?? "",
      faqAnswers: Array.from(
        { length: meta.faq.length },
        (_, i) => existing.faqAnswers?.[i] ?? ""
      ),
    };
  }
  return {
    note: initial.note ?? "",
    specialites: specialitesOut,
  };
}

export function EditionForm({ specialites, initial }: Props) {
  const [data, setData] = useState<EditableContent>(() =>
    hydrate(specialites, initial)
  );
  const [status, setStatus] = useState<SaveStatus>("saved");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Skip l'auto-save au tout premier render : la state initiale vient de
  // `hydrate(initial)` qui peut différer de KV (pad des arrays) mais ne
  // constitue pas une modification utilisateur.
  const isFirstRender = useRef(true);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setStatus("saving");
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch("/api/content", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) {
          const body = (await res.json().catch(() => null)) as
            | { error?: string }
            | null;
          throw new Error(body?.error ?? `Erreur ${res.status}`);
        }
        setStatus("saved");
        setErrorMsg(null);
      } catch (err) {
        setStatus("error");
        setErrorMsg(err instanceof Error ? err.message : "Erreur inconnue");
      }
    }, AUTOSAVE_DEBOUNCE_MS);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [data]);

  function updateNote(value: string) {
    setData((prev) => ({ ...prev, note: value }));
  }

  function update(slug: string, patch: Partial<EditableSpecialite>) {
    setData((prev) => ({
      ...prev,
      specialites: {
        ...prev.specialites,
        [slug]: { ...prev.specialites[slug], ...patch },
      },
    }));
  }

  function updateItem(slug: string, idx: number, value: string) {
    setData((prev) => {
      const next = [...prev.specialites[slug].symptomesItems];
      next[idx] = value;
      return {
        ...prev,
        specialites: {
          ...prev.specialites,
          [slug]: { ...prev.specialites[slug], symptomesItems: next },
        },
      };
    });
  }

  function updateAnswer(slug: string, idx: number, value: string) {
    setData((prev) => {
      const next = [...prev.specialites[slug].faqAnswers];
      next[idx] = value;
      return {
        ...prev,
        specialites: {
          ...prev.specialites,
          [slug]: { ...prev.specialites[slug], faqAnswers: next },
        },
      };
    });
  }

  return (
    <>
      {/* Note globale pour le dev, en tête du formulaire */}
      <section className="relative pb-8">
        <div className="mx-auto max-w-3xl px-6 md:px-8">
          <div className="rounded-md bg-[var(--glass-bg)] backdrop-blur-xl backdrop-saturate-[1.8] border-[0.5px] border-white/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-1px_0_rgba(60,30,25,0.04),0_4px_16px_-6px_rgba(60,30,25,0.15)] p-6 lg:p-8">
            <h2 className="font-display text-xl lg:text-2xl font-medium text-warm-900 tracking-tight">
              Note pour Lucky
            </h2>
            <p className="mt-1 font-body text-sm text-warm-700/80">
              Supprimer, ajouter ou modifier une spécialité. Contenu
              spécifique à rajouter pour une problématique.
            </p>
            <textarea
              value={data.note}
              onChange={(e) => updateNote(e.target.value)}
              rows={5}
              className={`${textareaClass} mt-4`}
            />
          </div>
        </div>
      </section>

      <section className="relative pb-24">
        <div className="mx-auto max-w-3xl px-6 md:px-8 space-y-6">
          {specialites.map((meta, specIdx) => {
            const spec = data.specialites[meta.slug];
            return (
              <details
                key={meta.slug}
                className="group rounded-md bg-[var(--glass-bg)] backdrop-blur-xl backdrop-saturate-[1.8] border-[0.5px] border-white/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-1px_0_rgba(60,30,25,0.04),0_4px_16px_-6px_rgba(60,30,25,0.15)]"
              >
                <summary className="flex items-center justify-between cursor-pointer list-none p-6 lg:p-8 font-display text-2xl lg:text-3xl font-medium text-warm-900 tracking-tight">
                  {specIdx + 1}. {meta.title}
                  <ChevronDown
                    aria-hidden="true"
                    className="w-5 h-5 text-warm-700 transition-transform duration-200 group-open:rotate-180"
                    strokeWidth={1.5}
                  />
                </summary>

                <div className="px-6 lg:px-8 pb-8 space-y-8">
                  <Field
                    label="Définition"
                    hint="2 à 4 paragraphes. Contexte, mécanisme, causes."
                  >
                    <textarea
                      value={spec.definition}
                      onChange={(e) =>
                        update(meta.slug, { definition: e.target.value })
                      }
                      rows={8}
                      className={textareaClass}
                    />
                  </Field>

                  <Field
                    label="Intro des symptômes"
                    hint="Une phrase qui amène la liste ci-dessous."
                  >
                    <textarea
                      value={spec.symptomesIntro}
                      onChange={(e) =>
                        update(meta.slug, { symptomesIntro: e.target.value })
                      }
                      rows={3}
                      className={textareaClass}
                    />
                  </Field>

                  <Field
                    label={`Liste des symptômes (${meta.symptomesItemsCount} lignes)`}
                    hint="Un symptôme par champ."
                  >
                    <div className="space-y-2">
                      {spec.symptomesItems.map((val, i) => (
                        <input
                          key={i}
                          type="text"
                          value={val}
                          onChange={(e) =>
                            updateItem(meta.slug, i, e.target.value)
                          }
                          placeholder={`Symptôme ${i + 1}`}
                          className={inputClass}
                        />
                      ))}
                    </div>
                  </Field>

                  <Field
                    label="Approche"
                    hint="3 à 5 paragraphes. Méthode, axes de travail, durée d'accompagnement."
                  >
                    <textarea
                      value={spec.approche}
                      onChange={(e) =>
                        update(meta.slug, { approche: e.target.value })
                      }
                      rows={10}
                      className={textareaClass}
                    />
                  </Field>

                  <div className="space-y-6">
                    <h3 className="font-display text-lg font-medium text-warm-900">
                      Réponses FAQ
                    </h3>
                    {meta.faq.map((question, i) => (
                      <Field
                        key={i}
                        label={question}
                        hint="Réponse personnelle : durées, cas concrets, nuances."
                      >
                        <textarea
                          value={spec.faqAnswers[i] ?? ""}
                          onChange={(e) =>
                            updateAnswer(meta.slug, i, e.target.value)
                          }
                          rows={4}
                          className={textareaClass}
                        />
                      </Field>
                    ))}
                  </div>
                </div>
              </details>
            );
          })}
        </div>
      </section>

      {/* Indicateur d'état auto-save sticky en bas */}
      <div className="sticky bottom-0 left-0 right-0 z-10 border-t-[0.5px] border-white/50 bg-[var(--glass-bg)] backdrop-blur-xl backdrop-saturate-[1.8] shadow-[0_-4px_16px_-6px_rgba(60,30,25,0.15)]">
        <div className="mx-auto max-w-3xl px-6 md:px-8 py-3 font-body text-sm text-warm-700">
          {status === "saving" && "Enregistrement…"}
          {status === "saved" && "✓ Enregistré"}
          {status === "error" && (
            <span className="text-red-700">Erreur : {errorMsg}</span>
          )}
        </div>
      </div>
    </>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block font-body text-sm font-medium text-warm-900">
        {label}
      </label>
      {hint ? (
        <p className="mt-1 font-body text-xs text-warm-700/80">{hint}</p>
      ) : null}
      <div className="mt-2">{children}</div>
    </div>
  );
}

const inputClass =
  "w-full rounded-md border-[0.5px] border-warm-500 bg-white/60 px-3 py-2 font-body text-base text-warm-900 placeholder:text-warm-700/50 focus:outline-none focus:ring-2 focus:ring-warm-700/40 focus:border-warm-700";

const textareaClass = `${inputClass} leading-relaxed resize-y`;
