import Link from "next/link";
import { dbConfigured } from "@/lib/server/db";
import { emailConfigured } from "@/lib/server/email";
import { sentEmails } from "@/lib/server/adminData";
import { Badge, Card, PageTitle, when } from "../../_ui";
import Composer from "../Composer";
import NeedsDb from "../NeedsDb";

export default async function EmailPage({ searchParams }: { searchParams: Promise<{ to?: string }> }) {
  if (!dbConfigured()) return <NeedsDb />;
  const to = (await searchParams).to?.slice(0, 254) ?? "";
  const sent = await sentEmails(40);
  return (
    <>
      <PageTitle
        title="Email"
        sub="Write to anyone from your ClickShift address. To answer an enquiry, open it: the reply fills itself in."
        action={
          <Link href="/admin/email/group" className="inline-flex min-h-11 items-center rounded-full bg-ink px-5 text-[14px] text-paper hover:bg-cobalt">
            Group email
          </Link>
        }
      />
      <div className="grid grid-cols-1 gap-4 [&>*]:min-w-0 lg:grid-cols-5">
        <Card title="New email" className="lg:col-span-3">
          <Composer to={to} ready={emailConfigured()} />
        </Card>
        <Card title="Sent from the admin" className="lg:col-span-2">
          {sent.length === 0 ? (
            <p className="text-[14px] text-mute">Nothing sent yet.</p>
          ) : (
            <ul className="divide-y divide-ink/6">
              {sent.map((m) => (
                <li key={m.id} className="py-2.5 text-[14px]">
                  <span className="flex items-center gap-2">
                    <span className="min-w-0 flex-1 truncate font-medium">{m.subject}</span>
                    {m.status !== "sent" && <Badge>failed</Badge>}
                  </span>
                  <span className="block truncate text-[12px] text-mute">
                    {m.to_email} · {when(m.created_at)}
                    {m.enquiry_id && (
                      <>
                        {" · "}
                        <Link href={`/admin/enquiries/${m.enquiry_id}`} className="text-cobalt">
                          enquiry
                        </Link>
                      </>
                    )}
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
