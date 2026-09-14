import type { Metadata } from "next";
import { siteConfig } from "@/shared/config";
import { buildBreadcrumbJsonLd } from "@/shared/lib";
import { Container, JsonLd } from "@/shared/ui";
import {
  BootcampSection,
  EducationSection,
  ExperienceSection,
  Intro,
  PrinciplesSection,
  ProfileHeader,
  SkillsSection,
} from "./_components";

export const metadata: Metadata = {
  title: "About",
  description:
    "실시간 AI 서비스와 사내 번역 시스템을 만들며 스트리밍, 파일 업로드, 인증·권한, 배포 문제를 해결해 온 프론트엔드 개발자.",
  alternates: { canonical: "/about" },
};

const profileJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: `${siteConfig.url}/about`,
  inLanguage: "ko-KR",
  mainEntity: {
    "@type": "Person",
    name: siteConfig.author.name,
    url: `${siteConfig.url}/about`,
    jobTitle: "프론트엔드 개발자",
    email: `mailto:${siteConfig.author.email}`,
    sameAs: [siteConfig.social.github],
    knowsAbout: ["React", "Next.js", "TypeScript", "NestJS", "Docker"],
  },
};

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "홈", path: "/" },
  { name: "About", path: "/about" },
]);

export default function AboutPage() {
  return (
    <Container size="prose">
      <JsonLd data={profileJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <ProfileHeader />
      <div className="space-y-14 pb-20">
        <Intro />
        <SkillsSection />
        <PrinciplesSection />
        <ExperienceSection />
        <BootcampSection />
        <EducationSection />
      </div>
    </Container>
  );
}
