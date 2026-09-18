import type { Metadata, Viewport } from "next";
import { geist, pretendard, sacramento, siteConfig } from "@/shared/config";
import { ThemeProvider, ThemeScript } from "@/shared/providers";
import { Footer, Header, JsonLd, PageTransition } from "@/shared/ui";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  authors: [{ name: siteConfig.author.name, url: siteConfig.url }],
  creator: siteConfig.author.name,
  publisher: siteConfig.author.name,
  // canonical은 여기 두지 않는다. 기본값을 "/"로 깔면 그걸 덮지 않은 하위 페이지가
  // 전부 홈의 중복으로 취급돼 색인에서 빠진다. 페이지마다 직접 적는다.
  alternates: {
    types: {
      "application/rss+xml": `${siteConfig.url}/rss.xml`,
    },
  },
  // max-image-preview:large가 있어야 검색결과에 큰 썸네일이 붙는다. 기본값은 작은 썸네일이다.
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    other: { "naver-site-verification": siteConfig.verification.naver },
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
};

// 모바일 브라우저 주소창 색. 브랜드 paper/ink 값이다.
// 주의: theme-color는 CSS 클래스를 못 읽으므로 OS 설정(prefers-color-scheme)만 따른다.
// 사이트 안에서 테마를 수동 토글해도 주소창 색은 안 바뀐다.
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F4F4F2" },
    { media: "(prefers-color-scheme: dark)", color: "#111111" },
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.title,
  url: siteConfig.url,
  description: siteConfig.description,
  inLanguage: "ko-KR",
  author: {
    "@type": "Person",
    name: siteConfig.author.name,
    url: siteConfig.url,
    // Person에는 Organization의 logo 대신 image를 쓴다. 검색 결과에서 쓰일 수 있다.
    image: `${siteConfig.url}${siteConfig.markPath}`,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ko"
      className={`${pretendard.variable} ${geist.variable} ${sacramento.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <ThemeScript />
        <JsonLd data={websiteJsonLd} />
        <ThemeProvider>
          <Header />
          <main className="flex-1 py-10">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
