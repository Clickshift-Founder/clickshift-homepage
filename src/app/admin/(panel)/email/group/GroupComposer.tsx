"use client";

import { useActionState, useMemo, useState } from "react";
import type { Contact } from "@/lib/server/adminData";
import { sendGroupEmail } from "../../../actions";

type Filter = "all" | "subscribers" | "enquiries" | `status:${string}`;

const STATUS_LABEL: Record<string, string> = {
  new: "New",
  replied: "Replied",
  call: "Call booked",
  proposal: "Proposal sent",
  won: "Won",
  lost: "Lost",
};

// Group email: pick people (subscribers, people who sent a brief, or both), write once, and each person gets their own
// email with {firstName} filled in and an unsubscribe link. Unsubscribed people are listed but can't be chosen.
export default function GroupComposer({ contacts, initial, ready }: { contacts: Contact[]; initial: Filter; ready: boolean }) {
  const [filter, setFilter] = useState<Filter>(initial);
  const [q, setQ] = useState("");
  // Nobody is chosen by default, unless the page was opened for a group (e.g. "Email subscribers").
  const [picked, setPicked] = useState<Set<string>>(() =>
    initial === "all" ? new Set() : new Set(contacts.filter((c) => !c.unsubscribed && match(c, initial)).map((c) => c.email)),
  );
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("Hi {firstName},\n\n\n\nEmmanuel\nClickShift");
  const [state, action, pending] = useActionState(sendGroupEmail, undefined);

  const statuses = useMemo(() => [...new Set(contacts.map((c) => c.enquiryStatus).filter(Boolean) as string[])], [contacts]);
  const shown = useMemo(() => {
    const term = q.trim().toLowerCase();
    return contacts.filter((c) => match(c, filter) && (!term || `${c.email} ${c.name ?? ""} ${c.service ?? ""}`.toLowerCase().includes(term)));
  }, [contacts, filter, q]);
  const selectable = shown.filter((c) => !c.unsubscribed);

  const toggle = (email: string) =>
    setPicked((p) => {
      const n = new Set(p);
      if (n.has(email)) n.delete(email);
      else n.add(email);
      return n;
    });
  const selectShown = () => setPicked((p) => new Set([...p, ...selectable.map((c) => c.email)]));
  const clear = () => setPicked(new Set());

  const filters: { key: Filter; label: string }[] = [
    { key: "all", label: "Everyone" },
    { key: "subscribers", label: "Subscribers" },
    { key: "enquiries", label: "Sent a brief" },
    ...statuses.map((s) => ({ key: `status:${s}` as Filter, label: STATUS_LABEL[s] ?? s })),
  ];
  const audienceLabel = filters.find((f) => f.key === filter)?.label ?? "Selected people";
  const field = "w-full rounded-xl border border-ink/12 bg-paper/50 px-3 text-[15px] outline-none focus:border-cobalt";
  const chip = (on: boolean) => `shrink-0 rounded-full px-3 py-1.5 text-[12px] ${on ? "bg-ink text-paper" : "bg-paper text-ink/75 ring-1 ring-ink/10 hover:ring-ink/30"}`;

  return (
    <form
      action={action}
      onSubmit={(e) => {
        const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
        if (submitter?.value === "send" && !window.confirm(`Send "${subject}" to ${picked.size} ${picked.size === 1 ? "person" : "people"}?`)) e.preventDefault();
      }}
      className="grid grid-cols-1 gap-4 [&>*]:min-w-0 lg:grid-cols-5"
    >
      <input type="hidden" name="audience" value={audienceLabel} />
      {[...picked].map((e) => (
        <input key={e} type="hidden" name="to" value={e} />
      ))}

      <section className="rounded-2xl bg-white p-4 ring-1 ring-ink/8 sm:p-5 lg:col-span-2">
        <h2 className="text-[15px] font-medium">Who gets it</h2>
        <div className="-mx-1 mt-3 flex gap-1.5 overflow-x-auto px-1 pb-1">
          {filters.map((f) => (
            <button key={f.key} type="button" onClick={() => setFilter(f.key)} className={chip(filter === f.key)}>
              {f.label}
            </button>
          ))}
        </div>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, email or service" className={`${field} mt-3 h-11`} />
        <div className="mt-3 flex flex-wrap items-center gap-2 text-[13px]">
          <span className="font-medium">{picked.size} chosen</span>
          <span className="text-mute">· {shown.length} shown</span>
          <span className="ml-auto flex gap-2">
            <button type="button" onClick={selectShown} className="min-h-9 rounded-full border border-ink/12 px-3 hover:bg-ink hover:text-paper">
              Choose all shown
            </button>
            <button type="button" onClick={clear} className="min-h-9 rounded-full border border-ink/12 px-3 hover:bg-ink hover:text-paper">
              Clear
            </button>
          </span>
        </div>
        <ul className="mt-3 max-h-[26rem] divide-y divide-ink/6 overflow-y-auto rounded-xl ring-1 ring-ink/8">
          {shown.length === 0 && <li className="p-4 text-[14px] text-mute">Nobody here yet.</li>}
          {shown.map((c) => (
            <li key={c.email}>
              <label className={`flex min-h-12 items-center gap-3 px-3 py-2 ${c.unsubscribed ? "opacity-50" : "cursor-pointer hover:bg-paper"}`}>
                <input type="checkbox" checked={picked.has(c.email)} disabled={c.unsubscribed} onChange={() => toggle(c.email)} className="h-5 w-5 shrink-0 accent-[#2E44FF]" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[14px]">{c.name || c.email}</span>
                  <span className="block truncate text-[12px] text-mute">
                    {c.name ? `${c.email} · ` : ""}
                    {[c.subscriber && "subscriber", c.enquiry && (STATUS_LABEL[c.enquiryStatus ?? ""] ?? "brief"), c.unsubscribed && "unsubscribed"].filter(Boolean).join(" · ")}
                  </span>
                </span>
              </label>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-3 rounded-2xl bg-white p-4 ring-1 ring-ink/8 sm:p-5 lg:col-span-3">
        <h2 className="text-[15px] font-medium">The message</h2>
        <label className="block">
          <span className="text-[12px] text-mute">Subject</span>
          <input name="subject" required value={subject} onChange={(e) => setSubject(e.target.value)} className={`${field} h-11`} />
        </label>
        <label className="block">
          <span className="text-[12px] text-mute">Message</span>
          <textarea name="body" required rows={14} value={body} onChange={(e) => setBody(e.target.value)} className={`${field} py-3 leading-relaxed`} />
        </label>
        <p className="text-[12px] text-mute">
          <code>{"{firstName}"}</code> becomes each person&apos;s first name (&ldquo;there&rdquo; when we don&apos;t know it). Everyone gets their own
          email, nobody sees the others, and each one ends with an unsubscribe link.
        </p>
        {!ready && <p className="rounded-xl bg-amber-50 p-3 text-[14px] text-amber-900">Email isn&apos;t connected yet (Settings).</p>}
        {state?.error && (
          <p className="rounded-xl bg-red-50 p-3 text-[14px] text-red-800" role="alert">
            {state.error}
          </p>
        )}
        {state?.ok && (
          <p className="rounded-xl bg-signal/50 p-3 text-[14px]" role="status">
            {state.test
              ? `Test sent to ${state.test}.`
              : `Sent to ${state.sent}.${state.failed ? ` ${state.failed} failed.` : ""}${state.skipped ? ` ${state.skipped} skipped (unsubscribed or repeated).` : ""}`}
          </p>
        )}
        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            name="mode"
            value="test"
            disabled={pending || !ready || picked.size === 0}
            className="min-h-12 rounded-full border border-ink/15 px-5 text-[14px] hover:bg-paper disabled:opacity-50"
          >
            Send me a test
          </button>
          <button
            name="mode"
            value="send"
            disabled={pending || !ready || picked.size === 0}
            className="min-h-12 flex-1 rounded-full bg-ink px-5 text-[15px] font-medium text-paper hover:bg-cobalt disabled:opacity-50"
          >
            {pending ? "Sending…" : `Send to ${picked.size} ${picked.size === 1 ? "person" : "people"}`}
          </button>
        </div>
      </section>
    </form>
  );
}

function match(c: Contact, f: Filter) {
  if (f === "all") return true;
  if (f === "subscribers") return c.subscriber;
  if (f === "enquiries") return c.enquiry;
  return c.enquiryStatus === f.slice(7);
}
