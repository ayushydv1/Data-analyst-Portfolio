import { ImageResponse } from "next/og";

export const alt = "Md Asif Ansari — Data Analyst / Power BI Developer";
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
          background: "#060910",
          color: "#eef3fb",
          padding: 72,
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#2dd4bf",
          }}
        >
          Delhi
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 800, letterSpacing: -3 }}>
            Md Asif Ansari
          </div>
          <div style={{ fontSize: 32, color: "#8b97ab", marginTop: 12 }}>
            Data Analyst / Power BI Developer
          </div>
        </div>
        <div style={{ fontSize: 22, color: "#8b97ab" }}>
          Power BI · DAX · SQL · Dashboards
        </div>
      </div>
    ),
    { ...size },
  );
}
