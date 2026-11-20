import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#1f3a63",
          color: "#f7f5ef",
          padding: 72,
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "#f7f5ef",
              opacity: 0.75,
            }}
          >
            {siteConfig.tagline}
          </div>
          <div style={{ fontSize: 88, fontWeight: 700, marginTop: 24 }}>{siteConfig.name}</div>
        </div>
        <div style={{ display: "flex", fontSize: 30, opacity: 0.85, maxWidth: 980 }}>
          Foundation, Prelims, Mains, Mentorship &amp; Test Series programs in Lucknow.
        </div>
      </div>
    ),
    { ...size },
  );
}
