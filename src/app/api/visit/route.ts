import { revalidateTag } from "next/cache";
import { getVisitStats, incrementVisit, VISIT_STATS_TAG } from "@/entities/stats";

const BOT_PATTERN =
  /bot|crawler|spider|crawling|preview|fetch|monitor|headless|lighthouse|pingdom|slurp|baiduspider/i;

export async function GET() {
  try {
    return Response.json(await getVisitStats());
  } catch {
    return new Response(null, { status: 503 });
  }
}

export async function POST(request: Request) {
  if (process.env.NODE_ENV !== "production") {
    return new Response(null, { status: 204 });
  }

  const ua = request.headers.get("user-agent") ?? "";
  if (!ua || BOT_PATTERN.test(ua)) {
    return new Response(null, { status: 204 });
  }

  try {
    await incrementVisit();
    // 증가한 값이 다음 GET부터 보이도록 캐시를 stale 처리한다.
    // "max"는 stale-while-revalidate — 단일 인자 형태는 Next 16에서 deprecated.
    revalidateTag(VISIT_STATS_TAG, "max");
  } catch {
    // visit count is best-effort; never surface failure to the client
  }

  return new Response(null, { status: 204 });
}
