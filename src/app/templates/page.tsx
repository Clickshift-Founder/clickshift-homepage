import type { Metadata } from "next";
import { Arrow, Button, Container, Eyebrow, H2, PageHero } from "@/components/ui";
import { Reveal } from "@/components/Interactive";
import NewsletterForm from "@/components/NewsletterForm";
import TemplateLibrary from "./TemplateLibrary";
import { BUNDLE, SETUP_ADDON, TEMPLATES } from "@/lib/templates";

export const metadata: Metadata = {
  title: "CRM templates and workflow packs",
  description:
    "Ready-made CRM templates and automation workflows for HubSpot, Salesforce, Airtable, Monday.com, GoHighLevel, Make and n8n, each born from a real ClickShift build. From $39.",
  alternates: { canonical: "/templates" },
};

export default function TemplatesPage() {
  return (
    <>
      <PageHero
        n="UNIT 03"
        eyebrow="Template library"
        title={
          <>
            The systems behind our builds, <span className="text-signal">ready to install.</span>
          </>
        }
        intro={`${TEMPLATES.length} CRM templates and workflow packs for sales, NGOs, education, fintech, HR and service businesses. Each one comes from a system we built and ran for real.`}
      >
        <div className="flex flex-wrap gap-2">
          {["HubSpot", "Salesforce", "Airtable", "Monday.com", "GoHighLevel", "Make", "n8n"].map((p) => (
            <span key={p} className="rounded-full border border-white/15 px-3 py-1.5 font-mono text-[12px] text-paper/70">
              {p}
            </span>
          ))}
        </div>
      </PageHero>

      <section className="bg-paper py-14 sm:py-20">
        <Container>
          <div className="mb-10 rounded-2xl border border-dashed border-cobalt/40 bg-white p-5 text-[15px] text-ink/80 sm:flex sm:items-center sm:justify-between sm:gap-6">
            <p>
              <b className="text-ink">Opening soon.</b> Templates are being packaged now. Reserve one and you&apos;ll get it first, at 40% off
              the listed price.
            </p>
            <div className="mt-4 shrink-0 sm:mt-0 sm:w-96">
              <NewsletterForm tone="light" cta="Notify me" source="templates" />
            </div>
          </div>
          <TemplateLibrary />
        </Container>
      </section>

      <section className="bg-ink py-16 text-paper sm:py-24">
        <Container className="grid gap-5 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-[26px] bg-signal p-8 text-ink sm:p-10">
              <Eyebrow>Bundle</Eyebrow>
              <h2 className="mt-3 font-display text-4xl tracking-[-0.04em]">{BUNDLE.name}</h2>
              <p className="mt-3 text-ink/70">{BUNDLE.note}.</p>
              <p className="mt-8 font-display text-6xl tracking-[-0.05em]">${BUNDLE.price}</p>
              <p className="text-[13px] text-ink/60">Worth ${TEMPLATES.reduce((a, t) => a + t.price, 0).toLocaleString()} if bought one by one</p>
              <Button href="/contact?service=template&item=bundle" variant="ink" className="mt-8">
                Reserve the bundle <Arrow />
              </Button>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="h-full rounded-[26px] border border-white/10 bg-ink-2 p-8 sm:p-10">
              <Eyebrow tone="dark">Add-on</Eyebrow>
              <h2 className="mt-3 font-display text-4xl tracking-[-0.04em]">{SETUP_ADDON.name}</h2>
              <p className="mt-3 text-paper/65">{SETUP_ADDON.note}: your fields, your pipeline stages, your team trained.</p>
              <p className="mt-8 font-display text-6xl tracking-[-0.05em] text-signal">${SETUP_ADDON.price}</p>
              <p className="text-[13px] text-paper/45">per template</p>
              <Button href="/contact?service=template&item=setup" variant="signal" className="mt-8">
                Ask about set-up <Arrow />
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-paper py-16 sm:py-24">
        <Container className="text-center">
          <Eyebrow>Need something bespoke?</Eyebrow>
          <H2 className="mx-auto mt-4 max-w-3xl">If your process doesn&apos;t fit a template, we&apos;ll build the CRM around it.</H2>
          <div className="mt-8 flex justify-center">
            <Button href="/automation#systems-build" variant="ink">
              Systems Build, from $2,500 <Arrow />
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
