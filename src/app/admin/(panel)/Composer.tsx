"use client";

import { useActionState, useEffect, useState } from "react";
import { fill, TEMPLATES_EMAIL, type EnquiryLike } from "@/lib/emailTemplates";
import { sendAdminEmail } from "../actions";

// Email composer: pick a template, it fills itself from the enquiry, edit, send. Sends through Resend from the admin.
export default function Composer({
  to = "",
  enquiryId,
  enquiry,
  initialKey = "blank",
  ready,
}: {
  to?: string;
  enquiryId?: number;
  enquiry?: EnquiryLike;
  initialKey?: string;
  ready: boolean;
}) {
  const base: EnquiryLike = enquiry ?? { name: "", email: to };
  const pick = (key: string) => TEMPLATES_EMAIL.find((t) => t.key === key) ?? TEMPLATES_EMAIL[TEMPLATES_EMAIL.length - 1];
  const [key, setKey] = useState(initialKey);
  const [toVal, setTo] = useState(to);
  const [subject, setSubject] = useState(() => fill(pick(initialKey).subject, base));
  const [body, setBody] = useState(() => fill(pick(initialKey).body, base));
  const [state, action, pending] = useActionState(sendAdminEmail, undefined);

  useEffect(() => {
    if (state?.ok && !enquiryId) {
      setSubject("");
      setBody(fill(pick("blank").body, base));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.at]);

  const choose = (k: string) => {
    if (body.trim() && body !== fill(pick(key).body, base) && !window.confirm("Replace what you've written with this template?")) return;
    setKey(k);
    setSubject(fill(pick(k).subject, base));
    setBody(fill(pick(k).body, base));
  };
  const leftover = /\{\w+\}/.test(subject + body);
  const field = "w-full rounded-xl border border-ink/12 bg-paper/50 px-3 text-[15px] outline-none focus:border-cobalt";

  return (
    <form action={action} className="space-y-3">
      {enquiryId && <input type="hidden" name="enquiryId" value={enquiryId} />}
      <div className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1">
        {TEMPLATES_EMAIL.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => choose(t.key)}
            className={`shrink-0 rounded-full px-3 py-1.5 text-[12px] ${key === t.key ? "bg-ink text-paper" : "bg-paper text-ink/75 ring-1 ring-ink/10 hover:ring-ink/30"}`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <label className="block">
        <span className="text-[12px] text-mute">To</span>
        <input name="to" type="email" required value={toVal} onChange={(e) => setTo(e.target.value)} readOnly={Boolean(enquiryId)} className={`${field} h-11`} />
      </label>
      <label className="block">
        <span className="text-[12px] text-mute">Subject</span>
        <input name="subject" required value={subject} onChange={(e) => setSubject(e.target.value)} className={`${field} h-11`} />
      </label>
      <label className="block">
        <span className="text-[12px] text-mute">Message</span>
        <textarea name="body" required rows={14} value={body} onChange={(e) => setBody(e.target.value)} className={`${field} py-3 leading-relaxed`} />
      </label>
      {leftover && <p className="text-[13px] text-amber-800">There&apos;s still a {"{placeholder}"} in the email. Replace it before sending.</p>}
      {state?.error && (
        <p className="rounded-xl bg-red-50 p-3 text-[14px] text-red-800" role="alert">
          {state.error}
        </p>
      )}
      {state?.ok && (
        <p className="rounded-xl bg-signal/50 p-3 text-[14px]" role="status">
          Sent.
        </p>
      )}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[12px] text-mute">{ready ? "Sends from your ClickShift address. Replies come to your inbox." : "Email isn't connected yet: add RESEND_API_KEY and EMAIL_FROM (see Settings)."}</p>
        <button disabled={pending || !ready || leftover} className="min-h-12 rounded-full bg-ink px-6 text-[15px] font-medium text-paper hover:bg-cobalt disabled:opacity-40">
          {pending ? "Sending…" : "Send email"}
        </button>
      </div>
    </form>
  );
}
