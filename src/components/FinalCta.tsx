import { Arrow, Button, Container } from "./ui";

export default function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-signal py-20 text-ink sm:py-28">
      <svg aria-hidden viewBox="0 0 48 48" className="pointer-events-none absolute -right-16 -top-10 h-[26rem] w-[26rem] opacity-[0.07]">
        <path d="M9 37 L18 29 L18 37 Z M18 37 L27 21 L27 37 Z M27 37 L36 13 L36 37 Z" fill="#0B0C10" />
        <rect x="37" y="6" width="5.5" height="5.5" rx="1.2" fill="#0B0C10" />
      </svg>
      <Container className="relative">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/60">Next on the line</p>
        <h2 className="mt-4 max-w-4xl font-display text-[2.6rem] leading-[0.95] tracking-[-0.05em] sm:text-7xl">
          Bring us the manual work. We&apos;ll build something that outlasts it.
        </h2>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button href="/contact" variant="ink">
            Start a project <Arrow />
          </Button>
          <Button href="/pricing" variant="ghost-light">
            See pricing
          </Button>
        </div>
      </Container>
    </section>
  );
}
