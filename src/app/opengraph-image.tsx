import { ImageResponse } from "next/og";
import { siteConfig } from "@/shared/config";
import { loadOgFonts, loadOgMark, OG_COLORS } from "@/shared/lib";

export const alt = siteConfig.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const [fonts, markSrc] = await Promise.all([loadOgFonts(), loadOgMark()]);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        position: "relative",
        background: OG_COLORS.paper,
        fontFamily: "Pretendard",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={markSrc} width={96} height={96} alt="" />
        <div
          style={{
            display: "flex",
            fontFamily: "Sacramento",
            fontSize: 72,
            lineHeight: 1,
            color: OG_COLORS.ink,
            paddingBottom: 8,
          }}
        >
          {siteConfig.name}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          fontSize: 60,
          fontWeight: 700,
          lineHeight: 1.3,
          letterSpacing: "-0.02em",
          color: OG_COLORS.ink,
          maxWidth: 1056,
        }}
      >
        {siteConfig.tagline}
      </div>

      <div
        style={{
          display: "flex",
          fontSize: 28,
          fontWeight: 500,
          letterSpacing: "0.02em",
          color: OG_COLORS.muted,
        }}
      >
        {siteConfig.title}
      </div>

      {/* 하단 버건디 띠. 패딩 바깥까지 꽉 차야 해서 absolute다. */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 14,
          background: OG_COLORS.burgundy,
        }}
      />
    </div>,
    { ...size, fonts },
  );
}
