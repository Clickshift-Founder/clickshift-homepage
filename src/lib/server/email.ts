import { SITE } from "@/lib/site";
import { db, dbConfigured } from "./db";

// Email through Resend (https://resend.com). One HTTP call, no SDK.
//   RESEND_API_KEY       server-only; never NEXT_PUBLIC_
//   EMAIL_FROM           e.g. "ClickShift <hello@clickshift.io>" (the domain must be verified in Resend)
//   EMAIL_REPLY_TO       where client replies land (defaults to ADMIN_NOTIFY_EMAIL, then SITE.email)
//   ADMIN_NOTIFY_EMAIL   where new-enquiry alerts go
// Every send is logged in cs_emails, success or failure.

export const emailConfigured = () => Boolean(process.env.RESEND_API_KEY && process.env.EMAIL_FROM);

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Plain text in, a clean branded HTML email out. Blank lines make paragraphs; URLs become links. */
export function toHtml(text: string) {
  const paras = text
    .trim()
    .split(/\n\s*\n/)
    .map((p) => esc(p).replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" style="color:#2E44FF">$1</a>').replace(/\n/g, "<br>"))
    .map((p) => `<p style="margin:0 0 16px">${p}</p>`)
    .join("");
  return `<!doctype html><html><body style="margin:0;background:#F3F0E8;padding:24px 12px;font-family:Inter,Segoe UI,Arial,sans-serif;color:#0B0C10">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:18px;overflow:hidden">
<tr><td style="background:#0B0C10;padding:18px 24px"><span style="display:inline-block;width:10px;height:10px;background:#D4FF3A;margin-right:8px"></span><span style="color:#F3F0E8;font-weight:600;font-size:16px;letter-spacing:-0.2px">ClickShift</span></td></tr>
<tr><td style="padding:28px 24px 8px;font-size:15px;line-height:1.65">${paras}</td></tr>
<tr><td style="padding:0 24px 24px;font-size:12px;color:#5A5E67">ClickShift · the solutions factory · <a href="${SITE.url}" style="color:#5A5E67">clickshift.io</a></td></tr>
</table></td></tr></table></body></html>`;
}

export type SendResult = { ok: boolean; id?: string; error?: string };

export async function sendEmail(opts: {
  to: string;
  subject: string;
  text: string;
  kind: "ack" | "admin-alert" | "reply" | "compose";
  enquiryId?: number | null;
  replyTo?: string;
}): Promise<SendResult> {
  let result: SendResult;
  if (!emailConfigured()) {
    result = { ok: false, error: "Email is not configured (RESEND_API_KEY, EMAIL_FROM)" };
  } else {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env.EMAIL_FROM,
          to: [opts.to],
          subject: opts.subject,
          text: opts.text,
          html: toHtml(opts.text),
          reply_to: opts.replyTo ?? process.env.EMAIL_REPLY_TO ?? process.env.ADMIN_NOTIFY_EMAIL ?? SITE.email,
        }),
        signal: AbortSignal.timeout(10_000),
      });
      const data = (await res.json().catch(() => ({}))) as { id?: string; message?: string };
      result = res.ok ? { ok: true, id: data.id } : { ok: false, error: data.message ?? `Resend answered ${res.status}` };
    } catch (e) {
      result = { ok: false, error: e instanceof Error ? e.message : "Send failed" };
    }
  }
  if (dbConfigured()) {
    try {
      const sql = await db();
      await sql`INSERT INTO cs_emails (created_at, enquiry_id, to_email, subject, body, kind, status, provider_id, error)
        VALUES (${Date.now()}, ${opts.enquiryId ?? null}, ${opts.to}, ${opts.subject}, ${opts.text}, ${opts.kind},
                ${result.ok ? "sent" : "failed"}, ${result.id ?? null}, ${result.error ?? null})`;
    } catch (e) {
      console.error("email log failed", e instanceof Error ? e.message : e);
    }
  }
  return result;
}

/** Optional instant alert for priority leads: ADMIN_TELEGRAM_BOT_TOKEN + ADMIN_TELEGRAM_CHAT_ID. */
export async function telegramAlert(text: string) {
  const token = process.env.ADMIN_TELEGRAM_BOT_TOKEN;
  const chat = process.env.ADMIN_TELEGRAM_CHAT_ID;
  if (!token || !chat) return;
  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chat, text, disable_web_page_preview: true }),
      signal: AbortSignal.timeout(8_000),
    });
  } catch {
    // An alert must never break the request that triggered it.
  }
}
