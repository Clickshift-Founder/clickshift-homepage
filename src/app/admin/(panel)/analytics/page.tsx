import Link from "next/link";
import { dbConfigured } from "@/lib/server/db";
import { analytics, live, recentVisits } from "@/lib/server/adminData";
import { ago, BarList, Card, country, DayBars, dur, PageTitle, Stat } from "../../_ui";
import NeedsDb from "../NeedsDb";

const RANGES = [7, 30, 90];

export default async function AnalyticsPage({ searchParams }: { searchParams: Promise<{ range?: string }> }) {
  if (!dbConfigured()) return <NeedsDb />;
  const r = Number((await searchParams).range);
  const days = RANGES.includes(r) ? r : 30;
  const [a, now, recent] = await Promise.all([analytics(days), live(), recentVisits(40)]);
  const t = a.totals;
  const change = (cur: number, prev: number) => (prev ? cur / prev - 1 : null);

  return (
    <>
      <PageTitle
        title="Visitors"
        sub="Who comes, where from, what they read and for how long. First-party, cookie-free, no IP addresses stored."
        action={
          <div className="flex gap-1.5 rounded-full bg-white p-1 ring-1 ring-ink/10" role="group" aria-label="Date range">
            {RANGES.map((d) => (
              <Link key={d} href={`/admin/analytics?range=${d}`} className={`inline-flex min-h-9 items-center rounded-full px-4 text-[13px] ${d === days ? "bg-ink text-paper" : "text-ink/70 hover:text-ink"}`}>
                {d} days
              </Link>
            ))}
          </div>
        }
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-6">
        <Stat label="Live now" value={now.length} />
        <Stat label="Visitors" value={t.visitors} delta={change(t.visitors, t.prev.visitors)} />
        <Stat label="Page views" value={t.views} delta={change(t.views, t.prev.views)} />
        <Stat label="Avg. time on page" value={dur(t.avg_ms)} />
        <Stat label="Avg. visit length" value={dur(t.avg_session_ms)} />
        <Stat label="One-page visits" value={`${Math.round(t.bounce * 100)}%`} />
      </div>

      <Card title={`Visitors per day · ${t.new_visitors} first-time visitors`} className="mt-4">
        <DayBars data={a.series.map((d) => ({ day: d.day, value: d.visitors, sub: d.views }))} />
      </Card>

      <div className="mt-4 grid grid-cols-1 gap-4 [&>*]:min-w-0 lg:grid-cols-2">
        <Card title="Sources (sites, search, social, campaigns)">
          <BarList rows={a.sources.map((s) => ({ label: s.src, value: s.sessions, note: "visits", key: s.src }))} />
        </Card>
        <Card title="Countries">
          <BarList rows={a.countries.map((c) => ({ label: country(c.country), value: c.visitors, key: c.country ?? "?" }))} />
        </Card>
      </div>

      <Card title="Pages · views, average time, how far people scroll" className="mt-4">
        {a.pages.length === 0 ? (
          <BarList rows={[]} />
        ) : (
          <div className="-mx-4 overflow-x-auto sm:mx-0">
            <table className="w-full min-w-[560px] text-[14px]">
              <thead>
                <tr className="text-left font-mono text-[10px] uppercase tracking-[0.14em] text-mute">
                  <th className="px-4 py-2 font-normal sm:px-2">Page</th>
                  <th className="px-2 py-2 text-right font-normal">Views</th>
                  <th className="px-2 py-2 text-right font-normal">Visitors</th>
                  <th className="px-2 py-2 text-right font-normal">Avg. time</th>
                  <th className="px-4 py-2 text-right font-normal sm:px-2">Scrolled</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/6">
                {a.pages.map((p) => (
                  <tr key={p.path}>
                    <td className="max-w-[18rem] truncate px-4 py-2.5 font-mono text-[13px] sm:px-2">
                      <a href={p.path} target="_blank" rel="noopener noreferrer" className="hover:text-cobalt">
                        {p.path}
                      </a>
                    </td>
                    <td className="px-2 py-2.5 text-right tabular-nums">{p.views}</td>
                    <td className="px-2 py-2.5 text-right tabular-nums">{p.visitors}</td>
                    <td className="px-2 py-2.5 text-right tabular-nums">{dur(p.avg_ms)}</td>
                    <td className="px-4 py-2.5 text-right tabular-nums sm:px-2">{p.scroll}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <div className="mt-4 grid grid-cols-1 gap-4 [&>*]:min-w-0 lg:grid-cols-3">
        <Card title="Landing pages">
          <BarList rows={a.entries.map((e) => ({ label: e.path, value: e.sessions, key: e.path }))} />
        </Card>
        <Card title="Cities">
          <BarList rows={a.cities.map((c) => ({ label: `${c.city}${c.country ? `, ${c.country}` : ""}`, value: c.visitors, key: `${c.city}-${c.country}` }))} />
        </Card>
        <Card title="Campaigns (utm_campaign)">
          <BarList rows={a.campaigns.map((c) => ({ label: c.campaign, value: c.sessions, note: c.source ?? undefined, key: c.campaign }))} empty="Add ?utm_source=linkedin&utm_campaign=launch to links you share to see them here." />
        </Card>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 [&>*]:min-w-0 lg:grid-cols-3">
        <Card title="Devices">
          <BarList rows={a.devices.map((d) => ({ label: d.k, value: d.visitors, key: d.k }))} />
        </Card>
        <Card title="Browsers">
          <BarList rows={a.browsers.map((d) => ({ label: d.k, value: d.visitors, key: d.k }))} />
        </Card>
        <Card title="Systems">
          <BarList rows={a.systems.map((d) => ({ label: d.k, value: d.visitors, key: d.k }))} />
        </Card>
      </div>

      <Card title="Latest page views" className="mt-4">
        {recent.length === 0 ? (
          <BarList rows={[]} />
        ) : (
          <ul className="divide-y divide-ink/6">
            {recent.map((v) => (
              <li key={v.id} className="grid grid-cols-[1fr_auto] gap-3 py-2 text-[13px]">
                <span className="min-w-0">
                  <span className="block truncate font-mono">{v.path}</span>
                  <span className="text-mute">
                    {[v.city, v.country].filter(Boolean).join(", ") || "Unknown"} · {v.device}
                    {v.utm_source ? ` · ${v.utm_source}` : v.ref_host ? ` · from ${v.ref_host}` : ""}
                    {v.is_new ? " · first visit" : ""}
                  </span>
                </span>
                <span className="text-right text-mute">
                  {ago(v.ts)}
                  <span className="block">
                    {dur(v.duration_ms)} · {v.scroll_pct}%
                  </span>
                </span>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </>
  );
}
