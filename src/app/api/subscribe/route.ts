import { NextResponse } from "next/server";

// Server-only. Prefer BREVO_API_KEY / BREVO_LIST_ID; the old NEXT_PUBLIC_ names still work until Vercel is updated.
// A NEXT_PUBLIC_ name can end up in the browser bundle, so rename them in Vercel and then delete the old ones.
const apiKey = process.env.BREVO_API_KEY || process.env.NEXT_PUBLIC_BREVO_API_KEY;
const listId = process.env.BREVO_LIST_ID || process.env.NEXT_PUBLIC_BREVO_LIST_ID;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (typeof email !== "string" || !EMAIL.test(email) || email.length > 254) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }
    if (!apiKey || !listId) {
      console.error("Subscribe: Brevo is not configured");
      return NextResponse.json({ error: "Sign-ups are paused. Please email us instead." }, { status: 503 });
    }

    const res = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json", "api-key": apiKey },
      body: JSON.stringify({ email, listIds: [parseInt(listId, 10)], updateEnabled: true }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      console.error("Subscribe: Brevo returned", res.status, data?.code);
      return NextResponse.json({ error: "We couldn't add you just now. Please try again." }, { status: 400 });
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
