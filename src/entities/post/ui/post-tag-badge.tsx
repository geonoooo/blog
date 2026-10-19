import Link from "next/link";
import { cn } from "@/shared/lib";
import { buildPostsHref } from "../lib";

interface PostTagBadgeProps {
  tag: string;
  className?: string;
}

export function PostTagBadge({ tag, className }: PostTagBadgeProps) {
  return (
    <Link
      href={buildPostsHref({ tag })}
      prefetch={false}
      className={cn(
        "text-muted-foreground hover:text-foreground focus-visible:ring-ring focus-visible:ring-offset-background rounded-sm text-xs transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
        className,
      )}
    >
      #{tag}
    </Link>
  );
}
