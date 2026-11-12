import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#0B0C10" }}>
        <svg width="180" height="180" viewBox="0 0 48 48">
          <path d="M9 37 L18 29 L18 37 Z M18 37 L27 21 L27 37 Z M27 37 L36 13 L36 37 Z" fill="#D4FF3A" />
          <rect x="37" y="6" width="5.5" height="5.5" rx="1.2" fill="#D4FF3A" />
        </svg>
      </div>
    ),
    size,
  );
}
