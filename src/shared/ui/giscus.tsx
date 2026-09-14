"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/shared/providers";

type Mapping = "pathname" | "url" | "title" | "og:title" | "specific" | "number";

interface GiscusProps {
  repo: string;
  repoId: string;
  category: string;
  categoryId: string;
  mapping?: Mapping;
  term?: string;
  lang?: string;
}

const ORIGIN = "https://giscus.app";

function resolveTheme(theme: string, systemDark: boolean): "light" | "dark" {
  if (theme === "dark" || theme === "light") return theme;
  return systemDark ? "dark" : "light";
}

export function Giscus({
  repo,
  repoId,
  category,
  categoryId,
  mapping = "pathname",
  term,
  lang = "ko",
}: GiscusProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const script = document.createElement("script");
    script.src = `${ORIGIN}/client.js`;
    script.async = true;
    script.crossOrigin = "anonymous";

    const attrs: Record<string, string> = {
      "data-repo": repo,
      "data-repo-id": repoId,
      "data-category": category,
      "data-category-id": categoryId,
      "data-mapping": mapping,
      "data-strict": "0",
      "data-reactions-enabled": "1",
      "data-emit-metadata": "0",
      "data-input-position": "bottom",
      "data-theme": resolveTheme(theme, mq.matches),
      "data-lang": lang,
      "data-loading": "lazy",
    };
    if (term) attrs["data-term"] = term;
    for (const [key, value] of Object.entries(attrs)) {
      script.setAttribute(key, value);
    }

    container.appendChild(script);
    return () => {
      container.replaceChildren();
    };
    // theme은 의도적으로 deps에서 제외: 변경 시 iframe 재마운트가 일어나면
    // 이미 로드된 댓글을 다시 fetch하므로, 테마 변경은 아래 effect의 postMessage로만 전파.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [repo, repoId, category, categoryId, mapping, term, lang]);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");

    const send = () => {
      const iframe = container.querySelector<HTMLIFrameElement>("iframe.giscus-frame");
      iframe?.contentWindow?.postMessage(
        { giscus: { setConfig: { theme: resolveTheme(theme, mq.matches) } } },
        ORIGIN,
      );
    };
    send();
    if (theme !== "system") return;
    mq.addEventListener("change", send);
    return () => mq.removeEventListener("change", send);
  }, [theme]);

  return <div ref={ref} className="giscus" />;
}
