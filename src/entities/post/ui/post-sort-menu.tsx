"use client";

import { Check, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/shared/lib";
import { buildPostsHref } from "../lib";
import { POST_SORT_OPTIONS, type PostQuery } from "../model";

interface PostSortMenuProps {
  query: PostQuery;
}

/**
 * 네이티브 popover는 top layer로 올라가서 트리거 옆에 붙이려면 CSS anchor positioning이
 * 필요한데, 아직 크로스 브라우저가 아니다. 그래서 일반 absolute 패널을 쓴다.
 * 바깥 클릭과 tab 이탈은 컨테이너 onBlur 하나로 같이 처리한다.
 */
export function PostSortMenu({ query }: PostSortMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const current =
    POST_SORT_OPTIONS.find((option) => option.value === query.sort) ?? POST_SORT_OPTIONS[0];

  return (
    <div
      className="relative"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") setIsOpen(false);
      }}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className="border-border text-muted-foreground hover:text-foreground hover:border-muted-foreground/40 focus-visible:ring-ring focus-visible:ring-offset-background inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        정렬 기준: <span className="text-foreground">{current.label}</span>
        <ChevronDown
          className={cn("size-3.5 transition-transform", isOpen && "rotate-180")}
          aria-hidden
        />
      </button>

      {isOpen && (
        <div className="surface-pop border-border absolute top-full right-0 z-20 mt-2 w-44 rounded-xl border p-1">
          {POST_SORT_OPTIONS.map((option) => {
            const isActive = option.value === query.sort;
            return (
              <Link
                key={option.value}
                href={buildPostsHref({ ...query, sort: option.value, page: 1 })}
                onClick={() => setIsOpen(false)}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "focus-visible:ring-ring focus-visible:ring-offset-background flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
                  isActive
                    ? "text-brand font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted",
                )}
              >
                {option.label}
                {isActive && <Check className="size-3.5" aria-hidden />}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
