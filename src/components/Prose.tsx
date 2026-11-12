import Link from "next/link";
import { Fragment, type ReactNode } from "react";

// A tiny Markdown subset renderer for the Journal (see src/lib/posts.ts for the syntax).

function inline(text: string, keyBase: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /(\*\*([^*]+)\*\*)|(\*([^*]+)\*)|(\[([^\]]+)\]\(([^)]+)\))/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const k = `${keyBase}-${i++}`;
    if (m[2]) out.push(<strong key={k}>{inline(m[2], k)}</strong>);
    else if (m[4]) out.push(<em key={k}>{m[4]}</em>);
    else if (m[6]) {
      const href = m[7];
      out.push(
        href.startsWith("/") ? (
          <Link key={k} href={href}>
            {m[6]}
          </Link>
        ) : (
          <a key={k} href={href} target="_blank" rel="noopener noreferrer">
            {m[6]}
          </a>
        ),
      );
    }
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function headings(md: string) {
  return md
    .split("\n")
    .filter((l) => l.startsWith("## "))
    .map((l) => ({ text: l.slice(3).trim(), id: slugify(l.slice(3)) }));
}

export default function Prose({ md }: { md: string }) {
  const blocks = md.trim().split(/\n\s*\n/);
  return (
    <div className="prose-cs">
      {blocks.map((b, bi) => {
        const lines = b.split("\n");
        const k = `b${bi}`;
        if (b.startsWith("## ")) {
          const t = b.slice(3).trim();
          return (
            <h2 key={k} id={slugify(t)} className="scroll-mt-28">
              {inline(t, k)}
            </h2>
          );
        }
        if (b.startsWith("### ")) return <h3 key={k}>{inline(b.slice(4).trim(), k)}</h3>;
        if (b.startsWith("> ")) return <blockquote key={k}>{inline(lines.map((l) => l.replace(/^> ?/, "")).join(" "), k)}</blockquote>;
        if (lines.every((l) => /^- /.test(l)))
          return (
            <ul key={k}>
              {lines.map((l, li) => (
                <li key={li}>{inline(l.slice(2), `${k}-${li}`)}</li>
              ))}
            </ul>
          );
        if (lines.every((l) => /^\d+\. /.test(l)))
          return (
            <ol key={k}>
              {lines.map((l, li) => (
                <li key={li}>{inline(l.replace(/^\d+\. /, ""), `${k}-${li}`)}</li>
              ))}
            </ol>
          );
        // Mixed block: heading line followed by text (e.g. "### 1. Learn\nA product…")
        if (lines[0].startsWith("### "))
          return (
            <Fragment key={k}>
              <h3>{inline(lines[0].slice(4), k)}</h3>
              <p>{inline(lines.slice(1).join(" "), `${k}p`)}</p>
            </Fragment>
          );
        if (lines[0].startsWith("**") && lines.slice(1).every((l) => /^- /.test(l)))
          return (
            <Fragment key={k}>
              <p>{inline(lines[0], k)}</p>
              <ul>
                {lines.slice(1).map((l, li) => (
                  <li key={li}>{inline(l.slice(2), `${k}-${li}`)}</li>
                ))}
              </ul>
            </Fragment>
          );
        if (/^- /.test(lines[1] ?? "") && lines.slice(1).every((l) => /^- /.test(l)))
          return (
            <Fragment key={k}>
              <p>{inline(lines[0], k)}</p>
              <ul>
                {lines.slice(1).map((l, li) => (
                  <li key={li}>{inline(l.slice(2), `${k}-${li}`)}</li>
                ))}
              </ul>
            </Fragment>
          );
        return <p key={k}>{inline(lines.join(" "), k)}</p>;
      })}
    </div>
  );
}
