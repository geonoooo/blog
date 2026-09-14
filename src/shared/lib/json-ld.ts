import { siteConfig } from "@/shared/config";

interface Crumb {
  name: string;
  /** 사이트 루트 기준 경로. `/posts/foo` 형태. */
  path: string;
}

/** 검색결과에 사이트 내 경로를 노출한다. 배열 순서가 그대로 계층이 된다. */
export function buildBreadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map(({ name, path }, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
      item: `${siteConfig.url}${path}`,
    })),
  };
}
