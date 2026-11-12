import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const res = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.NEXT_PUBLIC_BREVO_API_KEY as string, // ✅ from .env.local
      },
      body: JSON.stringify({
        email,
        listIds: [parseInt(process.env.NEXT_PUBLIC_BREVO_LIST_ID as string, 10)], // ✅ from .env.local
        updateEnabled: true,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ error: data.message || "Brevo API error" }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Brevo Subscribe Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
