import Link from "next/link";
import type { Case } from "@/lib/work";
import type { Post } from "@/lib/posts";
import type { Template } from "@/lib/templates";
import { PLATFORM_COLOR } from "@/lib/templates";
import TemplatePreview from "./TemplatePreview";
import { Arrow } from "./ui";
import { pillarName } from "@/lib/pillars";

export function CaseCard({ c, big = false }: { c: Case; big?: boolean }) {
  return (
    <Link
      href={`/work/${c.slug}`}
      className={`group relative flex h-full flex-col overflow-hidden rounded-[22px] border border-ink/8 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-ink/20 hover:shadow-[0_30px_60px_-30px_rgba(11,12,16,0.35)] ${big ? "sm:p-8" : ""}`}
    >
      <span aria-hidden className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" style={{ background: c.accent ?? "#2E44FF" }} />
      <div className="flex items-start justify-between gap-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-mute">{c.client}</p>
        {c.year && <p className="shrink-0 font-mono text-[11px] text-stone">{c.year}</p>}
      </div>
      <h3 className={`mt-3 font-display tracking-[-0.025em] text-ink ${big ? "text-2xl sm:text-3xl" : "text-xl"}`}>{c.title}</h3>
      <p className="mt-3 text-[15px] leading-relaxed text-mute">{c.summary}</p>
      <div className="mt-auto pt-6">
        {c.metric && (
          <div className="mb-5 border-t border-ink/8 pt-4">
            <p className={`font-display tracking-[-0.03em] text-ink ${big ? "text-4xl" : "text-3xl"}`}>{c.metric.value}</p>
            <p className="text-[13px] text-mute">{c.metric.label}</p>
          </div>
        )}
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {c.pillars.slice(0, 3).map((p) => (
              <span key={p} className="rounded-full bg-paper px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-mute">
                {pillarName(p)}
              </span>
            ))}
          </div>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-paper transition-colors group-hover:bg-cobalt">
            <Arrow />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function PostCard({ p, tone = "light" }: { p: Post; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <Link
      href={`/blog/${p.slug}`}
      className={`group flex h-full flex-col rounded-[22px] p-6 transition-all duration-300 hover:-translate-y-1 ${
        dark ? "border border-white/10 bg-ink-2 hover:border-signal/40" : "border border-ink/8 bg-white hover:border-ink/20"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className={`font-mono text-[11px] uppercase tracking-[0.16em] ${dark ? "text-signal" : "text-cobalt"}`}>{p.category}</span>
        <span className={`font-mono text-[11px] ${dark ? "text-stone" : "text-mute"}`}>{p.readMinutes} min</span>
      </div>
      <h3 className={`mt-4 font-display text-xl leading-snug tracking-[-0.02em] ${dark ? "text-paper" : "text-ink"}`}>{p.title}</h3>
      <p className={`mt-3 line-clamp-3 text-[15px] leading-relaxed ${dark ? "text-paper/55" : "text-mute"}`}>{p.description}</p>
      <span className={`mt-auto inline-flex items-center gap-2 pt-6 text-[14px] font-medium ${dark ? "text-paper" : "text-ink"}`}>
        Read <Arrow className="transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

export function TemplateCard({ t }: { t: Template }) {
  const color = PLATFORM_COLOR[t.platform];
  return (
    <article id={t.slug} className="group flex h-full scroll-mt-28 flex-col overflow-hidden rounded-[22px] border border-ink/8 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(11,12,16,0.3)]">
      <div className="relative p-4 pb-0" style={{ background: `linear-gradient(160deg, ${color}22, transparent 70%)` }}>
        <TemplatePreview kind={t.preview} color={color} label={t.name} />
        <span className="absolute left-6 top-6 rounded-full px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-wider text-white" style={{ background: color }}>
          {t.platform}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-mute">{t.useCase}</p>
        <h3 className="mt-2 font-display text-xl tracking-[-0.02em]">{t.name}</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-mute">{t.summary}</p>
        <ul className="mt-4 space-y-1.5 text-[14px] text-ink/80">
          {t.includes.map((i) => (
            <li key={i} className="flex gap-2">
              <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: color }} />
              {i}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex items-center justify-between gap-3 pt-6">
          <div>
            <p className="font-display text-3xl tracking-[-0.03em]">${t.price}</p>
            {t.fromCase && (
              <Link href={`/work/${t.fromCase}`} className="text-[12px] text-cobalt underline-offset-2 hover:underline">
                Born from a real build
              </Link>
            )}
          </div>
          {t.status === "available" && t.buyUrl ? (
            <a href={t.buyUrl} className="inline-flex min-h-11 items-center rounded-full bg-ink px-5 text-[14px] font-medium text-paper hover:bg-cobalt">
              Buy now
            </a>
          ) : (
            <Link
              href={`/contact?service=template&item=${t.slug}`}
              className="inline-flex min-h-11 items-center rounded-full border border-ink/15 px-4 text-[14px] font-medium text-ink hover:bg-ink hover:text-paper"
            >
              Reserve
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
