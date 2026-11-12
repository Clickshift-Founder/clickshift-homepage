import Link from "next/link";
import { dbConfigured } from "@/lib/server/db";
import { analytics, counts, enquiries, live, notifications } from "@/lib/server/adminData";
import { serviceName } from "@/lib/emailTemplates";
import { markAllRead } from "../actions";
import { ago, Badge, BarList, Card, DayBars, dur, PageTitle, Stat } from "../_ui";
import NeedsDb from "./NeedsDb";

export default async function Overview() {
  if (!dbConfigured()) {
    return (
      <>
        <PageTitle title="Good to see you." sub="Your ClickShift control room." />
        <NeedsDb />
      </>
    );
  }
  let data;
  try {
    const [c, a, n, latest, now] = await Promise.all([counts(), analytics(30), notifications(12), enquiries({ limit: 6 }), live()]);
    data = { c, a, n, latest, now };
  } catch (e) {
    return <NeedsDb error={e instanceof Error ? e.message : String(e)} />;
  }
  const { c, a, n, latest, now } = data;
  const today = a.series.at(-1)?.visitors ?? 0;
  const week = a.series.slice(-7).reduce((s, d) => s + d.visitors, 0);
  const hour = new Date().toLocaleString("en-GB", { hour: "numeric", hour12: false, timeZone: "Africa/Lagos" });
  const greet = Number(hour) < 12 ? "Good morning." : Number(hour) < 17 ? "Good afternoon." : "Good evening.";

  return (
    <>
      <PageTitle
        title={greet}
        sub={
          <>
            <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-[#2BB673] align-middle" aria-hidden />
            {now.length} on the site right now · {c.new_count} new {c.new_count === 1 ? "enquiry" : "enquiries"}
          </>
        }
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label="Priority leads open" value={c.priority_open} href="/admin/enquiries?priority=1" tone={c.priority_open ? "alert" : "default"} />
        <Stat label="New enquiries" value={c.new_count} href="/admin/enquiries?status=new" />
        <Stat label="Visitors today" value={today} href="/admin/analytics?range=7" />
        <Stat label="Visitors, 7 days" value={week} href="/admin/analytics?range=7" />
        <Stat label="Visitors, 30 days" value={a.totals.visitors} delta={a.totals.prev.visitors ? a.totals.visitors / a.totals.prev.visitors - 1 : null} href="/admin/analytics" />
        <Stat label="Avg. time on page" value={dur(a.totals.avg_ms)} href="/admin/analytics" />
        <Stat label="Subscribers" value={c.subs} href="/admin/subscribers" />
        <Stat label="All enquiries" value={c.total} href="/admin/enquiries" />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 [&>*]:min-w-0 lg:grid-cols-3">
        <Card title="Visitors, last 30 days" className="lg:col-span-2" action={<Link href="/admin/analytics" className="text-[13px] text-cobalt">Details →</Link>}>
          <DayBars data={a.series.map((d) => ({ day: d.day, value: d.visitors, sub: d.views }))} />
        </Card>
        <Card
          title="Notifications"
          action={
            n.some((x) => !x.read_at) ? (
              <form action={markAllRead}>
                <button className="text-[13px] text-cobalt">Mark all read</button>
              </form>
            ) : null
          }
        >
          {n.length === 0 ? (
            <p className="text-[14px] text-mute">Nothing yet. New enquiries, priority leads and subscribers appear here.</p>
          ) : (
            <ul className="-mx-1 max-h-80 space-y-0.5 overflow-y-auto">
              {n.map((x) => (
                <li key={x.id}>
                  <Link href={x.href ?? "#"} className="flex gap-3 rounded-xl px-2 py-2 hover:bg-paper">
                    <span aria-hidden className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${x.read_at ? "bg-ink/15" : x.kind === "priority" ? "bg-signal ring-2 ring-ink" : "bg-cobalt"}`} />
                    <span className="min-w-0">
                      <span className={`block truncate text-[14px] ${x.read_at ? "text-mute" : "font-medium text-ink"}`}>{x.title}</span>
                      <span className="block truncate text-[12px] text-mute">
                        {x.body ? `${x.body} · ` : ""}
                        {ago(x.created_at)}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 [&>*]:min-w-0 lg:grid-cols-3">
        <Card title="Latest enquiries" className="lg:col-span-2" action={<Link href="/admin/enquiries" className="text-[13px] text-cobalt">All →</Link>}>
          {latest.length === 0 ? (
            <p className="text-[14px] text-mute">No enquiries yet. They arrive from the contact page and every &ldquo;Start a project&rdquo; button.</p>
          ) : (
            <ul className="divide-y divide-ink/6">
              {latest.map((e) => (
                <li key={e.id}>
                  <Link href={`/admin/enquiries/${e.id}`} className="flex items-center gap-3 py-3 hover:bg-paper/60">
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        <span className="truncate text-[15px] font-medium">{e.name}</span>
                        {e.priority && <Badge tone="signal">Priority</Badge>}
                        {e.status === "new" && <Badge tone="cobalt">New</Badge>}
                      </span>
                      <span className="block truncate text-[13px] text-mute">
                        {serviceName(e.service)}
                        {e.budget_label ? ` · ${e.budget_label}` : ""}
                        {e.company ? ` · ${e.company}` : ""}
                      </span>
                    </span>
                    <span className="shrink-0 text-[12px] text-mute">{ago(e.created_at)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>
        <Card title="Where visitors come from · 30 days">
          <BarList rows={a.sources.slice(0, 6).map((s) => ({ label: s.src, value: s.sessions, key: s.src }))} empty="No visits yet" />
        </Card>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 [&>*]:min-w-0 lg:grid-cols-2">
        <Card title="Most-read pages · 30 days" action={<Link href="/admin/analytics" className="text-[13px] text-cobalt">More →</Link>}>
          <BarList rows={a.pages.slice(0, 6).map((p) => ({ label: p.path, value: p.views, note: dur(p.avg_ms), key: p.path }))} />
        </Card>
        <Card title="On the site right now">
          {now.length === 0 ? (
            <p className="text-[14px] text-mute">Nobody in the last five minutes.</p>
          ) : (
            <ul className="space-y-2 text-[14px]">
              {now.slice(0, 8).map((v) => (
                <li key={v.visitor_id} className="flex items-center justify-between gap-3">
                  <span className="truncate font-mono text-[13px]">{v.path}</span>
                  <span className="shrink-0 text-[12px] text-mute">
                    {v.city ? `${v.city}, ` : ""}
                    {v.country ?? "?"} · {v.device}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </>
  );
}
