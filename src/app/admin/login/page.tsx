import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { authConfigured, getAdmin, totpRequired } from "@/lib/server/auth";
import { Mark } from "@/components/Logo";
import LoginForm from "./LoginForm";

export const metadata: Metadata = { title: "Admin sign in", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function LoginPage() {
  if (await getAdmin()) redirect("/admin");
  const ready = authConfigured();
  return (
    <div className="grid-dark flex min-h-dvh items-center justify-center bg-ink px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex items-center justify-center gap-3 text-paper">
          <Mark size={36} variant="signal" />
          <span className="font-display text-2xl tracking-tight">ClickShift</span>
        </div>
        <div className="rounded-[24px] bg-paper p-6 sm:p-7">
          <h1 className="font-display text-2xl tracking-tight">Admin sign in</h1>
          {ready ? (
            <LoginForm totp={totpRequired()} />
          ) : (
            <div className="mt-4 space-y-3 text-[14px] leading-relaxed text-mute">
              <p>The admin isn&apos;t set up on this deployment yet.</p>
              <p>
                Set <code className="font-mono text-ink">ADMIN_EMAIL</code>, <code className="font-mono text-ink">ADMIN_PASSWORD_HASH</code> and{" "}
                <code className="font-mono text-ink">ADMIN_SESSION_SECRET</code> in Vercel, then redeploy. The steps are in{" "}
                <code className="font-mono text-ink">docs/ADMIN.md</code>.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
