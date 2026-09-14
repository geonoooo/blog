import {
  createPostCoverImage,
  getAllPosts,
  getPostBySlug,
  POST_COVER_CONTENT_TYPE,
  POST_COVER_SIZE,
} from "@/entities/post";

export const alt = "Post";
export const size = POST_COVER_SIZE;
export const contentType = POST_COVER_CONTENT_TYPE;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return new Response("Not found", { status: 404 });
  }

  return createPostCoverImage(post);
}
