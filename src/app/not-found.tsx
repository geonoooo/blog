import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/shared/config";
import { Container } from "@/shared/ui";

export const metadata: Metadata = {
  title: "404",
  // 없는 주소라 색인될 이유가 없다. 헤더/푸터는 루트 레이아웃이 이미 붙인다.
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <Container size="default" className="flex flex-col items-center py-20 text-center">
      <Image src={siteConfig.markPath} alt="" width={96} height={96} priority />
      <h1 className="text-foreground mt-8 text-2xl font-semibold tracking-tight">
        페이지를 찾을 수 없습니다
      </h1>
      <p className="text-muted-foreground mt-3 text-[15px]">
        주소가 바뀌었거나 삭제된 글일 수 있습니다.
      </p>
      <Link
        href="/"
        className="border-border text-foreground hover:border-foreground focus-visible:ring-ring focus-visible:ring-offset-background mt-8 rounded-full border px-5 py-2 text-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        글 목록으로
      </Link>
    </Container>
  );
}
