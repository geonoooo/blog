import type { ReactNode } from "react";
import type { PostCategory } from "@/shared/config";
import { cn } from "@/shared/lib";
import type { PostCover } from "../model";

/**
 * 목록 카드 커버. 실사 이미지 대신 글마다 배정한 기하 모티프를 그린다.
 *
 * 색은 data-category -> --cat -> .category-cover(color)로 흐르고, 도형은 전부
 * currentColor를 쓴다. 그래서 라이트/다크 전환에 따로 손댈 게 없다.
 * 모티프를 추가할 때는 도형 8개 이하, 획 위주로 유지한다 — 아이콘 모음이 아니라
 * 한 벌의 시각 언어로 보여야 한다.
 */
const MOTIFS: Record<PostCover, ReactNode> = {
  branch: (
    <>
      <path d="M28 58h104" />
      <path d="M52 58C52 40 62 32 78 32h26" opacity={0.5} />
      <circle cx="28" cy="58" r="5" fill="currentColor" stroke="none" />
      <circle cx="80" cy="58" r="5" fill="currentColor" stroke="none" />
      <circle cx="132" cy="58" r="5" fill="currentColor" stroke="none" />
      <circle cx="108" cy="32" r="5" fill="currentColor" stroke="none" opacity={0.5} />
    </>
  ),
  chunks: (
    <>
      <rect x="22" y="28" width="42" height="34" rx="4" />
      <path d="M74 45h16" opacity={0.5} />
      <path d="M85 40l6 5-6 5" opacity={0.5} />
      <rect x="100" y="26" width="17" height="16" rx="3" />
      <rect x="121" y="26" width="17" height="16" rx="3" opacity={0.5} />
      <rect x="100" y="48" width="17" height="16" rx="3" opacity={0.5} />
      <rect x="121" y="48" width="17" height="16" rx="3" />
    </>
  ),
  contrast: (
    <>
      <circle cx="80" cy="45" r="34" opacity={0.3} />
      <circle cx="80" cy="45" r="24" />
      <path d="M80 21a24 24 0 0 1 0 48z" fill="currentColor" stroke="none" />
    </>
  ),
  counter: (
    <>
      <path d="M22 68h116" opacity={0.4} />
      <rect
        x="34"
        y="54"
        width="16"
        height="14"
        rx="3"
        fill="currentColor"
        stroke="none"
        opacity={0.35}
      />
      <rect
        x="60"
        y="44"
        width="16"
        height="24"
        rx="3"
        fill="currentColor"
        stroke="none"
        opacity={0.55}
      />
      <rect
        x="86"
        y="34"
        width="16"
        height="34"
        rx="3"
        fill="currentColor"
        stroke="none"
        opacity={0.75}
      />
      <rect x="112" y="24" width="16" height="44" rx="3" fill="currentColor" stroke="none" />
    </>
  ),
  envelope: (
    <>
      <rect x="22" y="26" width="58" height="38" rx="4" />
      <path d="M22 33l29 19 29-19" opacity={0.55} />
      <rect x="94" y="37" width="12" height="16" rx="3" opacity={0.45} />
      <rect x="110" y="37" width="12" height="16" rx="3" opacity={0.45} />
      <rect x="126" y="37" width="12" height="16" rx="3" fill="currentColor" stroke="none" />
    </>
  ),
  gate: (
    <>
      <path d="M80 14v62" strokeDasharray="6 7" opacity={0.55} />
      <path d="M24 34h84" />
      <path d="M102 29l6 5-6 5" />
      <path d="M136 58H98" opacity={0.5} />
      <path d="M104 53l-6 5 6 5" opacity={0.5} />
      <path d="M82 53l8 10M90 53l-8 10" />
    </>
  ),
  layers: (
    <>
      <path d="M80 20l40 15-40 15-40-15z" />
      <path d="M40 49l40 15 40-15" opacity={0.6} />
      <path d="M40 63l40 15 40-15" opacity={0.35} />
    </>
  ),
  mapping: (
    <>
      <rect x="20" y="22" width="34" height="14" rx="4" />
      <rect x="20" y="44" width="34" height="14" rx="4" opacity={0.55} />
      <rect x="20" y="66" width="34" height="14" rx="4" opacity={0.55} />
      <rect x="106" y="22" width="34" height="14" rx="4" />
      <rect x="106" y="44" width="34" height="14" rx="4" opacity={0.55} />
      <rect x="106" y="66" width="34" height="14" rx="4" opacity={0.55} />
      <path d="M54 29h52" opacity={0.45} />
      <path d="M54 51l52 22M54 73l52-22" opacity={0.45} />
    </>
  ),
  ports: (
    <>
      <path d="M22 45h116" opacity={0.35} />
      <rect x="32" y="36" width="16" height="18" rx="3" opacity={0.45} />
      <rect x="58" y="36" width="16" height="18" rx="3" opacity={0.45} />
      <rect x="84" y="36" width="16" height="18" rx="3" />
      <rect x="110" y="36" width="16" height="18" rx="3" opacity={0.45} />
      <path d="M87 39l10 12M97 39l-10 12" />
    </>
  ),
  scroll: (
    <>
      <rect x="24" y="20" width="56" height="20" rx="9" opacity={0.45} />
      <rect
        x="60"
        y="48"
        width="56"
        height="20"
        rx="9"
        fill="currentColor"
        stroke="none"
        opacity={0.85}
      />
      <path d="M134 26v32" opacity={0.5} />
      <path d="M128 52l6 6 6-6" opacity={0.5} />
    </>
  ),
  swatches: (
    <>
      <rect x="26" y="22" width="24" height="26" rx="4" fill="currentColor" stroke="none" />
      <rect
        x="54"
        y="22"
        width="24"
        height="26"
        rx="4"
        fill="currentColor"
        stroke="none"
        opacity={0.75}
      />
      <rect
        x="82"
        y="22"
        width="24"
        height="26"
        rx="4"
        fill="currentColor"
        stroke="none"
        opacity={0.5}
      />
      <rect
        x="110"
        y="22"
        width="24"
        height="26"
        rx="4"
        fill="currentColor"
        stroke="none"
        opacity={0.28}
      />
      <rect
        x="26"
        y="52"
        width="24"
        height="26"
        rx="4"
        fill="currentColor"
        stroke="none"
        opacity={0.28}
      />
      <rect
        x="54"
        y="52"
        width="24"
        height="26"
        rx="4"
        fill="currentColor"
        stroke="none"
        opacity={0.5}
      />
      <rect
        x="82"
        y="52"
        width="24"
        height="26"
        rx="4"
        fill="currentColor"
        stroke="none"
        opacity={0.75}
      />
      <rect x="110" y="52" width="24" height="26" rx="4" fill="currentColor" stroke="none" />
    </>
  ),
  "table-vs-doc": (
    <>
      <rect x="20" y="26" width="52" height="40" rx="4" />
      <path d="M20 40h52M46 26v40" opacity={0.5} />
      <rect x="88" y="20" width="52" height="52" rx="6" />
      <rect x="96" y="30" width="36" height="10" rx="3" opacity={0.5} />
      <rect x="104" y="46" width="28" height="10" rx="3" opacity={0.5} />
    </>
  ),
  terminal: (
    <>
      <rect x="22" y="20" width="116" height="50" rx="6" />
      <path d="M22 33h116" opacity={0.5} />
      <circle cx="33" cy="26" r="2.5" fill="currentColor" stroke="none" opacity={0.6} />
      <circle cx="43" cy="26" r="2.5" fill="currentColor" stroke="none" opacity={0.6} />
      <path d="M36 45l8 6-8 6" />
      <path d="M54 57h30" opacity={0.6} />
    </>
  ),
  tree: (
    <>
      <rect x="30" y="16" width="48" height="14" rx="4" />
      <path d="M40 30v42" opacity={0.5} />
      <path d="M40 42h12M40 56h12M40 70h12" opacity={0.5} />
      <rect x="52" y="35" width="76" height="14" rx="4" opacity={0.75} />
      <rect x="52" y="49" width="76" height="14" rx="4" opacity={0.5} />
      <rect x="52" y="63" width="76" height="14" rx="4" opacity={0.3} />
    </>
  ),
  tunnel: (
    <>
      <rect x="18" y="34" width="30" height="24" rx="5" />
      <rect x="112" y="34" width="30" height="24" rx="5" />
      <path d="M48 38c22-10 42-10 64 0" opacity={0.5} />
      <path d="M48 54c22 10 42 10 64 0" opacity={0.5} />
      <path d="M64 46h30" />
      <path d="M88 41l6 5-6 5" />
    </>
  ),
};

/** frontmatter에 cover가 없는 글의 기본 모티프. */
const CATEGORY_FALLBACK: Record<PostCategory, PostCover> = {
  typescript: "mapping",
  "deep-dive": "tunnel",
  react: "layers",
  tooling: "terminal",
  backend: "table-vs-doc",
};

interface PostCoverArtProps {
  category: PostCategory;
  cover?: PostCover;
  className?: string;
}

export function PostCoverArt({ category, cover, className }: PostCoverArtProps) {
  return (
    <div
      data-category={category}
      className={cn("category-cover flex items-center justify-center", className)}
    >
      <svg
        viewBox="0 0 160 90"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
        className="h-full w-full"
      >
        {MOTIFS[cover ?? CATEGORY_FALLBACK[category]]}
      </svg>
    </div>
  );
}
