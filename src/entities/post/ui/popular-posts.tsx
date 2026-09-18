import { Eye } from "lucide-react";
import Link from "next/link";
import { cn } from "@/shared/lib";
import type { PostListItem } from "../model";
import { PostCoverArt } from "./post-cover-art";

interface PopularPostsProps {
  posts: PostListItem[];
  /** entities/stats에서 온 조회수. 없으면 섹션 자체를 그리지 않는다. */
  views?: Record<string, number>;
  className?: string;
}

const TOP_COUNT = 3;

export function PopularPosts({ posts, views, className }: PopularPostsProps) {
  if (!views) return null;

  const top = posts
    .map((post) => ({ post, count: views[post.slug] ?? 0 }))
    .filter(({ count }) => count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, TOP_COUNT);

  // 조회 기록이 아직 없으면 0짜리 순위를 보여주느니 통째로 숨긴다.
  if (top.length === 0) return null;

  return (
    <section className={cn(className)} aria-labelledby="popular-posts-heading">
      <h2
        id="popular-posts-heading"
        className="text-muted-foreground text-xs font-semibold tracking-wide uppercase"
      >
        인기 글
      </h2>

      <ol className="mt-4 grid gap-x-6 gap-y-8 sm:grid-cols-3">
        {top.map(({ post, count }, index) => (
          <li key={post.slug}>
            <article className="surface-card group border-border relative flex h-full flex-col rounded-xl border">
              <div className="relative aspect-video overflow-hidden rounded-t-xl">
                <PostCoverArt
                  category={post.category}
                  cover={post.cover}
                  className="h-full w-full transition-transform duration-300 group-hover:scale-[1.04]"
                />
                <span
                  className="bg-surface/85 text-foreground absolute top-2 left-2 flex size-6 items-center justify-center rounded-full text-xs font-bold tabular-nums backdrop-blur"
                  aria-hidden
                >
                  {index + 1}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-4">
                <Link
                  href={post.permalink}
                  className="focus-visible:ring-ring focus-visible:ring-offset-surface rounded-sm focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none"
                >
                  <span className="absolute inset-0" aria-hidden />
                  <h3 className="group-hover:text-brand line-clamp-2 text-[15px] leading-snug font-bold tracking-tight transition-colors">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-muted-foreground mt-2 flex items-center gap-1 text-xs tabular-nums">
                  <Eye className="size-3" aria-hidden />
                  {count.toLocaleString()}
                </p>
              </div>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}
