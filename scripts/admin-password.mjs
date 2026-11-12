// Make ADMIN_PASSWORD_HASH for the ClickShift admin. The password is never stored, only this hash.
// Usage: node scripts/admin-password.mjs            (asks for the password, hidden as you type)
// Paste the printed value into Vercel as ADMIN_PASSWORD_HASH, then redeploy.
import { randomBytes, scryptSync } from "node:crypto";
import readline from "node:readline";

function ask(q) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: true });
    rl._writeToOutput = (s) => {
      if (s.includes(q)) rl.output.write(s);
    };
    rl.question(q, (a) => {
      rl.close();
      process.stdout.write("\n");
      resolve(a);
    });
  });
}

const pw = await ask("New admin password (12+ characters): ");
if (pw.length < 12) {
  console.error("Too short: use at least 12 characters.");
  process.exit(1);
}
const again = await ask("Again: ");
if (pw !== again) {
  console.error("They don't match.");
  process.exit(1);
}
const salt = randomBytes(16);
const hash = scryptSync(pw, salt, 64, { N: 16384, r: 8, p: 1 });
console.log("\nADMIN_PASSWORD_HASH=" + `scrypt$${salt.toString("base64url")}$${hash.toString("base64url")}`);
console.log("ADMIN_SESSION_SECRET=" + randomBytes(32).toString("base64url") + "   (only if you don't have one yet)");
