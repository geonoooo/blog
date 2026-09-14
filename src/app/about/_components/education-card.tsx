export interface EducationEntry {
  school: string;
  period: string;
  detail?: string;
}

export function EducationCard({ entry }: { entry: EducationEntry }) {
  return (
    <article className="border-border/70 rounded-xl border p-6">
      <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="text-foreground text-lg font-bold tracking-tight">{entry.school}</h3>
        <span className="text-muted-foreground text-sm tabular-nums">{entry.period}</span>
      </header>
      {entry.detail && <p className="text-muted-foreground mt-1.5 text-sm">{entry.detail}</p>}
    </article>
  );
}
