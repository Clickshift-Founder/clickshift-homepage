// Create the `clickshift` database and its own login role in the Postgres on our DigitalOcean server.
// Run once, on the server, from ~/clickshift-homepage:
//
//   PG_ADMIN_URL='postgres://postgres:...@127.0.0.1:5432/postgres' node scripts/db-create.mjs
//
// PG_ADMIN_URL is a role that can create roles and databases (the postgres superuser). It is used for this one run and
// never stored. The script prints the DATABASE_URL line to put in ~/clickshift-homepage/.env.local; that line holds a new
// random password, so don't paste it anywhere else. The site creates its own tables on first use.
// Safe to re-run: it skips what already exists (and then does not print a password).
import { randomBytes } from "node:crypto";
import postgres from "postgres";

// Alternative without any password: run as the postgres OS user over the local socket:
//   sudo -u postgres PG_ADMIN_SOCKET=/var/run/postgresql/.s.PGSQL.5432 "$(command -v node)" scripts/db-create.mjs
const admin = process.env.PG_ADMIN_URL;
const socket = process.env.PG_ADMIN_SOCKET;
if (!admin && !socket) {
  console.error("Set PG_ADMIN_URL (a Postgres role that can create roles and databases), or PG_ADMIN_SOCKET (see the top of this file).");
  process.exit(1);
}
const ROLE = "clickshift";
const DB = "clickshift";
const sql = admin
  ? postgres(admin, { max: 1, onnotice: () => {} })
  : postgres({ path: socket, username: "postgres", database: "postgres", max: 1, onnotice: () => {} });
try {
  const host = admin ? new URL(admin).hostname : "127.0.0.1";
  const port = admin ? new URL(admin).port || "5432" : "5432";
  const [role] = await sql`SELECT 1 FROM pg_roles WHERE rolname = ${ROLE}`;
  let password = null;
  if (!role) {
    password = randomBytes(24).toString("base64url");
    await sql.unsafe(`CREATE ROLE ${ROLE} LOGIN PASSWORD '${password}' NOSUPERUSER NOCREATEDB NOCREATEROLE`);
    console.log(`created role ${ROLE}`);
  } else {
    console.log(`role ${ROLE} already exists (password unchanged)`);
  }
  const [db] = await sql`SELECT 1 FROM pg_database WHERE datname = ${DB}`;
  if (!db) {
    await sql.unsafe(`CREATE DATABASE ${DB} OWNER ${ROLE}`);
    console.log(`created database ${DB}`);
  } else {
    console.log(`database ${DB} already exists`);
  }
  // Nobody but the owner may connect to it.
  await sql.unsafe(`REVOKE ALL ON DATABASE ${DB} FROM PUBLIC`);
  if (password) {
    console.log("\nPut this line in ~/clickshift-homepage/.env.local:\n");
    console.log(`DATABASE_URL=postgres://${ROLE}:${password}@${host}:${port}/${DB}`);
  }
} catch (e) {
  console.error("failed:", e.message);
  process.exitCode = 1;
} finally {
  await sql.end();
}
