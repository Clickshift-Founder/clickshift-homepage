"use client";

import { useState } from "react";

export default function NewsletterForm({
  tone = "dark",
  cta = "Subscribe",
  source = "newsletter",
}: {
  tone?: "dark" | "light";
  cta?: string;
  source?: string;
}) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "busy" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setState("busy");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setState("done");
      setMsg("You're on the list.");
      setEmail("");
    } catch (err) {
      setState("error");
      setMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  const dark = tone === "dark";
  return (
    <form onSubmit={submit} className="w-full">
      <div
        className={`flex rounded-full p-1.5 ${dark ? "bg-white/6 ring-1 ring-white/12 focus-within:ring-signal" : "bg-white ring-1 ring-ink/12 focus-within:ring-cobalt"}`}
      >
        <label htmlFor={`email-${source}`} className="sr-only">
          Email address
        </label>
        <input
          id={`email-${source}`}
          type="email"
          required
          inputMode="email"
          autoComplete="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`min-w-0 flex-1 bg-transparent px-4 text-base outline-none ${dark ? "text-paper placeholder:text-paper/35" : "text-ink placeholder:text-ink/35"}`}
        />
        <button
          type="submit"
          disabled={state === "busy"}
          className={`min-h-11 shrink-0 rounded-full px-5 text-sm font-medium transition-colors disabled:opacity-60 ${dark ? "bg-signal text-ink hover:bg-white" : "bg-ink text-paper hover:bg-cobalt"}`}
        >
          {state === "busy" ? "…" : cta}
        </button>
      </div>
      <p aria-live="polite" className={`mt-2 min-h-5 px-4 text-[13px] ${state === "error" ? "text-red-400" : dark ? "text-signal" : "text-cobalt"}`}>
        {msg}
      </p>
    </form>
  );
}
