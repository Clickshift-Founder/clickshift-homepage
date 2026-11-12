import { POSTS, type Post } from "@/lib/posts";
import { db, dbConfigured } from "./db";

// The Journal = the articles in src/lib/posts.ts + articles written in /admin/posts (table cs_posts).
// A database article with the same slug as a built-in one replaces it, so any article can be edited from the admin.
// A database article with status 'hidden' removes the built-in article of that slug from the site.

export type DbPost = {
  slug: string;
  title: string;
  description: string;
  category: string;
  body: string;
  status: "draft" | "published" | "hidden";
  read_minutes: number;
  created_at: number;
  updated_at: number;
  published_at: number | null;
};

const iso = (ms: number) => new Date(ms).toISOString().slice(0, 10);

export function toPost(d: DbPost, base?: Post): Post {
  return {
    ...(base ?? {}),
    slug: d.slug,
    title: d.title,
    description: d.description,
    category: d.category as Post["category"],
    body: d.body,
    readMinutes: d.read_minutes,
    date: iso(Number(d.published_at ?? d.updated_at)),
  };
}

export async function dbPosts(): Promise<DbPost[]> {
  if (!dbConfigured()) return [];
  try {
    const sql = await db();
    const rows = await sql<DbPost[]>`SELECT * FROM cs_posts ORDER BY COALESCE(published_at, updated_at) DESC`;
    return rows.map((r) => ({ ...r, created_at: Number(r.created_at), updated_at: Number(r.updated_at), published_at: r.published_at === null ? null : Number(r.published_at) }));
  } catch (e) {
    console.error("journal: database read failed, using built-in articles", e instanceof Error ? e.message : e);
    return [];
  }
}

/** Every article visitors can see: built-in ones (unless replaced or hidden) plus published database ones. */
export async function allPosts(): Promise<Post[]> {
  const rows = await dbPosts();
  const bySlug = new Map(rows.map((r) => [r.slug, r]));
  const out: Post[] = [];
  for (const p of POSTS) {
    const d = bySlug.get(p.slug);
    if (!d) out.push(p);
    else if (d.status === "published") out.push(toPost(d, p));
    // draft over a built-in article: the built-in stays live until the edit is published
    else if (d.status === "draft") out.push(p);
  }
  for (const d of rows) if (d.status === "published" && !POSTS.some((p) => p.slug === d.slug)) out.push(toPost(d));
  return sortPosts(out);
}

export function sortPosts(list: Post[]) {
  return [...list].sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return b.date.localeCompare(a.date);
  });
}

export async function getPost(slug: string) {
  return (await allPosts()).find((p) => p.slug === slug);
}
