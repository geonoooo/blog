import Image from "next/image";
import { siteConfig } from "@/shared/config";
import { formatDate } from "@/shared/lib";
import type { Post } from "../model";
import { PostCategoryBadge } from "./post-category-badge";
import { PostTagBadge } from "./post-tag-badge";

interface PostHeaderProps {
  post: Post;
}

export function PostHeader({ post }: PostHeaderProps) {
  const { thumbnail } = post;

  return (
    <header className="border-border mb-12 border-b pb-10">
      <PostCategoryBadge category={post.category} asLink />

      <h1 className="mt-5 text-[32px] leading-[1.25] font-bold tracking-tight text-balance sm:text-[40px]">
        {post.title}
      </h1>

      <p className="text-muted-foreground mt-4 text-lg leading-relaxed">{post.summary}</p>

      <p className="text-foreground mt-8 text-[15px] font-semibold">{siteConfig.author.name}</p>
      <p className="text-muted-foreground mt-1 flex items-center gap-2 text-sm">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span aria-hidden>·</span>
        <span>{post.metadata.readingTime} min read</span>
      </p>

      {/* 실제 스크린샷이 있는 글만. */}
      {thumbnail && (
        <Image
          src={thumbnail.src}
          alt=""
          width={thumbnail.width}
          height={thumbnail.height}
          sizes="(min-width: 840px) 800px, 100vw"
          className="border-border mt-8 rounded-xl border"
          {...(thumbnail.blurDataURL
            ? { placeholder: "blur" as const, blurDataURL: thumbnail.blurDataURL }
            : {})}
        />
      )}

      {post.tags.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-x-3 gap-y-1">
          {post.tags.map((tag) => (
            <PostTagBadge key={tag} tag={tag} />
          ))}
        </div>
      )}
    </header>
  );
}
