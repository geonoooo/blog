const PRETENDARD_BASE =
  "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/packages/pretendard/dist/public/static";
// satori는 woff2를 못 읽는다. 구글 폰트 저장소의 TTF 원본을 그대로 받는다.
const SACRAMENTO_URL =
  "https://cdn.jsdelivr.net/gh/google/fonts@main/ofl/sacramento/Sacramento-Regular.ttf";

/* satori는 가변 폰트를 못 읽어서 weight별 정적 파일을 따로 등록해야 한다.
   등록 안 한 weight를 쓰면 가장 가까운 것으로 대체되므로 타입 스케일이 뭉갠다. */
const SOURCES = [
  { name: "Pretendard", weight: 500, url: `${PRETENDARD_BASE}/Pretendard-Medium.otf` },
  { name: "Pretendard", weight: 600, url: `${PRETENDARD_BASE}/Pretendard-SemiBold.otf` },
  { name: "Pretendard", weight: 700, url: `${PRETENDARD_BASE}/Pretendard-Bold.otf` },
  { name: "Sacramento", weight: 400, url: SACRAMENTO_URL },
] as const;

export type OgFont = {
  name: (typeof SOURCES)[number]["name"];
  data: ArrayBuffer;
  weight: (typeof SOURCES)[number]["weight"];
  style: "normal";
};

// 포스트마다 OG를 굽기 때문에 메모하지 않으면 글 수 × 4번 받는다.
let cached: Promise<OgFont[]> | null = null;

async function fetchFont({ name, weight, url }: (typeof SOURCES)[number]): Promise<OgFont> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to load OG font ${name} ${weight}: ${res.status} ${res.statusText}`);
  }
  return { name, data: await res.arrayBuffer(), weight, style: "normal" };
}

export function loadOgFonts(): Promise<OgFont[]> {
  cached ??= Promise.all(SOURCES.map(fetchFont));
  return cached;
}
