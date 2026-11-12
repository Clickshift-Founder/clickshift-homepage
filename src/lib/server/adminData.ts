import { db } from "./db";

// Read-side queries for the admin dashboard. Times are BIGINT ms; days are bucketed in West Africa Time (UTC+1).

export const DAY = 86_400_000;
const TZ = 3_600_000; // UTC+1 (Abuja). Change here if the founder moves.

export type Enquiry = {
  id: number;
  created_at: number;
  updated_at: number;
  name: string;
  email: string;
  company: string | null;
  service: string | null;
  item: string | null;
  budget_label: string | null;
  budget_usd: number | null;
  timeline: string | null;
  message: string;
  ref: string | null;
  page: string | null;
  status: string;
  priority: boolean;
  country: string | null;
  city: string | null;
  visitor_id: string | null;
  notes: string | null;
  ack_sent_at: number | null;
  ack_error: string | null;
};

const num = <T extends Record<string, unknown>>(r: T, keys: (keyof T)[]) => {
  for (const k of keys) if (r[k] !== null && r[k] !== undefined) (r as Record<string, unknown>)[k as string] = Number(r[k]);
  return r;
};

export async function enquiries(opts: { status?: string; priority?: boolean; q?: string; limit?: number } = {}) {
  const sql = await db();
  const like = opts.q ? `%${opts.q.toLowerCase()}%` : null;
  const rows = await sql<Enquiry[]>`
    SELECT * FROM cs_enquiries
    WHERE (${opts.status ?? null}::text IS NULL OR status = ${opts.status ?? null})
      AND (${opts.priority ?? null}::boolean IS NULL OR priority = ${opts.priority ?? null})
      AND (${like}::text IS NULL OR lower(name || ' ' || email || ' ' || coalesce(company,'') || ' ' || message) LIKE ${like})
    ORDER BY created_at DESC
    LIMIT ${opts.limit ?? 200}`;
  return rows.map((r) => num(r, ["id", "created_at", "updated_at", "ack_sent_at", "budget_usd"]));
}

export async function enquiry(id: number) {
  const sql = await db();
  const [r] = await sql<Enquiry[]>`SELECT * FROM cs_enquiries WHERE id = ${id}`;
  if (!r) return null;
  const emails = await sql<{ id: number; created_at: number; to_email: string; subject: string; body: string; kind: string; status: string; error: string | null }[]>`
    SELECT id, created_at, to_email, subject, body, kind, status, error FROM cs_emails WHERE enquiry_id = ${id} ORDER BY created_at DESC`;
  // What this person looked at before writing (same browser).
  const journey = r.visitor_id
    ? await sql<{ ts: number; path: string; duration_ms: number; ref_host: string | null }[]>`
        SELECT ts, path, duration_ms, ref_host FROM cs_pageviews WHERE visitor_id = ${r.visitor_id} AND ts <= ${Number(r.created_at) + 60_000}
        ORDER BY ts DESC LIMIT 25`
    : [];
  return {
    enquiry: num(r, ["id", "created_at", "updated_at", "ack_sent_at", "budget_usd"]),
    emails: emails.map((e) => num(e, ["id", "created_at"])),
    journey: journey.map((j) => num(j, ["ts", "duration_ms"])).reverse(),
  };
}

export async function counts() {
  const sql = await db();
  const [r] = await sql<{ new_count: number; priority_open: number; total: number; subs: number; unread: number }[]>`
    SELECT
      (SELECT count(*)::int FROM cs_enquiries WHERE status = 'new') AS new_count,
      (SELECT count(*)::int FROM cs_enquiries WHERE priority AND status NOT IN ('won','lost','spam')) AS priority_open,
      (SELECT count(*)::int FROM cs_enquiries) AS total,
      (SELECT count(*)::int FROM cs_subscribers WHERE status = 'active') AS subs,
      (SELECT count(*)::int FROM cs_notifications WHERE read_at IS NULL) AS unread`;
  return r;
}

export async function notifications(limit = 20) {
  const sql = await db();
  const rows = await sql<{ id: number; created_at: number; kind: string; title: string; body: string | null; href: string | null; read_at: number | null }[]>`
    SELECT * FROM cs_notifications ORDER BY created_at DESC LIMIT ${limit}`;
  return rows.map((r) => num(r, ["id", "created_at", "read_at"]));
}

export async function subscribers() {
  const sql = await db();
  const rows = await sql<{ id: number; email: string; created_at: number; source: string | null; status: string }[]>`
    SELECT * FROM cs_subscribers ORDER BY created_at DESC`;
  return rows.map((r) => num(r, ["id", "created_at"]));
}

export async function sentEmails(limit = 50) {
  const sql = await db();
  const rows = await sql<{ id: number; created_at: number; enquiry_id: number | null; to_email: string; subject: string; kind: string; status: string; error: string | null }[]>`
    SELECT id, created_at, enquiry_id, to_email, subject, kind, status, error FROM cs_emails WHERE kind IN ('reply','compose') ORDER BY created_at DESC LIMIT ${limit}`;
  return rows.map((r) => num(r, ["id", "created_at", "enquiry_id"]));
}

/* ---------------- Visitor analytics ---------------- */

export type Row = { label: string; value: number; extra?: string; sub?: number };

export async function analytics(days: number) {
  const sql = await db();
  const now = Date.now();
  const since = now - days * DAY;
  const prevSince = since - days * DAY;

  const [tot] = await sql<{ visitors: number; sessions: number; views: number; avg_ms: number; new_visitors: number }[]>`
    SELECT count(DISTINCT visitor_id)::int AS visitors, count(DISTINCT session_id)::int AS sessions, count(*)::int AS views,
           coalesce(avg(NULLIF(duration_ms, 0)), 0)::int AS avg_ms,
           count(DISTINCT visitor_id) FILTER (WHERE is_new)::int AS new_visitors
    FROM cs_pageviews WHERE ts >= ${since}`;
  const [prev] = await sql<{ visitors: number; views: number }[]>`
    SELECT count(DISTINCT visitor_id)::int AS visitors, count(*)::int AS views FROM cs_pageviews WHERE ts >= ${prevSince} AND ts < ${since}`;
  const [bounce] = await sql<{ one: number; n_all: number; avg_session_ms: number }[]>`
    SELECT count(*) FILTER (WHERE n = 1)::int AS one, count(*)::int AS n_all, coalesce(avg(total), 0)::int AS avg_session_ms
    FROM (SELECT session_id, count(*) AS n, sum(duration_ms) AS total FROM cs_pageviews WHERE ts >= ${since} GROUP BY session_id) s`;

  const daily = await sql<{ d: number; visitors: number; views: number }[]>`
    SELECT floor((ts + ${TZ}) / ${DAY})::bigint AS d, count(DISTINCT visitor_id)::int AS visitors, count(*)::int AS views
    FROM cs_pageviews WHERE ts >= ${since} GROUP BY 1 ORDER BY 1`;
  const firstDay = Math.floor((since + TZ) / DAY) + 1;
  const lastDay = Math.floor((now + TZ) / DAY);
  const byDay = new Map(daily.map((r) => [Number(r.d), r]));
  const series = [];
  for (let d = firstDay; d <= lastDay; d++) {
    const r = byDay.get(d);
    series.push({ day: d * DAY, visitors: r?.visitors ?? 0, views: r?.views ?? 0 });
  }

  const pages = await sql<{ path: string; views: number; visitors: number; avg_ms: number; scroll: number }[]>`
    SELECT path, count(*)::int AS views, count(DISTINCT visitor_id)::int AS visitors,
           coalesce(avg(NULLIF(duration_ms, 0)), 0)::int AS avg_ms, coalesce(avg(scroll_pct), 0)::int AS scroll
    FROM cs_pageviews WHERE ts >= ${since} GROUP BY path ORDER BY views DESC LIMIT 25`;

  const sources = await sql<{ src: string; sessions: number }[]>`
    SELECT src, count(*)::int AS sessions FROM (
      SELECT session_id, coalesce(max(utm_source), max(ref_host), 'Direct') AS src FROM cs_pageviews WHERE ts >= ${since} GROUP BY session_id
    ) s GROUP BY src ORDER BY sessions DESC LIMIT 15`;

  const campaigns = await sql<{ campaign: string; source: string | null; sessions: number }[]>`
    SELECT utm_campaign AS campaign, max(utm_source) AS source, count(DISTINCT session_id)::int AS sessions
    FROM cs_pageviews WHERE ts >= ${since} AND utm_campaign IS NOT NULL GROUP BY utm_campaign ORDER BY sessions DESC LIMIT 10`;

  const entries = await sql<{ path: string; sessions: number }[]>`
    SELECT path, count(*)::int AS sessions FROM (
      SELECT DISTINCT ON (session_id) session_id, path FROM cs_pageviews WHERE ts >= ${since} ORDER BY session_id, ts
    ) s GROUP BY path ORDER BY sessions DESC LIMIT 10`;

  const countries = await sql<{ country: string | null; visitors: number }[]>`
    SELECT country, count(DISTINCT visitor_id)::int AS visitors FROM cs_pageviews WHERE ts >= ${since} GROUP BY country ORDER BY visitors DESC LIMIT 15`;
  const cities = await sql<{ city: string | null; country: string | null; visitors: number }[]>`
    SELECT city, country, count(DISTINCT visitor_id)::int AS visitors FROM cs_pageviews WHERE ts >= ${since} AND city IS NOT NULL
    GROUP BY city, country ORDER BY visitors DESC LIMIT 12`;
  const devices = await sql<{ k: string; visitors: number }[]>`
    SELECT coalesce(device, 'unknown') AS k, count(DISTINCT visitor_id)::int AS visitors FROM cs_pageviews WHERE ts >= ${since} GROUP BY 1 ORDER BY 2 DESC`;
  const browsers = await sql<{ k: string; visitors: number }[]>`
    SELECT coalesce(browser, 'Other') AS k, count(DISTINCT visitor_id)::int AS visitors FROM cs_pageviews WHERE ts >= ${since} GROUP BY 1 ORDER BY 2 DESC LIMIT 8`;
  const systems = await sql<{ k: string; visitors: number }[]>`
    SELECT coalesce(os, 'Other') AS k, count(DISTINCT visitor_id)::int AS visitors FROM cs_pageviews WHERE ts >= ${since} GROUP BY 1 ORDER BY 2 DESC LIMIT 8`;

  return {
    totals: { ...tot, bounce: bounce.n_all ? bounce.one / bounce.n_all : 0, avg_session_ms: bounce.avg_session_ms, prev },
    series,
    pages,
    sources,
    campaigns,
    entries,
    countries,
    cities,
    devices,
    browsers,
    systems,
  };
}

export async function live() {
  const sql = await db();
  const since = Date.now() - 5 * 60_000;
  const rows = await sql<{ visitor_id: string; path: string; country: string | null; city: string | null; ts: number; device: string | null }[]>`
    SELECT DISTINCT ON (visitor_id) visitor_id, path, country, city, ts, device FROM cs_pageviews
    WHERE ts >= ${since} ORDER BY visitor_id, ts DESC`;
  return rows.map((r) => num(r, ["ts"]));
}

export async function recentVisits(limit = 30) {
  const sql = await db();
  const rows = await sql<{ id: number; ts: number; path: string; country: string | null; city: string | null; ref_host: string | null; utm_source: string | null; device: string | null; duration_ms: number; scroll_pct: number; is_new: boolean }[]>`
    SELECT id, ts, path, country, city, ref_host, utm_source, device, duration_ms, scroll_pct, is_new FROM cs_pageviews ORDER BY ts DESC LIMIT ${limit}`;
  return rows.map((r) => num(r, ["id", "ts", "duration_ms", "scroll_pct"]));
}

/* ---------------- Group email ---------------- */

export type Contact = {
  email: string;
  name: string | null;
  subscriber: boolean;
  enquiry: boolean;
  enquiryStatus: string | null;
  service: string | null;
  unsubscribed: boolean;
  at: number;
};

/** Everyone we can write to: subscribers and people who sent a brief, one row per email, newest first. */
export async function audience(): Promise<Contact[]> {
  const sql = await db();
  const rows = await sql<{ email: string; name: string | null; sub_status: string | null; enq: boolean; enquiry_status: string | null; service: string | null; at: number }[]>`
    WITH e AS (
      SELECT DISTINCT ON (lower(email)) lower(email) AS email, name, status, service, created_at
      FROM cs_enquiries WHERE status <> 'spam' ORDER BY lower(email), created_at DESC
    ), s AS (
      SELECT lower(email) AS email, status, created_at FROM cs_subscribers
    )
    SELECT coalesce(e.email, s.email) AS email, e.name, s.status AS sub_status, (e.email IS NOT NULL) AS enq,
           e.status AS enquiry_status, e.service, greatest(coalesce(e.created_at, 0), coalesce(s.created_at, 0)) AS at
    FROM e FULL OUTER JOIN s ON s.email = e.email
    ORDER BY at DESC
    LIMIT 5000`;
  return rows.map((r) => ({
    email: r.email,
    name: r.name,
    subscriber: r.sub_status === "active",
    enquiry: r.enq,
    enquiryStatus: r.enquiry_status,
    service: r.service,
    unsubscribed: r.sub_status !== null && r.sub_status !== "active",
    at: Number(r.at),
  }));
}

export async function campaigns(limit = 20) {
  const sql = await db();
  const rows = await sql<{ id: number; created_at: number; sent_at: number | null; subject: string; audience: string | null; status: string; recipients: number; sent: number; failed: number; skipped: number }[]>`
    SELECT id, created_at, sent_at, subject, audience, status, recipients, sent, failed, skipped FROM cs_campaigns ORDER BY created_at DESC LIMIT ${limit}`;
  return rows.map((r) => num(r, ["id", "created_at", "sent_at"]));
}
