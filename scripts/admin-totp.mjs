// Turn on the 6-digit sign-in code for the ClickShift admin.
// Usage: node scripts/admin-totp.mjs
// 1. Add the printed secret to your authenticator app (Google Authenticator, 1Password, Authy): "enter a setup key",
//    account "ClickShift admin", time-based. Or open the otpauth:// link on your phone.
// 2. Set ADMIN_TOTP_SECRET in Vercel to the same secret and redeploy. From then on, sign-in asks for the code.
import { randomBytes } from "node:crypto";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
let bits = "";
for (const b of randomBytes(20)) bits += b.toString(2).padStart(8, "0");
let secret = "";
for (let i = 0; i + 5 <= bits.length; i += 5) secret += alphabet[parseInt(bits.slice(i, i + 5), 2)];
console.log("ADMIN_TOTP_SECRET=" + secret);
console.log("otpauth://totp/ClickShift:admin?secret=" + secret + "&issuer=ClickShift&digits=6&period=30");
