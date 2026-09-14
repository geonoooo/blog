import { getAllPosts } from "@/entities/post";
import { revalidateTag } from "next/cache";
import { incrementPostView, POST_VIEWS_TAG } from "@/entities/stats";

const BOT_PATTERN =
  /bot|crawler|spider|crawling|preview|fetch|monitor|headless|lighthouse|pingdom|slurp|baiduspider/i;

export async function POST(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  if (process.env.NODE_ENV !== "production") {
    return new Response(null, { status: 204 });
  }

  const ua = request.headers.get("user-agent") ?? "";
  if (!ua || BOT_PATTERN.test(ua)) {
    return new Response(null, { status: 204 });
  }

  const { slug } = await params;
  // Reject unknown slugs so a client can't fabricate rows.
  const known = getAllPosts().some((post) => post.slug === slug);
  if (!known) {
    return new Response(null, { status: 204 });
  }

  try {
    await incrementPostView(slug);
    revalidateTag(POST_VIEWS_TAG, "max");
  } catch {
    // view count is best-effort; never surface failure to the client
  }

  return new Response(null, { status: 204 });
}
