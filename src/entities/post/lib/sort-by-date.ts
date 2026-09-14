import type { Post } from "../model";

export function sortByDateDesc<T extends Pick<Post, "date">>(posts: T[]): T[] {
  return [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
