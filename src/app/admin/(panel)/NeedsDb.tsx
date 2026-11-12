import Link from "next/link";
import { Card } from "../_ui";

export default function NeedsDb({ error }: { error?: string }) {
  return (
    <Card title="Connect the database">
      <div className="space-y-3 text-[15px] leading-relaxed text-ink/80">
        {error ? (
          <p>
            The database didn&apos;t answer: <code className="font-mono text-[13px] text-red-700">{error}</code>
          </p>
        ) : (
          <p>Enquiries, analytics, the journal editor and subscribers need a Postgres database. It takes about two minutes:</p>
        )}
        <ol className="list-decimal space-y-1.5 pl-5">
          <li>In Vercel, open the project → Storage → Create Database → Neon (free tier).</li>
          <li>Connect it to this project. Vercel adds <code className="font-mono text-[13px]">DATABASE_URL</code> for you.</li>
          <li>Redeploy. Tables are created automatically on first use.</li>
        </ol>
        <p>
          Full steps: <code className="font-mono text-[13px]">docs/ADMIN.md</code>. Check what&apos;s connected on <Link href="/admin/settings" className="text-cobalt underline">Settings</Link>.
        </p>
      </div>
    </Card>
  );
}
