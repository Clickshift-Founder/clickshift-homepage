"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { checkCredentials, clearSessionCookie, clientKey, requireAdmin, setSessionCookie, totpRequired, verifyTotp } from "@/lib/server/auth";
import { db, dbConfigured, overLimit } from "@/lib/server/db";
import { sendEmail } from "@/lib/server/email";
import { ENQUIRY_STATUSES } from "@/lib/enquiry";
import { POSTS } from "@/lib/posts";

const s = (f: FormData, k: string, max = 20_000) => String(f.get(k) ?? "").trim().slice(0, max);

/* ---------- Sign in / out ---------- */

const memoryTries = new Map<string, number[]>();

export async function login(_: { error?: string } | undefined, f: FormData) {
  const key = `login:${await clientKey()}`;
  let limited: boolean;
  if (dbConfigured()) {
    limited = await overLimit(key, 8, 15 * 60_000);
  } else {
    const now = Date.now();
    const tries = (memoryTries.get(key) ?? []).filter((t) => now - t < 15 * 60_000);
    limited = tries.length >= 8;
    tries.push(now);
    memoryTries.set(key, tries);
  }
  if (limited) return { error: "Too many attempts. Wait 15 minutes and try again." };

  const email = s(f, "email", 254);
  const password = String(f.get("password") ?? "");
  const code = s(f, "code", 10);
  const ok = checkCredentials(email, password) && (!totpRequired() || verifyTotp(code));
  if (!ok) return { error: totpRequired() ? "That email, password or code is not right." : "That email or password is not right." };
  await setSessionCookie(email.toLowerCase());
  redirect("/admin");
}

export async function logout() {
  await clearSessionCookie();
  redirect("/admin/login");
}

/* ---------- Enquiries ---------- */

export async function setEnquiryStatus(f: FormData) {
  await requireAdmin();
  const id = Number(f.get("id"));
  const status = s(f, "status", 20);
  if (!Number.isSafeInteger(id) || !ENQUIRY_STATUSES.some((x) => x.key === status)) return;
  const sql = await db();
  await sql`UPDATE cs_enquiries SET status = ${status}, updated_at = ${Date.now()} WHERE id = ${id}`;
  revalidatePath(`/admin/enquiries/${id}`);
  revalidatePath("/admin/enquiries");
  revalidatePath("/admin");
}

export async function togglePriority(f: FormData) {
  await requireAdmin();
  const id = Number(f.get("id"));
  if (!Number.isSafeInteger(id)) return;
  const sql = await db();
  await sql`UPDATE cs_enquiries SET priority = NOT priority, updated_at = ${Date.now()} WHERE id = ${id}`;
  revalidatePath(`/admin/enquiries/${id}`);
}

export async function saveNotes(f: FormData) {
  await requireAdmin();
  const id = Number(f.get("id"));
  if (!Number.isSafeInteger(id)) return;
  const sql = await db();
  await sql`UPDATE cs_enquiries SET notes = ${s(f, "notes", 10_000) || null}, updated_at = ${Date.now()} WHERE id = ${id}`;
  revalidatePath(`/admin/enquiries/${id}`);
}

export type SendState = { ok?: boolean; error?: string; at?: number } | undefined;

export async function sendAdminEmail(_: SendState, f: FormData): Promise<SendState> {
  await requireAdmin();
  const to = s(f, "to", 254).toLowerCase();
  const subject = s(f, "subject", 300);
  const body = s(f, "body", 50_000);
  const enquiryId = Number(f.get("enquiryId")) || null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(to)) return { error: "Enter a valid email address." };
  if (!subject || body.length < 5) return { error: "Add a subject and a message." };
  if (/\{\w+\}/.test(subject + body)) return { error: "There is still a {placeholder} in the email. Replace it before sending." };
  const r = await sendEmail({ to, subject, text: body, kind: enquiryId ? "reply" : "compose", enquiryId });
  if (!r.ok) return { error: r.error ?? "Send failed." };
  if (enquiryId) {
    const sql = await db();
    await sql`UPDATE cs_enquiries SET status = CASE WHEN status = 'new' THEN 'replied' ELSE status END, updated_at = ${Date.now()} WHERE id = ${enquiryId}`;
    revalidatePath(`/admin/enquiries/${enquiryId}`);
  }
  return { ok: true, at: Date.now() };
}

/* ---------- Notifications ---------- */

export async function markAllRead() {
  await requireAdmin();
  const sql = await db();
  await sql`UPDATE cs_notifications SET read_at = ${Date.now()} WHERE read_at IS NULL`;
  revalidatePath("/admin", "layout");
}

/* ---------- Subscribers ---------- */

export async function setSubscriber(f: FormData) {
  await requireAdmin();
  const id = Number(f.get("id"));
  const status = s(f, "status", 20) === "active" ? "active" : "unsubscribed";
  if (!Number.isSafeInteger(id)) return;
  const sql = await db();
  await sql`UPDATE cs_subscribers SET status = ${status} WHERE id = ${id}`;
  revalidatePath("/admin/subscribers");
}

/* ---------- Journal ---------- */

export type PostState = { error?: string; saved?: number } | undefined;

const CATEGORIES = ["The 2045 Standard", "Automation", "AI", "CRM", "Programmes", "Building", "Do it yourself"];

function revalidateJournal(slug: string) {
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/");
  revalidatePath("/sitemap.xml");
}

export async function savePost(_: PostState, f: FormData): Promise<PostState> {
  await requireAdmin();
  const original = s(f, "original", 120);
  const slug = s(f, "slug", 120)
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "");
  const title = s(f, "title", 200);
  const description = s(f, "description", 400);
  const category = CATEGORIES.includes(s(f, "category")) ? s(f, "category") : "Building";
  const body = s(f, "body", 200_000).replace(/\r\n?/g, "\n");
  const status = s(f, "status") === "published" ? "published" : "draft";
  if (!slug || slug.length < 3) return { error: "The address (slug) needs at least 3 letters." };
  if (!title || !description) return { error: "Add a title and a short description." };
  if (body.length < 50) return { error: "The article is too short to publish." };
  const words = body.split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 220));
  const now = Date.now();
  const sql = await db();

  if (original && original !== slug) {
    const [taken] = await sql`SELECT 1 FROM cs_posts WHERE slug = ${slug}`;
    if (taken || POSTS.some((p) => p.slug === slug)) return { error: "Another article already uses that address." };
    await sql`DELETE FROM cs_posts WHERE slug = ${original}`;
  } else if (!original) {
    const [taken] = await sql`SELECT 1 FROM cs_posts WHERE slug = ${slug}`;
    if (taken || POSTS.some((p) => p.slug === slug)) return { error: "Another article already uses that address." };
  }

  await sql`
    INSERT INTO cs_posts (slug, title, description, category, body, status, read_minutes, created_at, updated_at, published_at)
    VALUES (${slug}, ${title}, ${description}, ${category}, ${body}, ${status}, ${minutes}, ${now}, ${now}, ${status === "published" ? now : null})
    ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description, category = EXCLUDED.category,
      body = EXCLUDED.body, status = EXCLUDED.status, read_minutes = EXCLUDED.read_minutes, updated_at = EXCLUDED.updated_at,
      published_at = CASE WHEN EXCLUDED.status = 'published' THEN coalesce(cs_posts.published_at, EXCLUDED.updated_at) ELSE cs_posts.published_at END`;
  revalidateJournal(slug);
  if (original) revalidateJournal(original);
  revalidatePath("/admin/posts");
  if (original !== slug) redirect(`/admin/posts/${slug}?saved=1`);
  return { saved: now };
}

/** Remove an article's admin version. For a built-in article this restores the original text. */
export async function deletePost(f: FormData) {
  await requireAdmin();
  const slug = s(f, "slug", 120);
  const sql = await db();
  await sql`DELETE FROM cs_posts WHERE slug = ${slug}`;
  revalidateJournal(slug);
  revalidatePath("/admin/posts");
  redirect("/admin/posts");
}

/** Take a built-in article off the site without deleting its text. */
export async function hideBuiltIn(f: FormData) {
  await requireAdmin();
  const slug = s(f, "slug", 120);
  const p = POSTS.find((x) => x.slug === slug);
  if (!p) return;
  const now = Date.now();
  const sql = await db();
  await sql`
    INSERT INTO cs_posts (slug, title, description, category, body, status, read_minutes, created_at, updated_at)
    VALUES (${p.slug}, ${p.title}, ${p.description}, ${p.category}, ${p.body}, 'hidden', ${p.readMinutes}, ${now}, ${now})
    ON CONFLICT (slug) DO UPDATE SET status = 'hidden', updated_at = ${now}`;
  revalidateJournal(slug);
  revalidatePath("/admin/posts");
}
