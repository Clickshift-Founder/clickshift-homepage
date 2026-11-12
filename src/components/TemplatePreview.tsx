import type { PreviewKind } from "@/lib/templates";

// Drawn previews for CRM templates: placeholders until real screenshots exist. Each kind sketches the template's
// main view, tinted with the platform's colour.

export default function TemplatePreview({ kind, color, label }: { kind: PreviewKind; color: string; label: string }) {
  const W = 320;
  const H = 200;
  const ink = "#0B0C10";
  const soft = "#E9E4D8";
  const card = "#FFFFFF";

  const chrome = (
    <>
      <rect width={W} height={H} rx="14" fill="#F7F5EF" />
      <rect width={W} height="26" rx="14" fill={card} />
      <rect y="13" width={W} height="13" fill={card} />
      <circle cx="16" cy="13" r="3.5" fill="#E2DCCD" />
      <circle cx="28" cy="13" r="3.5" fill="#E2DCCD" />
      <circle cx="40" cy="13" r="3.5" fill="#E2DCCD" />
      <rect x="58" y="8" width="90" height="10" rx="5" fill={soft} />
      <rect x={W - 50} y="7" width="38" height="12" rx="6" fill={color} />
    </>
  );

  let body: React.ReactNode = null;

  if (kind === "pipeline") {
    const cols = [4, 3, 3, 2];
    body = cols.map((n, c) => (
      <g key={c} transform={`translate(${12 + c * 77} 36)`}>
        <rect width="70" height="10" rx="3" fill={c === 3 ? color : "#D9D2C1"} opacity={c === 3 ? 1 : 0.9} />
        {Array.from({ length: n }).map((_, r) => (
          <g key={r} transform={`translate(0 ${16 + r * 36})`}>
            <rect width="70" height="30" rx="6" fill={card} stroke="#E6E0D2" />
            <rect x="7" y="7" width={36 + ((r + c) % 3) * 8} height="5" rx="2.5" fill={ink} opacity="0.75" />
            <rect x="7" y="17" width="28" height="5" rx="2.5" fill={color} opacity="0.55" />
            <circle cx="60" cy="19" r="4" fill={soft} />
          </g>
        ))}
      </g>
    ));
  } else if (kind === "table") {
    body = (
      <g transform="translate(12 36)">
        <rect width={W - 24} height="14" rx="3" fill="#D9D2C1" />
        {Array.from({ length: 7 }).map((_, r) => (
          <g key={r} transform={`translate(0 ${20 + r * 20})`}>
            <rect width={W - 24} height="16" rx="3" fill={card} />
            <rect x="8" y="5" width={60 + (r % 3) * 12} height="6" rx="3" fill={ink} opacity="0.7" />
            <rect x="110" y="4" width="38" height="8" rx="4" fill={color} opacity={0.35 + (r % 3) * 0.2} />
            <rect x="160" y="5" width="44" height="6" rx="3" fill="#CFC8B7" />
            <rect x="218" y="4" width={18 + (r % 4) * 14} height="8" rx="2" fill={r % 2 ? "#00B37E" : color} opacity="0.75" />
          </g>
        ))}
      </g>
    );
  } else if (kind === "dashboard") {
    const bars = [40, 62, 48, 80, 70, 96, 88];
    body = (
      <g transform="translate(12 36)">
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${i * 100} 0)`}>
            <rect width="92" height="44" rx="8" fill={card} />
            <rect x="9" y="9" width="40" height="5" rx="2.5" fill="#CFC8B7" />
            <rect x="9" y="21" width={[52, 40, 46][i]} height="13" rx="3" fill={i === 1 ? color : ink} opacity={i === 1 ? 1 : 0.85} />
          </g>
        ))}
        <rect y="52" width="196" height="100" rx="8" fill={card} />
        {bars.map((b, i) => (
          <rect key={i} x={14 + i * 25} y={52 + 90 - b * 0.8} width="15" height={b * 0.8} rx="3" fill={i === 5 ? color : "#D9D2C1"} />
        ))}
        <rect x="204" y="52" width="92" height="100" rx="8" fill={card} />
        <circle cx="250" cy="102" r="30" fill="none" stroke="#E6E0D2" strokeWidth="11" />
        <circle cx="250" cy="102" r="30" fill="none" stroke={color} strokeWidth="11" strokeDasharray="130 200" transform="rotate(-90 250 102)" />
      </g>
    );
  } else if (kind === "flow") {
    const nodes = [
      { x: 18, y: 92, t: "Trigger" },
      { x: 92, y: 52, t: "" },
      { x: 92, y: 132, t: "" },
      { x: 170, y: 92, t: "" },
      { x: 244, y: 60, t: "" },
      { x: 244, y: 124, t: "" },
    ];
    const edges: [number, number][] = [[0, 1], [0, 2], [1, 3], [2, 3], [3, 4], [3, 5]];
    body = (
      <g>
        {edges.map(([a, b], i) => (
          <path
            key={i}
            d={`M${nodes[a].x + 58} ${nodes[a].y + 14} C ${nodes[a].x + 74} ${nodes[a].y + 14}, ${nodes[b].x - 16} ${nodes[b].y + 14}, ${nodes[b].x} ${nodes[b].y + 14}`}
            stroke={color}
            strokeWidth="2"
            fill="none"
            opacity="0.6"
          />
        ))}
        {nodes.map((n, i) => (
          <g key={i} transform={`translate(${n.x} ${n.y})`}>
            <rect width="58" height="28" rx="14" fill={i === 0 ? color : card} stroke={i === 0 ? color : "#E2DCCD"} />
            <circle cx="14" cy="14" r="6" fill={i === 0 ? "#fff" : color} opacity={i === 0 ? 0.9 : 0.8} />
            <rect x="24" y="11" width="24" height="6" rx="3" fill={i === 0 ? "#fff" : ink} opacity="0.7" />
          </g>
        ))}
      </g>
    );
  } else if (kind === "calendar") {
    body = (
      <g transform="translate(12 36)">
        {Array.from({ length: 5 }).map((_, d) => (
          <g key={d} transform={`translate(${d * 59.2} 0)`}>
            <rect width="54" height="10" rx="3" fill="#D9D2C1" />
            <rect y="16" width="54" height="136" rx="6" fill={card} />
            {[0, 1, 2].map((s) =>
              (d + s) % 2 === 0 || s === 1 ? (
                <rect key={s} x="5" y={24 + s * 42 + (d % 2) * 8} width="44" height="28" rx="5" fill={color} opacity={s === 1 ? 0.9 : 0.4} />
              ) : (
                <rect key={s} x="5" y={24 + s * 42} width="44" height="10" rx="3" fill="#F1EDE3" />
              ),
            )}
          </g>
        ))}
      </g>
    );
  } else {
    // sync
    body = (
      <g>
        {[0, 1].map((side) => (
          <g key={side} transform={`translate(${side ? 196 : 16} 40)`}>
            <rect width="108" height="146" rx="10" fill={card} stroke="#E2DCCD" />
            <rect x="10" y="10" width="54" height="9" rx="4.5" fill={side ? "#00A1E0" : "#FF7A59"} />
            {Array.from({ length: 5 }).map((_, r) => (
              <g key={r} transform={`translate(10 ${32 + r * 22})`}>
                <rect width="88" height="16" rx="4" fill="#F4F1EA" />
                <rect x="6" y="5" width={30 + (r % 3) * 10} height="6" rx="3" fill={ink} opacity="0.6" />
              </g>
            ))}
          </g>
        ))}
        {[0, 1, 2, 3].map((r) => (
          <path key={r} d={`M126 ${80 + r * 22} H194`} stroke={color} strokeWidth="2" strokeDasharray="4 4" markerEnd="" opacity="0.8" />
        ))}
        <circle cx="160" cy="113" r="16" fill={ink} />
        <path d="M152 109h14l-4-4M168 117h-14l4 4" stroke="#D4FF3A" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    );
  }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={`Preview of ${label}`}>
      {chrome}
      {body}
    </svg>
  );
}
