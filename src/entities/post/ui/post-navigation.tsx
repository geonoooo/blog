import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Post } from "../model";

interface PostNavigationProps {
  previous: Post | null;
  next: Post | null;
}

export function PostNavigation({ previous, next }: PostNavigationProps) {
  if (!previous && !next) return null;

  return (
    <nav className="border-border mt-16 grid grid-cols-1 gap-4 border-t pt-8 sm:grid-cols-2">
      {previous ? (
        <Link
          href={previous.permalink}
          className="surface-card border-border focus-visible:ring-ring focus-visible:ring-offset-background flex flex-col gap-1 rounded-xl border p-4 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          <span className="text-muted-foreground flex items-center gap-1 text-xs">
            <ArrowLeft className="h-3 w-3" /> Previous
          </span>
          <span className="text-sm font-medium">{previous.title}</span>
        </Link>
      ) : (
        <span aria-hidden />
      )}
      {next ? (
        <Link
          href={next.permalink}
          className="surface-card border-border focus-visible:ring-ring focus-visible:ring-offset-background flex flex-col gap-1 rounded-xl border p-4 text-right focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none sm:col-start-2"
        >
          <span className="text-muted-foreground flex items-center justify-end gap-1 text-xs">
            Next <ArrowRight className="h-3 w-3" />
          </span>
          <span className="text-sm font-medium">{next.title}</span>
        </Link>
      ) : (
        <span aria-hidden />
      )}
    </nav>
  );
}
