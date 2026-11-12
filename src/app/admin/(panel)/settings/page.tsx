import { authConfigured, totpRequired } from "@/lib/server/auth";
import { db, dbConfigured } from "@/lib/server/db";
import { emailConfigured } from "@/lib/server/email";
import { PRIORITY_BUDGET_USD } from "@/lib/enquiry";
import { Card, PageTitle } from "../../_ui";

// Shows what is connected. Never prints a secret, or any part of one.
export default async function SettingsPage() {
  let dbState: { ok: boolean; note: string } = { ok: false, note: "DATABASE_URL is not set" };
  if (dbConfigured()) {
    try {
      const sql = await db();
      const [{ n }] = await sql<{ n: number }[]>`SELECT count(*)::int AS n FROM cs_pageviews`;
      dbState = { ok: true, note: `Connected · ${n.toLocaleString()} page views recorded` };
    } catch (e) {
      dbState = { ok: false, note: `Set, but not answering: ${e instanceof Error ? e.message : "error"}` };
    }
  }
  const rows: { name: string; ok: boolean; note: string; vars: string }[] = [
    { name: "Database", ok: dbState.ok, note: dbState.note, vars: "DATABASE_URL" },
    { name: "Admin sign-in", ok: authConfigured(), note: authConfigured() ? "Set" : "Missing", vars: "ADMIN_EMAIL, ADMIN_PASSWORD_HASH, ADMIN_SESSION_SECRET" },
    { name: "Two-step code", ok: totpRequired(), note: totpRequired() ? "On: a 6-digit code is required at sign-in" : "Off (recommended: turn on)", vars: "ADMIN_TOTP_SECRET" },
    {
      name: "Sending email (Resend)",
      ok: emailConfigured(),
      note: emailConfigured() ? `From ${process.env.EMAIL_FROM}` : "Not connected: acknowledgements and replies won't send",
      vars: "RESEND_API_KEY, EMAIL_FROM, EMAIL_REPLY_TO",
    },
    {
      name: "New-enquiry email alerts",
      ok: Boolean(process.env.ADMIN_NOTIFY_EMAIL),
      note: process.env.ADMIN_NOTIFY_EMAIL ? `To ${process.env.ADMIN_NOTIFY_EMAIL}` : "Off",
      vars: "ADMIN_NOTIFY_EMAIL",
    },
    {
      name: "Priority-lead Telegram alert",
      ok: Boolean(process.env.ADMIN_TELEGRAM_BOT_TOKEN && process.env.ADMIN_TELEGRAM_CHAT_ID),
      note: process.env.ADMIN_TELEGRAM_BOT_TOKEN ? `On for budgets of $${PRIORITY_BUDGET_USD.toLocaleString()} or more` : "Off (optional)",
      vars: "ADMIN_TELEGRAM_BOT_TOKEN, ADMIN_TELEGRAM_CHAT_ID",
    },
  ];
  return (
    <>
      <PageTitle title="Settings" sub="What's connected. Values live in Vercel → Project → Settings → Environment Variables; the steps are in docs/ADMIN.md." />
      <Card>
        <ul className="divide-y divide-ink/6">
          {rows.map((r) => (
            <li key={r.name} className="flex items-start gap-3 py-3.5">
              <span aria-hidden className={`mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] ${r.ok ? "bg-ink text-signal" : "bg-paper text-mute ring-1 ring-ink/15"}`}>
                {r.ok ? "✓" : "–"}
              </span>
              <span className="min-w-0">
                <span className="block text-[15px] font-medium">
                  {r.name} <span className="sr-only">{r.ok ? "connected" : "not connected"}</span>
                </span>
                <span className="block text-[13px] text-mute">{r.note}</span>
                <span className="mt-0.5 block font-mono text-[11px] text-stone">{r.vars}</span>
              </span>
            </li>
          ))}
        </ul>
      </Card>
      <Card title="How the pieces fit" className="mt-4">
        <ul className="space-y-2 text-[14px] leading-relaxed text-ink/80">
          <li>Every brief from the contact page is saved here first, then the sender gets an acknowledgement and you get an alert.</li>
          <li>Briefs with a budget of ${PRIORITY_BUDGET_USD.toLocaleString()} or more are flagged priority and pinned on the overview.</li>
          <li>Visitor analytics are first-party: no cookies and no IP addresses; people with Do Not Track or Global Privacy Control on are not counted.</li>
          <li>Articles you publish in Journal go live on /blog at once; built-in articles can be edited or hidden without touching code.</li>
        </ul>
      </Card>
    </>
  );
}
