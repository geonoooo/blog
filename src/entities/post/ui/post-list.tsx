import type { PostListItem } from "../model";
import { PostCard } from "./post-card";

interface PostListProps {
  posts: PostListItem[];
  empty?: string;
  views?: Record<string, number>;
}

export function PostList({ posts, empty = "아직 글이 없습니다.", views }: PostListProps) {
  if (posts.length === 0) {
    return <p className="text-muted-foreground py-8 text-sm">{empty}</p>;
  }
  return (
    <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} views={views ? (views[post.slug] ?? 0) : undefined} />
      ))}
    </div>
  );
}
