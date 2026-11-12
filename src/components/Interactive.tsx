"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { TARGET_2045 } from "@/lib/site";

/* ---------- Reveal on scroll ---------- */
export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("is-in");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/* ---------- Countdown to 1 January 2045 ---------- */
function parts(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  const days = Math.floor(s / 86400);
  const years = Math.floor(days / 365.2425);
  const d = Math.floor(days - years * 365.2425);
  return { years, days: d, h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), sec: s % 60 };
}

export function Countdown2045() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const p = now === null ? null : parts(TARGET_2045 - now);
  const cells = [
    { v: p?.years, l: "years" },
    { v: p?.days, l: "days" },
    { v: p?.h, l: "hrs" },
    { v: p?.m, l: "min" },
    { v: p?.sec, l: "sec" },
  ];
  return (
    <div aria-label="Time until 1 January 2045" className="inline-flex items-stretch gap-1.5 sm:gap-2">
      {cells.map((c, i) => (
        <div key={c.l} className="min-w-[3.1rem] rounded-xl border border-white/10 bg-white/[0.04] px-2 py-2 text-center sm:min-w-[3.8rem] sm:px-3">
          <div className={`font-mono text-lg tabular-nums sm:text-2xl ${i === 0 ? "text-signal" : "text-paper"}`}>
            {c.v === undefined ? "––" : String(c.v).padStart(2, "0")}
          </div>
          <div className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-stone sm:text-[10px]">{c.l}</div>
        </div>
      ))}
    </div>
  );
}

/* ---------- Production board (hero visual) ---------- */
type Unit = { id: string; name: string; what: string; status: string; tone: "live" | "done" | "build"; href: string };

const UNITS: Unit[] = [
  { id: "KC-01", name: "Kobocent", what: "Payments on stablecoin rails", status: "LIVE", tone: "live", href: "/work/kobocent" },
  { id: "QH-02", name: "QuantumHire", what: "8 agents run a job search", status: "LIVE", tone: "live", href: "/work/quantumhire" },
  { id: "UN-03", name: "WEEAP · UN Women", what: "LMS in 4 countries, 2 languages", status: "SHIPPED", tone: "done", href: "/work/un-women-weeap" },
  { id: "WB-04", name: "SWEEP · World Bank", what: "765 women on one platform", status: "SHIPPED", tone: "done", href: "/work/world-bank-sweep" },
  { id: "FC-05", name: "SWEEAP · FCDO", what: "691 trained vs 600 target", status: "SHIPPED", tone: "done", href: "/work/chevening-fcdo-sweeap" },
  { id: "SP-06", name: "SPPG", what: "AI admissions review, 60%+ faster", status: "RUNNING", tone: "live", href: "/work/sppg-admissions-ai" },
  { id: "ZM-07", name: "Zoom → Drive", what: "$1,000 bill → under $200", status: "RUNNING", tone: "live", href: "/work/zoom-to-drive" },
  { id: "NX-08", name: "Your project", what: "Next on the line", status: "OPEN", tone: "build", href: "/contact" },
];

const LOG = [
  "evaluator › scored 412 jobs · 10 factors",
  "settler › payout confirmed with provider · applied once",
  "archiver › 6 recordings verified → drive",
  "reviewer › 38 applications scored · human queue",
  "router › lead $4,200 → CEO · 41s",
  "letters › provisional letter sent · pdf archived",
  "m&e › cohort 2 completion 88% · report sent",
  "check › confirmation seen · proof saved",
  "sync › hubspot ⇄ salesforce · 0 conflicts",
];

export function ProductionBoard() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick((v) => v + 1), 2200);
    return () => clearInterval(t);
  }, []);
  const lines = useMemo(() => Array.from({ length: 4 }, (_, i) => LOG[(tick + i) % LOG.length]), [tick]);

  return (
    <div className="relative rounded-[22px] border border-white/10 bg-ink-2/90 p-4 shadow-[0_40px_120px_-40px_rgba(212,255,58,0.25)] backdrop-blur sm:p-5">
      <div className="flex items-center justify-between border-b border-white/8 pb-3">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-signal" />
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/70">Factory floor · live</span>
        </div>
        <span className="font-mono text-[11px] text-stone">ABJ · UTC+1</span>
      </div>
      <ul className="divide-y divide-white/[0.06]">
        {UNITS.map((u, i) => (
          <li key={u.id}>
            <Link
              href={u.href}
              className="group grid grid-cols-[3.4rem_1fr_auto] items-center gap-3 py-2.5 transition-colors hover:bg-white/[0.03] sm:grid-cols-[3.8rem_1fr_auto]"
            >
              <span className="font-mono text-[11px] text-stone">{u.id}</span>
              <span className="min-w-0">
                <span className="block truncate text-[14px] text-paper group-hover:text-signal">{u.name}</span>
                <span className="block truncate text-[12px] text-paper/45">{u.what}</span>
              </span>
              <span
                className={`rounded-full px-2 py-0.5 font-mono text-[10px] tracking-wider ${
                  u.tone === "live"
                    ? "bg-signal/15 text-signal"
                    : u.tone === "done"
                      ? "bg-white/8 text-paper/70"
                      : "border border-dashed border-signal/50 text-signal"
                } ${i === tick % UNITS.length ? "ring-1 ring-signal/40" : ""}`}
              >
                {u.status}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-3 rounded-xl bg-black/40 p-3 font-mono text-[11px] leading-relaxed">
        {lines.map((l, i) => (
          <div key={l + i} className={i === 3 ? "text-signal" : "text-paper/40"}>
            <span className="text-stone">$ </span>
            {l}
            {i === 3 && <span className="ml-0.5 inline-block w-1.5 animate-blink bg-signal">&nbsp;</span>}
          </div>
        ))}
      </div>
      <p className="mt-2 text-right font-mono text-[10px] text-stone">Illustrative feed of the kinds of jobs our systems run</p>
    </div>
  );
}

/* ---------- Marquee ---------- */
export function Marquee({ items, tone = "light" }: { items: string[]; tone?: "light" | "dark" }) {
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden" aria-label="Brands we have built for">
      <div className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r ${tone === "light" ? "from-paper" : "from-ink"} to-transparent`} />
      <div className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l ${tone === "light" ? "from-paper" : "from-ink"} to-transparent`} />
      <ul className="flex w-max animate-marquee items-center gap-10 py-2 hover:[animation-play-state:paused] sm:gap-14">
        {row.map((b, i) => (
          <li
            key={i}
            aria-hidden={i >= items.length}
            className={`flex items-center gap-10 whitespace-nowrap font-display text-xl tracking-[-0.02em] sm:gap-14 sm:text-2xl ${tone === "light" ? "text-ink/70" : "text-paper/70"}`}
          >
            {b}
            <span className={`inline-block h-2 w-2 rotate-45 ${tone === "light" ? "bg-cobalt" : "bg-signal"}`} />
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- Savings calculator ---------- */
function Slider({
  label,
  value,
  set,
  min,
  max,
  step,
  suffix,
  hint,
}: {
  label: string;
  value: number;
  set: (n: number) => void;
  min: number;
  max: number;
  step: number;
  suffix: string;
  hint?: string;
}) {
return (
  <label className="block">
    <span className="flex items-baseline justify-between gap-4">
      <span className="text-[15px] text-paper/80">{label}</span>
      <span className="font-mono text-lg text-signal tabular-nums">
        {value}
        {suffix}
      </span>
    </span>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => set(Number(e.target.value))}
      className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-[#D4FF3A]"
    />
    {hint && <span className="mt-1.5 block text-[12px] text-paper/40">{hint}</span>}
  </label>
);
}

export function SavingsCalculator() {
  const [hours, setHours] = useState(12);
  const [rate, setRate] = useState(15);
  const [share, setShare] = useState(60);

  const yearly = hours * rate * 48;
  const saved = (yearly * share) / 100;
  const fmt = (n: number) => "$" + Math.round(n).toLocaleString("en-US");
  const payback = saved > 0 ? Math.max(1, Math.ceil(600 / (saved / 52))) : null;


  return (
    <div className="grid gap-6 rounded-[26px] border border-white/10 bg-ink-2 p-5 sm:p-8 lg:grid-cols-2 lg:gap-10">
      <div className="space-y-7">
        <Slider label="Hours a week your team spends on repetitive work" value={hours} set={setHours} min={1} max={80} step={1} suffix=" h" />
        <Slider label="What an hour of that time costs you" value={rate} set={setRate} min={3} max={150} step={1} suffix=" $/h" hint="Salary plus overheads, divided by hours worked" />
        <Slider
          label="Share we could automate"
          value={share}
          set={setShare}
          min={10}
          max={90}
          step={5}
          suffix="%"
          hint="Our case studies range from about 40% to 85%. 60% is a fair middle."
        />
      </div>
      <div className="flex flex-col justify-between rounded-2xl bg-signal p-6 text-ink sm:p-8">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/60">Manual work costs you</p>
          <p className="mt-1 font-display text-4xl tracking-[-0.03em] tabular-nums sm:text-5xl">{fmt(yearly)}<span className="text-xl"> / yr</span></p>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-ink/60">Automation could give back</p>
          <p className="mt-1 font-display text-5xl tracking-[-0.04em] tabular-nums sm:text-6xl">{fmt(saved)}<span className="text-xl"> / yr</span></p>
          {payback && (
            <p className="mt-4 text-[15px] text-ink/75">
              A $600 single workflow would pay for itself in about <b>{payback} week{payback === 1 ? "" : "s"}</b>.
            </p>
          )}
        </div>
        <Link href="/contact?service=audit" className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-ink px-6 text-[15px] font-medium text-paper hover:bg-cobalt">
          Find my automations · $250 audit
        </Link>
        <p className="mt-3 text-[12px] text-ink/55">An estimate from your inputs (48 working weeks a year), not a promise.</p>
      </div>
    </div>
  );
}

/* ---------- Filter chips (work + templates) ---------- */
export function useFilter<T>(items: T[], key: (t: T) => string) {
  const [active, setActive] = useState<string>("All");
  const options = useMemo(() => ["All", ...Array.from(new Set(items.map(key)))], [items, key]);
  const shown = active === "All" ? items : items.filter((i) => key(i) === active);
  return { active, setActive, options, shown };
}

export function Chips({ options, active, onPick, tone = "light" }: { options: string[]; active: string; onPick: (v: string) => void; tone?: "light" | "dark" }) {
  return (
    <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0" role="tablist">
      {options.map((o) => (
        <button
          key={o}
          role="tab"
          aria-selected={active === o}
          onClick={() => onPick(o)}
          className={`min-h-11 shrink-0 rounded-full px-4 text-[14px] transition-colors ${
            active === o
              ? tone === "light"
                ? "bg-ink text-paper"
                : "bg-signal text-ink"
              : tone === "light"
                ? "bg-white text-ink/70 ring-1 ring-ink/10 hover:ring-ink/30"
                : "bg-white/5 text-paper/70 ring-1 ring-white/10 hover:ring-white/30"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}
