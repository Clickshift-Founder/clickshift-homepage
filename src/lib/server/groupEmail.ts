import { SITE } from "@/lib/site";
import { db } from "./db";
import { emailConfigured, toHtml } from "./email";
import { oneClickUrl, unsubscribeUrl } from "./unsubscribe";

// Group email: one message, one separate email per person (nobody sees anyone else's address), through Resend's batch
// endpoint (up to 100 emails per call). Every email carries an unsubscribe link and List-Unsubscribe headers, and anyone
// unsubscribed is skipped. Each send is logged in cs_emails (kind 'group', campaign_id) and summed in cs_campaigns.
// The future newsletter agent uses the same path: it saves a cs_campaigns row as 'draft', the founder approves, and
// sendCampaign() sends it.

export type Recipient = { email: string; name?: string | null };

export const MAX_GROUP = 1000;
const CHUNK = 100;

const firstName = (name?: string | null) => (name ?? "").trim().split(/\s+/)[0] || "there";

/** {firstName} and {name} become each person's own. */
export function personalise(text: string, r: Recipient) {
  return text.replace(/\{firstName\}/gi, firstName(r.name)).replace(/\{name\}/gi, (r.name ?? "").trim() || "there");
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Emails that must not get group mail. */
export async function suppressed(): Promise<Set<string>> {
  const sql = await db();
  const rows = await sql<{ email: string }[]>`SELECT email FROM cs_subscribers WHERE status <> 'active'`;
  return new Set(rows.map((r) => r.email.toLowerCase()));
}

export async function sendCampaign(campaignId: number, list: Recipient[]) {
  const sql = await db();
  const [c] = await sql<{ subject: string; body: string }[]>`SELECT subject, body FROM cs_campaigns WHERE id = ${campaignId}`;
  if (!c) throw new Error("Campaign not found");
  if (!emailConfigured()) throw new Error("Email is not configured (RESEND_API_KEY, EMAIL_FROM)");

  const skip = await suppressed();
  const seen = new Set<string>();
  const people = list.filter((r) => {
    const e = r.email.trim().toLowerCase();
    if (!e || seen.has(e) || skip.has(e)) return false;
    seen.add(e);
    return true;
  });
  const skipped = list.length - people.length;
  await sql`UPDATE cs_campaigns SET status = 'sending', recipients = ${people.length}, skipped = ${skipped} WHERE id = ${campaignId}`;

  let sent = 0;
  let failed = 0;
  const replyTo = process.env.EMAIL_REPLY_TO ?? process.env.ADMIN_NOTIFY_EMAIL ?? SITE.email;
  for (let i = 0; i < people.length; i += CHUNK) {
    const chunk = people.slice(i, i + CHUNK);
    const emails = chunk.map((r) => {
      const text = personalise(c.body, r);
      const unsub = unsubscribeUrl(r.email);
      const oneClick = oneClickUrl(r.email);
      return {
        from: process.env.EMAIL_FROM,
        to: [r.email],
        subject: personalise(c.subject, r),
        text: unsub ? `${text}\n\n—\nUnsubscribe: ${unsub}` : text,
        html: toHtml(text, unsub ?? undefined),
        reply_to: replyTo,
        ...(oneClick ? { headers: { "List-Unsubscribe": `<${oneClick}>`, "List-Unsubscribe-Post": "List-Unsubscribe=One-Click" } } : {}),
      };
    });
    let ids: (string | undefined)[] = [];
    let error: string | null = null;
    try {
      const res = await fetch("https://api.resend.com/emails/batch", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
          // A retried chunk is never sent twice.
          "Idempotency-Key": `cs-campaign-${campaignId}-${i / CHUNK}`,
        },
        body: JSON.stringify(emails),
        signal: AbortSignal.timeout(30_000),
      });
      const data = (await res.json().catch(() => ({}))) as { data?: { id?: string }[]; message?: string };
      if (res.ok) ids = (data.data ?? []).map((d) => d.id);
      else error = data.message ?? `Resend answered ${res.status}`;
    } catch (e) {
      error = e instanceof Error ? e.message : "Send failed";
    }
    const now = Date.now();
    for (const [k, r] of chunk.entries()) {
      await sql`INSERT INTO cs_emails (created_at, enquiry_id, to_email, subject, body, kind, status, provider_id, error, campaign_id)
        VALUES (${now}, NULL, ${r.email}, ${personalise(c.subject, r)}, ${personalise(c.body, r)}, 'group',
                ${error ? "failed" : "sent"}, ${ids[k] ?? null}, ${error}, ${campaignId})`;
    }
    if (error) failed += chunk.length;
    else sent += chunk.length;
    await sql`UPDATE cs_campaigns SET sent = ${sent}, failed = ${failed} WHERE id = ${campaignId}`;
    if (i + CHUNK < people.length) await sleep(600); // Resend allows about 2 requests a second
  }
  await sql`UPDATE cs_campaigns SET status = 'sent', sent_at = ${Date.now()} WHERE id = ${campaignId}`;
  return { sent, failed, skipped, recipients: people.length };
}
