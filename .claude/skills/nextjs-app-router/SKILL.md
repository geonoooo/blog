---
name: nextjs-app-router
description: Next.js 16 + React 19 App Router 규칙. server/client 경계, 데이터 페칭, 캐싱.
---

# Next.js 16 App Router

⚠️ **이건 너가 알던 Next.js가 아닐 수 있다.** 코드 짜기 전 `node_modules/next/dist/docs/`에서 해당 API 문서를 먼저 확인할 것. deprecation 경고 무시 금지.

## Server vs Client

- **Server Component가 기본**. `"use client"`는 다음일 때만:
  - 브라우저 API (window, sessionStorage, IntersectionObserver) 필요
  - `useState`, `useEffect`, `useReducer` 등 React state hook
  - 이벤트 핸들러 (onClick 등)를 자체 갖는 인터랙션
- 인터랙션 일부만 클라이언트면 그 일부만 client로 분리. **부모를 클라로 만들지 말 것.**
- client 컴포넌트는 가능한 트리 leaf 가까이.

## 데이터 페칭

- **읽기**: Server Component에서 `entities/*/api` 함수 직접 await.
- **쓰기/외부 호출**: `app/api/*/route.ts` Route Handler 또는 Server Action.
- 클라이언트에서 fetch 트리거가 꼭 필요한 케이스(예: 브라우저 시그널 기반 visit 트래킹)만 Route Handler로.
- **예외 — 방문마다 바뀌는 값**(방문자 수 등)은 정적 페이지 HTML에 넣지 않는다. Route Handler `GET`으로 내보내고 client 컴포넌트가 마운트 후 받아온다 (예: `entities/stats/ui/visit-counter.tsx`).
  - 이유: 레이아웃·공용 UI에서 `revalidate`가 붙은 read를 await하면 그 레이아웃 아래 모든 페이지가 ISR이 된다. 값이 바뀔 때마다 재생성 결과가 달라져 Vercel ISR Write·Fast Origin Transfer가 쌓인다. 2026-10에 Hobby 한도 초과로 배포가 정지된 원인.

## Caching & Revalidation

- 자주 안 변하는 read는 `unstable_cache`로 감싸고 `tags`/`revalidate` 명시 (예: `entities/stats/api/get-visit-stats.ts`).
- 변경 발생 시 `revalidateTag` / `revalidatePath`.
- 정적 페이지는 `generateStaticParams`로 빌드 타임 생성.

## Route 규칙

- `params`는 **async** (Next.js 15+): `params: Promise<{ slug: string }>` → `const { slug } = await params`.
- `searchParams`도 마찬가지.
- 라우트 핸들러 응답: 본문 없을 땐 `new Response(null, { status: 204 })`.
- 메타데이터는 정적 export 또는 `generateMetadata`. SEO 관련 변경 시 `sitemap.ts`, `robots.ts`, `opengraph-image.tsx`도 같이 점검.

## React 19

- `use(promise)`로 Suspense-friendly 데이터 unwrap.
- `useActionState`, `useFormStatus`는 form 상호작용에.
- `forwardRef` 불필요 — `ref`는 일반 prop.
- React Compiler가 켜져있다면 (`babel-plugin-react-compiler` 있음) 수동 `useMemo`/`useCallback` 남발 금지.

## 흔한 실수

- ❌ Server Component에 `"use client"` 위쪽으로 끌어올림 → 트리 전체가 client됨.
- ❌ 레이아웃에서 짧은 `revalidate` read를 await → 하위 정적 페이지 전부 ISR. `pnpm build` 표에 `Revalidate` 열이 생기면 의도한 것인지 확인.
- ❌ Route Handler 안에서 비싼 read 후 다시 client에서 또 fetch.
- ❌ env 변수를 `NEXT_PUBLIC_` 없이 client 컴포넌트에서 참조 (undefined 됨).
- ❌ `params` await 안 하고 직접 destructure (Next.js 15+에서 깨짐).
