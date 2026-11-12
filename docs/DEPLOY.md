# Deploying clickshift.io: Vercel + Neon

**Decision (founder, 2026-11-12):** clickshift.io stays on **Vercel**, with its data in **Neon Postgres** added through
Vercel's Neon integration. It does **not** run on the DigitalOcean server that runs Kobocent and QuantumHire.

**Why:** a marketing site with a public form and an admin sign-in should not share a machine with a money app. A hosted
Postgres also means no port to open, no nginx, no certificates and no PM2, and the server keeps its memory for Kobocent.

| Piece | Where |
|---|---|
| App | Vercel project for `Clickshift-Founder/clickshift-homepage`, deployed from `main` |
| Database | Neon (Vercel → Storage), injected as `DATABASE_URL` (the pooled address) |
| Secrets | Vercel → Project → Settings → Environment Variables (never in git) |
| Email | Resend, domain clickshift.io |
| DNS | Cloudflare, pointing at Vercel as before |

**No SQL to run.** The seven `cs_` tables are created automatically the first time the site talks to the database
(`SCHEMA` in `src/lib/server/db.ts`). A new table goes there too, never into a hand-run query.

---

## First setup (once)

**1. Add Neon.** Vercel → the clickshift project → **Storage** → **Create Database** → **Neon** (Serverless Postgres).
- Region: the same one as the project's functions (Project → Settings → Functions; Vercel's default is Washington, D.C.,
  `iad1`, which matches Neon's **US East (N. Virginia)**). The same region keeps every query fast.
- Plan: Free is enough to start.
- Connect it to the project for **Production, Preview and Development**, and keep the default variable prefix so the
  connection arrives as `DATABASE_URL`.

Check: Settings → Environment Variables now lists `DATABASE_URL` (and others such as `DATABASE_URL_UNPOOLED`). The site
uses `DATABASE_URL`, the pooled one: its host contains `-pooler`. Leave the others alone.

**2. Admin sign-in values.** These scripts need Node. The laptop has no Node installed, so install it once with
`winget install OpenJS.NodeJS.LTS` and open a new terminal. Then, in the repo folder:

```powershell
cd C:\Users\User\projects\clickshift-homepage
node scripts/admin-password.mjs
node scripts/admin-totp.mjs
```

The first prints `ADMIN_PASSWORD_HASH` and `ADMIN_SESSION_SECRET`. The second prints `ADMIN_TOTP_SECRET` and a link to
add to your authenticator app. Copy them straight into Vercel; don't save them in a file.

**3. Environment variables.** Vercel → Settings → Environment Variables, for **Production** (and Preview if you want to try
the admin on preview links). The full list and what each does is in `docs/ADMIN.md`.

```
ADMIN_EMAIL=
ADMIN_PASSWORD_HASH=
ADMIN_SESSION_SECRET=
ADMIN_TOTP_SECRET=          (recommended)
RESEND_API_KEY=             (step 4)
EMAIL_FROM=ClickShift <hello@clickshift.io>
EMAIL_REPLY_TO=
ADMIN_NOTIFY_EMAIL=
ADMIN_TELEGRAM_BOT_TOKEN=   (optional)
ADMIN_TELEGRAM_CHAT_ID=     (optional)
```

**Delete** the old `NEXT_PUBLIC_BREVO_API_KEY`, `NEXT_PUBLIC_BREVO_LIST_ID` and `NEXT_PUBLIC_STATS_API_URL` while you are there.

**4. Email (Resend).** Resend → Domains → Add `clickshift.io`. Add the DNS records it lists in Cloudflare as
**DNS only** (grey cloud). When it shows Verified, create an API key with "Sending access" for clickshift.io only, and
put it in `RESEND_API_KEY`.

**5. Deploy.** Merge the branch to `main` and push. Vercel builds it. (After changing variables, redeploy:
Deployments → the latest → Redeploy.)

**6. Check it.**
- https://clickshift.io/admin/login → sign in → **Settings** should show the database, sign-in and email as connected.
- Send yourself a brief from /contact: it should appear under Enquiries, and the acknowledgement should arrive.
- Optional, in Neon's SQL Editor (Vercel → Storage → the database → Open in Neon), to see the tables:

```sql
SELECT table_name FROM information_schema.tables WHERE table_name LIKE 'cs\_%' ORDER BY 1;
```

It should list seven tables: cs_emails, cs_enquiries, cs_notifications, cs_pageviews, cs_posts, cs_rate, cs_subscribers.

---

## Every later deploy

Push to `main`. Vercel builds and deploys it. Articles published from /admin don't need a deploy; they go live when you
press Publish.

## Good to know

- **Neon's free plan sleeps** after a few minutes with no queries and wakes on the next one, which adds well under a
  second to that first request. Nothing is lost.
- **Backups:** Neon keeps a short restore history on the free plan. For a copy you hold, download the CSV from
  /admin → Subscribers, or use the Neon console's backup and branch features.
- **Vercel's Hobby plan is for non-commercial use.** ClickShift is a business, so the Pro plan is the one within Vercel's terms.
- **Visitor location** comes from Vercel's `x-vercel-ip-*` headers (country, region, city), so no extra setup is needed.
- pulse.clickshift.io (Cloudflare 526) is a separate issue on the DigitalOcean server: its origin needs a valid
  certificate (a Cloudflare Origin Certificate for `*.clickshift.io` on that server's nginx).
