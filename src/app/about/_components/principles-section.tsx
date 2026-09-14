import { SectionTitle } from "./section-title";

const PRINCIPLES = [
  "문제를 UI 안에 가두지 않습니다. 네트워크, 서버, 배포 경로까지 확인해 실제 병목과 장애 원인을 좁힙니다.",
  "관심사 분리를 우선합니다. HTTP 요청, Query 로직, 훅, 컴포넌트의 책임을 나눠 변경 범위를 작게 유지합니다.",
  "FSD를 그대로 따르지 않고 프로젝트 규모에 맞게 변형 적용합니다. 엄밀한 레이어보다 의존 방향과 가독성이 우선입니다.",
  "서버 상태는 TanStack Query, UI 상태는 Zustand로 역할을 갈라 중복 관리를 피합니다.",
  "추상화와 일반화는 반복이 확인된 뒤 도입합니다. 묻지 않은 확장성을 미리 만들지 않습니다.",
] as const;

export function PrinciplesSection() {
  return (
    <section>
      <SectionTitle>Principles</SectionTitle>
      <ol className="space-y-3">
        {PRINCIPLES.map((text, idx) => (
          <li key={text} className="flex gap-3 text-sm leading-relaxed">
            <span className="text-muted-foreground/60 pt-0.5 text-xs tabular-nums">0{idx + 1}</span>
            <span className="text-foreground/85">{text}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
