import Link from "next/link";
import { CATEGORY_LABELS, type PostCategory } from "@/shared/config";
import { cn } from "@/shared/lib";
import { buildPostsHref } from "../lib";

interface PostCategoryBadgeProps {
  category: PostCategory;
  asLink?: boolean;
  className?: string;
}

// 색은 globals.css에서 data-category -> --cat -> .category-badge로 흐른다.
export function PostCategoryBadge({ category, asLink = false, className }: PostCategoryBadgeProps) {
  const classes = cn(
    "category-badge inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
    asLink &&
      "focus-visible:ring-ring focus-visible:ring-offset-background transition-opacity hover:opacity-75 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
    className,
  );
  const label = CATEGORY_LABELS[category];

  if (asLink) {
    return (
      <Link
        href={buildPostsHref({ categories: [category] })}
        data-category={category}
        className={classes}
      >
        {label}
      </Link>
    );
  }
  return (
    <span data-category={category} className={classes}>
      {label}
    </span>
  );
}
