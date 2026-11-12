import { createHmac, timingSafeEqual } from "node:crypto";
import { SITE } from "@/lib/site";
import { db } from "./db";

// Signed unsubscribe links: /unsubscribe?e=<email>&t=<token>. The token is an HMAC of the email, so a link only ever
// unsubscribes the address it was sent to. Signed with ADMIN_SESSION_SECRET (already required for the admin), under its
// own "unsub:" label. Rotating that secret makes old links show "link expired"; the person can still reply to opt out.

const norm = (email: string) => email.trim().toLowerCase();

export function unsubscribeToken(email: string) {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) return null;
  return createHmac("sha256", secret).update(`unsub:${norm(email)}`).digest("base64url").slice(0, 32);
}

export function unsubscribeUrl(email: string) {
  const t = unsubscribeToken(email);
  return t ? `${SITE.url}/unsubscribe?e=${encodeURIComponent(norm(email))}&t=${t}` : null;
}

/** The one-click endpoint mail apps call (RFC 8058, List-Unsubscribe-Post). */
export function oneClickUrl(email: string) {
  const t = unsubscribeToken(email);
  return t ? `${SITE.url}/api/unsubscribe?e=${encodeURIComponent(norm(email))}&t=${t}` : null;
}

export function validToken(email: string, token: string) {
  const want = unsubscribeToken(email);
  if (!want || !token || token.length !== want.length) return false;
  return timingSafeEqual(Buffer.from(want), Buffer.from(token));
}

/** Adds or updates the address as unsubscribed. Group emails and newsletters skip it from then on. */
export async function unsubscribe(email: string) {
  const sql = await db();
  const e = norm(email);
  await sql`INSERT INTO cs_subscribers (email, created_at, source, status) VALUES (${e}, ${Date.now()}, 'unsubscribe-link', 'unsubscribed')
            ON CONFLICT (email) DO UPDATE SET status = 'unsubscribed'`;
  await sql`INSERT INTO cs_notifications (created_at, kind, title, body, href)
            VALUES (${Date.now()}, 'unsubscribe', 'Someone unsubscribed', ${e}, '/admin/subscribers')`;
}
