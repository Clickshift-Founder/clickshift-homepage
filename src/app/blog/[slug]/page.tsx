import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Prose, { headings } from "@/components/Prose";
import { Arrow, Button, Container } from "@/components/ui";
import { CaseCard, PostCard } from "@/components/Cards";
import NewsletterForm from "@/components/NewsletterForm";
import { POSTS, POST_AUTHOR } from "@/lib/posts";
import { allPosts, getPost } from "@/lib/server/journal";

// Articles published from /admin appear within minutes (and at once: publishing revalidates the page).
export const revalidate = 300;
import { caseBySlug } from "@/lib/work";
import { serviceBySlug } from "@/lib/services";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = await getPost(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.description,
    alternates: { canonical: `/blog/${p.slug}` },
    authors: [{ name: POST_AUTHOR }],
    openGraph: { type: "article", title: p.title, description: p.description, url: `${SITE.url}/blog/${p.slug}`, publishedTime: p.date, authors: [POST_AUTHOR] },
  };
}

const fmt = (iso: string) => new Date(iso + "T12:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await getPost(slug);
  if (!p) notFound();
  const list = await allPosts();

  const toc = headings(p.body);
  const cases = (p.cases ?? []).map(caseBySlug).filter((c): c is NonNullable<typeof c> => Boolean(c)).slice(0, 2);
  const services = (p.services ?? []).map(serviceBySlug).filter((s): s is NonNullable<typeof s> => Boolean(s));
  const more = list.filter((x) => x.slug !== p.slug && (x.category === p.category || x.cases?.some((c) => p.cases?.includes(c)))).slice(0, 3);
  const others = more.length >= 2 ? more : list.filter((x) => x.slug !== p.slug).slice(0, 3);

  const ld = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: p.title,
    description: p.description,
    datePublished: p.date,
    dateModified: p.date,
    author: { "@type": "Person", name: POST_AUTHOR, url: SITE.founder.linkedin },
    publisher: { "@type": "Organization", name: SITE.name, logo: { "@type": "ImageObject", url: `${SITE.url}/icon.svg` } },
    mainEntityOfPage: `${SITE.url}/blog/${p.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <header className="grid-dark bg-ink pb-14 pt-28 text-paper sm:pb-20 sm:pt-36">
        <Container className="max-w-4xl">
          <nav aria-label="Breadcrumb" className="font-mono text-[12px] text-stone">
            <Link href="/blog" className="hover:text-signal">Journal</Link> <span className="mx-1">/</span> {p.category}
          </nav>
          <h1 className="mt-6 font-display text-[2.3rem] leading-[1.02] tracking-[-0.045em] sm:text-6xl">{p.title}</h1>
          <p className="mt-6 text-lg leading-relaxed text-paper/65">{p.description}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[12px] text-stone">
            <span className="text-paper/85">{POST_AUTHOR}</span>
            <span>·</span>
            <time dateTime={p.date}>{fmt(p.date)}</time>
            <span>·</span>
            <span>{p.readMinutes} min read</span>
          </div>
          {p.originally && (
            <p className="mt-3 text-[13px] text-paper/45">
              {p.originally.href ? (
                <a href={p.originally.href} target="_blank" rel="noopener noreferrer" className="underline decoration-white/25 underline-offset-4 hover:text-signal">
                  {p.originally.label}
                </a>
              ) : (
                p.originally.label
              )}
            </p>
          )}
        </Container>
      </header>

      <section className="bg-paper py-12 sm:py-16">
        <Container className="grid gap-12 lg:grid-cols-12">
          <aside className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-24">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-mute">In this piece</p>
              <ul className="mt-4 space-y-2 border-l border-ink/10">
                {toc.map((h) => (
                  <li key={h.id}>
                    <a href={`#${h.id}`} className="-ml-px block border-l border-transparent py-1 pl-4 text-[14px] text-mute hover:border-cobalt hover:text-ink">
                      {h.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
          <article className="min-w-0 lg:col-span-6">
            <Prose md={p.body} />
            <div className="mt-12 rounded-[22px] bg-ink p-6 text-paper sm:p-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-signal">Put this to work</p>
              <p className="mt-3 font-display text-2xl tracking-tight">Want this built for your team?</p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Button href={`/contact?service=${services[0]?.slug ?? "audit"}`} variant="signal">
                  Start a project <Arrow />
                </Button>
                <Button href="/automation" variant="ghost-dark">
                  See services
                </Button>
              </div>
            </div>
          </article>
          <aside className="space-y-5 lg:col-span-3">
            {services.length > 0 && (
              <div className="rounded-[22px] bg-white p-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-mute">Related services</p>
                <ul className="mt-3 space-y-2">
                  {services.map((s) => (
                    <li key={s.slug}>
                      <Link href={`/automation#${s.slug}`} className="flex items-center justify-between rounded-xl bg-paper px-3 py-3 text-[14px] hover:bg-ink hover:text-paper">
                        <span>{s.name}</span>
                        <span className="font-mono text-[11px] opacity-70">{s.price}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="rounded-[22px] bg-white p-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-mute">The Journal, monthly</p>
              <div className="mt-3">
                <NewsletterForm tone="light" source={`post-${p.slug}`} />
              </div>
            </div>
          </aside>
        </Container>
      </section>

      {cases.length > 0 && (
        <section className="bg-paper-2 py-14 sm:py-20">
          <Container>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cobalt">The work behind this piece</p>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {cases.map((c) => (
                <CaseCard key={c.slug} c={c} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="bg-paper py-14 sm:py-20">
        <Container>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cobalt">Keep reading</p>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {others.map((x) => (
              <PostCard key={x.slug} p={x} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
