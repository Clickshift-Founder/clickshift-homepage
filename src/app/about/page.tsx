import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Arrow, ArrowUpRight, Button, Container, Eyebrow, H2, PageHero } from "@/components/ui";
import { Reveal } from "@/components/Interactive";
import FinalCta from "@/components/FinalCta";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About: the studio behind the solutions factory",
  description:
    "ClickShift is a studio of engineers, designers and specialists in Abuja, working worldwide. Programme technology for World Bank, UN Women and FCDO-funded programmes, automation for teams on four continents, and products built to outlast 2045.",
  alternates: { canonical: "/about" },
};

// The disciplines every ClickShift build draws on. Roles, not names: a build is staffed with the ones it needs.
const CREW = [
  { code: "ARC", role: "Solutions architects", d: "Map how your operation really runs, then design the system before anything is built." },
  { code: "AUT", role: "Automation engineers", d: "Make, n8n, Zapier, webhooks and scripts: the workflows that run while you sleep." },
  { code: "ENG", role: "Full-stack engineers", d: "Next.js, Node.js, Python and PostgreSQL: platforms, portals and products." },
  { code: "AI", role: "AI engineers", d: "Agents, review systems and retrieval, evaluated against real decisions before they go live." },
  { code: "CRM", role: "CRM specialists", d: "HubSpot, Salesforce, Airtable, Monday.com and GoHighLevel, set up the way your team sells and serves." },
  { code: "UX", role: "Product designers", d: "Mobile-first interfaces people understand on the first try, on any phone." },
  { code: "M&E", role: "Data and M&E analysts", d: "Indicators, dashboards and donor reporting where every number traces back to a record." },
  { code: "SEC", role: "Security and reliability", d: "Access control, encrypted secrets, backups and monitoring, designed in from day one." },
  { code: "DEL", role: "Delivery managers", d: "One accountable contact for scope, timeline, risks and sign-off." },
  { code: "DOC", role: "Trainers and technical writers", d: "Runbooks, walkthrough videos and training, so your team can run it without us." },
];

const HOW = [
  { t: "One lead, the right crew", d: "Every engagement has a lead engineer who owns it end to end, and draws in the disciplines the build needs, nothing more." },
  { t: "Small teams, fast loops", d: "A focused crew ships in weeks, not quarters. You see working software every week." },
  { t: "Built in the open", d: "You get access to the workspace, the repository and the documentation from day one." },
];

const TIMELINE = [
  { y: "2019", t: "Systems thinking", d: "ClickShift's roots are in engineering: chemical engineering first, then software. The same instinct, applied to how organisations work." },
  { y: "2021", t: "Incubator", d: "A post-pandemic incubator in North Central Nigeria: 256 ventures supported, 60 founders trained, 6 grants awarded." },
  { y: "2022", t: "CRM and market entry", d: "HubSpot Sales Hub for a London proptech, and the West African market entry of a $500,000 Norwegian marine simulator." },
  { y: "2023", t: "Programmes at scale", d: "Technology for WEEAP with UN Women: 1,930 women across four countries. SPPG's AI admissions reviewer and learner operations begin." },
  { y: "2024", t: "Automation across continents", d: "Lead routing for California, payment automation for Dubai, lifecycle analytics for the US West Coast. SWEEP with the World Bank: 765 women." },
  { y: "2025", t: "AI in production", d: "SWEEAP for the Chevening Alumni (UK FCDO network): 691 women trained. AI lead scoring for Canada. Alpha, Leverage, Pulse and SolanaFirst shipped. SPLN launched for SPPG's graduates." },
  { y: "2026", t: "The factory", d: "Kobocent and QuantumHire shipped. ClickShift becomes a solutions factory: build, automate, equip." },
  { y: "2045", t: "Still working", d: "The horizon every build is designed for." },
];

const BELIEFS = [
  { t: "Proof over promise", d: "We count what is confirmed, not what is hoped. Every number on this site links to the work behind it." },
  { t: "People decide", d: "AI reads, drafts and routes. A person makes the decisions that affect people." },
  { t: "Boring, durable, cheap", d: "Free tiers, plain cron jobs, clear logs. The best infrastructure is the kind nobody has to think about." },
  { t: "Leave it runnable", d: "Every handover comes with documentation, training and the keys. You should never depend on us to keep the lights on." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        n="UNIT 06"
        eyebrow="About ClickShift"
        title={
          <>
            A studio that builds things that <span className="text-signal">outlast the hype.</span>
          </>
        }
        intro="ClickShift is a solutions factory: engineers, designers and specialists who turn the way organisations work into systems that run themselves. We started as a Web3 intelligence terminal, learned that trends fade and good systems last, and rebuilt around one promise: build what still works in 2045."
      />

      <section className="bg-paper py-16 sm:py-24">
        <Container>
          <Reveal>
            <Eyebrow n="01">The crew</Eyebrow>
            <H2 className="mt-4 max-w-3xl">Every discipline a working system needs, under one roof.</H2>
            <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-mute">
              A platform for a donor programme, an AI reviewer, a CRM rebuild: each needs a different mix of skills. We staff every build from
              these disciplines, so you get specialists without managing ten freelancers.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {CREW.map((c, i) => (
              <Reveal key={c.code} delay={(i % 5) * 50}>
                <div className="group h-full rounded-[20px] border border-ink/8 bg-white p-5 transition-colors hover:border-ink/25">
                  <span className="inline-flex h-10 min-w-10 items-center justify-center rounded-xl bg-ink px-2 font-mono text-[11px] font-medium tracking-wider text-signal transition-colors group-hover:bg-cobalt group-hover:text-paper">
                    {c.code}
                  </span>
                  <h3 className="mt-4 font-display text-lg leading-tight tracking-tight">{c.role}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-mute">{c.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {HOW.map((h, i) => (
              <Reveal key={h.t} delay={i * 60}>
                <div className="h-full border-t-2 border-ink pt-5">
                  <h3 className="font-display text-xl tracking-tight">{h.t}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-mute">{h.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="grid-dark bg-ink py-16 text-paper sm:py-24">
        <Container>
          <Reveal>
            <Eyebrow n="02" tone="dark">
              The line so far
            </Eyebrow>
            <H2 className="mt-4">From one workshop to a factory.</H2>
          </Reveal>
          <ol className="relative mt-12 space-y-0 border-l border-white/15 pl-6 sm:pl-10">
            {TIMELINE.map((e, i) => (
              <Reveal key={e.y} delay={i * 40}>
                <li className="relative pb-10">
                  <span aria-hidden className={`absolute -left-[29px] top-1.5 h-3 w-3 rounded-full sm:-left-[45px] ${e.y === "2045" ? "bg-signal ring-4 ring-signal/20" : "bg-paper/80"}`} />
                  <p className={`font-mono text-sm ${e.y === "2045" ? "text-signal" : "text-stone"}`}>{e.y}</p>
                  <h3 className="mt-1 font-display text-2xl tracking-tight">{e.t}</h3>
                  <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-paper/60">{e.d}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-paper py-16 sm:py-24">
        <Container className="grid items-center gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <div className="relative mx-auto max-w-sm overflow-hidden rounded-[26px] bg-ink">
              <Image
                src="/founder.jpg"
                alt={`${SITE.founder.name}, founder of ClickShift, at his desk in Abuja`}
                width={810}
                height={1080}
                className="h-auto w-full object-cover"
                sizes="(min-width: 1024px) 30vw, 90vw"
              />
            </div>
          </Reveal>
          <div className="lg:col-span-8">
            <Reveal>
              <Eyebrow n="03">Leadership</Eyebrow>
              <H2 className="mt-4">Led by an engineer who still builds.</H2>
              <div className="mt-6 space-y-5 text-[17px] leading-relaxed text-ink/80">
                <p>
                  ClickShift was founded by <b>{SITE.founder.name}</b>, who has spent more than six years turning operations into working software.
                  He led technology on World Bank, UN Women and UK FCDO-funded programmes that reached <b>3,386 women entrepreneurs</b>, and has
                  shipped automation for teams in Nigeria, the UK, the UAE, the US and Canada.
                </p>
                <p>
                  His 2025 essay asked which products will survive 2045. Its answer, products that learn, secure, trace, sustain and care, is now{" "}
                  <Link href="/standard" className="text-cobalt underline underline-offset-4">the standard every ClickShift build is held to</Link>.
                </p>
                <p className="text-[15px] text-ink/60">
                  MBA, Quantic School of Business and Technology · B.Eng Chemical Engineering · HubSpot Sales Hub certified · Project Management,
                  Berkeley Haas · AI Business School, Microsoft
                </p>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href={SITE.founder.linkedin} variant="ghost-light">
                  LinkedIn <ArrowUpRight />
                </Button>
                <Button href="/contact" variant="ink">
                  Work with us <Arrow />
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-paper-2 py-16 sm:py-24">
        <Container>
          <Reveal>
            <Eyebrow n="04">What we believe</Eyebrow>
            <H2 className="mt-4">House rules.</H2>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {BELIEFS.map((b, i) => (
              <Reveal key={b.t} delay={i * 60}>
                <div className="h-full rounded-[22px] bg-white p-7">
                  <span className="font-mono text-[12px] text-cobalt">0{i + 1}</span>
                  <h3 className="mt-3 font-display text-2xl tracking-tight">{b.t}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-mute">{b.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-10 text-[15px] text-mute">
            Looking for the old ClickShift terminal (Alpha, Leverage, Pulse)? Those builds live on in{" "}
            <Link href="/work#products" className="text-cobalt underline underline-offset-4">
              products we built
            </Link>
            .
          </p>
        </Container>
      </section>

      <FinalCta />
    </>
  );
}
