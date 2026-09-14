import type { HTMLAttributes } from "react";
import { cn } from "@/shared/lib";

type ContainerSize = "prose" | "default" | "wide" | "post";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: ContainerSize;
}

const sizeClass: Record<ContainerSize, string> = {
  prose: "max-w-[640px]",
  default: "max-w-[720px]",
  wide: "max-w-[960px]",
  // 본문(800px) + 우측 목차 레일(224px). 목차는 xl 이상에서만 보인다.
  post: "max-w-[1400px]",
};

export function Container({ size = "default", className, ...rest }: ContainerProps) {
  return <div className={cn("mx-auto w-full px-5", sizeClass[size], className)} {...rest} />;
}
