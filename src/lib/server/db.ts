import postgres from "postgres";

// One Postgres for the admin: enquiries, emails, subscribers, journal posts, visitor analytics, notifications.
// DATABASE_URL is any Postgres connection string. In production (founder, 2026-11-12): Neon, added through Vercel's
// Neon integration, which injects the pooled address as DATABASE_URL (docs/DEPLOY.md).
// Every time column is BIGINT epoch milliseconds (Date.now()), never TIMESTAMP. Tables are prefixed cs_.
// Without DATABASE_URL the public site still builds and runs: forms fall back to email and the journal uses src/lib/posts.ts.

type Sql = postgres.Sql;
// Next bundles each route separately, so module state is per bundle. Keep one pool for the whole process on globalThis,
// so a serverless instance never holds more connections than DATABASE_POOL_MAX.
const g = globalThis as unknown as { __csSql?: Sql; __csReady?: Promise<void> | null };

export const dbConfigured = () => Boolean(process.env.DATABASE_URL);

function connect(): Sql {
  if (!g.__csSql) {
    g.__csSql = postgres(process.env.DATABASE_URL as string, {
      max: Number(process.env.DATABASE_POOL_MAX ?? 3),
      idle_timeout: 20,
      connect_timeout: 10,
      prepare: false, // works through poolers (Neon / PgBouncer)
      onnotice: () => {},
    });
  }
  return g.__csSql;
}

const SCHEMA = `
CREATE TABLE IF NOT EXISTS cs_enquiries (
  id BIGSERIAL PRIMARY KEY,
  created_at BIGINT NOT NULL,
  updated_at BIGINT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  service TEXT,
  item TEXT,
  budget_label TEXT,
  budget_usd INTEGER,
  timeline TEXT,
  message TEXT NOT NULL,
  ref TEXT,
  page TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  priority BOOLEAN NOT NULL DEFAULT false,
  country TEXT,
  city TEXT,
  visitor_id TEXT,
  notes TEXT,
  ack_sent_at BIGINT,
  ack_error TEXT
);
CREATE INDEX IF NOT EXISTS cs_enquiries_created ON cs_enquiries (created_at DESC);

CREATE TABLE IF NOT EXISTS cs_emails (
  id BIGSERIAL PRIMARY KEY,
  created_at BIGINT NOT NULL,
  enquiry_id BIGINT,
  to_email TEXT NOT NULL,
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  kind TEXT NOT NULL,
  status TEXT NOT NULL,
  provider_id TEXT,
  error TEXT
);
CREATE INDEX IF NOT EXISTS cs_emails_enquiry ON cs_emails (enquiry_id);

CREATE TABLE IF NOT EXISTS cs_subscribers (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at BIGINT NOT NULL,
  source TEXT,
  status TEXT NOT NULL DEFAULT 'active'
);

CREATE TABLE IF NOT EXISTS cs_posts (
  slug TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  body TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft',
  read_minutes INTEGER NOT NULL DEFAULT 5,
  created_at BIGINT NOT NULL,
  updated_at BIGINT NOT NULL,
  published_at BIGINT
);

CREATE TABLE IF NOT EXISTS cs_pageviews (
  id BIGSERIAL PRIMARY KEY,
  ts BIGINT NOT NULL,
  visitor_id TEXT NOT NULL,
  session_id TEXT NOT NULL,
  path TEXT NOT NULL,
  referrer TEXT,
  ref_host TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  country TEXT,
  region TEXT,
  city TEXT,
  device TEXT,
  browser TEXT,
  os TEXT,
  is_new BOOLEAN NOT NULL DEFAULT false,
  duration_ms INTEGER NOT NULL DEFAULT 0,
  scroll_pct SMALLINT NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS cs_pageviews_ts ON cs_pageviews (ts);
CREATE INDEX IF NOT EXISTS cs_pageviews_session ON cs_pageviews (session_id);

CREATE TABLE IF NOT EXISTS cs_notifications (
  id BIGSERIAL PRIMARY KEY,
  created_at BIGINT NOT NULL,
  kind TEXT NOT NULL,
  title TEXT NOT NULL,
  body TEXT,
  href TEXT,
  read_at BIGINT
);
CREATE INDEX IF NOT EXISTS cs_notifications_created ON cs_notifications (created_at DESC);

CREATE TABLE IF NOT EXISTS cs_rate (
  key TEXT NOT NULL,
  ts BIGINT NOT NULL
);
CREATE INDEX IF NOT EXISTS cs_rate_key_ts ON cs_rate (key, ts);
`;

/** The connection, with the schema created on first use. Throws if DATABASE_URL is not set. */
export async function db(): Promise<Sql> {
  if (!dbConfigured()) throw new Error("DATABASE_URL is not set");
  const sql = connect();
  if (!g.__csReady) {
    g.__csReady = sql.unsafe(SCHEMA).then(
      () => undefined,
      (e) => {
        g.__csReady = null;
        throw e;
      },
    );
  }
  await g.__csReady;
  return sql;
}

/** Count recent hits for a key and record this one. Returns true when the caller is over the limit. */
export async function overLimit(key: string, max: number, windowMs: number): Promise<boolean> {
  const sql = await db();
  const now = Date.now();
  const [{ n }] = await sql<{ n: number }[]>`SELECT count(*)::int AS n FROM cs_rate WHERE key = ${key} AND ts > ${now - windowMs}`;
  if (n >= max) return true;
  await sql`INSERT INTO cs_rate (key, ts) VALUES (${key}, ${now})`;
  if (Math.random() < 0.02) await sql`DELETE FROM cs_rate WHERE ts < ${now - 86_400_000}`;
  return false;
}

export async function notify(kind: string, title: string, body?: string, href?: string) {
  const sql = await db();
  await sql`INSERT INTO cs_notifications (created_at, kind, title, body, href) VALUES (${Date.now()}, ${kind}, ${title}, ${body ?? null}, ${href ?? null})`;
}
