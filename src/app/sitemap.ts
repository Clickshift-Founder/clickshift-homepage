import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { CASES } from "@/lib/work";
import { POSTS } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = [
    { path: "", priority: 1 },
    { path: "/work", priority: 0.9 },
    { path: "/automation", priority: 0.9 },
    { path: "/templates", priority: 0.8 },
    { path: "/pricing", priority: 0.8 },
    { path: "/standard", priority: 0.7 },
    { path: "/blog", priority: 0.8 },
    { path: "/about", priority: 0.7 },
    { path: "/contact", priority: 0.7 },
    { path: "/privacy", priority: 0.2 },
    { path: "/terms", priority: 0.2 },
  ];
  return [
    ...pages.map((p) => ({ url: `${SITE.url}${p.path}`, lastModified: now, priority: p.priority })),
    ...CASES.map((c) => ({ url: `${SITE.url}/work/${c.slug}`, lastModified: now, priority: 0.7 })),
    ...POSTS.map((p) => ({ url: `${SITE.url}/blog/${p.slug}`, lastModified: new Date(p.date), priority: 0.7 })),
  ];
}
