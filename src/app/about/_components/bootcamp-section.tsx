import { EducationCard, type EducationEntry } from "./education-card";
import { SectionTitle } from "./section-title";

const BOOTCAMP: readonly EducationEntry[] = [
  {
    school: "항해플러스",
    period: "2025.03 - 2025.05",
    detail: "5기",
  },
  {
    school: "위코드",
    period: "2023.03 - 2023.06",
    detail: "44기 · 프론트엔드",
  },
];

export function BootcampSection() {
  return (
    <section>
      <SectionTitle>Bootcamp</SectionTitle>
      <div className="space-y-4">
        {BOOTCAMP.map((entry) => (
          <EducationCard key={`${entry.school}-${entry.period}`} entry={entry} />
        ))}
      </div>
    </section>
  );
}
