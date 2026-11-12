import { ImageResponse } from "next/og";

export const alt = "ClickShift: we build what still works in 2045";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#0B0C10", padding: 72, color: "#F3F0E8" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="72" height="72" viewBox="0 0 48 48">
            <rect width="48" height="48" rx="12" fill="#D4FF3A" />
            <path d="M9 37 L18 29 L18 37 Z M18 37 L27 21 L27 37 Z M27 37 L36 13 L36 37 Z" fill="#0B0C10" />
            <rect x="37" y="6" width="5.5" height="5.5" rx="1.2" fill="#0B0C10" />
          </svg>
          <span style={{ fontSize: 44, fontWeight: 700, letterSpacing: -2 }}>ClickShift</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 96, fontWeight: 700, letterSpacing: -5, lineHeight: 0.95 }}>We build what still</span>
          <span style={{ fontSize: 96, fontWeight: 700, letterSpacing: -5, lineHeight: 0.95 }}>
            works in&nbsp;<span style={{ color: "#D4FF3A" }}>2045.</span>
          </span>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#8C9099", letterSpacing: 4 }}>THE SOLUTIONS FACTORY · BUILD · AUTOMATE · EQUIP</div>
      </div>
    ),
    size,
  );
}
