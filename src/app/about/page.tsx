import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Arrow, ArrowUpRight, Button, Container, Eyebrow, H2, PageHero } from "@/components/ui";
import { Reveal } from "@/components/Interactive";
import FinalCta from "@/components/FinalCta";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About: a factory for solutions that outlast 2045",
  description:
    "ClickShift is a solutions factory founded by Emmanuel Ohanwe in Abuja. Programme technology for the World Bank, UN Women and FCDO-funded programmes, automation for teams on four continents, and our own products.",
  alternates: { canonical: "/about" },
};

const TIMELINE = [
  { y: "2019", t: "Chemical engineer by training", d: "B.Eng, Federal University of Petroleum Resources, Effurun (GPA 3.74/4.0). Systems thinking, applied to software." },
  { y: "2021", t: "Incubator", d: "Ran a post-pandemic incubator in North Central Nigeria: 256 ventures supported, 60 founders trained, 6 grants awarded." },
  { y: "2022", t: "CRM and market entry", d: "Built HubSpot Sales Hub for a London proptech, and led the West African market entry of a $500,000 Norwegian marine simulator." },
  { y: "2023", t: "Programmes at scale", d: "Technical lead for WEEAP with UN Women: 1,930 women across four countries. Joined EndGame as technical automations and product lead." },
  { y: "2024", t: "Automation across continents", d: "AI lead routing for California, payment automation for Dubai, lifecycle analytics for the US West Coast. SWEEP with the World Bank: 765 women." },
  { y: "2025", t: "AI in production", d: "SWEEAP for the Chevening Alumni (UK FCDO network): 691 women trained. AI lead scoring for Canada. ClickShift Labs ships Alpha, Leverage and Pulse." },
  { y: "2026", t: "The factory", d: "Kobocent and QuantumHire live. ClickShift becomes a solutions factory: build, automate, equip." },
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
            A factory for things that <span className="text-signal">outlast the hype.</span>
          </>
        }
        intro="ClickShift started as a Web3 intelligence terminal. We learned what every builder learns eventually: trends fade and good systems last. So we rebuilt ourselves around one promise: build what still works in 2045."
      />

      <section className="bg-paper py-16 sm:py-24">
        <Container className="grid items-start gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-[26px] bg-ink">
              <Image
                src="/founder.jpg"
                alt="Emmanuel Ohanwe, founder of ClickShift, at his desk in Abuja"
                width={810}
                height={1080}
                className="h-auto w-full object-cover"
                sizes="(min-width: 1024px) 40vw, 100vw"
                priority
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-6 pt-20 text-paper">
                <p className="font-display text-2xl tracking-tight">{SITE.founder.name}</p>
                <p className="text-[14px] text-paper/70">{SITE.founder.role} · Abuja</p>
              </div>
            </div>
          </Reveal>
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow n="01">The founder</Eyebrow>
              <H2 className="mt-4">An engineer who builds the systems himself.</H2>
            </Reveal>
            <Reveal>
              <div className="mt-6 space-y-5 text-[17px] leading-relaxed text-ink/80">
                <p>
                  Emmanuel Ohanwe has spent more than six years turning operations into working software. He was technical lead on World Bank,
                  UN Women and UK FCDO-funded programmes that reached <b>3,386 women entrepreneurs</b>. He has built AI and CRM automation for teams
                  in Nigeria, the UK, the UAE, the US and Canada, and he founded and built <Link href="/work/kobocent" className="text-cobalt underline underline-offset-4">Kobocent</Link> and{" "}
                  <Link href="/work/quantumhire" className="text-cobalt underline underline-offset-4">QuantumHire</Link>.
                </p>
                <p>
                  In 2025 he published an essay asking which products will survive 2045. His answer, products that learn, secure, trace,
                  sustain and care, is now <Link href="/standard" className="text-cobalt underline underline-offset-4">the standard this factory works to</Link>.
                </p>
                <p className="text-ink/60">
                  MBA, Quantic School of Business and Technology (2026) · B.Eng Chemical Engineering · HubSpot Sales Hub certified · Project
                  Management, Berkeley Haas · AI Business School, Microsoft
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

      <section className="grid-dark bg-ink py-16 text-paper sm:py-24">
        <Container>
          <Reveal>
            <Eyebrow n="02" tone="dark">
              The line so far
            </Eyebrow>
            <H2 className="mt-4">From one engineer to a factory.</H2>
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
        <Container>
          <Reveal>
            <Eyebrow n="03">What we believe</Eyebrow>
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
            Looking for the old ClickShift terminal (Alpha, Leverage, Pulse)? It lives on in{" "}
            <Link href="/work#products" className="text-cobalt underline underline-offset-4">
              our products
            </Link>
            .
          </p>
        </Container>
      </section>

      <FinalCta />
    </>
  );
}
