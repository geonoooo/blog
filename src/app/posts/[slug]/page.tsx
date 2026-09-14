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
import { Container } from "@/shared/ui";

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
    keywords: post.tags,
    authors: [{ name: siteConfig.author.name, url: siteConfig.url }],
    alternates: {
      canonical: post.permalink,
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

  return (
    <Container size="post">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replaceAll("<", "\\u003c"),
        }}
      />
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
