import { createHash, createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

// Admin sign-in: one admin, from environment variables.
//   ADMIN_EMAIL            the email you sign in with
//   ADMIN_PASSWORD_HASH    from `node scripts/admin-password.mjs` (scrypt; the password itself is never stored)
//   ADMIN_SESSION_SECRET   32+ random characters; signs the session cookie
//   ADMIN_TOTP_SECRET      optional: a base32 secret for a 6-digit authenticator code (scripts/admin-totp.mjs)
// Changing ADMIN_SESSION_SECRET signs everyone out.

export const COOKIE = "cs_admin";
const SESSION_MS = 12 * 60 * 60 * 1000;

export function authConfigured() {
  return Boolean(process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD_HASH && (process.env.ADMIN_SESSION_SECRET?.length ?? 0) >= 32);
}
export const totpRequired = () => Boolean(process.env.ADMIN_TOTP_SECRET);

function sign(data: string) {
  return createHmac("sha256", process.env.ADMIN_SESSION_SECRET as string).update(data).digest("base64url");
}

function same(a: string, b: string) {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

export function hashPassword(password: string) {
  const salt = randomBytes(16);
  const hash = scryptSync(password, salt, 64, { N: 16384, r: 8, p: 1 });
  return `scrypt$${salt.toString("base64url")}$${hash.toString("base64url")}`;
}

export function verifyPassword(password: string, stored: string) {
  const [alg, saltB64, hashB64] = stored.split("$");
  if (alg !== "scrypt" || !saltB64 || !hashB64) return false;
  const want = Buffer.from(hashB64, "base64url");
  const got = scryptSync(password, Buffer.from(saltB64, "base64url"), want.length, { N: 16384, r: 8, p: 1 });
  return timingSafeEqual(got, want);
}

function base32Decode(s: string) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  let bits = "";
  for (const ch of s.replace(/=+$/, "").replace(/\s/g, "").toUpperCase()) {
    const v = alphabet.indexOf(ch);
    if (v < 0) continue;
    bits += v.toString(2).padStart(5, "0");
  }
  const bytes: number[] = [];
  for (let i = 0; i + 8 <= bits.length; i += 8) bytes.push(parseInt(bits.slice(i, i + 8), 2));
  return Buffer.from(bytes);
}

export function totpAt(secret: string, step: number) {
  const msg = Buffer.alloc(8);
  msg.writeBigUInt64BE(BigInt(step));
  const h = createHmac("sha1", base32Decode(secret)).update(msg).digest();
  const o = h[h.length - 1] & 0xf;
  const code = ((h.readUInt32BE(o) & 0x7fffffff) % 1_000_000).toString().padStart(6, "0");
  return code;
}

export function verifyTotp(code: string) {
  const secret = process.env.ADMIN_TOTP_SECRET;
  if (!secret) return true;
  const clean = code.replace(/\D/g, "");
  if (clean.length !== 6) return false;
  const step = Math.floor(Date.now() / 30_000);
  return [-1, 0, 1].some((d) => same(totpAt(secret, step + d), clean));
}

export function checkCredentials(email: string, password: string) {
  if (!authConfigured()) return false;
  const okEmail = same(email.trim().toLowerCase(), (process.env.ADMIN_EMAIL as string).trim().toLowerCase());
  // Always run the hash so a wrong email takes as long as a wrong password.
  const okPass = verifyPassword(password, process.env.ADMIN_PASSWORD_HASH as string);
  return okEmail && okPass;
}

export function makeSession(email: string) {
  const body = Buffer.from(JSON.stringify({ e: email, x: Date.now() + SESSION_MS })).toString("base64url");
  return `${body}.${sign(body)}`;
}

export async function setSessionCookie(email: string) {
  (await cookies()).set(COOKIE, makeSession(email), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_MS / 1000,
  });
}

export async function clearSessionCookie() {
  (await cookies()).delete(COOKIE);
}

export async function getAdmin(): Promise<{ email: string } | null> {
  if (!authConfigured()) return null;
  const raw = (await cookies()).get(COOKIE)?.value;
  if (!raw) return null;
  const [body, mac] = raw.split(".");
  if (!body || !mac || !same(mac, sign(body))) return null;
  try {
    const { e, x } = JSON.parse(Buffer.from(body, "base64url").toString());
    if (typeof x !== "number" || x < Date.now()) return null;
    if (e !== process.env.ADMIN_EMAIL) return null;
    return { email: e };
  } catch {
    return null;
  }
}

/** Use at the top of every admin page and admin server action. */
export async function requireAdmin() {
  const admin = await getAdmin();
  if (!admin) redirect("/admin/login");
  return admin;
}

/** A one-way, salted hash of the caller's IP: enough for rate limits, never stored in the clear. */
export async function clientKey() {
  const h = await headers();
  const ip = h.get("x-real-ip") || h.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  return createHash("sha256")
    .update(`${process.env.ADMIN_SESSION_SECRET ?? "cs"}:${ip}`)
    .digest("base64url")
    .slice(0, 22);
}
