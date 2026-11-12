"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

// The public site's navbar, footer and tracker stay off the admin dashboard.
export default function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return <>{children}</>;
}
