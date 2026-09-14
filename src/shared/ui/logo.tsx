import { ChevronLeft, ChevronRight, Pencil } from "lucide-react";
import { siteConfig } from "@/shared/config";
import { cn } from "@/shared/lib";

type LogoProps = {
  className?: string;
  showWordmark?: boolean;
};

export function Logo({ className, showWordmark = true }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)} aria-label={siteConfig.name}>
      <span aria-hidden className="text-brand inline-flex items-center">
        <ChevronLeft className="h-5 w-5" strokeWidth={2.75} />
        <Pencil className="-mx-0.5 h-4 w-4" strokeWidth={2} />
        <ChevronRight className="h-5 w-5" strokeWidth={2.75} />
      </span>
      {showWordmark && (
        <span className="text-[17px] font-semibold tracking-tight">{siteConfig.name}</span>
      )}
    </span>
  );
}
