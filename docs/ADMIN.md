# The ClickShift admin (clickshift.io/admin)

One place to run the business side of the site. It is mobile-first: a bottom tab bar on the phone and a sidebar on desktop.

| Page | What it does |
|---|---|
| **Overview** `/admin` | A greeting, who is on the site now, priority leads, visitors (today, 7 and 30 days), average time on page, subscribers. Also a 30-day visitor chart, notifications, the latest enquiries, top sources and the most-read pages. |
| **Enquiries** `/admin/enquiries` | Every brief from the contact page and every "Reserve" button. Filter by status or priority, and search. |
| **One enquiry** | The brief, its budget, timeline and location. Set its status (New → Replied → Call booked → Proposal sent → Won / Lost / Spam), flag or unflag it as priority, and keep private notes. Below that: every email sent to them, and **what they read before writing** (the pages they viewed in the same browser). |
| **Reply composer** | Opens on the template that fits the enquiry (priority, audit, build, programme, template reservation, general), filled in with their name, service, budget and message. Edit it, then send. It won't send while a `{placeholder}` is still in the text. |
| **Visitors** `/admin/analytics` | Over 7, 30 or 90 days: visitors, page views, time on page, visit length, one-page visits, visitors per day, sources (referrers and `utm_source`), countries, cities, campaigns (`utm_campaign`), landing pages, devices, browsers and systems, and a live feed of page views. |
| **Journal** `/admin/posts` | Write, preview (side by side on desktop, tabs on a phone), save drafts and publish articles. A published article is live on /blog straight away. Built-in articles (`src/lib/posts.ts`) can be edited, hidden from the site, or restored to the original. |
| **Email** `/admin/email` | Write to anyone from the ClickShift address, with the same templates, and see what has been sent. |
| **Subscribers** | Newsletter sign-ups, with unsubscribe/restore and a CSV download. |
| **Settings** | What is connected and what is missing. It never shows a secret. |

## Notifications

- **New enquiry:** saved first, then:
  - an **automatic acknowledgement** goes to the sender;
  - an **email alert** goes to `ADMIN_NOTIFY_EMAIL`, with Reply-To set to the sender;
  - a notification appears in the admin.
- **Priority lead:** a budget of **$2,000 or more** (`PRIORITY_BUDGET_USD` in `src/lib/enquiry.ts`), the rule from the Apex Armor build:
  - it is flagged and pinned on the overview;
  - the acknowledgement says it went to the lead engineer;
  - if the two Telegram variables are set, a Telegram message reaches your phone.
- **New subscriber:** appears as a notification.

## Decisions made (2026-11-12)

- **Brevo is gone.** Briefs and subscribers live in our own Postgres database, hosted by Neon.
- **Every brief gets an acknowledgement.** It confirms receipt, sets the expectation of one working day, and gives the sender a copy of what they sent. Nobody wonders if the form worked, and it is the first touch of the follow-up.
- **Resend sends all email:** acknowledgements, alerts and replies. One HTTP call, no SDK. Kobocent already uses Resend, but ClickShift gets **its own verified domain (clickshift.io) and its own API key**, restricted to that domain.
- **Visitor analytics are first-party.** No cookies and no stored IP addresses; Do Not Track and Global Privacy Control are respected. Location comes from Vercel's edge headers (Cloudflare's are read too, if the site ever moves behind its proxy). Google Analytics stays alongside it for now.

## Environment variables

All are server-only. Never give any of them a `NEXT_PUBLIC_` name.

| Variable | Needed for | How to get it |
|---|---|---|
| `DATABASE_URL` | Everything in the admin, the forms and analytics | Added automatically by Vercel's Neon integration (docs/DEPLOY.md) |
| `ADMIN_EMAIL` | Sign-in | The email you sign in with |
| `ADMIN_PASSWORD_HASH` | Sign-in | `node scripts/admin-password.mjs` (the password itself is never stored) |
| `ADMIN_SESSION_SECRET` | Sign-in | Printed by the same script. Changing it signs everyone out. |
| `ADMIN_TOTP_SECRET` | A 6-digit code at sign-in (recommended) | `node scripts/admin-totp.mjs`, then add it to your authenticator app |
| `RESEND_API_KEY` | Sending email | Resend → API Keys (sending access, clickshift.io only) |
| `EMAIL_FROM` | Sending email | `ClickShift <hello@clickshift.io>` once the domain is verified |
| `EMAIL_REPLY_TO` | Where replies land | Your real inbox |
| `ADMIN_NOTIFY_EMAIL` | New-enquiry alerts | Your real inbox |
| `ADMIN_TELEGRAM_BOT_TOKEN`, `ADMIN_TELEGRAM_CHAT_ID` | Priority-lead alert on your phone (optional) | @BotFather, then `getUpdates` for the chat id |
| `DATABASE_POOL_MAX` | Optional; defaults to 3 | |

## Security

- Sign-in is one admin, from environment variables:
  - the password is checked against an scrypt hash, in constant time;
  - an optional TOTP code adds a second step;
  - 8 attempts per 15 minutes per connection are allowed.
- The session is an HMAC-signed, HttpOnly, SameSite=Strict, Secure cookie that lasts 12 hours. Every admin page and every server action calls `requireAdmin()`.
- `/admin` is disallowed in robots.txt and marked noindex.
- Public endpoints are protected:
  - the enquiry and newsletter endpoints are rate-limited and validate their input;
  - the enquiry form has a hidden honeypot field and a minimum fill time against bots.
- Analytics accepts only page views and time-on-page updates for the visitor's own id. It ignores bots and never records `/admin` or `/api`.

## Tables

All tables are prefixed `cs_`, with time stored as BIGINT epoch milliseconds. They are created automatically on first use (`src/lib/server/db.ts`):

| Table | Holds |
|---|---|
| `cs_enquiries` | Briefs |
| `cs_emails` | Every email sent, with success or failure |
| `cs_subscribers` | Newsletter sign-ups |
| `cs_posts` | Articles written or edited in the admin |
| `cs_pageviews` | Visitor analytics |
| `cs_notifications` | The admin's notifications |
| `cs_rate` | Rate-limit hits |
