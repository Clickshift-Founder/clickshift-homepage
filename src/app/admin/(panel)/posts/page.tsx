import Link from "next/link";
import { dbConfigured } from "@/lib/server/db";
import { dbPosts } from "@/lib/server/journal";
import { POSTS } from "@/lib/posts";
import { hideBuiltIn } from "../../actions";
import { ago, Badge, Card, PageTitle } from "../../_ui";
import NeedsDb from "../NeedsDb";

export default async function PostsPage() {
  if (!dbConfigured()) return <NeedsDb />;
  const rows = await dbPosts();
  const bySlug = new Map(rows.map((r) => [r.slug, r]));
  const own = rows.filter((r) => !POSTS.some((p) => p.slug === r.slug));

  return (
    <>
      <PageTitle
        title="Journal"
        sub="Write, edit and publish articles. Publishing puts them on clickshift.io/blog straight away."
        action={
          <Link href="/admin/posts/new" className="inline-flex min-h-11 items-center rounded-full bg-ink px-5 text-[14px] font-medium text-paper hover:bg-cobalt">
            + New article
          </Link>
        }
      />

      <Card title={`Written in the admin · ${own.length}`}>
        {own.length === 0 ? (
          <p className="text-[14px] text-mute">Nothing yet. Your new articles will appear here.</p>
        ) : (
          <ul className="divide-y divide-ink/6">
            {own.map((p) => (
              <li key={p.slug}>
                <Link href={`/admin/posts/${p.slug}`} className="flex items-center justify-between gap-3 py-3 hover:bg-paper/60">
                  <span className="min-w-0">
                    <span className="block truncate text-[15px] font-medium">{p.title}</span>
                    <span className="text-[12px] text-mute">
                      {p.category} · edited {ago(p.updated_at)}
                    </span>
                  </span>
                  <Badge tone={p.status === "published" ? "ink" : "muted"}>{p.status}</Badge>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <Card title={`Built-in articles · ${POSTS.length}`} className="mt-4">
        <ul className="divide-y divide-ink/6">
          {POSTS.map((p) => {
            const d = bySlug.get(p.slug);
            const state = !d ? "live" : d.status === "published" ? "edited" : d.status === "hidden" ? "hidden" : "draft edit";
            return (
              <li key={p.slug} className="flex items-center justify-between gap-3 py-3">
                <Link href={`/admin/posts/${p.slug}`} className="min-w-0 flex-1 hover:text-cobalt">
                  <span className="block truncate text-[15px] font-medium">{d?.title ?? p.title}</span>
                  <span className="text-[12px] text-mute">{p.category}</span>
                </Link>
                <span className="flex shrink-0 items-center gap-2">
                  <Badge tone={state === "hidden" ? "muted" : state === "live" ? "default" : "cobalt"}>{state}</Badge>
                  {state !== "hidden" && (
                    <form action={hideBuiltIn}>
                      <input type="hidden" name="slug" value={p.slug} />
                      <button className="min-h-9 rounded-full px-2 text-[12px] text-mute hover:text-ink" title="Take off the site">
                        Hide
                      </button>
                    </form>
                  )}
                </span>
              </li>
            );
          })}
        </ul>
      </Card>
    </>
  );
}
