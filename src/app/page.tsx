import Link from "next/link";
import { Arrow, ArrowUpRight, Button, Container, Eyebrow, H2 } from "@/components/ui";
import { Countdown2045, Marquee, ProductionBoard, Reveal, SavingsCalculator } from "@/components/Interactive";
import { CaseCard, PostCard, TemplateCard } from "@/components/Cards";
import { BRANDS, CASES, PROOF } from "@/lib/work";
import { PILLARS } from "@/lib/pillars";
import { SERVICES } from "@/lib/services";
import { TEMPLATES } from "@/lib/templates";
import { allPosts } from "@/lib/server/journal";

export const revalidate = 300;
import FinalCta from "@/components/FinalCta";
import { FlightTo2045 } from "@/components/Flight";

const LINES = [
  {
    n: "LINE A",
    title: "We build",
    body: "Products, platforms and AI agents, from first spec to live users. The way we built Kobocent and QuantumHire.",
    href: "/work",
    cta: "See the work",
    items: ["Web and mobile apps", "AI agents", "Programme platforms", "Payments"],
  },
  {
    n: "LINE B",
    title: "We automate",
    body: "Automation as a Service: we find the manual work that costs you most, automate it and keep it running.",
    href: "/automation",
    cta: "Automation services",
    items: ["Audits from $250", "CRM builds", "AI review", "Monthly retainers"],
  },
  {
    n: "LINE C",
    title: "We equip",
    body: "Ready-made CRM templates and workflow packs for HubSpot, Salesforce, Airtable, Monday.com, GoHighLevel, Make and n8n.",
    href: "/templates",
    cta: "Browse templates",
    items: ["14 templates", "From $39", "Born from real builds", "Done-for-you set-up"],
  },
];

export default async function Home() {
  const featured = ["un-women-weeap", "quantumhire", "zoom-to-drive", "kobocent", "sppg-admissions-ai", "chevening-fcdo-sweeap"]
    .map((s) => CASES.find((c) => c.slug === s)!)
    .filter(Boolean);
  const posts = (await allPosts()).slice(0, 3);
  const templates = ["airtable-beneficiary-crm", "ghl-lead-to-booking", "n8n-zoom-drive-archiver"].map((s) => TEMPLATES.find((t) => t.slug === s)!);

  return (
    <>
      {/* HERO */}
      <section className="grid-dark relative overflow-hidden bg-ink text-paper">
        <div aria-hidden className="pointer-events-none absolute -left-32 top-20 h-[32rem] w-[32rem] rounded-full bg-cobalt/25 blur-[120px]" />
        <div aria-hidden className="pointer-events-none absolute -right-20 bottom-0 h-[26rem] w-[26rem] rounded-full bg-signal/15 blur-[120px]" />
        <Container className="relative grid gap-12 pb-16 pt-28 sm:pt-36 lg:grid-cols-12 lg:gap-10 lg:pb-24 lg:pt-40">
          <div className="lg:col-span-7">
            <div className="animate-rise">
              <Eyebrow tone="dark">ClickShift · the solutions factory</Eyebrow>
            </div>
            <h1 className="mt-6 animate-rise font-display text-[3.1rem] leading-[0.92] tracking-[-0.055em] [animation-delay:80ms] sm:text-[5.2rem] lg:text-[6.2rem]">
              We build what still works in{" "}
              <span className="relative inline-block text-signal">
                2045
                <svg aria-hidden viewBox="0 0 200 20" className="absolute -bottom-2 left-0 w-full" preserveAspectRatio="none">
                  <path d="M2 14 C 50 4, 120 4, 198 12" stroke="#D4FF3A" strokeWidth="4" fill="none" strokeLinecap="round" />
                </svg>
              </span>
              .
            </h1>
            <p className="mt-8 max-w-xl animate-rise text-lg leading-relaxed text-paper/70 [animation-delay:160ms] sm:text-xl">
              Software, AI agents and automations for development programmes, schools, growing companies and product teams. Every build is
              tested against one question: <span className="text-paper">will this still matter in twenty years?</span>
            </p>
            <div className="mt-9 flex animate-rise flex-col gap-3 [animation-delay:240ms] sm:flex-row">
              <Button href="/contact" variant="signal">
                Start a project <Arrow />
              </Button>
              <Button href="/work" variant="ghost-dark">
                See what we&apos;ve built
              </Button>
            </div>
            <div className="mt-12 animate-rise [animation-delay:320ms]">
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-stone">Building for the distance · time to 2045</p>
              <Countdown2045 />
            </div>
          </div>
          <div className="animate-rise [animation-delay:200ms] lg:col-span-5 lg:pt-6">
            <ProductionBoard />
          </div>
        </Container>
      </section>

      {/* BRANDS */}
      <section className="border-b border-ink/8 bg-paper py-10">
        <Container>
          <p className="mb-5 text-center font-mono text-[11px] uppercase tracking-[0.22em] text-mute">
            Brands and programmes we&apos;ve built for
          </p>
        </Container>
        <Marquee items={BRANDS} />
      </section>

      {/* PROOF */}
      <section className="bg-paper py-20 sm:py-28">
        <Container>
          <Reveal>
            <Eyebrow n="01">Output, not promises</Eyebrow>
            <H2 className="mt-4 max-w-3xl">Numbers that came off the factory floor.</H2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-[22px] border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
            {PROOF.map((p, i) => (
              <Reveal key={p.label} delay={i * 60}>
                <Link href={p.href} className="group flex h-full flex-col justify-between bg-paper p-7 transition-colors hover:bg-white sm:p-9">
                  <p className="font-display text-5xl tracking-[-0.045em] sm:text-6xl">{p.value}</p>
                  <p className="mt-6 flex items-end justify-between gap-4 text-[15px] text-mute">
                    {p.label}
                    <ArrowUpRight className="shrink-0 opacity-40 transition-opacity group-hover:opacity-100" />
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* THREE LINES */}
      <section className="grid-light bg-paper-2 py-20 sm:py-28">
        <Container>
          <Reveal>
            <Eyebrow n="02">Three production lines</Eyebrow>
            <H2 className="mt-4 max-w-3xl">One factory. Three ways to work with us.</H2>
          </Reveal>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {LINES.map((l, i) => (
              <Reveal key={l.title} delay={i * 80}>
                <Link
                  href={l.href}
                  className={`group flex h-full flex-col rounded-[26px] p-7 transition-all duration-300 hover:-translate-y-1 sm:p-9 ${
                    i === 1 ? "bg-ink text-paper" : "bg-white text-ink"
                  }`}
                >
                  <p className={`font-mono text-[11px] tracking-[0.22em] ${i === 1 ? "text-signal" : "text-cobalt"}`}>{l.n}</p>
                  <h3 className="mt-4 font-display text-4xl tracking-[-0.04em]">{l.title}</h3>
                  <p className={`mt-4 text-[16px] leading-relaxed ${i === 1 ? "text-paper/70" : "text-mute"}`}>{l.body}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {l.items.map((it) => (
                      <li key={it} className={`rounded-full px-3 py-1 text-[13px] ${i === 1 ? "bg-white/8 text-paper/80" : "bg-paper text-ink/75"}`}>
                        {it}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-auto inline-flex items-center gap-2 pt-10 text-[15px] font-medium">
                    {l.cta} <Arrow className="transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* FEATURED WORK */}
      <section className="bg-paper py-20 sm:py-28">
        <Container>
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <Reveal>
              <Eyebrow n="03">Selected work</Eyebrow>
              <H2 className="mt-4 max-w-2xl">From UN programmes to products in the wild.</H2>
            </Reveal>
            <Button href="/work" variant="ghost-light">
              All {CASES.length} case studies <Arrow />
            </Button>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((c, i) => (
              <Reveal key={c.slug} delay={(i % 3) * 70}>
                <CaseCard c={c} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* THE FLIGHT TO 2045 (scroll-driven) */}
      <FlightTo2045 />

      {/* 2045 STANDARD */}
      <section className="grid-dark relative overflow-hidden bg-ink py-20 text-paper sm:py-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <Eyebrow n="04" tone="dark">
                The 2045 Standard
              </Eyebrow>
              <H2 className="mt-4">Five tests every build has to pass.</H2>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-paper/65">
                In 2025 our founder asked which products will survive 2045. His answer, five pillars, became the checklist we hold every
                build to.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="/standard" variant="signal">
                  Read the Standard <Arrow />
                </Button>
                <Button href="/blog/what-kind-of-products-will-survive-2045" variant="ghost-dark">
                  The original essay
                </Button>
              </div>
            </Reveal>
            <div className="lg:col-span-7">
              <ol className="divide-y divide-white/10 border-y border-white/10">
                {PILLARS.map((p, i) => (
                  <Reveal key={p.key} delay={i * 60}>
                    <li className="group grid grid-cols-[3rem_1fr] gap-4 py-6 sm:grid-cols-[4rem_10rem_1fr] sm:items-baseline">
                      <span className="font-mono text-sm text-signal">{p.n}</span>
                      <span className="font-display text-3xl tracking-[-0.03em]">{p.name}</span>
                      <span className="col-span-2 text-[15px] leading-relaxed text-paper/60 sm:col-span-1">
                        <span className="text-paper/90">{p.line}</span>{" "}
                        <Link href={p.proof.href} className="underline decoration-white/20 underline-offset-4 hover:text-signal hover:decoration-signal">
                          {p.proof.text}
                        </Link>
                      </span>
                    </li>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </section>

      {/* AUTOMATION CALCULATOR */}
      <section className="bg-ink pb-20 text-paper sm:pb-28">
        <Container>
          <Reveal>
            <div className="flex flex-col justify-between gap-6 border-t border-white/10 pt-20 sm:flex-row sm:items-end sm:pt-28">
              <div>
                <Eyebrow n="05" tone="dark">
                  Automation as a Service
                </Eyebrow>
                <H2 className="mt-4 max-w-2xl">What is manual work really costing you?</H2>
              </div>
              <Button href="/automation" variant="ghost-dark">
                {SERVICES.length} services, from $250 <Arrow />
              </Button>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-12">
              <SavingsCalculator />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* TEMPLATES */}
      <section className="bg-paper-2 py-20 sm:py-28">
        <Container>
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <Reveal>
              <Eyebrow n="06">Template library</Eyebrow>
              <H2 className="mt-4 max-w-2xl">The systems behind our builds, ready to install.</H2>
            </Reveal>
            <Button href="/templates" variant="ghost-light">
              All {TEMPLATES.length} templates <Arrow />
            </Button>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {templates.map((t, i) => (
              <Reveal key={t.slug} delay={i * 70}>
                <TemplateCard t={t} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* JOURNAL */}
      <section className="bg-paper py-20 sm:py-28">
        <Container>
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <Reveal>
              <Eyebrow n="07">The Journal</Eyebrow>
              <H2 className="mt-4 max-w-2xl">Notes from the factory floor.</H2>
            </Reveal>
            <Button href="/blog" variant="ghost-light">
              Read the Journal <Arrow />
            </Button>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {posts.map((p, i) => (
              <Reveal key={p.slug} delay={i * 70}>
                <PostCard p={p} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <FinalCta />
    </>
  );
}

