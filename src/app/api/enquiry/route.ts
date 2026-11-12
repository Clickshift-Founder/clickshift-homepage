import { NextResponse } from "next/server";
import { db, dbConfigured, notify, overLimit } from "@/lib/server/db";
import { clientKey } from "@/lib/server/auth";
import { sendEmail, telegramAlert } from "@/lib/server/email";
import { ackEmail, itemName, serviceName } from "@/lib/emailTemplates";
import { BUDGET_OPTIONS, PRIORITY_BUDGET_USD } from "@/lib/enquiry";
import { SITE } from "@/lib/site";
import { geo } from "@/lib/server/geo";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  // Bots: a hidden field people never fill, and a form submitted faster than a person can type.
  if (str(body.website, 200) || (typeof body.elapsed === "number" && body.elapsed < 2500)) {
    return NextResponse.json({ ok: true });
  }

  const name = str(body.name, 120);
  const email = str(body.email, 254).toLowerCase();
  const message = str(body.message, 5000);
  if (!name || !EMAIL.test(email) || message.length < 10) {
    return NextResponse.json({ error: "Please add your name, a valid email and a few words about the project." }, { status: 400 });
  }

  if (!dbConfigured()) {
    return NextResponse.json({ error: "unavailable", fallback: `mailto:${SITE.email}` }, { status: 503 });
  }

  try {
    if (await overLimit(`enquiry:${await clientKey()}`, 5, 10 * 60_000)) {
      return NextResponse.json({ error: "Too many submissions. Please try again in a few minutes." }, { status: 429 });
    }

    const budgetLabel = str(body.budget, 60);
    const budgetUsd = BUDGET_OPTIONS.find((b) => b.label === budgetLabel)?.usd ?? null;
    const priority = budgetUsd !== null && budgetUsd >= PRIORITY_BUDGET_USD;
    const where = geo(req.headers);
    const now = Date.now();
    const e = {
      name,
      email,
      company: str(body.company, 160) || null,
      service: str(body.service, 60) || null,
      item: str(body.item, 80) || null,
      budget_label: budgetLabel || null,
      timeline: str(body.timeline, 60) || null,
      message,
      priority,
    };

    const sql = await db();
    const [row] = await sql<{ id: number }[]>`
      INSERT INTO cs_enquiries (created_at, updated_at, name, email, company, service, item, budget_label, budget_usd, timeline, message,
                                ref, page, priority, country, city, visitor_id)
      VALUES (${now}, ${now}, ${e.name}, ${e.email}, ${e.company}, ${e.service}, ${e.item}, ${e.budget_label}, ${budgetUsd}, ${e.timeline},
              ${e.message}, ${str(body.ref, 120) || null}, ${str(body.page, 300) || null}, ${priority},
              ${where.country}, ${where.city}, ${str(body.vid, 64) || null})
      RETURNING id`;
    const id = Number(row.id);

    const what = e.service === "template" ? itemName(e.item) || "a template" : serviceName(e.service);
    await notify(
      priority ? "priority" : "enquiry",
      `${priority ? "Priority lead" : "New enquiry"}: ${e.name}${e.company ? `, ${e.company}` : ""}`,
      `${what}${e.budget_label ? ` · ${e.budget_label}` : ""}`,
      `/admin/enquiries/${id}`,
    );

    // The acknowledgement to the person, and an alert to us. Neither may fail the submission.
    const ack = ackEmail(e);
    const sent = await sendEmail({ to: e.email, subject: ack.subject, text: ack.text, kind: "ack", enquiryId: id });
    await sql`UPDATE cs_enquiries SET ack_sent_at = ${sent.ok ? Date.now() : null}, ack_error = ${sent.error ?? null} WHERE id = ${id}`;

    const adminTo = process.env.ADMIN_NOTIFY_EMAIL;
    const link = `${SITE.url}/admin/enquiries/${id}`;
    if (adminTo) {
      await sendEmail({
        to: adminTo,
        subject: `${priority ? "PRIORITY " : ""}New enquiry: ${e.name} · ${what}${e.budget_label ? ` · ${e.budget_label}` : ""}`,
        text: `${e.name} <${e.email}>${e.company ? `\n${e.company}` : ""}\n\nService: ${what}\nBudget: ${e.budget_label ?? "-"}\nTimeline: ${e.timeline ?? "-"}\n\n${e.message}\n\nOpen it: ${link}`,
        kind: "admin-alert",
        enquiryId: id,
        replyTo: e.email,
      });
    }
    if (priority) await telegramAlert(`Priority lead (${e.budget_label}): ${e.name}${e.company ? `, ${e.company}` : ""}\n${what}\n${link}`);

    return NextResponse.json({ ok: true, ackSent: sent.ok });
  } catch (err) {
    console.error("enquiry failed", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "Something went wrong. Please email us instead.", fallback: `mailto:${SITE.email}` }, { status: 500 });
  }
}
