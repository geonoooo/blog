import { siteConfig } from "@/shared/config";
import { cn } from "@/shared/lib";

type LogoProps = {
  className?: string;
};

/* 워드마크는 이미지가 아니라 텍스트다 — 선택·검색·스크린리더가 다 된다.
   leading-none이 필수다. Sacramento는 기본 행간이 커서 안 누르면 헤더에 빈 공간이 생긴다.
   색은 currentColor라 감싸는 링크의 hover를 그대로 따라간다. */
export function Logo({ className }: LogoProps) {
  return (
    <span className={cn("font-script text-[34px] leading-none", className)}>{siteConfig.name}</span>
  );
}
