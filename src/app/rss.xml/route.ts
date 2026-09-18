import { getAllPosts } from "@/entities/post";
import { siteConfig } from "@/shared/config";

function escapeXml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET(): Response {
  const posts = getAllPosts();
  const baseUrl = siteConfig.url;

  const items = posts
    .map((post) => {
      const url = `${baseUrl}${post.permalink}`;
      const categories = [post.category, ...post.tags]
        .map((name) => `\n  <category>${escapeXml(name)}</category>`)
        .join("");
      return `<item>
  <title>${escapeXml(post.title)}</title>
  <link>${url}</link>
  <guid isPermaLink="true">${url}</guid>
  <pubDate>${new Date(post.date).toUTCString()}</pubDate>
  <description>${escapeXml(post.summary)}</description>${categories}
</item>`;
    })
    .join("\n");

  // 피드 자신의 주소를 atom:link로 알려준다. 리더가 피드를 옮겨도 원본을 찾는 기준이 된다.
  const lastBuildDate = posts[0] ? new Date(posts[0].date).toUTCString() : new Date().toUTCString();

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteConfig.name)}</title>
    <link>${baseUrl}</link>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
    <description>${escapeXml(siteConfig.description)}</description>
    <language>ko</language>
    <!-- 피드 리더가 글 목록 옆에 띄우는 채널 이미지. 없으면 리더가 파비콘을 긁어가거나 빈칸이 된다.
         width/height는 RSS 2.0이 각각 144·400으로 상한을 둬서 선언하지 않는다 — 리더가 실제 크기를 쓴다. -->
    <image>
      <url>${baseUrl}${siteConfig.markPath}</url>
      <title>${escapeXml(siteConfig.name)}</title>
      <link>${baseUrl}</link>
    </image>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    ${items}
  </channel>
</rss>`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
