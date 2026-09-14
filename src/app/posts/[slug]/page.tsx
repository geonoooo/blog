import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAdjacentPosts,
  getAllPosts,
  getPostBySlug,
  PostBody,
  PostComments,
  PostHeader,
  PostNavigation,
  PostToc,
} from "@/entities/post";
import { PostViewTracker } from "@/entities/stats";
import { siteConfig } from "@/shared/config";
import { buildBreadcrumbJsonLd } from "@/shared/lib";
import { Container, JsonLd } from "@/shared/ui";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
    authors: [{ name: siteConfig.author.name, url: siteConfig.url }],
    // alternates는 부모 것을 덮어쓴다. types를 다시 적지 않으면 글 페이지에서 RSS 링크가 사라진다.
    alternates: {
      canonical: post.permalink,
      types: {
        "application/rss+xml": `${siteConfig.url}/rss.xml`,
      },
    },
    openGraph: {
      type: "article",
      locale: "ko_KR",
      title: post.title,
      description: post.summary,
      url: post.permalink,
      siteName: siteConfig.name,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [siteConfig.author.name],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { previous, next } = getAdjacentPosts(slug);

  const postUrl = `${siteConfig.url}${post.permalink}`;
  const ogImageUrl = `${postUrl}/opengraph-image`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: {
      "@type": "Person",
      name: siteConfig.author.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.author.name,
      url: siteConfig.url,
    },
    keywords: post.tags.join(", "),
    articleSection: post.category,
    image: ogImageUrl,
    url: postUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    inLanguage: "ko-KR",
  };

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "홈", path: "/" },
    { name: post.title, path: post.permalink },
  ]);

  return (
    <Container size="post">
      <JsonLd data={jsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <PostViewTracker slug={slug} />
      {/* 양쪽 1fr 사이에 640px 본문을 둬서 본문은 항상 가운데, 목차는 오른쪽 여백에 놓인다. */}
      <div className="xl:grid xl:grid-cols-[1fr_minmax(0,800px)_1fr] xl:gap-10">
        <div className="hidden xl:block" aria-hidden />
        <article className="mx-auto w-full max-w-[800px] min-w-0">
          <PostHeader post={post} />
          <PostBody code={post.body} />
          <PostComments slug={slug} />
          <PostNavigation previous={previous} next={next} />
        </article>
        <div className="hidden xl:block">
          <PostToc toc={post.toc} />
        </div>
      </div>
    </Container>
  );
}
