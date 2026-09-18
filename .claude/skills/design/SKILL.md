---
name: design
description: 블로그 디자인 시스템. 색 토큰, 타이포 스케일, 레이아웃, 썸네일 넣는 법.
---

# Design System

UI를 만들거나 고치기 전에 이 문서를 확인한다. 여기 없는 값을 쓰고 싶으면 먼저 사용자에게 확인.

읽는 부분의 레퍼런스는 [컬리 기술 블로그](https://helloworld.kurly.com)다. 본문 18px / 행간 32px / 폭 800px / 푸른 기 있는 회색 — 이 네 가지가 기준선이다.

면(surface)을 쌓는 방식은 Linear 쪽을 따른다. 배경보다 밝은 면 + 상단 1px 하이라이트 + 넓고 옅은 그림자. 전부 CSS라 JS 비용이 없다.

## 1. 색

### 규칙

- **inline hex/rgb/oklch 금지.** Tailwind 팔레트 클래스(`text-amber-400`, `text-blue-600`, `bg-gray-*`)도 **금지**.
- 모든 색은 [globals.css](../../../src/app/globals.css)의 `@theme` 토큰 → `bg-*` / `text-*` / `border-*`로만 쓴다.
- 새 색이 필요하면 토큰을 먼저 추가하고, 라이트/다크 두 값을 다 정한다.
- 예외는 두 곳뿐:
  - `next/og` 생성 이미지. satori는 CSS 변수를 못 읽는다. [post-cover.tsx](../../../src/entities/post/lib/post-cover.tsx)와 [opengraph-image.tsx](../../../src/app/opengraph-image.tsx) 안에서만.
  - 파비콘 [icon.svg](../../../src/app/icon.svg). 탭 배경이 라이트/다크 어느 쪽인지 모르므로 양쪽에서 보이는 밝은 앰버(`#fbbf24`)를 쓴다.

### 중립색은 무채색이 아니다

`chroma 0`(순수 회색)은 "기본값" 인상을 준다. 모든 중립 토큰에 **미세한 푸른 기(hue ~260, chroma 0.003~0.034)** 를 넣는다. 다크 배경도 순검이 아니라 아주 옅은 남색이다.

**라이트 배경은 순백이 아니다.** `oklch(0.976 0.004 264)`. 순백 배경 위에서는 흰 카드가 아무리 그림자를 얹어도 떠 보이지 않는다. 배경을 한 단 내려야 카드가 면으로 읽힌다.

| 토큰                           | 용도                                 | 라이트 대비 |
| ------------------------------ | ------------------------------------ | ----------- |
| `background`                   | 페이지 바탕 (순백 아님)              | —           |
| `surface`                      | **배경 위의 면.** 카드·헤더·드롭다운 | —           |
| `foreground`                   | **제목·UI 텍스트**                   | 16.6:1      |
| `body`                         | **본문 텍스트.** 제목보다 흐리게     | 9.6:1       |
| `muted-foreground`             | 메타·요약·캡션                       | 4.8:1       |
| `muted`                        | 옅은 면 (인라인 코드, hover 배경)    | —           |
| `border`                       | 모든 경계선                          | —           |
| `highlight`                    | 카드 상단 1px. 라이트에서는 투명     | —           |
| `accent` / `accent-foreground` | 반전 강조 (`::selection`)            | —           |
| `brand`                        | 강조색 (아래 목록에만)               | 4.7:1       |
| `brand-subtle`                 | brand의 옅은 배경 (활성 pill)        | —           |
| `brand-subtle-foreground`      | 활성 pill의 텍스트                   | 5.8:1       |
| `ring`                         | focus-visible 링 (= brand)           | —           |

`brand`를 `brand-subtle` 위에 얹으면 4.49:1로 AA에 못 미친다. 활성 pill 텍스트는 반드시 `brand-subtle-foreground`를 쓴다.

**제목과 본문은 같은 색이 아니다.** 본문을 `foreground`로 두면 위계가 안 생긴다. 본문은 `text-body`, 제목은 `text-foreground`.

### brand를 쓰는 곳 (이 목록이 전부)

1. 로고 마크
2. 본문(prose) 링크
3. `focus-visible` 링
4. 활성 상태 (현재 nav 항목, 선택된 카테고리 pill)

한 화면에 brand가 3개 이상 보이면 과하다. 카드 테두리·아이콘·구분선에 brand를 칠하지 않는다.

### 카테고리 색

`--color-cat-*` 5개. **점과 배지 텍스트에 같은 값을 쓰므로 텍스트 기준(4.5:1)** 을 맞춘다.

| 카테고리   | hue      |                                                       |
| ---------- | -------- | ----------------------------------------------------- |
| Backend    | 150 녹색 |                                                       |
| React      | 195 틸   | sRGB 경계라 라이트 채도 0.085로 제한. 올리면 clip된다 |
| TypeScript | 253 파랑 |                                                       |
| Deep Dive  | 304 보라 |                                                       |
| Tooling    | 350 핑크 | 앰버였으나 brand와 헷갈려 옮김                        |

brand(hue 60) 주변의 따뜻한 영역은 비워둔다.

**Tailwind 클래스를 5색×2속성으로 늘리지 않는다.** `data-category`로 `--cat` 변수 하나만 갈아끼운다:

```tsx
<span data-category={category} className="category-badge">   // 틴트 배경 + 색 텍스트
<span data-category={category} className="category-dot" />   // 색 점
```

### 대비

텍스트는 WCAG AA(4.5:1) 이상, 라이트/다크 양쪽. 값을 바꾸면 대비를 다시 계산한다.

## 2. 타이포

폰트는 `--font-sans` 하나. Geist(라틴) → Pretendard(한글). `font-serif`는 쓰지 않는다.

### 한국어 줄바꿈

`body`에 `word-break: keep-all`이 걸려 있다. **빼지 말 것** — 기본값은 "메시지를"을 줄 사이에서 자른다. 긴 영문·URL은 `overflow-wrap: break-word`가 받는다.

큰 제목에만 `text-balance`. 카드 제목처럼 2줄짜리에는 쓰지 않는다 — `keep-all`과 겹쳐 어색하게 끊긴다.

### 스케일

| 역할           | 클래스                                                               |
| -------------- | -------------------------------------------------------------------- |
| 글 제목 (h1)   | `text-[32px] sm:text-[40px] font-bold tracking-tight leading-[1.25]` |
| 카드 제목      | `text-xl font-bold tracking-tight leading-snug`                      |
| 글 요약 (상세) | `text-lg text-muted-foreground`                                      |
| 카드 요약      | `text-[15px] text-muted-foreground line-clamp-2`                     |
| 메타           | `text-sm text-muted-foreground`                                      |

### 본문(prose)

**`prose prose-lg`** 를 쓴다. 본문 18px / 행간 32px / h2 30px / h2 위 여백 56px — 레퍼런스와 같은 값이 플러그인 기본으로 나온다.

색은 [globals.css](../../../src/app/globals.css)의 `.prose`에서 `--tw-prose-*`를 토큰에 연결해뒀다. 토큰이 다크에서 뒤집히므로 `prose-neutral`·`dark:prose-invert`는 **필요 없다.**

`@tailwindcss/typography`가 인라인 코드에 붙이는 백틱(`::before`/`::after`)은 제거해뒀다. 배경·테두리로 이미 코드임이 드러난다.

## 3. 레이아웃

`Container`의 네 사이즈만 쓴다. 임의의 `max-w-*`를 페이지에 직접 쓰지 않는다.

| size      | 폭     | 용도                                       |
| --------- | ------ | ------------------------------------------ |
| `prose`   | 640px  | About                                      |
| `default` | 720px  | 일반 페이지                                |
| `wide`    | 960px  | 목록, 헤더/푸터                            |
| `post`    | 1400px | 포스트 상세 (본문 800px + 우측 목차 224px) |

- 포스트 상세는 `[1fr, minmax(0,800px), 1fr]` 그리드. **본문은 화면 정중앙**, 목차는 우측 여백에 놓인다. 목차는 `xl`(1280px) 이상에서만.
- 글 목록은 **2열 카드 그리드**다. `grid gap-x-6 gap-y-10 sm:grid-cols-2`, 카드는 `rounded-xl border border-border` 박스. 목록을 잘라 보여줄 때는 짝수로 끊는다 — 홀수면 마지막 줄에 카드 하나만 남는다.
- **목록은 루트(`/`) 하나다.** `/posts`·`/categories/*`·`/tags/*`는 [next.config.ts](../../../next.config.ts)에서 루트로 308 리다이렉트된다. 목록 페이지를 따로 만들지 말 것. 글 상세 `/posts/:slug`는 그대로다.
- 루트는 `lg:grid-cols-[168px_1fr]`로 **왼쪽 카테고리 사이드바 + 오른쪽 목록**. `lg` 미만에서는 사이드바가 가로 칩 줄로 접힌다. 순서는 한 줄 설명 → 인기 글 3개 → 사이드바+그리드 → 더 보기.
- 모바일에서 헤더 nav를 숨기지 않는다. 항목이 2개라 다 들어간다.
- **홈 본문은 한 줄 설명으로 시작한다** (`text-[15px] text-muted-foreground`). 소개·GitHub 링크는 헤더와 푸터에만 두고 여기서 반복하지 않는다. meta description은 검색 스니펫용이라 더 길다 — 두 문자열은 일부러 다르다. 홈에 `h1`은 없다.
- `line-clamp-*`는 `display: -webkit-box`를 쓴다. 같은 요소에 `block`을 주면 덮여서 안 먹는다.

## 4. 커버와 썸네일

두 가지는 다른 물건이다. **커버**는 목록 카드 상단의 SVG 모티프, **썸네일**은 글 상세에 넣는 실사 이미지다.

### 커버 (목록 카드)

목록 카드는 [post-cover-art.tsx](../../../src/entities/post/ui/post-cover-art.tsx)가 그리는 `aspect-video` SVG를 쓴다. 이미지 파일이 없다.

frontmatter에 모티프 키를 하나 적는다. 없으면 카테고리 기본값으로 떨어지므로 안 적어도 안 깨진다:

```yaml
cover: "tunnel"
```

모티프를 추가할 때:

- 목록은 `velite.config.ts`의 `POST_COVERS`와 [post-query.ts](../../../src/entities/post/model/post-query.ts)의 `POST_COVERS` **양쪽에** 넣는다. velite 설정은 `@/` alias를 못 읽어서 중복이 불가피하다.
- **기하 도형만, 8개 이하, 획 위주.** 아이콘 모음이 아니라 한 벌의 시각 언어로 보여야 한다.
- 색은 직접 쓰지 않는다. `data-category` → `--cat` → `.category-cover`가 `color`를 정해주므로 도형은 전부 `currentColor`만 쓴다. 그래서 다크 대응에 손댈 게 없다.
- 깊이는 `opacity`로만 준다 (0.3 ~ 0.75).
- viewBox는 `0 0 160 90`. 여백 18 이상 남긴다.

### 썸네일 (글 상세)

**이미지는 정보일 때만.** 자동 생성 그래픽·스톡 사진은 쓰지 않는다. 실제 스크린샷·다이어그램만.

1. 이미지를 mdx 옆(`content/posts/`)에 둔다.
2. frontmatter에 **상대경로**로 적는다:
   ```yaml
   thumbnail: "./bundle-optimization.png"
   ```
3. `pnpm content`가 `public/static/`으로 해시 붙여 복사하고 blur placeholder까지 만든다.

- **글 상세 헤더 아래 전체 폭에만** 나온다. 목록 카드는 `thumbnail`을 쓰지 않는다 — 목록에 넘기는 `PostListItem`에서 아예 빠진다 (blurDataURL이 base64라 페이로드가 커진다).
- 없으면 상세에 이미지가 없을 뿐, 목록은 영향받지 않는다.

### OG 이미지

소셜 공유용은 [post-cover.tsx](../../../src/entities/post/lib/post-cover.tsx)가 제목·요약·날짜를 넣어 자동 생성한다. 손대지 않는다. 이미지가 필수인 곳은 여기뿐이다.

## 5. 컴포넌트

- 자체 [shared/ui](../../../src/shared/ui)만. 외부 UI 라이브러리 금지.
- 클래스 합성은 `cn()` 하나. variant가 3개 이상이면 `cva`.
- 아이콘은 `lucide-react`만. `size-3.5`(메타), `size-4`(본문), `size-5`(로고).
- 모서리: 작은 요소 `rounded-md`, 카드·이미지·코드 `rounded-xl`, pill `rounded-full`.

### 면과 깊이

깊이는 배경보다 밝은 면으로 만든다. 그림자는 그 면을 거들 뿐이다. 다크에서 그림자는 거의 안 읽히므로, 다크의 깊이는 전적으로 `surface` 밝기와 상단 1px 하이라이트가 만든다.

[globals.css](../../../src/app/globals.css)에 클래스 세 개가 있다. 직접 `shadow-*`를 쓰지 않는다.

| 클래스          | 용도                                        |
| --------------- | ------------------------------------------- |
| `surface-panel` | 누를 수 없는 면 (About 카드)                |
| `surface-card`  | panel + hover 시 3px 상승 (목록 카드)       |
| `surface-pop`   | 떠 있는 면 (드롭다운). 그림자가 가장 강하다 |

그림자 스케일은 `--shadow-card` / `--shadow-card-hover` / `--shadow-pop` 3단. `@theme`이 아니라 `:root`에 둔다 — Tailwind의 `shadow-*` 유틸리티는 값을 인라인해서 `.dark` 오버라이드가 먹지 않을 수 있다.

**`surface-card`에는 `overflow: hidden`을 걸지 않는다.** hover 그림자를 그리는 `::after`가 잘린다. 안쪽 이미지는 자기 래퍼에서 `rounded-t-xl overflow-hidden`으로 각자 자른다.

hover 그림자는 `box-shadow`를 transition하지 않는다. 매 프레임 paint가 돈다. 미리 깔아두고 `opacity`만 바꾼다. 애니메이션하는 속성은 `transform`과 `opacity`뿐이다.

## 6. 인터랙션

- `hover` / `focus-visible` / `disabled` 를 전부 시각화한다.
- 포커스 링은 `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none`.
  `--color-ring` 토큰이 없으면 `ring-ring`은 **아무것도 안 그린다.** 토큰 존재를 확인할 것.
- 클릭 가능한 것은 `<button>` / `<a>`. `div + onClick` 금지.
- 카드 전체를 클릭 영역으로 쓸 때는 `<span className="absolute inset-0">` 오버레이. 안쪽 링크(배지)에 `relative z-10`을 줘야 눌린다.

## 7. 코드 블록

`rehype-pretty-code` + `github-dark`. **라이트/다크 상관없이 항상 다크.**

- `keepBackground: true`이므로 테마가 배경을 넣는다. globals.css에서 `bg-*`로 덮지 않는다.
- 크기는 `text-[15px]` — 본문(18px)보다 조금 작게.
- 인라인 코드는 반대로 테마를 따라간다 (`bg-muted` + `border-border`).

## 체크리스트

1. 하드코딩된 색이 없는가 (`grep -rn "amber\|blue-\|gray-\|#[0-9a-f]\{6\}" src/`)
2. 색 토큰을 바꿨다면 **라이트/다크 양쪽에서 대비를 다시 계산했는가.** 눈으로 정하지 않는다. 배경을 건드리면 그 위의 모든 텍스트 토큰이 영향을 받는다
3. 카드에 `surface-card`를 썼다면 그 요소에 `overflow-hidden`이 없는가
4. 본문은 `text-body`, 제목은 `text-foreground`인가
5. 라이트/다크 양쪽에서 확인했는가
6. 모바일(390px)에서 한국어 줄바꿈이 어절 단위인가
7. Tab으로 포커스 링이 보이는가
8. `pnpm exec tsc --noEmit` / `pnpm lint` / `pnpm build` 통과
