import Link from "next/link";
import { Fragment, type ReactNode } from "react";

// A tiny Markdown subset renderer for the Journal (see src/lib/posts.ts for the syntax).

function inline(text: string, keyBase: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /(\*\*([^*]+)\*\*)|(\*([^*]+)\*)|(\[([^\]]+)\]\(([^)]+)\))|(`([^`]+)`)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const k = `${keyBase}-${i++}`;
    if (m[9]) out.push(<code key={k}>{m[9]}</code>);
    else if (m[2]) out.push(<strong key={k}>{inline(m[2], k)}</strong>);
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

// Split out fenced code blocks first, so blank lines inside code don't split it.
type Block = string | { code: string; lang?: string };
function toBlocks(md: string): Block[] {
  const out: Block[] = [];
  const pushText = (t: string) => t.trim().split(/\n\s*\n/).forEach((b) => b.trim() && out.push(b));
  const re = /```(\w*)\n([\s\S]*?)```/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(md))) {
    if (m.index > last) pushText(md.slice(last, m.index));
    out.push({ code: m[2].replace(/\n$/, ""), lang: m[1] || undefined });
    last = re.lastIndex;
  }
  if (last < md.length) pushText(md.slice(last));
  return out;
}

export default function Prose({ md }: { md: string }) {
  const blocks = toBlocks(md.replace(/\r\n?/g, "\n").trim());
  return (
    <div className="prose-cs">
      {blocks.map((b, bi) => {
        const k = `b${bi}`;
        if (typeof b !== "string")
          return (
            <pre key={k} data-lang={b.lang}>
              <code>{b.code}</code>
            </pre>
          );
        const lines = b.split("\n");
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
