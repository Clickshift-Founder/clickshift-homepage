import { NextResponse } from "next/server";
import { getAdmin } from "@/lib/server/auth";
import { dbConfigured } from "@/lib/server/db";
import { subscribers } from "@/lib/server/adminData";

export const dynamic = "force-dynamic";

const cell = (v: string) => (/[",\n]/.test(v) || /^[=+\-@]/.test(v) ? `"${v.replace(/^([=+\-@])/, "'$1").replace(/"/g, '""')}"` : v);

export async function GET() {
  if (!(await getAdmin())) return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  if (!dbConfigured()) return NextResponse.json({ error: "No database" }, { status: 503 });
  const rows = await subscribers();
  const csv = ["email,status,source,subscribed_at", ...rows.map((r) => [r.email, r.status, r.source ?? "", new Date(r.created_at).toISOString()].map(cell).join(","))].join("\n");
  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="clickshift-subscribers-${new Date().toISOString().slice(0, 10)}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
