"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { site } from "@/data/site";

/**
 * Formulaire — bloc principal de la page `/contact`.
 *
 * Pas de backend, pas de service d'envoi tiers : au submit, on construit
 * un lien `mailto:` avec tous les champs préremplis (destinataire, sujet,
 * corps du message) et on ouvre le client mail par défaut de l'utilisateur
 * via `window.location.href`.
 *
 * Avantages :
 *   - Zéro env var, zéro clé API, zéro dépendance.
 *   - L'utilisateur part d'un brouillon dans son propre mail (Gmail, Mail
 *     macOS, Outlook, etc.) — il peut relire, ajouter une pièce jointe,
 *     corriger, puis cliquer sur "Envoyer" depuis son client.
 *
 * Limite connue : si l'utilisateur n'a pas de client mail configuré (cas
 * rare sur desktop sans Gmail handler), le `mailto:` ne se passe rien.
 * Les contacts directs (tel, Instagram) de la card latérale servent
 * alors de filet de sécurité.
 *
 * Client Component — nécessite `window` au submit.
 */
export function Formulaire() {
  const [opened, setOpened] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const subjectRaw = String(data.get("subject") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const subject = subjectRaw || `Message de ${name || "—"}`;

    const body = [
      `Nom : ${name}`,
      `Email : ${email}`,
      phone ? `Téléphone : ${phone}` : null,
      ``,
      message,
    ]
      .filter((line) => line !== null)
      .join("\n");

    const href =
      `mailto:${site.email}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    window.location.href = href;
    setOpened(true);
  }

  const inputClass = [
    "w-full h-11 px-4 rounded-md",
    "bg-warm-300/50 border border-warm-700/15",
    "font-body text-sm text-warm-900 placeholder:text-warm-700/50",
    "transition-colors duration-150 ease-out",
    "focus:outline-none focus:border-warm-700/40 focus:bg-warm-300",
  ].join(" ");

  const labelClass =
    "block font-body text-xs font-medium uppercase tracking-widest text-warm-700/70 mb-2";

  return (
    <form
      onSubmit={handleSubmit}
      className={[
        "relative h-full flex flex-col rounded-md p-6 md:p-8",
        "bg-[var(--glass-bg)]",
        "backdrop-blur-xl backdrop-saturate-[1.8]",
        "border-[0.5px] border-white/50",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-1px_0_rgba(60,30,25,0.04),0_4px_16px_-6px_rgba(60,30,25,0.15)]",
      ].join(" ")}
    >
      <h2 className="font-display text-2xl lg:text-3xl font-medium tracking-[-0.01em] text-warm-900">
        Écrire un message
      </h2>
      <p className="mt-2 font-body text-sm text-warm-700">
        Votre client mail s&apos;ouvre avec le message prérempli.
      </p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-name" className={labelClass}>
            Nom <span className="text-warm-900">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            maxLength={120}
            autoComplete="name"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="contact-email" className={labelClass}>
            Email <span className="text-warm-900">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="contact-phone" className={labelClass}>
            Téléphone
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            maxLength={40}
            autoComplete="tel"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="contact-subject" className={labelClass}>
            Sujet
          </label>
          <input
            id="contact-subject"
            name="subject"
            type="text"
            maxLength={200}
            className={inputClass}
          />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="contact-message" className={labelClass}>
          Message <span className="text-warm-900">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={4}
          maxLength={5000}
          className={[
            inputClass,
            "py-3 resize-y min-h-[140px] max-h-[340px] leading-relaxed",
          ].join(" ")}
        />
      </div>

      {opened ? (
        <p
          role="status"
          className="mt-4 font-body text-sm text-warm-900 bg-warm-300 border border-warm-700/20 rounded-md px-4 py-3"
        >
          Votre client mail s&apos;est ouvert. Vérifiez le message puis
          cliquez sur <span className="text-warm-900">Envoyer</span> pour
          finaliser.
        </p>
      ) : null}

      <div className="mt-6 flex justify-start">
        <button
          type="submit"
          className={[
            "inline-flex items-center justify-center gap-1.5 h-10 px-5 rounded-md",
            "font-body text-[14px] font-medium tracking-[0.01em] whitespace-nowrap",
            "text-warm-100 bg-accent hover:bg-accent-hover",
            "shadow-[0_4px_12px_-2px_rgba(40,60,30,0.25),inset_0_1px_0_0_rgba(255,255,255,0.12)]",
            "transition-colors duration-150 ease-out",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warm-700",
          ].join(" ")}
        >
          Envoyer le message
          <Send aria-hidden="true" className="w-4 h-4" strokeWidth={1.5} />
        </button>
      </div>
    </form>
  );
}
