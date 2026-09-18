import { Geist, Sacramento } from "next/font/google";
import localFont from "next/font/local";

export const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
  variable: "--font-pretendard",
  weight: "45 920",
});

export const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
});

// 로고 워드마크 전용. 라틴만 쓰므로 subsets도 latin만 받는다.
// line-height는 쓰는 쪽에서 1로 눌러야 한다 — 기본 행간이 커서 헤더에 빈 공간이 생긴다.
export const sacramento = Sacramento({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sacramento",
});
