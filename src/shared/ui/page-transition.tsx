"use client";

import { usePathname } from "next/navigation";

interface PageTransitionProps {
  children: React.ReactNode;
}

/**
 * 경로가 바뀌면 재마운트돼 등장 애니메이션을 다시 재생한다.
 *
 * View Transition을 쓰지 않는다. 전환 중에는 화면이 스냅샷으로 고정돼 그동안
 * 스크롤이 먹지 않는다. 등장을 길게 끌수록 그 제약이 커진다. 일반 CSS
 * 애니메이션은 실제 DOM 위에서 돌기 때문에 재생 중에도 스크롤이 정상이다.
 *
 * 쿼리스트링만 바뀌는 이동(카테고리 필터)은 pathname이 같아 재생되지 않는다.
 * 목록 안에서 항목만 갈리는 것이라 전체 등장 연출은 과하다.
 */
export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <div key={pathname} className="page-enter">
      {children}
    </div>
  );
}
