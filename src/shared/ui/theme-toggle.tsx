"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/shared/providers";
import { Check, Monitor, Moon, Sun } from "lucide-react";
import { cn } from "@/shared/lib";

const MODES = [
  { value: "light", label: "Light", Icon: Sun },
  { value: "system", label: "System", Icon: Monitor },
  { value: "dark", label: "Dark", Icon: Moon },
] as const;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handlePointer = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handlePointer);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handlePointer);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  const current = theme ?? "system";
  const CurrentIcon = MODES.find((mode) => mode.value === current)?.Icon ?? Monitor;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Theme"
        suppressHydrationWarning
        className="border-border text-muted-foreground hover:text-foreground hover:border-foreground focus-visible:ring-ring focus-visible:ring-offset-background flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        <CurrentIcon className="h-3.5 w-3.5" suppressHydrationWarning />
      </button>
      {open && (
        <div
          role="menu"
          className="surface-pop border-border absolute top-full right-0 mt-2 w-32 overflow-hidden rounded-md border py-1"
        >
          {MODES.map(({ value, label, Icon }) => {
            const isActive = current === value;
            return (
              <button
                key={value}
                type="button"
                role="menuitemradio"
                aria-checked={isActive}
                onClick={() => {
                  setTheme(value);
                  setOpen(false);
                }}
                suppressHydrationWarning
                className={cn(
                  "text-muted-foreground hover:bg-muted hover:text-foreground flex w-full items-center justify-between px-3 py-1.5 text-sm transition-colors",
                  isActive && "text-foreground",
                )}
              >
                <span className="flex items-center gap-2">
                  <Icon className="h-3.5 w-3.5" />
                  {label}
                </span>
                {isActive && <Check className="h-3 w-3" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
