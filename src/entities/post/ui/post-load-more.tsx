import Link from "next/link";
import { buildPostsHref } from "../lib";
import { POSTS_PAGE_SIZE, type PostQuery } from "../model";

interface PostLoadMoreProps {
  query: PostQuery;
  /** 지금 화면에 그려진 글 수. */
  shown: number;
  /** 필터를 통과한 전체 글 수. */
  total: number;
}

export function PostLoadMore({ query, shown, total }: PostLoadMoreProps) {
  if (total <= POSTS_PAGE_SIZE) return null;

  return (
    <div className="mt-12 flex flex-col items-center gap-3">
      {shown < total && (
        <Link
          href={buildPostsHref({ ...query, page: query.page + 1 })}
          prefetch={false}
          scroll={false}
          className="border-border text-foreground hover:bg-muted hover:border-muted-foreground/40 focus-visible:ring-ring focus-visible:ring-offset-background rounded-full border px-5 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          더 보기
        </Link>
      )}
      <p className="text-muted-foreground text-sm tabular-nums">
        {shown} / {total}
      </p>
    </div>
  );
}
