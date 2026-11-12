"use client";

import { useActionState, useState } from "react";
import Prose from "@/components/Prose";
import { savePost } from "../../actions";

const CATEGORIES = ["The 2045 Standard", "Automation", "AI", "CRM", "Programmes", "Building", "Do it yourself"];
const toSlug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);

export type EditorPost = { slug: string; title: string; description: string; category: string; body: string; status: string };

export default function PostEditor({ post, original, builtIn }: { post: EditorPost; original: string; builtIn: boolean }) {
  const [state, action, pending] = useActionState(savePost, undefined);
  const [title, setTitle] = useState(post.title);
  const [slug, setSlug] = useState(post.slug);
  const [slugTouched, setSlugTouched] = useState(Boolean(original));
  const [description, setDescription] = useState(post.description);
  const [body, setBody] = useState(post.body);
  const [tab, setTab] = useState<"write" | "preview">("write");
  const words = body.trim() ? body.trim().split(/\s+/).length : 0;
  const field = "w-full rounded-xl border border-ink/12 bg-white px-3 text-[15px] outline-none focus:border-cobalt";

  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="original" value={original} />
      <div className="grid grid-cols-1 gap-3 [&>*]:min-w-0 lg:grid-cols-[1fr_16rem]">
        <label className="block">
          <span className="text-[12px] text-mute">Title</span>
          <input
            name="title"
            required
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (!slugTouched) setSlug(toSlug(e.target.value));
            }}
            className={`${field} h-12 font-display text-lg`}
          />
        </label>
        <label className="block">
          <span className="text-[12px] text-mute">Category</span>
          <select name="category" defaultValue={post.category} className={`${field} h-12`}>
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
      </div>
      <label className="block">
        <span className="text-[12px] text-mute">Address: clickshift.io/blog/</span>
        <input
          name="slug"
          required
          value={slug}
          readOnly={builtIn}
          onChange={(e) => {
            setSlugTouched(true);
            setSlug(toSlug(e.target.value));
          }}
          className={`${field} h-11 font-mono text-[14px] ${builtIn ? "bg-paper text-mute" : ""}`}
        />
      </label>
      <label className="block">
        <span className="text-[12px] text-mute">Description (shown on cards and in Google, about 155 characters) · {description.length}</span>
        <textarea name="description" required rows={2} value={description} onChange={(e) => setDescription(e.target.value)} className={`${field} py-2.5`} />
      </label>

      <div className="rounded-2xl border border-ink/10 bg-white">
        <div className="flex items-center justify-between border-b border-ink/8 px-3 py-2">
          <div className="flex gap-1 lg:hidden" role="tablist">
            {(["write", "preview"] as const).map((t) => (
              <button key={t} type="button" role="tab" aria-selected={tab === t} onClick={() => setTab(t)} className={`min-h-9 rounded-full px-3 text-[13px] capitalize ${tab === t ? "bg-ink text-paper" : "text-mute"}`}>
                {t}
              </button>
            ))}
          </div>
          <p className="hidden text-[12px] text-mute lg:block">Write on the left, see it on the right.</p>
          <p className="font-mono text-[11px] text-mute">
            {words} words · ~{Math.max(1, Math.round(words / 220))} min
          </p>
        </div>
        <div className="grid grid-cols-1 [&>*]:min-w-0 lg:grid-cols-2">
          <div className={`${tab === "write" ? "block" : "hidden"} lg:block lg:border-r lg:border-ink/8`}>
            <label className="sr-only" htmlFor="body">
              Article
            </label>
            <textarea
              id="body"
              name="body"
              required
              value={body}
              onChange={(e) => setBody(e.target.value)}
              spellCheck
              className="block min-h-[60vh] w-full resize-y rounded-b-2xl bg-transparent p-4 font-mono text-[14px] leading-relaxed outline-none lg:rounded-br-none"
              placeholder={"Start writing…\n\n## A heading\n\nA paragraph with **bold**, *italic* and a [link](/work).\n\n- a list item\n- another"}
            />
          </div>
          <div className={`${tab === "preview" ? "block" : "hidden"} max-h-[75vh] overflow-y-auto p-5 lg:block`}>
            {body.trim() ? <Prose md={body} /> : <p className="text-[14px] text-mute">The preview appears here.</p>}
          </div>
        </div>
      </div>

      <details className="rounded-xl bg-white p-4 text-[13px] text-mute">
        <summary className="cursor-pointer text-ink">Formatting help</summary>
        <ul className="mt-2 space-y-1 font-mono">
          <li>## Heading · ### Subheading</li>
          <li>**bold** · *italic* · `code` · [link text](/work/kobocent)</li>
          <li>- bullet list · 1. numbered list · &gt; quote</li>
          <li>```js (code block, close with ```)</li>
          <li>Leave a blank line between paragraphs.</li>
        </ul>
      </details>

      {state?.error && (
        <p className="rounded-xl bg-red-50 p-3 text-[14px] text-red-800" role="alert">
          {state.error}
        </p>
      )}
      {state?.saved && (
        <p className="rounded-xl bg-signal/50 p-3 text-[14px]" role="status">
          Saved.
        </p>
      )}

      <div className="sticky bottom-16 z-10 flex flex-col gap-2 rounded-2xl border border-ink/10 bg-white/95 p-3 backdrop-blur sm:flex-row sm:items-center sm:justify-end lg:bottom-4">
        <button name="status" value="draft" disabled={pending} className="min-h-12 rounded-full border border-ink/15 px-6 text-[15px] hover:bg-paper disabled:opacity-50">
          Save draft
        </button>
        <button name="status" value="published" disabled={pending} className="min-h-12 rounded-full bg-ink px-6 text-[15px] font-medium text-paper hover:bg-cobalt disabled:opacity-50">
          {pending ? "Saving…" : post.status === "published" ? "Update live article" : "Publish"}
        </button>
      </div>
    </form>
  );
}
