---
name: clean-code
description: 단일책임원칙, 함수형 우선, 명명 규칙. 추상화는 필요할 때만.
---

# Clean Code — 이 프로젝트의 코드 철학

## 단일책임원칙 (SRP)

- 함수/컴포넌트/모듈은 **한 가지 이유로만 변경**되어야 한다.
- "그리고", "또한"이 이름에 들어가면 쪼개라.
- 컴포넌트가 데이터 페칭 + 상태 관리 + 렌더링 + 이벤트 핸들링을 다 하면: 페칭은 Server Component / api 세그먼트로, 상태는 hook으로, 렌더링만 컴포넌트에 남긴다.

## 함수형 우선, class는 필요할 때만

**기본은 순수 함수 + 불변 데이터.** 다음 경우에만 class 사용을 검토:

1. **리소스/lifecycle 관리**가 필요할 때 (DB 클라이언트 캐시, WebSocket 매니저 등). 단, 싱글톤 함수 + 모듈 클로저로 충분하면 그쪽이 우선.
2. **불변 식(invariant)을 가진 도메인 객체**. 생성 시 검증하고 외부에서 깨질 수 없게 캡슐화해야 할 때.
3. **외부 라이브러리가 class를 강제**할 때 (예: 일부 어댑터 패턴).

class 쓸 때 규칙:

- 상속보다 컴포지션. `extends`는 정말 IS-A 관계일 때만.
- 가능한 readonly 필드 + 변경은 새 인스턴스 반환.
- private 필드는 `#field` 또는 `private` 키워드로 진짜 감춰라.

순수 함수가 더 나은 신호: stateless, 같은 입력 → 같은 출력, side-effect 없음.

## 명명 규칙

- **파일**: kebab-case (`post-card.tsx`, `get-all-posts.ts`).
- **컴포넌트**: PascalCase, 명사 (`PostCard`, `VisitCounter`).
- **함수**: camelCase, 동사로 시작 (`getPostBySlug`, `incrementVisit`, `formatDate`).
- **boolean**: `is/has/can/should` 접두 (`isPublished`, `hasMore`).
- **타입**: PascalCase, 명사 (`Post`, `VisitStats`). 접미사 `Type`, `Interface` 금지.
- **상수**: `SCREAMING_SNAKE_CASE` (모듈 스코프 진짜 상수에만).

이름이 잘 안 떠오르면 책임이 모호하다는 신호. 먼저 책임을 명확히.

## 주석

기본은 **주석 없음**. 코드와 이름이 WHAT을 설명한다.

주석은 **WHY**가 비자명할 때만:

- 우회/워크어라운드의 이유
- 외부 시스템 제약
- 미묘한 invariant
- 직관에 반하는 결정

❌ `// 게시물을 가져온다` (코드가 말함)
✅ `// best-effort: 카운터 실패해도 사용자 응답엔 영향 없음`

태스크/PR 흔적 (`// added for #123`, `// fix from review`)은 절대 남기지 말 것 — git이 기억함.

## 추상화 시점

- **3번 반복**될 때까지 추상화하지 말 것 (rule of three).
- 미래 가정으로 abstract class, generic factory, hook-of-hooks 만들지 말 것.
- 비슷해 보여도 **변경 이유가 다르면** 추상화하지 말 것 — 우연한 중복은 내버려둬라.

## 크기 가이드 (절대치 아님, 신호용)

- 함수 ~50줄, 파일 ~200줄, 컴포넌트 props ~7개. 넘기면 멈추고 SRP 점검.
- React 컴포넌트가 길면 보통: hook 분리 / 하위 컴포넌트 분리 / 데이터 형성 함수 분리로 줄어든다.

## 에러 처리

- 경계(외부 입력, fetch, DB)에서만 검증.
- 내부 함수는 타입을 신뢰. 같은 invariant를 두 번 체크하지 말 것.
- catch-all `try/catch`는 best-effort UX(애널리틱스, 카운터 등)에서만. 본 흐름 에러는 위로 던져 라우트 단에서 처리.
