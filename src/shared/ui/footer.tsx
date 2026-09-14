import { Suspense } from "react";
import { siteConfig } from "@/shared/config";
import { VisitCounter, VisitTracker } from "@/entities/stats";
import { Container } from "./container";

export function Footer() {
  return (
    <footer className="border-border mt-24 border-t py-6">
      <Container
        size="wide"
        className="text-muted-foreground flex flex-col items-center justify-between gap-3 text-xs sm:flex-row sm:gap-6"
      >
        <p>
          © {new Date().getFullYear()} {siteConfig.author.name}. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <Suspense fallback={null}>
            <VisitCounter />
          </Suspense>
          <a
            href={siteConfig.social.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground focus-visible:ring-ring focus-visible:ring-offset-background rounded-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            GitHub
          </a>
          <a
            href="/rss.xml"
            className="hover:text-foreground focus-visible:ring-ring focus-visible:ring-offset-background rounded-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            RSS
          </a>
        </div>
        <VisitTracker />
      </Container>
    </footer>
  );
}
