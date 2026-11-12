import { Arrow, Button, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="grid-dark flex min-h-[80dvh] items-center bg-ink pt-24 text-paper">
      <Container>
        <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-signal">Error 404 · off the production line</p>
        <h1 className="mt-5 max-w-3xl font-display text-5xl leading-none tracking-[-0.05em] sm:text-7xl">This page hasn&apos;t been built yet.</h1>
        <p className="mt-6 max-w-xl text-lg text-paper/65">
          ClickShift has been rebuilt as a solutions factory, so some old links have moved. Try one of these instead.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/" variant="signal">Home <Arrow /></Button>
          <Button href="/work" variant="ghost-dark">Our work</Button>
          <Button href="/blog" variant="ghost-dark">Journal</Button>
        </div>
      </Container>
    </section>
  );
}
