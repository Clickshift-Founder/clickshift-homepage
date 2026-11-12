import type { Metadata } from "next";
import Link from "next/link";
import { Arrow, Button, Container, Eyebrow, PageHero } from "@/components/ui";
import { Countdown2045, Reveal } from "@/components/Interactive";
import FinalCta from "@/components/FinalCta";
import { PILLARS } from "@/lib/pillars";
import { CASES } from "@/lib/work";

export const metadata: Metadata = {
  title: "The 2045 Standard: five pillars of products that last",
  description:
    "Which products will survive 2045? Those that learn, secure, trace, sustain and care. The checklist ClickShift holds every build to, with proof from real projects.",
  alternates: { canonical: "/standard" },
};

const ICON: Record<string, React.ReactNode> = {
  learn: <path d="M6 30 L16 18 L24 24 L34 10" />,
  secure: <path d="M20 6 L32 11 V20 C32 27 27 32 20 34 C13 32 8 27 8 20 V11 Z" />,
  trace: (
    <>
      <circle cx="10" cy="20" r="3.5" />
      <circle cx="30" cy="10" r="3.5" />
      <circle cx="30" cy="30" r="3.5" />
      <path d="M13 19 L27 11 M13 21 L27 29" />
    </>
  ),
  sustain: <path d="M20 6 C28 12 32 18 32 24 A12 12 0 0 1 8 24 C8 18 12 12 20 6 Z M20 34 V20" />,
  care: <path d="M20 33 C10 26 6 21 6 15 A7 7 0 0 1 20 12 A7 7 0 0 1 34 15 C34 21 30 26 20 33 Z" />,
};

export default function StandardPage() {
  return (
    <>
      <PageHero
        n="UNIT 05"
        eyebrow="The 2045 Standard"
        title={
          <>
            Built to still matter in <span className="text-signal">2045.</span>
          </>
        }
        intro="Futurists put the technological singularity at 2045. Whether or not they are right, it is the right horizon for a builder. The products that survive it will learn, secure, trace, sustain and care. These are the five tests every ClickShift build has to pass."
      >
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end">
          <Countdown2045 />
          <Button href="/blog/what-kind-of-products-will-survive-2045" variant="ghost-dark">
            Read the original essay <Arrow />
          </Button>
        </div>
      </PageHero>

      <section className="bg-paper py-12 sm:py-20">
        <Container>
          {PILLARS.map((p, i) => {
            const proofs = CASES.filter((c) => c.pillars.includes(p.key)).slice(0, 4);
            return (
              <Reveal key={p.key}>
                <article id={p.key} className="grid scroll-mt-24 gap-8 border-b border-ink/10 py-14 lg:grid-cols-12">
                  <div className="lg:col-span-5">
                    <div className="flex items-center gap-4">
                      <svg viewBox="0 0 40 40" width="56" height="56" className="rounded-2xl bg-ink p-2.5 text-signal" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        {ICON[p.key]}
                      </svg>
                      <span className="font-mono text-sm text-cobalt">PILLAR {p.n}</span>
                    </div>
                    <h2 className="mt-6 font-display text-6xl tracking-[-0.05em] sm:text-7xl">{p.name}</h2>
                    <p className="mt-4 text-xl text-ink/80">{p.line}</p>
                  </div>
                  <div className="lg:col-span-4">
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-mute">The test</p>
                    <ul className="mt-4 space-y-3">
                      {p.test.map((t) => (
                        <li key={t} className="flex gap-3 rounded-2xl bg-white p-4 text-[15px] text-ink/85">
                          <span aria-hidden className="mt-0.5 font-mono text-cobalt">?</span>
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="lg:col-span-3">
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-mute">Proof in our work</p>
                    <Link href={p.proof.href} className="mt-4 block rounded-2xl bg-ink p-5 text-[15px] leading-relaxed text-paper hover:bg-cobalt">
                      {p.proof.text}
                    </Link>
                    <ul className="mt-3 space-y-1">
                      {proofs.map((c) => (
                        <li key={c.slug}>
                          <Link href={`/work/${c.slug}`} className="inline-flex min-h-9 items-center gap-2 text-[14px] text-mute hover:text-cobalt">
                            <Arrow /> {c.client.split(" · ")[0]}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
                {i === PILLARS.length - 1 && <span className="sr-only">End of pillars</span>}
              </Reveal>
            );
          })}
        </Container>
      </section>

      <section className="bg-ink py-16 text-paper sm:py-24">
        <Container className="max-w-4xl">
          <Eyebrow tone="dark">The origin</Eyebrow>
          <blockquote className="mt-6 font-display text-3xl leading-tight tracking-[-0.03em] sm:text-5xl">
            &ldquo;Decades ago, our computers were lazy and dull. Today they are enablers. Tomorrow? They could be traitors.&rdquo;
          </blockquote>
          <p className="mt-6 text-paper/60">
            From Emmanuel Ohanwe, &ldquo;What Kind of Products Will Survive 2045?&rdquo;, April 2025. The essay that became the Standard.
          </p>
          <div className="mt-8">
            <Button href="/blog/what-kind-of-products-will-survive-2045" variant="signal">
              Read the essay <Arrow />
            </Button>
          </div>
        </Container>
      </section>

      <FinalCta />
    </>
  );
}
