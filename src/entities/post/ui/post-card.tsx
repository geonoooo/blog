import { Eye } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/shared/lib";
import type { PostListItem } from "../model";
import { PostCategoryBadge } from "./post-category-badge";
import { PostCoverArt } from "./post-cover-art";

interface PostCardProps {
  post: PostListItem;
  views?: number;
}

export function PostCard({ post, views }: PostCardProps) {
  return (
    <article className="group border-border hover:border-muted-foreground/40 relative flex h-full flex-col overflow-hidden rounded-xl border transition-colors">
      <div className="aspect-video overflow-hidden">
        <PostCoverArt
          category={post.category}
          cover={post.cover}
          className="h-full w-full transition-transform duration-300 group-hover:scale-[1.04]"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        {/* 카드 전체가 클릭 영역이다. 배지 링크는 z-10으로 위에 둔다. */}
        <PostCategoryBadge category={post.category} asLink className="relative z-10 self-start" />

        <Link
          href={post.permalink}
          className="focus-visible:ring-ring focus-visible:ring-offset-background rounded-sm focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none"
        >
          <span className="absolute inset-0" aria-hidden />
          <h2 className="group-hover:text-brand mt-3 text-xl leading-snug font-bold tracking-tight transition-colors">
            {post.title}
          </h2>
        </Link>

        <p className="text-muted-foreground mt-2.5 line-clamp-2 text-[15px] leading-relaxed">
          {post.summary}
        </p>

        <div className="text-muted-foreground mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 pt-1 text-sm">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          {views !== undefined && (
            <span className="flex items-center gap-1 tabular-nums">
              <Eye className="size-3.5" aria-hidden />
              {views.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
