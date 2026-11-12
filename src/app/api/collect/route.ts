import { NextResponse } from "next/server";
import { db, dbConfigured } from "@/lib/server/db";
import { geo } from "@/lib/server/geo";

// First-party visitor analytics. The browser sends a page view (t: "pv") and, as the visitor reads, how long they stayed
// and how far they scrolled (t: "ping"). We store no IP address and no cookies: the visitor id is a random value kept in
// the visitor's own browser storage. Country and city come from Vercel's edge headers. Bots are skipped.
// Visitors with Do Not Track or Global Privacy Control are never sent here (see components/Tracker.tsx).

const BOT = /bot|crawl|spider|slurp|preview|headless|lighthouse|pingdom|monitor|curl|wget|python-requests|facebookexternalhit|embedly|vercel-screenshot/i;

function parseUa(ua: string) {
  const device = /iPad|Tablet/i.test(ua) ? "tablet" : /Mobi|Android|iPhone/i.test(ua) ? "mobile" : "desktop";
  const browser = /Edg\//.test(ua)
    ? "Edge"
    : /OPR\/|Opera/.test(ua)
      ? "Opera"
      : /SamsungBrowser/.test(ua)
        ? "Samsung"
        : /CriOS|Chrome\//.test(ua)
          ? "Chrome"
          : /FxiOS|Firefox\//.test(ua)
            ? "Firefox"
            : /Safari\//.test(ua)
              ? "Safari"
              : "Other";
  const os = /Windows/.test(ua)
    ? "Windows"
    : /iPhone|iPad|iOS/.test(ua)
      ? "iOS"
      : /Android/.test(ua)
        ? "Android"
        : /Mac OS X|Macintosh/.test(ua)
          ? "macOS"
          : /Linux/.test(ua)
            ? "Linux"
            : "Other";
  return { device, browser, os };
}

const s = (v: unknown, max: number) => (typeof v === "string" && v ? v.slice(0, max) : null);

export async function POST(req: Request) {
  if (!dbConfigured()) return new NextResponse(null, { status: 204 });
  const ua = req.headers.get("user-agent") ?? "";
  if (!ua || BOT.test(ua)) return new NextResponse(null, { status: 204 });

  let b: Record<string, unknown>;
  try {
    b = JSON.parse(await req.text()); // sendBeacon posts text/plain
  } catch {
    return new NextResponse(null, { status: 400 });
  }
  const vid = s(b.vid, 64);
  if (!vid) return new NextResponse(null, { status: 400 });

  try {
    const sql = await db();
    if (b.t === "ping") {
      const id = Number(b.id);
      const ms = Math.min(30 * 60_000, Math.max(0, Math.round(Number(b.ms) || 0)));
      const scroll = Math.min(100, Math.max(0, Math.round(Number(b.scroll) || 0)));
      if (Number.isSafeInteger(id) && id > 0) {
        await sql`UPDATE cs_pageviews SET duration_ms = GREATEST(duration_ms, ${ms}), scroll_pct = GREATEST(scroll_pct, ${scroll})
                  WHERE id = ${id} AND visitor_id = ${vid}`;
      }
      return new NextResponse(null, { status: 204 });
    }

    const path = s(b.path, 300);
    const sid = s(b.sid, 64);
    if (!path || !sid || !path.startsWith("/") || path.startsWith("/admin") || path.startsWith("/api")) {
      return new NextResponse(null, { status: 204 });
    }
    const referrer = s(b.ref, 500);
    let refHost: string | null = null;
    try {
      if (referrer) refHost = new URL(referrer).hostname.replace(/^www\./, "");
    } catch {}
    const host = new URL(req.url).hostname.replace(/^www\./, "");
    if (refHost === host || refHost === "clickshift.io") refHost = null;

    const { device, browser, os } = parseUa(ua);
    const where = geo(req.headers);
    const [row] = await sql<{ id: number }[]>`
      INSERT INTO cs_pageviews (ts, visitor_id, session_id, path, referrer, ref_host, utm_source, utm_medium, utm_campaign,
                                country, region, city, device, browser, os, is_new)
      VALUES (${Date.now()}, ${vid}, ${sid}, ${path}, ${refHost ? referrer : null}, ${refHost}, ${s(b.us, 100)}, ${s(b.um, 100)}, ${s(b.uc, 100)},
              ${where.country}, ${where.region}, ${where.city},
              ${device}, ${browser}, ${os}, ${b.isNew === true})
      RETURNING id`;
    return NextResponse.json({ id: Number(row.id) });
  } catch (err) {
    console.error("collect failed", err instanceof Error ? err.message : err);
    return new NextResponse(null, { status: 204 });
  }
}
