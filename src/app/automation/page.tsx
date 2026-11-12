import type { Metadata } from "next";
import Link from "next/link";
import { Arrow, Button, Container, Eyebrow, H2, PageHero } from "@/components/ui";
import { Reveal, SavingsCalculator } from "@/components/Interactive";
import FinalCta from "@/components/FinalCta";
import { FAQ, SERVICES } from "@/lib/services";
import { caseBySlug } from "@/lib/work";

export const metadata: Metadata = {
  title: "Automation as a Service: audits, CRM builds, AI agents",
  description:
    "ClickShift automates the manual work that costs you most: CRM builds on HubSpot, Salesforce, Airtable, Monday.com and GoHighLevel, AI review agents, payment workflows and programme technology. From $250.",
  alternates: { canonical: "/automation" },
};

const STEPS = [
  { n: "01", t: "Map", d: "We watch how work really moves: who touches what, where it waits, where it breaks." },
  { n: "02", t: "Price", d: "Each manual step gets a cost. You see the payback before we build anything." },
  { n: "03", t: "Build", d: "Built to the 2045 Standard: alerts, retries, logs and nothing that fails silently." },
  { n: "04", t: "Hand over", d: "A runbook, a walkthrough video and training. You own all of it." },
  { n: "05", t: "Keep running", d: "Optional monitoring and monthly improvements on a retainer." },
];

const TOOLS = ["HubSpot", "Salesforce", "Airtable", "Monday.com", "GoHighLevel", "ActiveCampaign", "Make", "Zapier", "n8n", "Claude", "OpenAI", "Python", "Next.js", "Flutterwave", "Paystack", "Mixpanel", "Iterable", "Thinkific"];

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function AutomationPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <PageHero
        n="UNIT 02"
        eyebrow="Automation as a Service"
        title={
          <>
            Your team was not hired to <span className="text-signal">copy and paste.</span>
          </>
        }
        intro="We find the repeated, manual work that quietly costs you the most, automate it properly, and keep it running. The same craft that took a Zoom bill from $1,000 to under $200 and cut review time by 60%."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="/contact?service=audit" variant="signal">
            Book a $250 audit <Arrow />
          </Button>
          <Button href="#services" variant="ghost-dark">
            See all services
          </Button>
        </div>
      </PageHero>

      {/* PROCESS */}
      <section className="bg-paper py-16 sm:py-24">
        <Container>
          <Reveal>
            <Eyebrow n="01">How it works</Eyebrow>
            <H2 className="mt-4 max-w-2xl">Five steps, from mess to machine.</H2>
          </Reveal>
          <ol className="mt-12 grid gap-px overflow-hidden rounded-[22px] border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-5">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 60}>
                <li className="h-full bg-paper p-6">
                  <span className="font-mono text-[12px] text-cobalt">{s.n}</span>
                  <h3 className="mt-3 font-display text-2xl tracking-tight">{s.t}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-mute">{s.d}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* SERVICES */}
      <section id="services" className="scroll-mt-20 bg-paper-2 py-16 sm:py-24">
        <Container>
          <Reveal>
            <Eyebrow n="02">Services and prices</Eyebrow>
            <H2 className="mt-4 max-w-3xl">Pick a starting point. Every price is shown up front.</H2>
            <p className="mt-4 max-w-2xl text-mute">Prices in US dollars. We invoice in USD or in naira at the day&apos;s rate.</p>
          </Reveal>
          <div className="mt-12 space-y-5">
            {SERVICES.map((s, i) => (
              <Reveal key={s.slug} delay={60}>
                <article
                  id={s.slug}
                  className={`grid scroll-mt-24 gap-8 rounded-[26px] p-6 sm:p-9 lg:grid-cols-12 ${s.highlight ? "bg-ink text-paper" : "bg-white text-ink"}`}
                >
                  <div className="lg:col-span-5">
                    <div className="flex items-center gap-3">
                      <span className={`font-mono text-[12px] ${s.highlight ? "text-signal" : "text-cobalt"}`}>{String(i + 1).padStart(2, "0")}</span>
                      <span className={`rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider ${s.highlight ? "bg-signal text-ink" : "bg-paper text-mute"}`}>
                        {s.kicker}
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-3xl tracking-[-0.03em] sm:text-4xl">{s.name}</h3>
                    <p className={`mt-4 text-[16px] leading-relaxed ${s.highlight ? "text-paper/70" : "text-mute"}`}>{s.summary}</p>
                    <p className={`mt-4 text-[14px] ${s.highlight ? "text-paper/55" : "text-mute"}`}>
                      <b className={s.highlight ? "text-paper" : "text-ink"}>Best for:</b> {s.bestFor}
                    </p>
                  </div>
                  <ul className="space-y-2.5 lg:col-span-4">
                    {s.includes.map((x) => (
                      <li key={x} className="flex gap-3 text-[15px]">
                        <svg viewBox="0 0 16 16" width="16" height="16" className={`mt-1 shrink-0 ${s.highlight ? "text-signal" : "text-cobalt"}`} aria-hidden>
                          <path d="M3 8.5l3 3 7-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className={s.highlight ? "text-paper/85" : "text-ink/85"}>{x}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-col justify-between gap-6 lg:col-span-3 lg:items-end lg:text-right">
                    <div>
                      <p className="font-display text-4xl tracking-[-0.04em]">{s.price}</p>
                      <p className={`text-[13px] ${s.highlight ? "text-paper/55" : "text-mute"}`}>
                        {s.unit} · {s.timeline}
                      </p>
                    </div>
                    <div className="flex w-full flex-col gap-3 lg:items-end">
                      <Button href={`/contact?service=${s.slug}`} variant={s.highlight ? "signal" : "ink"} className="w-full lg:w-auto">
                        Start with this <Arrow />
                      </Button>
                      <p className={`text-[13px] ${s.highlight ? "text-paper/55" : "text-mute"}`}>
                        See it in:{" "}
                        {s.cases.map((cs, j) => {
                          const c = caseBySlug(cs);
                          return c ? (
                            <span key={cs}>
                              <Link href={`/work/${cs}`} className={`underline underline-offset-2 ${s.highlight ? "hover:text-signal" : "hover:text-cobalt"}`}>
                                {c.client.split(" · ")[0]}
                              </Link>
                              {j < s.cases.length - 1 ? ", " : ""}
                            </span>
                          ) : null;
                        })}
                      </p>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* CALCULATOR */}
      <section className="bg-ink py-16 text-paper sm:py-24">
        <Container>
          <Reveal>
            <Eyebrow n="03" tone="dark">
              Do the maths
            </Eyebrow>
            <H2 className="mt-4 max-w-2xl">See your number before you call us.</H2>
          </Reveal>
          <div className="mt-10">
            <SavingsCalculator />
          </div>
        </Container>
      </section>

      {/* TOOLS */}
      <section className="bg-paper py-16 sm:py-24">
        <Container>
          <Reveal>
            <Eyebrow n="04">Tools we build with</Eyebrow>
            <H2 className="mt-4 max-w-2xl">We choose tools for what will still work in five years.</H2>
          </Reveal>
          <ul className="mt-10 flex flex-wrap gap-2.5">
            {TOOLS.map((t) => (
              <li key={t} className="rounded-full border border-ink/12 bg-white px-4 py-2 text-[15px] text-ink/80">
                {t}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-mute">
            Not sure which to use?{" "}
            <Link href="/blog/make-vs-zapier-vs-n8n" className="text-cobalt underline underline-offset-4">
              Make vs Zapier vs n8n: how to choose
            </Link>
          </p>
        </Container>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-20 bg-paper-2 py-16 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <Eyebrow n="05">Questions</Eyebrow>
            <H2 className="mt-4">Asked often.</H2>
          </Reveal>
          <div className="lg:col-span-8">
            {FAQ.map((f) => (
              <details key={f.q} className="group border-b border-ink/10 py-5 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 font-display text-xl tracking-tight">
                  {f.q}
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-xl transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-mute">{f.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <FinalCta />
    </>
  );
}
