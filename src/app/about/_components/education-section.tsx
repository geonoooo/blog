import { EducationCard, type EducationEntry } from "./education-card";
import { SectionTitle } from "./section-title";

const EDUCATION: readonly EducationEntry[] = [
  {
    school: "건국대학교 글로컬캠퍼스",
    period: "2017.03 - 2023.02",
    detail: "경제통상학과",
  },
];

export function EducationSection() {
  return (
    <section>
      <SectionTitle>Education</SectionTitle>
      <div className="space-y-4">
        {EDUCATION.map((entry) => (
          <EducationCard key={`${entry.school}-${entry.period}`} entry={entry} />
        ))}
      </div>
    </section>
  );
}
