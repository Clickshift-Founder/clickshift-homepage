import Link from "next/link";
import { dbConfigured } from "@/lib/server/db";
import { emailConfigured } from "@/lib/server/email";
import { audience, campaigns } from "@/lib/server/adminData";
import { Badge, Card, PageTitle, when } from "../../../_ui";
import NeedsDb from "../../NeedsDb";
import GroupComposer from "./GroupComposer";

// A send to 1,000 people is 10 batch calls to Resend, well inside this.
export const maxDuration = 120;

const AUDIENCES = ["all", "subscribers", "enquiries"] as const;

export default async function GroupEmailPage({ searchParams }: { searchParams: Promise<{ audience?: string }> }) {
  if (!dbConfigured()) return <NeedsDb />;
  const a = (await searchParams).audience ?? "all";
  const initial = (AUDIENCES as readonly string[]).includes(a) || a.startsWith("status:") ? (a as "all") : "all";
  const [contacts, history] = await Promise.all([audience(), campaigns(20)]);
  return (
    <>
      <PageTitle
        title="Group email"
        sub="Write once to subscribers, people who sent a brief, or a hand-picked group. Each person gets their own email."
        action={
          <Link href="/admin/email" className="inline-flex min-h-11 items-center rounded-full border border-ink/12 px-5 text-[14px] hover:bg-ink hover:text-paper">
            One person
          </Link>
        }
      />
      <GroupComposer key={initial} contacts={contacts} initial={initial} ready={emailConfigured()} />
      <Card title="Group sends" className="mt-4">
        {history.length === 0 ? (
          <p className="text-[14px] text-mute">Nothing sent to a group yet.</p>
        ) : (
          <ul className="divide-y divide-ink/6">
            {history.map((c) => (
              <li key={c.id} className="flex flex-col gap-0.5 py-2.5 text-[14px] sm:flex-row sm:items-center sm:gap-3">
                <span className="min-w-0 flex-1 truncate font-medium">{c.subject}</span>
                <span className="text-[12px] text-mute">
                  {c.audience} · {c.sent} sent
                  {c.failed > 0 && ` · ${c.failed} failed`}
                  {c.skipped > 0 && ` · ${c.skipped} skipped`} · {when(c.sent_at ?? c.created_at)}
                </span>
                {c.status !== "sent" && <Badge>{c.status}</Badge>}
              </li>
            ))}
          </ul>
        )}
      </Card>
    </>
  );
}
