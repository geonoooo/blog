import { giscusConfig, isGiscusConfigured } from "@/shared/config";
import { Giscus } from "@/shared/ui";

interface PostCommentsProps {
  slug: string;
}

export function PostComments({ slug }: PostCommentsProps) {
  if (!isGiscusConfigured) return null;

  return (
    <section id="comments" className="border-border mt-16 border-t pt-8">
      <h2 className="text-muted-foreground mb-4 text-sm font-medium">Comments</h2>
      <Giscus {...giscusConfig} mapping="specific" term={slug} />
    </section>
  );
}
