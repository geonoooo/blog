export const POST_CATEGORIES = ["typescript", "deep-dive", "react", "tooling", "backend"] as const;

export type PostCategory = (typeof POST_CATEGORIES)[number];

export const CATEGORY_LABELS: Record<PostCategory, string> = {
  typescript: "TypeScript",
  "deep-dive": "Deep Dive",
  react: "React",
  tooling: "Tooling",
  backend: "Backend",
};

const AUTHOR_HANDLE = "geonoooo";

const getSiteUrl = () => {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL)
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return "http://localhost:3000";
};

export const siteConfig = {
  name: AUTHOR_HANDLE,
  title: `${AUTHOR_HANDLE}.dev`,
  description:
    "프론트엔드 개발하면서 실제로 밟은 문제를 측정하고 정리합니다. React, Next.js, Vite부터 네트워크·DB까지 직접 겪은 기록.",
  url: getSiteUrl(),
  author: {
    name: AUTHOR_HANDLE,
    email: `${AUTHOR_HANDLE}.fe@gmail.com`,
  },
  social: {
    github: `https://github.com/${AUTHOR_HANDLE}`,
  },
  // 네이버 서치어드바이저 소유 확인용 meta 태그. HTML에 그대로 노출되는 공개 값이라
  // env로 두지 않는다 — env로 두면 배포 환경에 값을 안 넣었을 때 태그가 조용히 사라진다.
  // 구글은 sc-domain 도메인 속성(DNS TXT 확인)이라 meta 태그를 쓰지 않는다.
  verification: {
    naver: "4bf61ebdb6d655128fe3c1df7f455c8996254542",
  },
  // 목록이 루트라 별도 Posts 항목이 없다. 로고가 루트로 가는 링크다.
  nav: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
  ],
} as const;
