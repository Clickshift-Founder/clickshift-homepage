import { Container } from "./ui";
import Prose from "./Prose";

export default function LegalPage({ title, updated, md }: { title: string; updated: string; md: string }) {
  return (
    <>
      <header className="grid-dark bg-ink pb-12 pt-32 text-paper sm:pt-40">
        <Container className="max-w-3xl">
          <h1 className="font-display text-5xl tracking-[-0.045em]">{title}</h1>
          <p className="mt-3 font-mono text-[12px] text-stone">Last updated {updated}</p>
        </Container>
      </header>
      <section className="bg-paper py-14">
        <Container className="max-w-3xl">
          <Prose md={md} />
        </Container>
      </section>
    </>
  );
}
