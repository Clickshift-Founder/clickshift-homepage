import { dbConfigured } from "@/lib/server/db";
import { subscribers } from "@/lib/server/adminData";
import { setSubscriber } from "../../actions";
import { ago, Badge, Card, Empty, PageTitle } from "../../_ui";
import NeedsDb from "../NeedsDb";

export default async function SubscribersPage() {
  if (!dbConfigured()) return <NeedsDb />;
  const rows = await subscribers();
  const active = rows.filter((r) => r.status === "active").length;
  return (
    <>
      <PageTitle
        title="Subscribers"
        sub={`${active} active · from the footer, the Journal and article pages`}
        action={
          <a href="/api/admin/subscribers" className="inline-flex min-h-11 items-center rounded-full bg-ink px-5 text-[14px] text-paper hover:bg-cobalt">
            Download CSV
          </a>
        }
      />
      <Card>
        {rows.length === 0 ? (
          <Empty>No subscribers yet.</Empty>
        ) : (
          <ul className="divide-y divide-ink/6">
            {rows.map((r) => (
              <li key={r.id} className="flex items-center justify-between gap-3 py-2.5">
                <span className="min-w-0">
                  <span className="block truncate text-[15px]">{r.email}</span>
                  <span className="text-[12px] text-mute">
                    {ago(r.created_at)}
                    {r.source ? ` · ${r.source}` : ""}
                  </span>
                </span>
                <form action={setSubscriber} className="flex shrink-0 items-center gap-2">
                  <input type="hidden" name="id" value={r.id} />
                  <input type="hidden" name="status" value={r.status === "active" ? "unsubscribed" : "active"} />
                  {r.status !== "active" && <Badge tone="muted">Unsubscribed</Badge>}
                  <button className="min-h-9 rounded-full border border-ink/12 px-3 text-[12px] hover:bg-ink hover:text-paper">{r.status === "active" ? "Unsubscribe" : "Restore"}</button>
                </form>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </>
  );
}
