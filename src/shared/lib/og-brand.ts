import { readFile } from "node:fs/promises";
import { join } from "node:path";

/* OG 이미지는 satori가 그린다. CSS 변수를 못 읽으므로 브랜드 색을 여기서 hex로 고정한다.
   globals.css의 brand 계열과 같은 버건디이고, 이 파일 밖에서는 쓰지 않는다. */
export const OG_COLORS = {
  burgundy: "#6B2231",
  ink: "#111111",
  paper: "#F4F4F2",
  muted: "#7A776E",
} as const;

// 마크는 도형이 아니라 필기체 글자라서 satori의 div로는 못 그린다. PNG를 그대로 넣는다.
const MARK_PATH = "public/mark-burgundy-1024.png";

// 포스트마다 OG를 굽기 때문에 메모하지 않으면 글 수만큼 다시 읽고 다시 base64로 만든다.
let cached: Promise<string> | null = null;

export function loadOgMark(): Promise<string> {
  cached ??= readFile(join(process.cwd(), MARK_PATH)).then(
    (buf) => `data:image/png;base64,${buf.toString("base64")}`,
  );
  return cached;
}
