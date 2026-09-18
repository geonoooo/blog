import type { MetadataRoute } from "next";
import { siteConfig } from "@/shared/config";

// PWA 설치 시 쓰이는 아이콘·색. 아이콘은 public/ 정적 파일이라 CSS 토큰을 못 읽으므로
// 여기서만 hex를 쓴다. 값은 globals.css의 brand 계열과 같은 버건디다.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.title,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#F4F4F2",
    theme_color: "#6B2231",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
