"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { SERVICES } from "@/lib/services";
import { TEMPLATES } from "@/lib/templates";
import { SITE } from "@/lib/site";

const BUDGETS = ["Under $1,000", "$1,000 – $5,000", "$5,000 – $15,000", "$15,000+", "Not sure yet"];
const TIMES = ["As soon as possible", "Within a month", "This quarter", "Just exploring"];
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
  const [about, setAbout] = useState(() => {
    if (item === "bundle") return "I'd like to reserve the All-Access template library.";
    if (item === "setup") return "I'd like a template set up in our account.";
    const t = TEMPLATES.find((x) => x.slug === item);
    if (t) return `I'd like to reserve the "${t.name}" template (${t.platform}).`;
    return "";
  });
  const [sent, setSent] = useState(false);

  const options = [...SERVICES.map((s) => ({ slug: s.slug, name: s.name })), ...EXTRA];
  const chosen = options.find((o) => o.slug === service);

  const mailto = useMemo(() => {
    const subject = `New project: ${chosen?.name ?? "Enquiry"}${org ? ` · ${org}` : ""}`;
    const body = [
      `Name: ${name}`,
      `Organisation: ${org || "-"}`,
      `Email: ${email}`,
      `Interested in: ${chosen?.name ?? "-"}`,
      `Budget: ${budget || "-"}`,
      `Timeline: ${time || "-"}`,
      ref ? `Came from: /work/${ref}` : "",
      "",
      "What we want to build or automate:",
      about,
    ]
      .filter((l) => l !== "")
      .join("\n");
    return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [chosen, org, name, email, budget, time, about, ref]);

  const ready = name.trim() && email.includes("@") && about.trim().length > 10;

  return (
    <form
      className="space-y-8 rounded-[26px] bg-white p-6 sm:p-9"
      onSubmit={(e) => {
        e.preventDefault();
        if (!ready) return;
        window.location.href = mailto;
        setSent(true);
      }}
    >
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
            {BUDGETS.map((b) => (
              <Pill key={b} on={budget === b} onClick={() => setBudget(b)}>
                {b}
              </Pill>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className="font-display text-xl tracking-tight">Timeline</legend>
          <div className="mt-4 flex flex-wrap gap-2">
            {TIMES.map((t) => (
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
                value={f.v}
                onChange={(e) => f.set(e.target.value)}
                className="mt-1 h-12 w-full rounded-xl border border-ink/12 bg-paper/50 px-4 text-base outline-none focus:border-cobalt"
              />
            </label>
          ))}
        </div>
      </fieldset>

      <div className="flex flex-col gap-3 border-t border-ink/8 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[13px] text-mute">This opens your email app with the brief filled in. Nothing is stored on this site.</p>
        <button
          type="submit"
          disabled={!ready}
          className="min-h-12 rounded-full bg-ink px-7 text-[15px] font-medium text-paper transition-colors hover:bg-cobalt disabled:cursor-not-allowed disabled:opacity-40"
        >
          Send the brief →
        </button>
      </div>
      {sent && (
        <p className="rounded-xl bg-signal/40 p-4 text-[14px]" aria-live="polite">
          Your email app should have opened. If it didn&apos;t, write to <a className="underline" href={`mailto:${SITE.email}`}>{SITE.email}</a>.
        </p>
      )}
    </form>
  );
}
