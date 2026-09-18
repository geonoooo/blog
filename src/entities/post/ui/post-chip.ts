import { cn } from "@/shared/lib";

/** 카테고리 칩 스타일. 홈의 링크 칩과 /posts의 토글 칩이 같은 모양을 쓴다. */
export function postChipClass(isActive: boolean, className?: string) {
  return cn(
    "focus-visible:ring-ring focus-visible:ring-offset-background inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
    isActive
      ? "bg-brand-subtle text-brand-subtle-foreground font-medium"
      : "text-muted-foreground hover:text-foreground hover:bg-muted",
    className,
  );
}
