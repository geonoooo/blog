import Link from "next/link";
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
import { Container } from "@/shared/ui";

interface HomePageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const query = parsePostQuery(await searchParams);
  const posts = getPostListItems();
  const views = await getPostViews().catch(() => undefined);

  const matched = sortPosts(filterPosts(posts, query), query.sort, views);
  const visible = matched.slice(0, query.page * POSTS_PAGE_SIZE);

  return (
    <Container size="wide">
      <p className="text-muted-foreground flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[15px]">
        <span>프론트엔드 개발자 {siteConfig.author.name}</span>
        <span aria-hidden>·</span>
        <Link
          href="/about"
          className="text-brand hover:text-brand-hover focus-visible:ring-ring focus-visible:ring-offset-background rounded-sm underline underline-offset-4 transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          소개
        </Link>
        <span aria-hidden>·</span>
        <a
          href={siteConfig.social.github}
          target="_blank"
          rel="noreferrer"
          className="hover:text-foreground focus-visible:ring-ring focus-visible:ring-offset-background rounded-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          GitHub
        </a>
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
