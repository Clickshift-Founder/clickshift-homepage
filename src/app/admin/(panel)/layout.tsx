import type { Metadata } from "next";
import { requireAdmin } from "@/lib/server/auth";
import { dbConfigured } from "@/lib/server/db";
import { counts } from "@/lib/server/adminData";
import AdminShell from "../AdminShell";

export const metadata: Metadata = { title: "Admin", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const admin = await requireAdmin();
  let unread = 0;
  let newCount = 0;
  if (dbConfigured()) {
    try {
      const c = await counts();
      unread = c.unread;
      newCount = c.new_count;
    } catch {
      // the pages show the database error themselves
    }
  }
  return (
    <AdminShell email={admin.email} unread={unread} newCount={newCount}>
      {children}
    </AdminShell>
  );
}
