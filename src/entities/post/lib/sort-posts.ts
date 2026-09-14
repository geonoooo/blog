import type { Post, PostSort } from "../model";
import { sortByDateDesc } from "./sort-by-date";

type Sortable = Pick<Post, "date" | "slug">;

/**
 * 조회수는 entities/stats가 가진 값이라 여기서 못 읽는다. 호출부가 prop으로 내려준다.
 * 조회 기록이 없는 글은 0으로 보고, 동점이면 최신순으로 갈린다.
 */
export function sortPosts<T extends Sortable>(
  posts: T[],
  sort: PostSort,
  views?: Record<string, number>,
): T[] {
  const byDate = sortByDateDesc(posts);
  if (sort !== "views") return byDate;

  return byDate.sort((a, b) => (views?.[b.slug] ?? 0) - (views?.[a.slug] ?? 0));
}
