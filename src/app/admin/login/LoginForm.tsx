"use client";

import { useActionState } from "react";
import { login } from "../actions";

export default function LoginForm({ totp }: { totp: boolean }) {
  const [state, action, pending] = useActionState(login, undefined);
  const field = "mt-1 h-12 w-full rounded-xl border border-ink/12 bg-white px-4 text-base outline-none focus:border-cobalt";
  return (
    <form action={action} className="mt-5 space-y-4">
      <label className="block">
        <span className="text-[13px] text-mute">Email</span>
        <input name="email" type="email" required autoComplete="username" inputMode="email" className={field} />
      </label>
      <label className="block">
        <span className="text-[13px] text-mute">Password</span>
        <input name="password" type="password" required autoComplete="current-password" className={field} />
      </label>
      {totp && (
        <label className="block">
          <span className="text-[13px] text-mute">6-digit code from your authenticator</span>
          <input name="code" required inputMode="numeric" autoComplete="one-time-code" pattern="[0-9 ]{6,7}" maxLength={7} className={`${field} font-mono tracking-[0.3em]`} />
        </label>
      )}
      {state?.error && (
        <p className="rounded-xl bg-red-50 p-3 text-[14px] text-red-800" role="alert">
          {state.error}
        </p>
      )}
      <button disabled={pending} className="min-h-12 w-full rounded-full bg-ink text-[15px] font-medium text-paper transition-colors hover:bg-cobalt disabled:opacity-60">
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
