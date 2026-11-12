import { NextResponse } from "next/server";
import { dbConfigured } from "@/lib/server/db";
import { unsubscribe, validToken } from "@/lib/server/unsubscribe";

// POST only: the "Unsubscribe" button on /unsubscribe, and mail apps' one-click unsubscribe (RFC 8058).
// A GET never unsubscribes (link scanners open links), it goes to the confirmation page.

function params(req: Request) {
  const u = new URL(req.url);
  return { e: (u.searchParams.get("e") ?? "").slice(0, 254), t: (u.searchParams.get("t") ?? "").slice(0, 64) };
}

export async function GET(req: Request) {
  const { e, t } = params(req);
  return NextResponse.redirect(new URL(`/unsubscribe?e=${encodeURIComponent(e)}&t=${encodeURIComponent(t)}`, req.url), 303);
}

export async function POST(req: Request) {
  const { e, t } = params(req);
  const form = await req.formData().catch(() => null);
  const fromPage = form?.get("from") === "page";
  if (!dbConfigured() || !validToken(e, t)) {
    return fromPage ? NextResponse.redirect(new URL("/unsubscribe?bad=1", req.url), 303) : new NextResponse("Invalid link", { status: 400 });
  }
  await unsubscribe(e);
  return fromPage ? NextResponse.redirect(new URL("/unsubscribe?done=1", req.url), 303) : new NextResponse("Unsubscribed", { status: 200 });
}
