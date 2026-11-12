# Deploying clickshift.io on our DigitalOcean server

**Decision (founder, 2026-11-12):** clickshift.io runs on our own DigitalOcean server, the one that runs Kobocent and
QuantumHire, with its data in a `clickshift` database in the same Postgres.

**Why the whole site moves, not only the database:** the server's firewall allows 22, 80 and 443 only, with 80/443 open
to Cloudflare's addresses alone. Vercel would need Postgres (5432) open to the internet, and Vercel has no fixed IPs to
allow-list. Our rule is never to open a port for a new service, so the app runs on the server, talks to Postgres on
127.0.0.1, and is reached only through nginx behind Cloudflare, exactly like the others.

| Piece | Where |
|---|---|
| App | `~/clickshift-homepage`, PM2 process **`clickshift`**, `npm run start:prod` → 127.0.0.1:3100 |
| Database | Postgres database `clickshift`, role `clickshift` (created by `scripts/db-create.mjs`) |
| Secrets | `~/clickshift-homepage/.env.local` (never committed: `.env*` is git-ignored) |
| Web | nginx site `deploy/nginx-clickshift.io.conf`, Cloudflare proxied (orange), SSL "Full (strict)" with a Cloudflare Origin Certificate |
| Email | Resend, domain clickshift.io |
| Backups | the Kobocent repo's `scripts/db-backup.js --name clickshift --env ~/clickshift-homepage/.env.local`, nightly |

---

## First deploy (once)

Run these on the server, one block at a time, and read each output before the next.

**1. Room to build.** A Next.js build needs about 1.5 GB of free memory.

```bash
free -m
ss -ltnp | grep -E ':3100\b' || echo "port 3100 is free"
```

If "available" is under 1500, add swap first (only if `swapon --show` prints nothing):

```bash
sudo fallocate -l 2G /swapfile && sudo chmod 600 /swapfile && sudo mkswap /swapfile && sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

**2. Code.**

```bash
cd ~ && git clone https://github.com/Clickshift-Founder/clickshift-homepage.git && cd clickshift-homepage
git checkout main && npm ci
```

**3. Database.** First try with Kobocent's own connection (it is read into the command, never printed):

```bash
cd ~/clickshift-homepage
PG_ADMIN_URL="$(grep -E '^DATABASE_URL=' ~/clickbot/.env | cut -d= -f2-)" node scripts/db-create.mjs
```

If it says *permission denied to create role*, use the postgres superuser over the local socket instead:

```bash
sudo -u postgres PG_ADMIN_SOCKET=/var/run/postgresql/.s.PGSQL.5432 "$(command -v node)" scripts/db-create.mjs
```

It prints one `DATABASE_URL=...` line. Keep it for step 4. It is shown once.

**4. Secrets.** Create `.env.local` with `nano ~/clickshift-homepage/.env.local`. Fill each value. The full list is in
`docs/ADMIN.md` ("Environment variables").

```
DATABASE_URL=            (from step 3)
ADMIN_EMAIL=
ADMIN_PASSWORD_HASH=     (node scripts/admin-password.mjs)
ADMIN_SESSION_SECRET=    (printed by the same script)
ADMIN_TOTP_SECRET=       (node scripts/admin-totp.mjs; recommended)
RESEND_API_KEY=
EMAIL_FROM=ClickShift <hello@clickshift.io>
EMAIL_REPLY_TO=
ADMIN_NOTIFY_EMAIL=
ADMIN_TELEGRAM_BOT_TOKEN=   (optional)
ADMIN_TELEGRAM_CHAT_ID=     (optional)
```

```bash
chmod 600 ~/clickshift-homepage/.env.local
```

**5. Build and start.** Check it before saving the PM2 list.

```bash
cd ~/clickshift-homepage && npm run build
pm2 start npm --name clickshift -- run start:prod
pm2 ls
curl -s -o /dev/null -w "home %{http_code}\n" http://127.0.0.1:3100/
curl -s -o /dev/null -w "admin %{http_code}\n" http://127.0.0.1:3100/admin/login
```

Both should say 200. Only then run `pm2 save`.

**6. TLS certificate.** In Cloudflare go to clickshift.io → SSL/TLS → Origin Server → Create Certificate, with hostnames
`clickshift.io, *.clickshift.io` and a 15-year validity. Save it on the server:

```bash
sudo mkdir -p /etc/ssl/cloudflare
sudo nano /etc/ssl/cloudflare/clickshift.io.pem     # paste the certificate
sudo nano /etc/ssl/cloudflare/clickshift.io.key     # paste the private key
sudo chmod 600 /etc/ssl/cloudflare/clickshift.io.key
```

(The same `*.clickshift.io` certificate can also fix pulse.clickshift.io's 526 error, if its nginx block points to it.)

**7. nginx.** Check that nothing else already claims clickshift.io (api.clickshift.io is fine):

```bash
grep -rn "server_name" /etc/nginx/sites-enabled/ | grep -E "[^.]clickshift\.io|www\.clickshift\.io"
sudo cp ~/clickshift-homepage/deploy/nginx-clickshift.io.conf /etc/nginx/sites-available/clickshift.io
sudo ln -s /etc/nginx/sites-available/clickshift.io /etc/nginx/sites-enabled/clickshift.io
sudo nginx -t && sudo systemctl reload nginx
curl -sk --resolve clickshift.io:443:127.0.0.1 -o /dev/null -w "through nginx %{http_code}\n" https://clickshift.io/
```

**8. Switch DNS (Cloudflare).**
- clickshift.io: replace the Vercel record with an **A** record pointing to the server's IP, **proxied** (orange).
- www: a **CNAME** to `clickshift.io`, proxied.
- SSL/TLS mode: **Full (strict)**.
- Rules → Transform Rules → Managed Transforms: turn on **Add visitor location headers**, so the admin shows cities as
  well as countries.

**9. Retire Vercel's copy.** Once https://clickshift.io loads from the server, remove the domain from the Vercel project
(Project → Settings → Domains), and delete the old `NEXT_PUBLIC_BREVO_*` variables there.

**10. Email (Resend).** In Resend: Domains → Add `clickshift.io`. Add the DNS records it lists in Cloudflare as
**DNS only** (grey cloud). When it shows Verified, create an API key with "Sending access" for clickshift.io only, put it in
`.env.local` and run `pm2 restart clickshift --update-env`.

**11. Backups.** Add the ClickShift database to the nightly backup next to QuantumHire's line in `crontab -e`, with
`--name clickshift --env /root/clickshift-homepage/.env.local` (use the real home path).

---

## Every later deploy

```bash
cd ~/clickshift-homepage && git pull --ff-only
```

Read the output. If it says "Not possible to fast-forward", stop and sort that out first.

```bash
npm ci && npm run build && pm2 restart clickshift --update-env
pm2 ls && curl -s -o /dev/null -w "home %{http_code}\n" http://127.0.0.1:3100/
```

Articles published from /admin don't need a deploy. They go live as soon as you press Publish.
