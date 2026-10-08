import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

export function renderOgCard({ eyebrow, headline, sub }: { eyebrow: string; headline: string; sub: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#0A0F0D",
          color: "#F5F1E8",
        }}
      >
        <div style={{ fontSize: 30, opacity: 0.8 }}>{eyebrow}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.06, color: "#10B981" }}>{headline}</div>
          <div style={{ fontSize: 32, lineHeight: 1.3 }}>{sub}</div>
        </div>
        <div style={{ width: 160, height: 8, background: "#10B981" }} />
      </div>
    ),
    ogSize,
  );
}
