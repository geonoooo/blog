import { SectionTitle } from "./section-title";

const SKILLS: readonly { category: string; items: readonly string[] }[] = [
  {
    category: "Frontend",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "TanStack Query",
      "Zustand",
      "Tailwind CSS",
      "SCSS",
    ],
  },
  {
    category: "Backend · Infra",
    items: ["NestJS", "Prisma", "Docker", "nginx", "GCP", "AWS"],
  },
  {
    category: "Collaboration",
    items: ["Notion", "Linear", "Figma"],
  },
];

export function SkillsSection() {
  return (
    <section>
      <SectionTitle>Skills</SectionTitle>
      <dl className="space-y-4">
        {SKILLS.map(({ category, items }) => (
          <div key={category} className="flex flex-col gap-2 sm:flex-row sm:gap-4">
            <dt className="text-muted-foreground w-32 shrink-0 pt-0.5 text-sm font-semibold">
              {category}
            </dt>
            <dd className="flex flex-wrap gap-1.5">
              {items.map((item) => (
                <span
                  key={item}
                  className="border-border bg-muted/40 rounded-full border px-2.5 py-0.5 text-xs"
                >
                  {item}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
