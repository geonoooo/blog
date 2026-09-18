import Link from "next/link";
import { siteConfig } from "@/shared/config";
import { Container } from "./container";
import { GithubIcon } from "./github-icon";
import { Logo } from "./logo";
import { NavLink } from "./nav-link";
import { ThemeToggle } from "./theme-toggle";

const EXCLUDED_FROM_RIGHT = new Set(["/"]);

export function Header() {
  const rightItems = siteConfig.nav.filter((item) => !EXCLUDED_FROM_RIGHT.has(item.href));

  return (
    <header className="border-border bg-surface/85 sticky top-0 z-50 border-b backdrop-blur">
      <Container size="wide" className="flex h-14 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            aria-label={siteConfig.name}
            className="focus-visible:ring-ring focus-visible:ring-offset-background hover:text-muted-foreground rounded-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            <Logo />
          </Link>
        </div>
        <nav className="flex items-center gap-3.5 sm:gap-5">
          <ul className="text-muted-foreground flex items-center gap-3.5 text-sm sm:gap-5">
            {rightItems.map((item) => (
              <li key={item.href}>
                <NavLink href={item.href}>{item.label}</NavLink>
              </li>
            ))}
          </ul>
          <a
            href={siteConfig.social.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="border-border text-muted-foreground hover:text-foreground hover:border-foreground focus-visible:ring-ring focus-visible:ring-offset-background flex h-7 w-7 items-center justify-center rounded-full border transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            <GithubIcon className="h-3.5 w-3.5" />
          </a>
          <ThemeToggle />
        </nav>
      </Container>
    </header>
  );
}
