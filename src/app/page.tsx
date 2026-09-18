import type { Metadata } from "next";
import {
  filterPosts,
  getPostListItems,
  parsePostQuery,
  PopularPosts,
  PostCategorySidebar,
  PostList,
  PostLoadMore,
  POSTS_PAGE_SIZE,
  PostSortMenu,
  sortPosts,
} from "@/entities/post";
import { getPostViews } from "@/entities/stats";
import { siteConfig } from "@/shared/config";
import { Container, JsonLd } from "@/shared/ui";

// 카테고리·태그·정렬은 전부 루트의 쿼리 조합이다. 어느 조합으로 들어와도 루트로 모은다.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

interface HomePageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const query = parsePostQuery(await searchParams);
  const posts = getPostListItems();
  const views = await getPostViews().catch(() => undefined);

  const matched = sortPosts(filterPosts(posts, query), query.sort, views);
  const visible = matched.slice(0, query.page * POSTS_PAGE_SIZE);

  // 필터·정렬과 무관하게 전체 글을 싣는다. 쿼리가 붙은 주소도 canonical이 루트라
  // 크롤러가 보는 건 결국 이 목록 하나다.
  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: siteConfig.title,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "ko-KR",
    author: {
      "@type": "Person",
      name: siteConfig.author.name,
      url: siteConfig.url,
    },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.summary,
      datePublished: post.date,
      dateModified: post.updated ?? post.date,
      url: `${siteConfig.url}${post.permalink}`,
    })),
  };

  return (
    <Container size="wide">
      <JsonLd data={blogJsonLd} />
      {/* 소개·GitHub 링크는 헤더와 푸터에 이미 있다. 여기서 반복하지 않는다. */}
      <h1 className="text-[28px] font-bold tracking-tight text-balance sm:text-[32px]">
        직접 밟은 문제를 측정하고 정리합니다
      </h1>
      <p className="text-muted-foreground mt-3 max-w-[52ch] text-lg">
        React, Next.js, Vite부터 네트워크·DB까지 개발하면서 겪은 내용을 씁니다.
      </p>

      {/* 인기 글은 필터·정렬과 무관하게 전체 기준으로 고정한다. */}
      <PopularPosts posts={posts} views={views} className="border-border mt-8 border-b pb-10" />

      <div className="mt-10 lg:grid lg:grid-cols-[168px_1fr] lg:gap-10">
        <PostCategorySidebar
          query={query}
          className="border-border mb-8 border-b pb-5 lg:mb-0 lg:border-0 lg:pb-0"
        />

        <div className="min-w-0">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
            <p className="text-muted-foreground text-sm tabular-nums">글 {matched.length}개</p>
            <PostSortMenu query={query} />
          </div>

          <PostList posts={visible} views={views} empty="조건에 맞는 글이 없습니다." />

          <PostLoadMore query={query} shown={visible.length} total={matched.length} />
        </div>
      </div>
    </Container>
  );
}
