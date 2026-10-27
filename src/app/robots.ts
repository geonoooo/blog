import type { MetadataRoute } from "next";
import { siteConfig } from "@/shared/config";

export default function robots(): MetadataRoute.Robots {
  return {
    // 홈의 쿼리 조합은 요청마다 함수를 실행하고 canonical이 전부 "/"라 색인할 것도 없다.
    // "/*?"로 넓히면 og:image(…/opengraph-image?해시)까지 막혀 SNS 미리보기가 깨진다.
    rules: { userAgent: "*", allow: "/", disallow: "/?" },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
