import { ImageResponse } from "next/og";

export const alt = "Missed-Call Recovery for Australian Dental Clinics | Qarib Iqbal";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
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
        <div style={{ fontSize: 30, opacity: 0.8 }}>Qarib Iqbal</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.05, color: "#10B981" }}>
            Missed-call recovery for Australian dental clinics.
          </div>
          <div style={{ fontSize: 34, lineHeight: 1.3 }}>
            Missed-call text-back and patient reactivation
          </div>
        </div>
        <div style={{ width: 160, height: 8, background: "#10B981" }} />
      </div>
    ),
    size,
  );
}
