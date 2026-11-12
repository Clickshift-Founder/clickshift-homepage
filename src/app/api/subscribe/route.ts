import { NextResponse } from "next/server";
import { db, dbConfigured, notify, overLimit } from "@/lib/server/db";
import { clientKey } from "@/lib/server/auth";

// Newsletter sign-ups are stored in our own database (cs_subscribers) and shown in /admin/subscribers.
// Brevo is no longer used (founder, 2026-11-12): delete BREVO_* and NEXT_PUBLIC_BREVO_* from Vercel.

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: Request) {
  try {
    const { email, source } = await req.json();
    if (typeof email !== "string" || !EMAIL.test(email.trim()) || email.length > 254) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }
    if (!dbConfigured()) {
      return NextResponse.json({ error: "Sign-ups are paused. Please email us instead." }, { status: 503 });
    }
    if (await overLimit(`subscribe:${await clientKey()}`, 5, 10 * 60_000)) {
      return NextResponse.json({ error: "Too many attempts. Please try again later." }, { status: 429 });
    }
    const sql = await db();
    const clean = email.trim().toLowerCase();
    const src = typeof source === "string" ? source.slice(0, 40) : null;
    const rows = await sql`
      INSERT INTO cs_subscribers (email, created_at, source) VALUES (${clean}, ${Date.now()}, ${src})
      ON CONFLICT (email) DO UPDATE SET status = 'active'
      RETURNING (xmax = 0) AS inserted`;
    if (rows[0]?.inserted) await notify("subscriber", `New subscriber: ${clean}`, src ? `from ${src}` : undefined, "/admin/subscribers");
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("subscribe failed", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
