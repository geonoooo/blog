import { getAllPosts } from "@/entities/post";
import { ExperienceCard, type ExperienceEntry } from "./experience-card";
import { SectionTitle } from "./section-title";

const EXPERIENCE: readonly ExperienceEntry[] = [
  {
    company: "나무기술",
    role: "BE + FE",
    period: "2026.05 - 재직중",
    tagline: "gmrc · 국문 docx 보고서 영문 번역 도구",
    summary:
      "국문 보고서를 올리면 영문 docx로 돌려주는 사내 번역 시스템. AI 담당자와 협업하며 기획·BE·FE·배포·운영을 담당.",
    highlights: [
      "DB 기반 권한 관리와 NestJS Guard로 조회·업로드·삭제 권한 분리",
      "500MB 파일 업로드 기준 메모리 증가량을 1001MB에서 86MB로 감소",
      "commit SHA 기반 이미지 태그와 Git tag 기록으로 배포 버전 추적·롤백 구성",
    ],
    details: [
      "용어집·설비 영문본·약력 같은 공유 리소스를 DB 권한으로 관리하고, UI 노출과 서버 인가를 함께 분리. 마지막 관리자 권한 해제를 막아 관리자 0명 상태를 방지",
      "파일 전체를 메모리에 올리던 업로드 흐름을 디스크 저장 후 스트림 처리로 변경해 500MB 파일 1건 기준 메모리 증가량을 1001MB에서 86MB로 감소",
      "Access / Refresh Token과 Refresh Token Rotation을 적용하고, 동시에 만료된 요청의 refresh API 호출을 single-flight 방식으로 합침",
      "Feature 내부에서 HTTP 요청과 Query 로직을 분리하고, fetch + ReadableStream으로 SSE를 직접 처리해 다중 파일 번역 진행률을 실시간 표시",
      "Docker 이미지 태그를 commit SHA로 바꾸고 배포 시 Git tag를 기록해 현재 배포 버전과 이력을 확인 가능하게 구성. 기존 이미지를 재사용해 재빌드 없는 롤백 경로 확보",
      "패킷 캡처와 경로 추적으로 2중 NAT와 포트 전달 경로를 확인하고, 분석 근거를 인프라 담당자와 공유해 VPN 없는 외부 접속 경로 확보",
    ],
    links: [
      {
        label: "인바운드·stateful 방화벽",
        href: "/posts/inbound-outbound-and-stateful-firewall",
      },
      {
        label: "IP는 됐는데 포트가 막힐 때",
        href: "/posts/ip-allowed-but-port-blocked",
      },
      {
        label: "SSH 리버스 터널 · 502 vs 503",
        href: "/posts/ssh-reverse-tunnel-and-502-vs-503",
      },
    ],
    tech: [
      "NestJS",
      "Prisma",
      "SSE",
      "React 19",
      "TanStack Start",
      "Vite",
      "FSD",
      "Docker",
      "nginx",
      "GCP",
    ],
  },
  {
    company: "나무기술",
    role: "FE",
    period: "2025.07 - 2026.05",
    tagline: "NAA · 사내 LLM 채팅 플랫폼",
    summary:
      "LLM 응답이 실시간으로 흘러나오는 사내 채팅 플랫폼. 1인 프론트엔드 환경에서 화면 구조, 상태 관리, 배포를 담당.",
    highlights: [
      "스트리밍 중단·정리·에러 처리를 Mutation 팩토리로 통합",
      "낙관적 업데이트로 체감 지연·불필요한 리렌더링·추가 API 호출을 함께 제거",
      "1인 프론트엔드 환경에 맞게 FSD 계층을 줄이고 의존 방향 중심으로 재정의",
    ],
    details: [
      "스트리밍 API마다 중복되던 AbortController 생성·정리·에러 분기를 Mutation 팩토리(createAbortableMutation)로 통합",
      "메시지 전송을 UI에 먼저 반영하고 대화 목록 캐시를 부분 갱신 — 체감 지연과 불필요한 전체 리렌더링·추가 API 호출을 함께 제거 (낙관적 업데이트)",
      "FSD 원안의 레이어 이동 비용이 커져 API → Queries → Hooks → Components 흐름으로 단순화하고 의존 방향만 유지",
      "채팅 모드(Normal / Deep Thinking)별 로직을 전용 훅으로 분리해 모드별 변경 범위를 축소",
      "Core Web Vitals에서 LCP 병목을 확인해 route 단위 code splitting과 폰트 로딩 전략 적용",
      "에러·상태 알림을 도메인별 Toast 헬퍼로 일원화하고, 성공/에러/경고 타입별 옵션을 차등화",
    ],
    links: [
      {
        label: "AI 챗 UI 스크롤 고정",
        href: "/posts/chat-ui-scroll-to-user",
      },
    ],
    tech: ["React", "TypeScript", "TanStack Query", "Tailwind", "GCP", "Nginx", "Docker"],
  },
  {
    company: "Loud AI",
    role: "FE",
    period: "2024.09 - 2025.05",
    tagline: "LoudGen · AI 챗봇",
    summary: "생성형 챗봇 솔루션 LoudGen. 상태 관리 경계를 다시 긋고 App Router 기반 구조로 정리.",
    highlights: [
      "Page Router로 쌓인 챗봇을 App Router로 옮겨 라우팅·렌더링 구조 정리 (Next.js 15)",
      "TanStack Query와 Zustand 역할을 분리해 서버 상태 중복 관리 제거",
      "화면별로 흩어진 SCSS와 API·상태 모듈을 FSD 단위로 재배치",
      "LoudGen을 사내 재사용 가능한 패키지로 분리",
    ],
    tech: ["React", "Next.js", "SCSS", "tmux"],
  },
  {
    company: "한국 클라우드",
    role: "FE",
    period: "2024.03 - 2024.09",
    tagline: "기업 홈페이지",
    highlights: [
      "Nodemailer + SMTP 기반 도입 문의 폼 구현",
      "3개 브레이크포인트 반응형 UI 구현",
      "S3 + CloudFront 정적 배포와 캐시 무효화 구성",
    ],
    tech: ["Next.js", "Nodemailer", "SMTP", "AWS S3", "CloudFront"],
  },
  {
    company: "한국 클라우드",
    role: "FE",
    period: "2023.09 - 2024.02",
    tagline: "AI 챗봇",
    highlights: [
      "Page Router 기반 프로젝트를 Next.js 14 App Router로 마이그레이션",
      "Server Component와 Route Handler 책임 분리",
      "AbortController · ReadableStream · TextDecoderStream으로 SSE 실시간 처리",
      "docker-compose 환경 변수 분리로 운영 서버 경로·포트 충돌 해결",
    ],
    tech: ["Next.js", "Docker", "AWS S3", "CloudFront"],
  },
];

// draft 글로 향하는 링크는 프로덕션에서 404가 되므로 렌더 전에 걸러낸다.
// getAllPosts()가 dev에서는 draft도 포함하므로 로컬 미리보기는 그대로 동작한다.
function withPublishedLinks(
  entry: ExperienceEntry,
  published: ReadonlySet<string>,
): ExperienceEntry {
  if (!entry.links) return entry;
  return {
    ...entry,
    links: entry.links.filter((link) => published.has(link.href)),
  };
}

export function ExperienceSection() {
  const published = new Set(getAllPosts().map((post) => post.permalink));

  return (
    <section>
      <SectionTitle>Work Experience</SectionTitle>
      <div className="space-y-4">
        {EXPERIENCE.map((entry) => (
          <ExperienceCard
            key={`${entry.company}-${entry.period}`}
            entry={withPublishedLinks(entry, published)}
          />
        ))}
      </div>
    </section>
  );
}
