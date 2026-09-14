import { ImageResponse } from "next/og";
import { siteConfig } from "@/shared/config";
import { loadOgFont } from "@/shared/lib";

export const alt = siteConfig.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const fontData = await loadOgFont();

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "80px",
        background: "linear-gradient(135deg, #0a0a0a 0%, #111827 50%, #1f2937 100%)",
        color: "#ffffff",
        fontFamily: "Pretendard",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: 999,
            background: "#f0a556",
          }}
        />
        <span style={{ fontSize: 28, color: "#9ca3af" }}>{siteConfig.title}</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div
          style={{
            fontSize: 88,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}
        >
          {siteConfig.title}
        </div>
        <div
          style={{
            fontSize: 34,
            color: "#d1d5db",
            lineHeight: 1.4,
            maxWidth: 900,
          }}
        >
          {siteConfig.description}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 24,
          color: "#9ca3af",
        }}
      >
        <span>{siteConfig.author.name}</span>
        <span>{siteConfig.url.replace(/^https?:\/\//, "")}</span>
      </div>
    </div>,
    {
      ...size,
      fonts: [{ name: "Pretendard", data: fontData, style: "normal", weight: 600 }],
    },
  );
}
