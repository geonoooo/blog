import "server-only";
import { unstable_cache } from "next/cache";
import { getSupabaseAdmin } from "@/shared/lib/supabase";

export const POST_VIEWS_TAG = "post-views";

async function fetchPostViews(): Promise<Record<string, number>> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.rpc("get_post_views");
  if (error) throw error;

  const rows = (data ?? []) as { slug: string; count: number }[];
  return Object.fromEntries(rows.map((row) => [row.slug, Number(row.count ?? 0)]));
}

export const getPostViews = unstable_cache(fetchPostViews, ["post-views"], {
  revalidate: 60,
  tags: [POST_VIEWS_TAG],
});
