import type { Metadata } from "next";
import { Suspense } from "react";
import { Container, PageHero } from "@/components/ui";
import BriefBuilder from "./BriefBuilder";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Start a project",
  description: "Tell ClickShift what you want to build or automate. A reply within one working day.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        n="UNIT 07"
        eyebrow="Start a project"
        title={
          <>
            Tell us what&apos;s slowing you down. <span className="text-signal">We&apos;ll reply within a working day.</span>
          </>
        }
        intro="Four quick questions, and we'll have what we need to give you a straight answer: whether we can help, how, and what it will cost."
      />
      <section className="bg-paper py-14 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Suspense fallback={<div className="h-96 rounded-[26px] bg-white" />}>
              <BriefBuilder />
            </Suspense>
          </div>
          <aside className="space-y-4 lg:col-span-4">
            <div className="rounded-[22px] bg-ink p-6 text-paper">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-signal">Prefer email?</p>
              <a href={`mailto:${SITE.email}`} className="mt-3 block break-all font-display text-2xl tracking-tight hover:text-signal">
                {SITE.email}
              </a>
              <p className="mt-3 text-[14px] text-paper/60">{SITE.location}</p>
            </div>
            {SITE.bookingUrl && (
              <a href={SITE.bookingUrl} target="_blank" rel="noopener noreferrer" className="block rounded-[22px] bg-signal p-6 text-ink">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/60">Or talk now</p>
                <p className="mt-2 font-display text-2xl tracking-tight">Book a 30-minute call</p>
              </a>
            )}
            <div className="rounded-[22px] bg-white p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-mute">What happens next</p>
              <ol className="mt-4 space-y-3 text-[15px] text-ink/80">
                <li><b className="text-ink">1.</b> We read your brief and reply within one working day.</li>
                <li><b className="text-ink">2.</b> A 30-minute call to understand the work.</li>
                <li><b className="text-ink">3.</b> A fixed quote or a clear starting price, in writing.</li>
              </ol>
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}
