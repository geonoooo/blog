import Image, { type ImageProps } from "next/image";
import Link from "next/link";
import type { AnchorHTMLAttributes, ImgHTMLAttributes } from "react";
import type { MDXComponents } from "mdx/types";

function MdxLink({ href, children, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (!href) return <a {...rest}>{children}</a>;
  const isExternal = /^https?:\/\//.test(href);
  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noreferrer noopener" {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} {...rest}>
      {children}
    </Link>
  );
}

function MdxImage(props: ImgHTMLAttributes<HTMLImageElement>) {
  const { src, alt = "", width, height, ...rest } = props;
  if (typeof src !== "string") return null;
  return (
    <Image
      src={src}
      alt={alt}
      width={Number(width) || 1200}
      height={Number(height) || 630}
      sizes="(min-width: 768px) 640px, 100vw"
      className="border-border rounded-md border"
      {...(rest as Partial<ImageProps>)}
    />
  );
}

export const mdxComponents: MDXComponents = {
  a: MdxLink,
  img: MdxImage,
};
