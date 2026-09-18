import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";

export interface ExperienceLink {
  label: string;
  href: string;
}

export interface ExperienceEntry {
  company: string;
  role?: string;
  period: string;
  tagline?: string;
  summary?: string;
  highlights: readonly string[];
  details?: readonly string[];
  links?: readonly ExperienceLink[];
  tech: readonly string[];
}

function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="text-foreground/85 space-y-1.5 text-sm leading-relaxed">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5">
          <span className="text-muted-foreground/60 mt-2.25 h-1 w-1 shrink-0 rounded-full bg-current" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function ExperienceCard({ entry }: { entry: ExperienceEntry }) {
  return (
    <article className="surface-panel border-border rounded-xl border p-6">
      <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="text-foreground text-lg font-bold tracking-tight">
          {entry.company}
          {entry.role && (
            <span className="text-muted-foreground ml-2 align-middle text-xs font-semibold">
              {entry.role}
            </span>
          )}
        </h3>
        <span className="text-muted-foreground text-sm tabular-nums">{entry.period}</span>
      </header>

      {entry.tagline && <p className="text-muted-foreground mt-1.5 text-sm">{entry.tagline}</p>}

      {entry.summary && (
        <p className="text-foreground/80 mt-3 text-sm leading-relaxed">{entry.summary}</p>
      )}

      <div className="mt-4">
        <BulletList items={entry.highlights} />
      </div>

      {entry.details && entry.details.length > 0 && (
        <details className="group mt-3">
          <summary className="text-muted-foreground hover:text-foreground focus-visible:text-foreground focus-visible:ring-ring inline-flex cursor-pointer list-none items-center gap-1 rounded-sm text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none [&::-webkit-details-marker]:hidden">
            <ChevronDown className="h-3.5 w-3.5 transition-transform group-open:rotate-180" />
            <span className="group-open:hidden">자세히 보기</span>
            <span className="hidden group-open:inline">접기</span>
          </summary>
          <div className="border-border/60 mt-3 border-l pl-4">
            <BulletList items={entry.details} />
          </div>
        </details>
      )}

      {entry.links && entry.links.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <span className="text-muted-foreground/70 text-xs">관련 글</span>
          {entry.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-foreground focus-visible:text-foreground focus-visible:ring-ring inline-flex items-center gap-0.5 rounded-sm text-xs transition-colors focus-visible:ring-2 focus-visible:outline-none"
            >
              {link.label}
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          ))}
        </div>
      )}

      <div className="mt-5 flex flex-wrap gap-1.5">
        {entry.tech.map((t) => (
          <span
            key={t}
            className="border-border bg-muted/40 rounded-full border px-2.5 py-0.5 text-[11px]"
          >
            {t}
          </span>
        ))}
      </div>
    </article>
  );
}
