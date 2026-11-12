import type { Metadata } from "next";
import Link from "next/link";
import { Arrow, Button, Container, Eyebrow, H2, PageHero } from "@/components/ui";
import { Reveal } from "@/components/Interactive";
import FinalCta from "@/components/FinalCta";
import { SERVICES } from "@/lib/services";
import { BUNDLE, PLATFORM_COLOR, SETUP_ADDON, TEMPLATES } from "@/lib/templates";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Every ClickShift price in one place: Automation Audit $250, single workflows from $600, Systems Builds from $2,500, AI agents from $3,500, retainers at $900 a month, product builds from $7,500, CRM templates from $39.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  const tiers = SERVICES.filter((s) => ["single-workflow", "systems-build", "product-build"].includes(s.slug));
  return (
    <>
      <PageHero
        n="UNIT 04"
        eyebrow="Pricing"
        title={
          <>
            Clear prices. <span className="text-signal">No hourly surprises.</span>
          </>
        }
        intro="Fixed prices where the work is predictable, and starting prices where it depends on scope. You always see the full quote before anything begins. US dollars, or naira at the day's rate."
      />

      <section className="bg-paper py-16 sm:py-24">
        <Container>
          <Reveal>
            <Eyebrow n="01">Builds</Eyebrow>
            <H2 className="mt-4">Three sizes of build.</H2>
          </Reveal>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {tiers.map((s, i) => (
              <Reveal key={s.slug} delay={i * 70}>
                <div className={`flex h-full flex-col rounded-[26px] p-7 sm:p-9 ${s.highlight ? "bg-ink text-paper ring-2 ring-signal" : "bg-white text-ink"}`}>
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-2xl tracking-tight">{s.name}</h3>
                    {s.highlight && <span className="rounded-full bg-signal px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-ink">Most chosen</span>}
                  </div>
                  <p className="mt-6 font-display text-5xl tracking-[-0.05em]">{s.price}</p>
                  <p className={`text-[13px] ${s.highlight ? "text-paper/55" : "text-mute"}`}>
                    {s.unit} · {s.timeline}
                  </p>
                  <p className={`mt-5 text-[15px] leading-relaxed ${s.highlight ? "text-paper/70" : "text-mute"}`}>{s.summary}</p>
                  <ul className="mt-6 space-y-2.5">
                    {s.includes.map((x) => (
                      <li key={x} className="flex gap-3 text-[15px]">
                        <span aria-hidden className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${s.highlight ? "bg-signal" : "bg-cobalt"}`} />
                        <span className={s.highlight ? "text-paper/85" : "text-ink/85"}>{x}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-8">
                    <Button href={`/contact?service=${s.slug}`} variant={s.highlight ? "signal" : "ink"} className="w-full">
                      Get a quote <Arrow />
                    </Button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-paper-2 py-16 sm:py-24">
        <Container>
          <Reveal>
            <Eyebrow n="02">Every service</Eyebrow>
            <H2 className="mt-4">The full price list.</H2>
          </Reveal>
          <div className="mt-10 overflow-hidden rounded-[22px] border border-ink/10 bg-white">
            {SERVICES.map((s) => (
              <Link
                key={s.slug}
                href={`/automation#${s.slug}`}
                className="group grid grid-cols-[1fr_auto] items-center gap-4 border-b border-ink/8 p-5 last:border-b-0 hover:bg-paper sm:grid-cols-[1.4fr_1fr_auto_auto] sm:p-6"
              >
                <span>
                  <span className="block font-display text-xl tracking-tight">{s.name}</span>
                  <span className="text-[13px] text-mute">{s.bestFor}</span>
                </span>
                <span className="hidden text-[14px] text-mute sm:block">{s.timeline}</span>
                <span className="text-right">
                  <span className="block font-display text-2xl tracking-tight">{s.price}</span>
                  <span className="text-[12px] text-mute">{s.unit}</span>
                </span>
                <Arrow className="hidden text-mute transition-transform group-hover:translate-x-1 group-hover:text-ink sm:block" />
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-paper py-16 sm:py-24">
        <Container>
          <Reveal>
            <Eyebrow n="03">Templates</Eyebrow>
            <H2 className="mt-4">CRM templates and workflow packs.</H2>
          </Reveal>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {TEMPLATES.map((t) => (
              <Link key={t.slug} href={`/templates#${t.slug}`} className="flex items-center justify-between gap-4 rounded-2xl border border-ink/8 bg-white p-4 hover:border-ink/25">
                <span className="flex min-w-0 items-center gap-3">
                  <span aria-hidden className="h-8 w-1.5 shrink-0 rounded-full" style={{ background: PLATFORM_COLOR[t.platform] }} />
                  <span className="min-w-0">
                    <span className="block truncate text-[15px]">{t.name}</span>
                    <span className="font-mono text-[11px] text-mute">{t.platform}</span>
                  </span>
                </span>
                <span className="font-display text-xl">${t.price}</span>
              </Link>
            ))}
            <div className="flex items-center justify-between gap-4 rounded-2xl bg-signal p-4">
              <span>
                <span className="block text-[15px] font-medium">{BUNDLE.name}</span>
                <span className="text-[12px] text-ink/60">{BUNDLE.note}</span>
              </span>
              <span className="font-display text-xl">${BUNDLE.price}</span>
            </div>
            <div className="flex items-center justify-between gap-4 rounded-2xl bg-ink p-4 text-paper">
              <span>
                <span className="block text-[15px] font-medium">{SETUP_ADDON.name}</span>
                <span className="text-[12px] text-paper/55">per template</span>
              </span>
              <span className="font-display text-xl text-signal">${SETUP_ADDON.price}</span>
            </div>
          </div>
        </Container>
      </section>

      <FinalCta />
    </>
  );
}
