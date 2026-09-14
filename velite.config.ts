import { defineConfig, s } from "velite";
import rehypePrettyCode from "rehype-pretty-code";
import { bundledThemes } from "shiki";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";
import { remarkAlert } from "remark-github-blockquote-alert";

// github-dark의 주석 색 #6a737d은 이 테마 배경 #24292e 대비 3.05:1로 WCAG AA(4.5:1)에도
// 못 미친다. 다른 토큰은 전부 통과하므로 주석 색만 올린다.
// #b1bac4는 7.47:1로 AAA를 넘기면서, 본문 코드(#e1e4e8, 11.5:1)보다는 어두워 위계가 남는다.
// 주석만으로 이뤄진 코드 블록도 읽히게 하려면 AA로는 부족하다.
const COMMENT_FOREGROUND = "#b1bac4";

const githubDark = (await bundledThemes["github-dark"]()).default;

const codeTheme = {
  ...githubDark,
  tokenColors: githubDark.tokenColors?.map((rule) => {
    const scopes = Array.isArray(rule.scope) ? rule.scope : [rule.scope];
    if (!scopes.includes("comment")) return rule;
    return { ...rule, settings: { ...rule.settings, foreground: COMMENT_FOREGROUND } };
  }),
};

const POST_CATEGORIES = ["typescript", "deep-dive", "react", "tooling", "backend"] as const;

// 목록 카드 커버 모티프. src/entities/post/model/post-query.ts의 POST_COVERS와 같은 값을
// 유지한다. velite 설정은 @/ alias를 못 읽어서 여기서 한 번 더 적는다.
const POST_COVERS = [
  "branch",
  "chunks",
  "contrast",
  "counter",
  "envelope",
  "gate",
  "layers",
  "mapping",
  "ports",
  "scroll",
  "swatches",
  "table-vs-doc",
  "terminal",
  "tree",
  "tunnel",
] as const;

const posts = {
  name: "Post",
  pattern: "posts/**/*.mdx",
  schema: s
    .object({
      title: s.string().max(120),
      summary: s.string().max(240),
      date: s.isodate(),
      // 본문을 고친 날. 없으면 date와 같다고 본다.
      updated: s.isodate().optional(),
      category: s.enum(POST_CATEGORIES),
      tags: s.array(s.string()).default([]),
      // 목록 카드 상단 SVG 커버의 모티프. 없으면 카테고리 기본값으로 떨어진다.
      cover: s.enum(POST_COVERS).optional(),
      // 실사 스크린샷·로고. 글 상세 헤더에만 쓴다. 목록 카드는 cover가 담당.
      thumbnail: s.image().optional(),
      draft: s.boolean().default(false),
      slug: s.path(),
      permalink: s.path(),
      metadata: s.metadata(),
      // 본문 목차. rehype-slug가 붙이는 id와 같은 규칙으로 생성된다.
      toc: s.toc({ maxDepth: 3 }),
      body: s.mdx(),
    })
    .transform((data) => ({
      ...data,
      slug: data.slug.replace(/^posts\//, ""),
      permalink: `/posts/${data.slug.replace(/^posts\//, "")}`,
    })),
};

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { posts },
  mdx: {
    remarkPlugins: [remarkGfm, remarkAlert],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: codeTheme,
          keepBackground: true,
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          behavior: "append",
          properties: {
            className: ["heading-anchor"],
            ariaLabel: "Link to section",
          },
        },
      ],
    ],
  },
});
