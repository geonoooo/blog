import { ImageResponse } from "next/og";
import { CATEGORY_LABELS, siteConfig } from "@/shared/config";
import { formatDate, loadOgFonts, loadOgMark, OG_COLORS } from "@/shared/lib";
import type { Post } from "../model";

export const POST_COVER_SIZE = { width: 1200, height: 630 };
export const POST_COVER_CONTENT_TYPE = "image/png";

const TITLE_MAX_WIDTH = 980;
const TITLE_MAX_LINES = 3;
const TITLE_SIZES = [64, 56, 48] as const;

/* 제목 폭을 글자 수로 재면 한글에서 틀린다. 한글은 라틴 문자의 두 배 폭을 먹어서
   "41자 한글 제목"이 "41자 영문 제목"보다 훨씬 길다. 전각을 1em, 나머지를 0.5em로
   세서 em 단위 폭을 낸다. */
function measureEm(text: string): number {
  let em = 0;
  for (const char of text) {
    const code = char.codePointAt(0) ?? 0;
    const wide =
      (code >= 0x1100 && code <= 0x115f) || // 한글 자모
      (code >= 0x2e80 && code <= 0xa4cf) || // CJK 부수·한자·가나
      (code >= 0xac00 && code <= 0xd7a3) || // 한글 음절
      (code >= 0xf900 && code <= 0xfaff) || // CJK 호환 한자
      (code >= 0xfe30 && code <= 0xfe4f) || // CJK 호환 기호
      (code >= 0xff00 && code <= 0xff60) || // 전각 영숫자
      (code >= 0xffe0 && code <= 0xffe6);
    em += wide ? 1 : 0.5;
  }
  return em;
}

/** 3줄에 들어가는 가장 큰 글자 크기. 잘라내는 대신 줄인다. */
function fitTitleSize(title: string): number {
  const em = measureEm(title);
  const fits = TITLE_SIZES.find((size) => em / (TITLE_MAX_WIDTH / size) <= TITLE_MAX_LINES);
  return fits ?? TITLE_SIZES[TITLE_SIZES.length - 1];
}

// 소셜 공유용(OG). 홈 OG와 같은 골격이고 제목이 주인공이라 마크를 한 단 줄인다.
export async function createPostCoverImage(post: Post): Promise<ImageResponse> {
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
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={markSrc} width={64} height={64} alt="" />
        <div
          style={{
            display: "flex",
            fontFamily: "Sacramento",
            fontSize: 44,
            lineHeight: 1,
            color: OG_COLORS.ink,
            paddingBottom: 6,
          }}
        >
          {siteConfig.name}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <div
          style={{
            display: "flex",
            fontSize: 26,
            fontWeight: 600,
            letterSpacing: "0.08em",
            color: OG_COLORS.burgundy,
          }}
        >
          {CATEGORY_LABELS[post.category].toUpperCase()}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: fitTitleSize(post.title),
            fontWeight: 700,
            lineHeight: 1.25,
            letterSpacing: "-0.025em",
            color: OG_COLORS.ink,
            maxWidth: TITLE_MAX_WIDTH,
          }}
        >
          {post.title}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          fontSize: 28,
          fontWeight: 500,
          letterSpacing: "0.02em",
          color: OG_COLORS.muted,
        }}
      >
        <span>{siteConfig.title}</span>
        <span>·</span>
        <span>{formatDate(post.date)}</span>
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
    { ...POST_COVER_SIZE, fonts },
  );
}
