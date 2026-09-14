import type { PostListItem } from "../model";
import { getAllPosts } from "./get-all-posts";

/**
 * 목록용 글. 넘길 필드를 하나씩 적는다 — 목록은 클라이언트 컨트롤과 같은 트리에 있어서
 * 여기 적은 것이 그대로 RSC 페이로드 크기가 된다. 반환 타입이 빠진 필드를 잡아준다.
 * 정렬은 getAllPosts()가 해둔 최신순 그대로다.
 */
export function getPostListItems(): PostListItem[] {
  return getAllPosts().map((post) => ({
    title: post.title,
    summary: post.summary,
    date: post.date,
    updated: post.updated,
    category: post.category,
    tags: post.tags,
    cover: post.cover,
    draft: post.draft,
    slug: post.slug,
    permalink: post.permalink,
    metadata: post.metadata,
  }));
}
