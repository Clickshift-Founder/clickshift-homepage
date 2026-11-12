"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { SERVICES } from "@/lib/services";
import { TEMPLATES } from "@/lib/templates";
import { SITE } from "@/lib/site";
import { BUDGET_OPTIONS, TIMELINES } from "@/lib/enquiry";

const EXTRA = [
  { slug: "template", name: "A CRM template" },
  { slug: "other", name: "Something else" },
];

function Pill({ on, children, onClick }: { on: boolean; children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className={`min-h-11 rounded-full px-4 text-left text-[14px] transition-colors ${
        on ? "bg-ink text-paper" : "bg-paper text-ink/75 ring-1 ring-ink/10 hover:ring-ink/30"
      }`}
    >
      {children}
    </button>
  );
}

export default function BriefBuilder() {
  const params = useSearchParams();
  const initial = params.get("service") ?? "";
  const item = params.get("item");
  const ref = params.get("ref");

  const [service, setService] = useState(initial);
  const [budget, setBudget] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [org, setOrg] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(""); // honeypot: hidden from people
  const [about, setAbout] = useState(() => {
    if (item === "bundle") return "I'd like to reserve the All-Access template library.";
    if (item === "setup") return "I'd like a template set up in our account.";
    const t = TEMPLATES.find((x) => x.slug === item);
    if (t) return `I'd like to reserve the "${t.name}" template (${t.platform}).`;
    return "";
  });
  const [state, setState] = useState<"idle" | "busy" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const [fallback, setFallback] = useState<string | null>(null);
  const opened = useRef(0);
  useEffect(() => {
    opened.current = Date.now();
  }, []);

  const options = [...SERVICES.map((s) => ({ slug: s.slug, name: s.name })), ...EXTRA];
  const chosen = options.find((o) => o.slug === service);

  const mailto = useMemo(() => {
    const subject = `New project: ${chosen?.name ?? "Enquiry"}${org ? ` · ${org}` : ""}`;
    const body = [`Name: ${name}`, `Organisation: ${org || "-"}`, `Email: ${email}`, `Interested in: ${chosen?.name ?? "-"}`, `Budget: ${budget || "-"}`, `Timeline: ${time || "-"}`, "", about].join("\n");
    return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [chosen, org, name, email, budget, time, about]);

  const ready = name.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim()) && about.trim().length >= 10;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!ready || state === "busy") return;
    setState("busy");
    setError("");
    let vid: string | undefined;
    try {
      vid = window.localStorage.getItem("cs_vid") ?? undefined;
    } catch {}
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company: org,
          service,
          item,
          budget,
          timeline: time,
          message: about,
          ref,
          page: window.location.pathname + window.location.search,
          website,
          elapsed: Date.now() - opened.current,
          vid,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (data.fallback) setFallback(mailto);
        throw new Error(res.status === 503 ? "Our form is offline for a moment." : data.error || "Something went wrong.");
      }
      setState("done");
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (state === "done") {
    return (
      <div className="rounded-[26px] bg-white p-7 sm:p-10" role="status" aria-live="polite">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-signal text-ink">
          <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden>
            <path d="M4 11.5l4.5 4.5L18 6.5" stroke="currentColor" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h2 className="mt-5 font-display text-3xl tracking-tight">Brief received. Thank you, {name.trim().split(/\s+/)[0]}.</h2>
        <p className="mt-3 max-w-xl text-[16px] leading-relaxed text-mute">
          A confirmation is on its way to <b className="text-ink">{email}</b>, and a real person will reply within one working day. If you
          don&apos;t see it, check your spam folder.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Link href="/work" className="inline-flex min-h-12 items-center justify-center rounded-full bg-ink px-6 text-[15px] font-medium text-paper hover:bg-cobalt">
            See our work while you wait
          </Link>
          <Link href="/blog" className="inline-flex min-h-12 items-center justify-center rounded-full border border-ink/15 px-6 text-[15px] font-medium">
            Read the Journal
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form className="space-y-8 rounded-[26px] bg-white p-6 sm:p-9" onSubmit={submit} noValidate>
      <fieldset>
        <legend className="font-display text-xl tracking-tight">
          <span className="mr-2 font-mono text-[12px] text-cobalt">01</span>What can we help with?
        </legend>
        <div className="mt-4 flex flex-wrap gap-2">
          {options.map((o) => (
            <Pill key={o.slug} on={service === o.slug} onClick={() => setService(o.slug)}>
              {o.name}
            </Pill>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="font-display text-xl tracking-tight">
          <span className="mr-2 font-mono text-[12px] text-cobalt">02</span>Tell us about it
        </legend>
        <label htmlFor="about" className="sr-only">
          What you want to build or automate
        </label>
        <textarea
          id="about"
          required
          rows={5}
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          placeholder="What's manual, slow or missing today? What tools do you use? What would 'done' look like?"
          className="mt-4 w-full rounded-2xl border border-ink/12 bg-paper/50 p-4 text-base outline-none focus:border-cobalt"
        />
      </fieldset>

      <div className="grid gap-8 sm:grid-cols-2">
        <fieldset>
          <legend className="font-display text-xl tracking-tight">
            <span className="mr-2 font-mono text-[12px] text-cobalt">03</span>Budget
          </legend>
          <div className="mt-4 flex flex-wrap gap-2">
            {BUDGET_OPTIONS.map((b) => (
              <Pill key={b.label} on={budget === b.label} onClick={() => setBudget(b.label)}>
                {b.label}
              </Pill>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className="font-display text-xl tracking-tight">Timeline</legend>
          <div className="mt-4 flex flex-wrap gap-2">
            {TIMELINES.map((t) => (
              <Pill key={t} on={time === t} onClick={() => setTime(t)}>
                {t}
              </Pill>
            ))}
          </div>
        </fieldset>
      </div>

      <fieldset>
        <legend className="font-display text-xl tracking-tight">
          <span className="mr-2 font-mono text-[12px] text-cobalt">04</span>Who should we reply to?
        </legend>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {[
            { id: "name", label: "Your name", v: name, set: setName, type: "text", ac: "name", req: true },
            { id: "org", label: "Organisation", v: org, set: setOrg, type: "text", ac: "organization", req: false },
            { id: "email", label: "Email", v: email, set: setEmail, type: "email", ac: "email", req: true },
          ].map((f) => (
            <label key={f.id} className="block">
              <span className="text-[13px] text-mute">
                {f.label}
                {f.req ? " *" : ""}
              </span>
              <input
                type={f.type}
                required={f.req}
                autoComplete={f.ac}
                inputMode={f.type === "email" ? "email" : undefined}
                value={f.v}
                onChange={(e) => f.set(e.target.value)}
                className="mt-1 h-12 w-full rounded-xl border border-ink/12 bg-paper/50 px-4 text-base outline-none focus:border-cobalt"
              />
            </label>
          ))}
        </div>
        <label aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
          Website
          <input tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
        </label>
      </fieldset>

      <div className="flex flex-col gap-3 border-t border-ink/8 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[13px] text-mute">
          We reply within one working day. See our{" "}
          <Link href="/privacy" className="underline underline-offset-2">
            privacy notice
          </Link>
          .
        </p>
        <button
          type="submit"
          disabled={!ready || state === "busy"}
          className="min-h-12 rounded-full bg-ink px-7 text-[15px] font-medium text-paper transition-colors hover:bg-cobalt disabled:cursor-not-allowed disabled:opacity-40"
        >
          {state === "busy" ? "Sending…" : "Send the brief →"}
        </button>
      </div>
      {state === "error" && (
        <p className="rounded-xl bg-red-50 p-4 text-[14px] text-red-800" role="alert">
          {error}{" "}
          {fallback ? (
            <a className="font-medium underline" href={fallback}>
              Send it by email instead
            </a>
          ) : (
            <>
              Or write to <a className="underline" href={`mailto:${SITE.email}`}>{SITE.email}</a>.
            </>
          )}
        </p>
      )}
    </form>
  );
}
