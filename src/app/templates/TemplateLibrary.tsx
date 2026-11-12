"use client";

import { useState } from "react";
import { Chips } from "@/components/Interactive";
import { TemplateCard } from "@/components/Cards";
import { TEMPLATES } from "@/lib/templates";

const PLATFORMS = ["All", ...Array.from(new Set(TEMPLATES.map((t) => t.platform)))];
const USES = ["All", ...Array.from(new Set(TEMPLATES.map((t) => t.useCase)))];

export default function TemplateLibrary() {
  const [platform, setPlatform] = useState("All");
  const [use, setUse] = useState("All");
  const shown = TEMPLATES.filter((t) => (platform === "All" || t.platform === platform) && (use === "All" || t.useCase === use));

  return (
    <>
      <div className="space-y-3">
        <div>
          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-mute">Platform</p>
          <Chips options={PLATFORMS} active={platform} onPick={setPlatform} />
        </div>
        <div>
          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-mute">Use case</p>
          <Chips options={USES} active={use} onPick={setUse} />
        </div>
      </div>
      <p className="mt-6 text-[14px] text-mute" aria-live="polite">
        {shown.length} template{shown.length === 1 ? "" : "s"}
      </p>
      <div className="mt-4 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {shown.map((t) => (
          <TemplateCard key={t.slug} t={t} />
        ))}
        {shown.length === 0 && (
          <p className="rounded-2xl bg-white p-8 text-mute md:col-span-2 lg:col-span-3">
            Nothing for that combination yet. Tell us what you need and we&apos;ll build it.
          </p>
        )}
      </div>
    </>
  );
}
