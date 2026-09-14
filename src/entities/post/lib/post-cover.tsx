import { ImageResponse } from "next/og";
import { CATEGORY_LABELS, type PostCategory, siteConfig } from "@/shared/config";
import { loadOgFont } from "@/shared/lib";
import type { Post } from "../model";

export const POST_COVER_SIZE = { width: 1200, height: 630 };
export const POST_COVER_CONTENT_TYPE = "image/png";

// 카테고리별 강조색. satori는 CSS 변수를 못 읽으므로 여기서만 hex를 쓴다.
// UI에는 쓰지 않는다 — 목록은 텍스트 배지로 카테고리를 구분한다.
const CATEGORY_ACCENT: Record<PostCategory, string> = {
  typescript: "#3178c6",
  "deep-dive": "#a855f7",
  react: "#38bdf8",
  tooling: "#f59e0b",
  backend: "#10b981",
};

function SiteMark({ accent }: { accent: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <div style={{ width: 14, height: 14, borderRadius: 999, background: accent }} />
      <span style={{ fontSize: 28, color: "#9ca3af" }}>{siteConfig.title}</span>
    </div>
  );
}

function CategoryPill({ label }: { label: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "8px 18px",
        borderRadius: 999,
        border: "1px solid #374151",
        fontSize: 22,
        color: "#d1d5db",
      }}
    >
      {label}
    </div>
  );
}

async function fontOptions() {
  const fontData = await loadOgFont();
  return {
    ...POST_COVER_SIZE,
    fonts: [
      {
        name: "Pretendard",
        data: fontData,
        style: "normal" as const,
        weight: 600 as const,
      },
    ],
  };
}

// 소셜 공유용(OG). 제목·요약·날짜까지 담아 미리보기에서 맥락이 보이게 한다.
export async function createPostCoverImage(post: Post): Promise<ImageResponse> {
  const options = await fontOptions();
  const accent = CATEGORY_ACCENT[post.category];

  const date = new Date(post.date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        background: "linear-gradient(135deg, #0a0a0a 0%, #111827 50%, #1f2937 100%)",
        color: "#ffffff",
        fontFamily: "Pretendard",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <SiteMark accent={accent} />
        <CategoryPill label={CATEGORY_LABELS[post.category]} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {post.title}
        </div>
        <div
          style={{
            fontSize: 30,
            color: "#d1d5db",
            lineHeight: 1.4,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {post.summary}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 22,
          color: "#9ca3af",
        }}
      >
        <span>{siteConfig.author.name}</span>
        <span>{date}</span>
      </div>
    </div>,
    options,
  );
}
