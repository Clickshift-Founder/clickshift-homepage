import type { Metadata } from "next";
import { PageHero, Container, Eyebrow, H2 } from "@/components/ui";
import { CaseCard } from "@/components/Cards";
import { Reveal, Marquee } from "@/components/Interactive";
import FinalCta from "@/components/FinalCta";
import { BRANDS, CASES, LINES, type Line } from "@/lib/work";

export const metadata: Metadata = {
  title: "Work: brands and programmes we've built for",
  description:
    "Case studies from ClickShift: platforms for World Bank, UN Women and FCDO-funded programmes, AI and CRM automation for companies in five countries, and products such as Kobocent and QuantumHire.",
  alternates: { canonical: "/work" },
};

const ORDER: Line[] = ["programmes", "products", "companies", "institutions"];

export default function WorkPage() {
  return (
    <>
      <PageHero
        n="UNIT 01"
        eyebrow="The work"
        title={
          <>
            {CASES.length} builds. <span className="text-signal">One standard.</span>
          </>
        }
        intro="Platforms for donor-funded programmes, automation for companies across five countries, and the products we run ourselves. Each case says plainly what our role was."
      >
        <nav aria-label="Jump to section" className="flex flex-wrap gap-2">
          {ORDER.map((l) => (
            <a key={l} href={`#${l}`} className="min-h-11 rounded-full border border-white/15 px-4 py-2.5 text-[14px] text-paper/80 hover:border-signal hover:text-signal">
              {LINES[l].label} · {CASES.filter((c) => c.line === l).length}
            </a>
          ))}
        </nav>
      </PageHero>

      <section className="border-b border-ink/8 bg-paper py-8">
        <Marquee items={BRANDS} />
      </section>

      {ORDER.map((line, li) => {
        const items = CASES.filter((c) => c.line === line);
        return (
          <section key={line} id={line} className={`scroll-mt-20 py-16 sm:py-24 ${li % 2 ? "bg-paper-2" : "bg-paper"}`}>
            <Container>
              <Reveal>
                <Eyebrow n={`0${li + 1}`}>{LINES[line].blurb}</Eyebrow>
                <H2 className="mt-3">{LINES[line].label}</H2>
              </Reveal>
              <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {items.map((c, i) => (
                  <Reveal key={c.slug} delay={(i % 3) * 60}>
                    <CaseCard c={c} big={line === "programmes"} />
                  </Reveal>
                ))}
              </div>
            </Container>
          </section>
        );
      })}

      <FinalCta />
    </>
  );
}
