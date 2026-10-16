import "server-only";
import { getSupabaseAdmin } from "@/shared/lib/supabase";
import type { VisitStats } from "../model";

// 캐시는 GET /api/visit 응답의 s-maxage가 맡는다.
export async function getVisitStats(): Promise<VisitStats> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.rpc("get_visit_stats");
  if (error) throw error;

  const row = Array.isArray(data) ? data[0] : data;
  return {
    today: Number(row?.today_count ?? 0),
    total: Number(row?.total_count ?? 0),
  };
}
