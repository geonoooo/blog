"use client";

import { useEffect, useState } from "react";
import type { VisitStats } from "../model";

// 숫자를 서버에서 그리면 방문마다 HTML이 바뀌어 모든 페이지가 ISR로 재생성된다. 브라우저에서 받아온다.
export function VisitCounter() {
  const [stats, setStats] = useState<VisitStats | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/visit", { signal: controller.signal })
      .then((res) => (res.ok ? (res.json() as Promise<VisitStats>) : null))
      .then(setStats)
      .catch(() => {});
    return () => controller.abort();
  }, []);

  if (!stats) return null;

  return (
    <p className="tabular-nums">
      Today {stats.today.toLocaleString()} · Total {stats.total.toLocaleString()}
    </p>
  );
}
