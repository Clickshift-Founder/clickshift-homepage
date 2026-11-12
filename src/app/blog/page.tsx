import type { Metadata } from "next";
import Link from "next/link";
import { Arrow, Container, Eyebrow, PageHero } from "@/components/ui";
import { PostCard } from "@/components/Cards";
import { Reveal } from "@/components/Interactive";
import NewsletterForm from "@/components/NewsletterForm";
import { allPosts } from "@/lib/server/journal";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "The Journal: automation, AI and products built for 2045",
  description:
    "Practical writing from ClickShift on automation, AI agents, CRM, programme technology and building products that survive 2045.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const all = await allPosts();
  const [lead, ...rest] = all;
  const cats = Array.from(new Set(all.map((p) => p.category)));

  return (
    <>
      <PageHero
        n="UNIT 08"
        eyebrow="The Journal"
        title={
          <>
            Notes from the <span className="text-signal">factory floor.</span>
          </>
        }
        intro="What we learn building automations, AI agents and platforms, written so you can use it on Monday morning."
      >
        <div className="flex flex-wrap gap-2">
          {cats.map((c) => (
            <span key={c} className="rounded-full border border-white/15 px-3 py-1.5 font-mono text-[12px] text-paper/70">
              {c} · {all.filter((p) => p.category === c).length}
            </span>
          ))}
        </div>
      </PageHero>

      <section className="bg-paper py-14 sm:py-20">
        <Container>
          <Reveal>
            <Link href={`/blog/${lead.slug}`} className="group grid overflow-hidden rounded-[28px] bg-ink text-paper lg:grid-cols-2">
              <div className="grid-dark relative flex min-h-64 items-center justify-center overflow-hidden p-10">
                <span className="font-display text-[7rem] leading-none tracking-[-0.06em] text-signal transition-transform duration-500 group-hover:scale-105 sm:text-[10rem]">
                  2045
                </span>
              </div>
              <div className="flex flex-col justify-center p-7 sm:p-12">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-signal">Featured · {lead.category}</p>
                <h2 className="mt-4 font-display text-3xl leading-tight tracking-[-0.03em] sm:text-4xl">{lead.title}</h2>
                <p className="mt-4 text-paper/65">{lead.description}</p>
                <span className="mt-8 inline-flex items-center gap-2 font-medium">
                  Read the essay <Arrow className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </Reveal>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 60}>
                <PostCard p={p} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-ink py-16 text-paper sm:py-20">
        <Container className="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <Eyebrow tone="dark">Monthly, no spam</Eyebrow>
            <h2 className="mt-3 font-display text-4xl tracking-[-0.04em]">Get the next piece in your inbox.</h2>
          </div>
          <NewsletterForm source="journal" />
        </Container>
      </section>
    </>
  );
}
