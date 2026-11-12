import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Arrow, ArrowUpRight, Button, Container, Eyebrow, Tag } from "@/components/ui";
import { CaseCard, PostCard, TemplateCard } from "@/components/Cards";
import { Reveal } from "@/components/Interactive";
import { CASES, caseBySlug, LINES } from "@/lib/work";
import { serviceBySlug } from "@/lib/services";
import { TEMPLATES } from "@/lib/templates";
import { POSTS } from "@/lib/posts";
import { PILLARS } from "@/lib/pillars";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = caseBySlug(slug);
  if (!c) return {};
  return {
    title: `${c.client}: ${c.title}`,
    description: c.summary,
    alternates: { canonical: `/work/${c.slug}` },
    openGraph: { title: `${c.title} · ${c.client}`, description: c.summary, url: `${SITE.url}/work/${c.slug}` },
  };
}

export default async function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = caseBySlug(slug);
  if (!c) notFound();

  const idx = CASES.findIndex((x) => x.slug === c.slug);
  const next = CASES[(idx + 1) % CASES.length];
  const services = (c.services ?? []).map(serviceBySlug).filter(Boolean);
  const templates = TEMPLATES.filter((t) => c.templates?.includes(t.slug)).slice(0, 2);
  const posts = POSTS.filter((p) => p.cases?.includes(c.slug)).slice(0, 2);
  const pillars = PILLARS.filter((p) => c.pillars.includes(p.key));
  const sameLine = CASES.filter((x) => x.line === c.line && x.slug !== c.slug).slice(0, 3);
  const accent = c.accent ?? "#2E44FF";

  return (
    <>
      <section className="grid-dark relative overflow-hidden bg-ink pb-14 pt-28 text-paper sm:pb-20 sm:pt-36">
        <div aria-hidden className="pointer-events-none absolute -right-32 -top-32 h-[30rem] w-[30rem] rounded-full blur-[120px]" style={{ background: accent, opacity: 0.25 }} />
        <Container className="relative">
          <nav aria-label="Breadcrumb" className="font-mono text-[12px] text-stone">
            <Link href="/work" className="hover:text-signal">Work</Link> <span className="mx-1">/</span>
            <Link href={`/work#${c.line}`} className="hover:text-signal">{LINES[c.line].label}</Link>
          </nav>
          <p className="mt-8 font-mono text-[12px] uppercase tracking-[0.2em] text-signal">{c.client}</p>
          <h1 className="mt-4 max-w-4xl font-display text-[2.4rem] leading-[1] tracking-[-0.045em] sm:text-6xl">{c.title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-paper/70">{c.summary}</p>

          <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 lg:grid-cols-4">
            {[
              { k: "Our role", v: c.role },
              { k: "Where", v: c.location },
              { k: "When", v: c.year ?? "Ongoing" },
              { k: c.metric ? c.metric.label : "Built with", v: c.metric ? c.metric.value : c.stack.slice(0, 3).join(", ") },
            ].map((d, i) => (
              <div key={d.k} className={`bg-ink-2 p-5 ${i === 0 ? "col-span-2 lg:col-span-1" : ""}`}>
                <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-stone">{d.k}</dt>
                <dd className={`mt-2 ${i === 3 && c.metric ? "font-display text-3xl tracking-tight text-signal" : "text-[15px] text-paper/85"}`}>{d.v}</dd>
              </div>
            ))}
          </dl>

          {c.links && (
            <div className="mt-6 flex flex-wrap gap-3">
              {c.links.map((l) => (
                <Button key={l.href} href={l.href} variant="ghost-dark">
                  {l.label} <ArrowUpRight />
                </Button>
              ))}
            </div>
          )}
        </Container>
      </section>

      <section className="bg-paper py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="space-y-14 lg:col-span-8">
            <Reveal>
              <Eyebrow n="01">The challenge</Eyebrow>
              <p className="mt-4 font-display text-2xl leading-snug tracking-[-0.02em] text-ink sm:text-[1.9rem]">{c.challenge}</p>
            </Reveal>
            <Reveal>
              <Eyebrow n="02">What we built</Eyebrow>
              <ol className="mt-6 space-y-3">
                {c.built.map((b, i) => (
                  <li key={i} className="flex gap-4 rounded-2xl border border-ink/8 bg-white p-5">
                    <span className="font-mono text-[12px] text-cobalt">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-[16px] leading-relaxed text-ink/85">{b}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
            <Reveal>
              <Eyebrow n="03">What changed</Eyebrow>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {c.outcome.map((o, i) => (
                  <li key={i} className={`rounded-2xl p-6 text-[16px] leading-relaxed ${i === 0 ? "bg-ink text-paper sm:col-span-2" : "bg-white text-ink/85"}`}>
                    {i === 0 && <span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.18em] text-signal">Headline result</span>}
                    {o}
                  </li>
                ))}
              </ul>
            </Reveal>
            {c.sources && (
              <Reveal>
                <Eyebrow n="04">In the press and on the record</Eyebrow>
                <ul className="mt-5 divide-y divide-ink/8 border-y border-ink/8">
                  {c.sources.map((s) => (
                    <li key={s.href}>
                      <a href={s.href} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-4 py-4 text-[15px] text-ink hover:text-cobalt">
                        {s.label}
                        <ArrowUpRight className="shrink-0 opacity-50 group-hover:opacity-100" />
                      </a>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
          </div>

          <aside className="space-y-6 lg:col-span-4">
            <div className="rounded-[22px] border border-ink/8 bg-white p-6 lg:sticky lg:top-24">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-mute">Stack</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {c.stack.map((s) => (
                  <Tag key={s}>{s}</Tag>
                ))}
              </div>
              <p className="mt-7 font-mono text-[11px] uppercase tracking-[0.18em] text-mute">2045 Standard</p>
              <ul className="mt-3 space-y-3">
                {pillars.map((p) => (
                  <li key={p.key}>
                    <Link href={`/standard#${p.key}`} className="group block">
                      <span className="font-display text-lg group-hover:text-cobalt">
                        <span className="mr-2 font-mono text-[11px] text-cobalt">{p.n}</span>
                        {p.name}
                      </span>
                      <span className="block text-[13px] text-mute">{p.line}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              {services.length > 0 && (
                <>
                  <p className="mt-7 font-mono text-[11px] uppercase tracking-[0.18em] text-mute">Want the same?</p>
                  <ul className="mt-3 space-y-2">
                    {services.map((s) => (
                      <li key={s!.slug}>
                        <Link href={`/automation#${s!.slug}`} className="flex items-center justify-between rounded-xl bg-paper px-4 py-3 text-[14px] hover:bg-ink hover:text-paper">
                          <span>{s!.name}</span>
                          <span className="font-mono text-[12px] opacity-70">{s!.price}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              <Button href={`/contact?service=${c.services?.[0] ?? "audit"}&ref=${c.slug}`} variant="ink" className="mt-6 w-full">
                Build something like this <Arrow />
              </Button>
            </div>
          </aside>
        </Container>
      </section>

      {(templates.length > 0 || posts.length > 0) && (
        <section className="bg-paper-2 py-16 sm:py-24">
          <Container>
            <Eyebrow>Go deeper</Eyebrow>
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {templates.map((t) => (
                <div key={t.slug} className="lg:col-span-1">
                  <TemplateCard t={t} />
                </div>
              ))}
              {posts.map((p) => (
                <div key={p.slug} className="lg:col-span-1">
                  <PostCard p={p} />
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {sameLine.length > 0 && (
        <section className="bg-paper py-16 sm:py-24">
          <Container>
            <div className="flex items-end justify-between gap-4">
              <div>
                <Eyebrow>More {LINES[c.line].label.toLowerCase()}</Eyebrow>
              </div>
              <Link href={`/work/${next.slug}`} className="group inline-flex items-center gap-2 text-[15px] font-medium text-ink">
                Next case <Arrow className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {sameLine.map((x) => (
                <CaseCard key={x.slug} c={x} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
