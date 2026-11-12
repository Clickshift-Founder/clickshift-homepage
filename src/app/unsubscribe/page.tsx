import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { SITE } from "@/lib/site";
import { validToken } from "@/lib/server/unsubscribe";

export const metadata: Metadata = { title: "Unsubscribe", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

type Q = { e?: string; t?: string; done?: string; bad?: string };

export default async function Unsubscribe({ searchParams }: { searchParams: Promise<Q> }) {
  const q = await searchParams;
  const e = (q.e ?? "").slice(0, 254);
  const t = (q.t ?? "").slice(0, 64);
  const ok = Boolean(e && t && validToken(e, t));

  let title: string;
  let body: React.ReactNode;
  if (q.done) {
    title = "You're unsubscribed.";
    body = <p>You won&apos;t get group emails or the newsletter from us again. If you have a project with us, we&apos;ll still answer anything you send.</p>;
  } else if (q.bad || !ok) {
    title = "This link doesn't work any more.";
    body = (
      <p>
        Reply to any of our emails with &ldquo;unsubscribe&rdquo;, or write to{" "}
        <a href={`mailto:${SITE.email}?subject=Unsubscribe`} className="text-cobalt underline underline-offset-4">
          {SITE.email}
        </a>
        , and we&apos;ll take you off the list.
      </p>
    );
  } else {
    title = "Unsubscribe?";
    body = (
      <>
        <p>
          Stop group emails and the newsletter to <strong className="break-all">{e}</strong>.
        </p>
        <form method="post" action={`/api/unsubscribe?e=${encodeURIComponent(e)}&t=${encodeURIComponent(t)}`} className="mt-6">
          <input type="hidden" name="from" value="page" />
          <button className="min-h-12 rounded-full bg-ink px-6 text-[15px] font-medium text-paper hover:bg-cobalt">Unsubscribe</button>
        </form>
      </>
    );
  }

  return (
    <section className="bg-paper py-24 sm:py-32">
      <Container className="max-w-xl">
        <h1 className="font-display text-4xl tracking-[-0.03em] sm:text-5xl">{title}</h1>
        <div className="mt-5 text-[16px] leading-relaxed text-ink/80">{body}</div>
      </Container>
    </section>
  );
}
