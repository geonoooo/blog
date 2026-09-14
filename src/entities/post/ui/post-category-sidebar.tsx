import { X } from "lucide-react";
import Link from "next/link";
import { CATEGORY_LABELS, POST_CATEGORIES } from "@/shared/config";
import { cn } from "@/shared/lib";
import { buildPostsHref, POSTS_PATH, toggleCategoryHref } from "../lib";
import type { PostQuery } from "../model";
import { postChipClass } from "./post-chip";

interface PostCategorySidebarProps {
  query: PostQuery;
  className?: string;
}

/**
 * 칩은 전부 <Link>다. 상태가 URL에 있으니 토글도 결국 다른 주소로 가는 일이고,
 * 그래서 이 컴포넌트에 클라이언트 코드가 필요 없다.
 * lg 이상에서는 왼쪽 세로 목록, 그 아래에서는 가로로 접힌다.
 */
export function PostCategorySidebar({ query, className }: PostCategorySidebarProps) {
  const hasFilter = query.categories.length > 0 || query.tag !== null;
  const itemClass = "lg:w-full lg:justify-start";

  return (
    <nav aria-label="카테고리로 글 거르기" className={cn(className)}>
      <h2 className="text-muted-foreground mb-3 hidden text-xs font-semibold tracking-wide uppercase lg:block">
        카테고리
      </h2>

      <div className="-mx-3 flex flex-wrap items-center gap-1 lg:mx-0 lg:flex-col lg:flex-nowrap lg:items-stretch">
        {POST_CATEGORIES.map((category) => {
          const isActive = query.categories.includes(category);
          return (
            <Link
              key={category}
              href={toggleCategoryHref(query, category)}
              aria-current={isActive ? "true" : undefined}
              className={postChipClass(isActive, itemClass)}
            >
              <span
                aria-hidden
                data-category={category}
                className="category-dot size-2 shrink-0 rounded-full"
              />
              {CATEGORY_LABELS[category]}
            </Link>
          );
        })}

        {query.tag && (
          <Link
            href={buildPostsHref({ ...query, tag: null, page: 1 })}
            className={postChipClass(true, cn(itemClass, "gap-1.5"))}
          >
            #{query.tag}
            <X className="size-3.5 shrink-0" aria-hidden />
            <span className="sr-only">태그 필터 해제</span>
          </Link>
        )}

        {hasFilter && (
          <Link
            href={POSTS_PATH}
            className="text-muted-foreground hover:text-foreground focus-visible:ring-ring focus-visible:ring-offset-background ml-1 rounded-full px-3 py-1.5 text-left text-sm underline underline-offset-4 transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none lg:mt-2 lg:ml-0"
          >
            재설정
          </Link>
        )}
      </div>
    </nav>
  );
}
