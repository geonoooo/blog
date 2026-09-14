import type { Metadata } from "next";
import { Container } from "@/shared/ui";
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
};

export default function AboutPage() {
  return (
    <Container size="prose">
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
