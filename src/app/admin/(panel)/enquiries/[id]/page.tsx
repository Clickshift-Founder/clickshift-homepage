import Link from "next/link";
import { notFound } from "next/navigation";
import { dbConfigured } from "@/lib/server/db";
import { emailConfigured } from "@/lib/server/email";
import { enquiry } from "@/lib/server/adminData";
import { ENQUIRY_STATUSES } from "@/lib/enquiry";
import { defaultTemplateKey, itemName, serviceName } from "@/lib/emailTemplates";
import { saveNotes, setEnquiryStatus, togglePriority } from "../../../actions";
import { ago, Badge, Card, country, dur, when } from "../../../_ui";
import Composer from "../../Composer";
import NeedsDb from "../../NeedsDb";

export default async function EnquiryPage({ params }: { params: Promise<{ id: string }> }) {
  if (!dbConfigured()) return <NeedsDb />;
  const id = Number((await params).id);
  if (!Number.isSafeInteger(id)) notFound();
  const data = await enquiry(id);
  if (!data) notFound();
  const { enquiry: e, emails, journey } = data;
  const what = e.service === "template" ? `Template: ${itemName(e.item) || "unspecified"}` : serviceName(e.service);

  return (
    <>
      <Link href="/admin/enquiries" className="mb-3 inline-flex min-h-10 items-center text-[14px] text-mute hover:text-ink">
        ← Enquiries
      </Link>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="font-display text-3xl tracking-[-0.03em]">{e.name}</h1>
            {e.priority && <Badge tone="signal">Priority</Badge>}
          </div>
          <p className="mt-1 text-[14px] text-mute">
            <a href={`mailto:${e.email}`} className="text-cobalt underline-offset-2 hover:underline">
              {e.email}
            </a>
            {e.company ? ` · ${e.company}` : ""} · {when(e.created_at)} ({ago(e.created_at)})
          </p>
        </div>
        <form action={setEnquiryStatus} className="flex gap-2">
          <input type="hidden" name="id" value={e.id} />
          <label className="sr-only" htmlFor="status">
            Status
          </label>
          <select id="status" name="status" defaultValue={e.status} className="h-11 rounded-full border border-ink/12 bg-white px-4 text-[14px]">
            {ENQUIRY_STATUSES.map((s) => (
              <option key={s.key} value={s.key}>
                {s.label}
              </option>
            ))}
          </select>
          <button className="h-11 rounded-full bg-ink px-4 text-[14px] text-paper hover:bg-cobalt">Update</button>
        </form>
      </div>

      <div className="grid grid-cols-1 gap-4 [&>*]:min-w-0 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <Card title="The brief">
            <dl className="mb-4 grid grid-cols-2 gap-3 text-[14px] sm:grid-cols-4">
              {[
                ["Interested in", what],
                ["Budget", e.budget_label ?? "–"],
                ["Timeline", e.timeline ?? "–"],
                ["From", [e.city, e.country ? country(e.country) : null].filter(Boolean).join(", ") || "–"],
              ].map(([k, v]) => (
                <div key={k} className="rounded-xl bg-paper p-3">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-mute">{k}</dt>
                  <dd className="mt-1">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="whitespace-pre-wrap text-[15px] leading-relaxed">{e.message}</p>
            <p className="mt-4 text-[12px] text-mute">
              {e.ref && (
                <>
                  Came from{" "}
                  <Link href={`/work/${e.ref}`} className="text-cobalt" target="_blank">
                    /work/{e.ref}
                  </Link>{" "}
                  ·{" "}
                </>
              )}
              Sent from {e.page ?? "/contact"} · Acknowledgement{" "}
              {e.ack_sent_at ? `sent ${ago(e.ack_sent_at)}` : <span className="text-red-700">not sent{e.ack_error ? `: ${e.ack_error}` : ""}</span>}
            </p>
          </Card>

          <Card title="Reply">
            <Composer
              to={e.email}
              enquiryId={e.id}
              enquiry={{ name: e.name, email: e.email, company: e.company, service: e.service, item: e.item, budget_label: e.budget_label, timeline: e.timeline, message: e.message, priority: e.priority }}
              initialKey={defaultTemplateKey(e)}
              ready={emailConfigured()}
            />
          </Card>

          <Card title={`Emails · ${emails.length}`}>
            {emails.length === 0 ? (
              <p className="text-[14px] text-mute">Nothing sent yet.</p>
            ) : (
              <ul className="space-y-3">
                {emails.map((m) => (
                  <li key={m.id} className="rounded-xl bg-paper p-3">
                    <details>
                      <summary className="flex cursor-pointer list-none flex-wrap items-center gap-2 text-[14px]">
                        <Badge tone={m.status === "sent" ? "ink" : "default"}>{m.kind === "ack" ? "Auto-reply" : m.kind === "admin-alert" ? "Alert to you" : "Reply"}</Badge>
                        <span className="font-medium">{m.subject}</span>
                        <span className="text-[12px] text-mute">
                          {when(m.created_at)} · {m.status}
                          {m.error ? `: ${m.error}` : ""}
                        </span>
                      </summary>
                      <p className="mt-3 whitespace-pre-wrap text-[14px] leading-relaxed text-ink/80">{m.body}</p>
                    </details>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>

        <div className="space-y-4">
          <Card title="Notes (only you see these)">
            <form action={saveNotes} className="space-y-2">
              <input type="hidden" name="id" value={e.id} />
              <label className="sr-only" htmlFor="notes">
                Notes
              </label>
              <textarea id="notes" name="notes" rows={6} defaultValue={e.notes ?? ""} placeholder="Call notes, next step, decision maker…" className="w-full rounded-xl border border-ink/12 bg-paper/50 p-3 text-[15px] outline-none focus:border-cobalt" />
              <button className="min-h-10 rounded-full bg-ink px-4 text-[14px] text-paper hover:bg-cobalt">Save notes</button>
            </form>
          </Card>
          <Card title="Priority">
            <form action={togglePriority} className="flex items-center justify-between gap-3">
              <input type="hidden" name="id" value={e.id} />
              <p className="text-[14px] text-mute">{e.priority ? "Flagged as a priority lead." : "Not flagged as priority."}</p>
              <button className="min-h-10 shrink-0 rounded-full border border-ink/15 px-4 text-[13px] hover:bg-ink hover:text-paper">{e.priority ? "Unflag" : "Flag"}</button>
            </form>
          </Card>
          <Card title="What they read before writing">
            {journey.length === 0 ? (
              <p className="text-[14px] text-mute">No visit history for this person (tracking off, or a different browser).</p>
            ) : (
              <ol className="space-y-2 border-l border-ink/10 pl-4">
                {journey.map((j, i) => (
                  <li key={i} className="relative text-[13px]">
                    <span aria-hidden className="absolute -left-[21px] top-1.5 h-2 w-2 rounded-full bg-cobalt" />
                    <span className="block truncate font-mono">{j.path}</span>
                    <span className="text-mute">
                      {when(j.ts)} · {dur(j.duration_ms)}
                      {j.ref_host ? ` · from ${j.ref_host}` : ""}
                    </span>
                  </li>
                ))}
              </ol>
            )}
          </Card>
        </div>
      </div>
    </>
  );
}
