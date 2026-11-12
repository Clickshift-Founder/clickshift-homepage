import Link from "next/link";
import { dbConfigured } from "@/lib/server/db";
import { enquiries } from "@/lib/server/adminData";
import { ENQUIRY_STATUSES } from "@/lib/enquiry";
import { itemName, serviceName } from "@/lib/emailTemplates";
import { ago, Badge, Card, Empty, PageTitle } from "../../_ui";
import NeedsDb from "../NeedsDb";

export default async function EnquiriesPage({ searchParams }: { searchParams: Promise<{ status?: string; priority?: string; q?: string }> }) {
  if (!dbConfigured()) return <NeedsDb />;
  const sp = await searchParams;
  const status = ENQUIRY_STATUSES.some((s) => s.key === sp.status) ? sp.status : undefined;
  const priority = sp.priority === "1" ? true : undefined;
  const q = sp.q?.slice(0, 80) || undefined;
  const rows = await enquiries({ status, priority, q });
  const chip = (label: string, href: string, active: boolean) => (
    <Link
      key={label}
      href={href}
      className={`inline-flex min-h-9 items-center rounded-full px-3.5 text-[13px] ${active ? "bg-ink text-paper" : "bg-white text-ink/75 ring-1 ring-ink/10 hover:ring-ink/30"}`}
    >
      {label}
    </Link>
  );

  return (
    <>
      <PageTitle title="Enquiries" sub="Every brief from the contact page, newest first. Budgets of $2,000 or more are flagged priority." />
      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 lg:mx-0 lg:flex-wrap lg:px-0">
          {chip("All", "/admin/enquiries", !status && !priority)}
          {chip("Priority", "/admin/enquiries?priority=1", !!priority)}
          {ENQUIRY_STATUSES.map((s) => chip(s.label, `/admin/enquiries?status=${s.key}`, status === s.key))}
        </div>
        <form className="flex gap-2" action="/admin/enquiries">
          <label className="sr-only" htmlFor="q">
            Search enquiries
          </label>
          <input id="q" name="q" defaultValue={q} placeholder="Search name, email, company…" className="h-11 w-full rounded-full border border-ink/12 bg-white px-4 text-[15px] outline-none focus:border-cobalt lg:w-72" />
        </form>
      </div>

      <Card>
        {rows.length === 0 ? (
          <Empty>No enquiries match.</Empty>
        ) : (
          <ul className="-my-1 divide-y divide-ink/6">
            {rows.map((e) => (
              <li key={e.id}>
                <Link href={`/admin/enquiries/${e.id}`} className="grid gap-1 rounded-xl px-1 py-3 hover:bg-paper/60 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-4">
                  <span className="min-w-0">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="text-[15px] font-medium">{e.name}</span>
                      {e.company && <span className="text-[14px] text-mute">{e.company}</span>}
                      {e.priority && <Badge tone="signal">Priority</Badge>}
                      <Badge tone={e.status === "new" ? "cobalt" : e.status === "won" ? "ink" : "default"}>{ENQUIRY_STATUSES.find((s) => s.key === e.status)?.label ?? e.status}</Badge>
                    </span>
                    <span className="mt-0.5 block text-[13px] text-mute">
                      {e.service === "template" ? itemName(e.item) || "Template" : serviceName(e.service)}
                      {e.budget_label ? ` · ${e.budget_label}` : ""}
                      {e.timeline ? ` · ${e.timeline}` : ""}
                    </span>
                    <span className="mt-1 line-clamp-1 block text-[14px] text-ink/70">{e.message}</span>
                  </span>
                  <span className="text-[12px] text-mute sm:text-right">
                    {ago(e.created_at)}
                    {e.country ? ` · ${e.country}` : ""}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </>
  );
}
