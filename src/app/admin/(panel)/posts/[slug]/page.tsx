import Link from "next/link";
import { notFound } from "next/navigation";
import { dbConfigured } from "@/lib/server/db";
import { dbPosts } from "@/lib/server/journal";
import { POSTS } from "@/lib/posts";
import { deletePost } from "../../../actions";
import { Badge, PageTitle } from "../../../_ui";
import NeedsDb from "../../NeedsDb";
import PostEditor, { type EditorPost } from "../PostEditor";

export default async function EditPostPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ saved?: string }> }) {
  if (!dbConfigured()) return <NeedsDb />;
  const { slug } = await params;
  const saved = (await searchParams).saved === "1";
  const isNew = slug === "new";
  const builtIn = POSTS.find((p) => p.slug === slug);
  const d = isNew ? undefined : (await dbPosts()).find((p) => p.slug === slug);
  if (!isNew && !builtIn && !d) notFound();

  const post: EditorPost = d
    ? { slug: d.slug, title: d.title, description: d.description, category: d.category, body: d.body, status: d.status }
    : builtIn
      ? { slug: builtIn.slug, title: builtIn.title, description: builtIn.description, category: builtIn.category, body: builtIn.body, status: "published" }
      : { slug: "", title: "", description: "", category: "Automation", body: "", status: "draft" };
  const live = !isNew && (d ? d.status === "published" : true);

  return (
    <>
      <Link href="/admin/posts" className="mb-3 inline-flex min-h-10 items-center text-[14px] text-mute hover:text-ink">
        ← Journal
      </Link>
      <PageTitle
        title={isNew ? "New article" : "Edit article"}
        sub={
          <span className="flex flex-wrap items-center gap-2">
            {builtIn && <Badge>Built-in</Badge>}
            {d && <Badge tone={d.status === "published" ? "ink" : "muted"}>{d.status}</Badge>}
            {saved && <span className="text-cobalt">Saved.</span>}
            {live && (
              <a href={`/blog/${slug}`} target="_blank" rel="noopener noreferrer" className="text-cobalt underline-offset-2 hover:underline">
                View on the site ↗
              </a>
            )}
          </span>
        }
        action={
          d ? (
            <form action={deletePost}>
              <input type="hidden" name="slug" value={slug} />
              <button className="min-h-10 rounded-full px-4 text-[13px] text-red-700 ring-1 ring-red-200 hover:bg-red-50">
                {builtIn ? "Discard my edits (restore original)" : "Delete article"}
              </button>
            </form>
          ) : null
        }
      />
      <PostEditor post={post} original={isNew ? "" : slug} builtIn={Boolean(builtIn)} />
    </>
  );
}
