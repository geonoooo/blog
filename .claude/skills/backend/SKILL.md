---
name: backend
description: Supabase + Route Handler 백엔드 규칙. 보안 경계, 원자성, 캐싱, 마이그레이션.
---

# Backend — Supabase + Next.js Route Handler

## 데이터 흐름

```
[Client]
   │  (mutation: fetch POST /api/...)
   ▼
[Route Handler]  app/api/<x>/route.ts
   │  비즈니스 가드(봇 필터, env 가드 등) + UA 검증
   ▼
[Domain API]     entities/<x>/api/<verb>-<noun>.ts   ← "server-only"
   │  Supabase 호출/RPC 호출
   ▼
[Supabase / Postgres RPC]
```

읽기는 클라이언트 거치지 않고 **Server Component → Domain API → Supabase** 직결.

## 보안 경계

- service-role 키를 다루는 모든 파일은 **첫 줄에 `import "server-only";`**. 실수로 client 번들에 들어가면 빌드 실패.
- Supabase 클라이언트 생성은 `shared/lib/supabase.ts`의 `getSupabaseAdmin()`로 일원화. 모듈 레벨 캐시(싱글톤)로 재사용.
- 환경변수 누락은 **첫 호출 시 throw** (lazy validation). 모듈 로드 시점 throw는 빌드 깨뜨림 — 피할 것.
- RLS(Row Level Security) 항상 활성화. RPC 권한은 `service_role`로만 grant, public/anon/authenticated에서 revoke.

```sql
alter table public.<t> enable row level security;
revoke execute on function public.<fn>() from public, anon, authenticated;
grant  execute on function public.<fn>() to service_role;
```

## 원자성 — Postgres RPC 우선

쓰기/증가/UPSERT 등 race condition 위험이 있는 연산은 **Postgres 함수**로 작성하고 `supabase.rpc()`로 호출. 클라이언트 측 read-modify-write 금지.

`increment_visit()` 패턴 참고 (`supabase/migrations/0001_visit_counters.sql`):

- `insert ... on conflict ... do update` 한 트랜잭션
- 호출자가 다시 read 안 해도 되도록 결과를 `returns table(...)`로 반환

## Domain API 세그먼트 작성 규칙

`entities/<x>/api/<verb>-<noun>.ts` 파일 하나당 함수 하나 (SRP).

```ts
import "server-only";
import { getSupabaseAdmin } from "@/shared/lib/supabase";
import type { VisitStats } from "../model";

export async function getVisitStats(): Promise<VisitStats> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.rpc("get_visit_stats");
  if (error) throw error;
  // 정규화(row → 도메인 타입)는 여기서. 호출자는 이미 도메인 타입을 받는다.
  return { today: Number(data?.[0]?.today_count ?? 0), total: Number(data?.[0]?.total_count ?? 0) };
}
```

- 인자는 좁게, 반환은 도메인 타입 (raw row 노출 금지).
- 에러는 그대로 throw — 라우트 핸들러 또는 호출 측에서 처리/무시 결정.

## 캐싱

자주 안 변하는 read는 `unstable_cache`로 래핑:

```ts
export const getVisitStats = unstable_cache(fetchVisitStats, ["visit-stats"], {
  revalidate: 60,
  tags: ["visit-stats"],
});
```

쓰기 후 무효화는 `revalidateTag("visit-stats")`.

## Route Handler 패턴

- 비-mutating GET을 만들지 말 것. 읽기는 Server Component에서.
- POST 등 mutation은 가드 먼저, 핵심 로직 호출, 비공개 응답:
  - 봇/노이즈 차단 (UA 검사 등)
  - dev 모드 단락 (`process.env.NODE_ENV !== "production"` 시 204)
  - try/catch로 best-effort UX 보호 — 카운터 실패가 사용자 흐름을 깨면 안 됨
  - 본문 없으면 `204 No Content`

## 마이그레이션

- SQL은 `supabase/migrations/<NNNN>_<name>.sql`에 추가. 번호 순.
- 적용은 Supabase Dashboard SQL Editor에서 수동 (또는 supabase CLI). 파일 상단에 적용 방법 명시.
- 함수는 항상 `set search_path = public`로 안전 장치. `security definer`는 신중히.
- 기존 함수 변경은 `create or replace function`. 시그니처 바뀌면 drop 먼저.

## 안티 패턴

- ❌ anon 키로 client에서 직접 Supabase 호출 (블로그 규모엔 RLS 설계 비용 > 이득).
- ❌ Route Handler에서 카운트 read-modify-write (race).
- ❌ Domain API 함수 하나에 read + write 혼재.
- ❌ 에러 메시지 그대로 client에 노출 (스키마 정보 누수).
- ❌ `unstable_cache` 안에서 request 헤더 참조 (캐시 키에 안 들어감).
