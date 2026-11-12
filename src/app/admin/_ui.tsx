import Link from "next/link";
import type { ReactNode } from "react";

/* Small, server-rendered building blocks for the admin. Light surface; one series colour (cobalt); text in ink tokens. */

export function Card({ title, action, children, className = "" }: { title?: ReactNode; action?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={`rounded-[20px] border border-ink/8 bg-white p-4 sm:p-5 ${className}`}>
      {(title || action) && (
        <div className="mb-3 flex items-center justify-between gap-3">
          {title && <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-mute">{title}</h2>}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

export function PageTitle({ title, sub, action }: { title: string; sub?: ReactNode; action?: ReactNode }) {
  return (
    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="font-display text-3xl tracking-[-0.03em] sm:text-4xl">{title}</h1>
        {sub && <p className="mt-1 text-[14px] text-mute">{sub}</p>}
      </div>
      {action}
    </div>
  );
}

export function Stat({ label, value, delta, href, tone = "default" }: { label: string; value: ReactNode; delta?: number | null; href?: string; tone?: "default" | "alert" }) {
  const body = (
    <div className={`h-full rounded-[18px] border p-4 transition-colors ${tone === "alert" ? "border-ink bg-ink text-paper" : "border-ink/8 bg-white hover:border-ink/20"}`}>
      <p className={`font-mono text-[10px] uppercase tracking-[0.16em] ${tone === "alert" ? "text-signal" : "text-mute"}`}>{label}</p>
      <p className="mt-2 font-display text-3xl tabular-nums tracking-[-0.03em]">{value}</p>
      {delta !== undefined && delta !== null && Number.isFinite(delta) && (
        <p className={`mt-1 text-[12px] ${tone === "alert" ? "text-paper/70" : "text-mute"}`}>
          <span aria-hidden>{delta > 0 ? "▲" : delta < 0 ? "▼" : "•"}</span> {Math.abs(Math.round(delta * 100))}% vs previous period
        </p>
      )}
    </div>
  );
  return href ? (
    <Link href={href} className="block">
      {body}
    </Link>
  ) : (
    body
  );
}

/** Ranked list with a proportional bar: doubles as the table view. */
export function BarList({ rows, unit = "", empty = "No data yet" }: { rows: { label: ReactNode; value: number; note?: ReactNode; href?: string; key?: string }[]; unit?: string; empty?: string }) {
  if (!rows.length) return <Empty>{empty}</Empty>;
  const max = Math.max(...rows.map((r) => r.value), 1);
  return (
    <ul className="space-y-1">
      {rows.map((r, i) => {
        const inner = (
          <div className="relative flex min-h-9 items-center justify-between gap-3 overflow-hidden rounded-lg px-2.5 py-1.5 text-[14px]">
            <span aria-hidden className="absolute inset-y-0.5 left-0 rounded-r-[4px] bg-cobalt/12" style={{ width: `${(r.value / max) * 100}%` }} />
            <span className="relative min-w-0 truncate text-ink">{r.label}</span>
            <span className="relative shrink-0 font-mono text-[12px] tabular-nums text-ink/80">
              {r.note && <span className="mr-2 text-mute">{r.note}</span>}
              {r.value.toLocaleString()}
              {unit}
            </span>
          </div>
        );
        return (
          <li key={r.key ?? i}>
            {r.href ? (
              <Link href={r.href} className="block rounded-lg hover:bg-paper">
                {inner}
              </Link>
            ) : (
              inner
            )}
          </li>
        );
      })}
    </ul>
  );
}

/** Daily columns with a per-bar hover readout. One series, one colour. */
export function DayBars({ data, label = "visitors" }: { data: { day: number; value: number; sub?: number }[]; label?: string }) {
  if (!data.length || data.every((d) => d.value === 0)) return <Empty>No visits recorded in this period yet.</Empty>;
  const W = 720;
  const H = 180;
  const pad = { t: 16, b: 22, l: 0, r: 0 };
  const max = Math.max(...data.map((d) => d.value), 1);
  const step = (W - pad.l - pad.r) / data.length;
  const bw = Math.max(2, step - 2); // 2px surface gap between bars
  const y = (v: number) => pad.t + (H - pad.t - pad.b) * (1 - v / max);
  const fmt = (ms: number) => new Date(ms).toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "UTC" });
  const every = Math.ceil(data.length / 6);
  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} className="h-44 w-full" role="img" aria-label={`Daily ${label}`}>
        {[0.5, 1].map((f) => (
          <line key={f} x1={0} x2={W} y1={y(max * f)} y2={y(max * f)} stroke="#0B0C10" strokeOpacity="0.06" />
        ))}
        <line x1={0} x2={W} y1={H - pad.b} y2={H - pad.b} stroke="#0B0C10" strokeOpacity="0.15" />
        {data.map((d, i) => {
          const x = pad.l + i * step + 1;
          const top = y(d.value);
          const h = H - pad.b - top;
          const r = Math.min(4, bw / 2, h);
          // rounded top only; anchored to the baseline
          const path =
            h <= 0
              ? ""
              : `M${x},${H - pad.b} V${top + r} Q${x},${top} ${x + r},${top} H${x + bw - r} Q${x + bw},${top} ${x + bw},${top + r} V${H - pad.b} Z`;
          const tx = Math.min(W - 70, Math.max(70, x + bw / 2));
          return (
            <g key={d.day} className="group">
              <title>{`${fmt(d.day)}: ${d.value} ${label}${d.sub !== undefined ? `, ${d.sub} page views` : ""}`}</title>
              <rect x={pad.l + i * step} y={0} width={step} height={H} fill="transparent" />
              {path && <path d={path} fill="#2E44FF" className="opacity-85 transition-opacity group-hover:opacity-100" />}
              <g className="pointer-events-none opacity-0 transition-opacity group-hover:opacity-100">
                <rect x={tx - 68} y={0} width={136} height={16} rx={5} fill="#0B0C10" />
                <text x={tx} y={11.5} textAnchor="middle" fontSize="10.5" fill="#F3F0E8" className="font-mono">
                  {fmt(d.day)} · {d.value} {label}
                </text>
              </g>
              {i % every === 0 && (
                <text x={x + bw / 2} y={H - 6} textAnchor="middle" fontSize="10" fill="#5A5E67" className="font-mono">
                  {fmt(d.day)}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export function Empty({ children }: { children: ReactNode }) {
  return <p className="rounded-xl bg-paper px-4 py-6 text-center text-[14px] text-mute">{children}</p>;
}

export function Badge({ children, tone = "default" }: { children: ReactNode; tone?: "default" | "signal" | "ink" | "cobalt" | "muted" }) {
  const t = {
    default: "bg-paper text-ink/80 ring-1 ring-ink/10",
    signal: "bg-signal text-ink",
    ink: "bg-ink text-paper",
    cobalt: "bg-cobalt text-white",
    muted: "bg-paper text-mute",
  }[tone];
  return <span className={`inline-flex items-center rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${t}`}>{children}</span>;
}

/* ---------- formatting ---------- */

export function ago(ms: number) {
  const s = Math.round((Date.now() - ms) / 1000);
  if (s < 60) return "just now";
  const m = Math.round(s / 60);
  if (m < 60) return `${m} min ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h} h ago`;
  const d = Math.round(h / 24);
  if (d < 30) return `${d} d ago`;
  return new Date(ms).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export function when(ms: number) {
  return new Date(ms).toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit", timeZone: "Africa/Lagos" });
}

export function dur(ms: number) {
  if (!ms) return "–";
  const s = Math.round(ms / 1000);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  return `${m}m ${String(s % 60).padStart(2, "0")}s`;
}

const regions = (() => {
  try {
    return new Intl.DisplayNames(["en"], { type: "region" });
  } catch {
    return null;
  }
})();

export function country(code: string | null | undefined) {
  if (!code) return "Unknown";
  let name = code;
  try {
    name = regions?.of(code.toUpperCase()) ?? code;
  } catch {}
  const flag = /^[A-Z]{2}$/i.test(code) ? String.fromCodePoint(...[...code.toUpperCase()].map((c) => 0x1f1a5 + c.charCodeAt(0))) : "";
  return `${flag} ${name}`.trim();
}
