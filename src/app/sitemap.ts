import type { MetadataRoute } from "next";
import { getAllPosts } from "@/entities/post";
import { siteConfig } from "@/shared/config";

const baseUrl = siteConfig.url;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // 목록은 루트 하나다. 카테고리·태그는 루트의 쿼리 조합이라 색인 대상으로 올리지 않는다.
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: now, priority: 1 },
    { url: `${baseUrl}/about`, lastModified: now, priority: 0.4 },
  ];

  const postRoutes: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${baseUrl}${post.permalink}`,
    lastModified: new Date(post.updated ?? post.date),
    priority: 0.7,
  }));

  return [...staticRoutes, ...postRoutes];
}
