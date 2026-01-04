import type { ReactNode } from "react";

interface LegalPageLayoutProps {
  title: string;
  lastUpdated: string;
  description?: string;
  children: ReactNode;
}

export function LegalPageLayout({
  title,
  lastUpdated,
  description,
  children,
}: LegalPageLayoutProps) {
  return (
    <article className="py-16 sm:py-24 px-5 sm:px-[5%]">
      <div className="mx-auto max-w-3xl">
        {/* Hero Section */}
        <header className="mb-12 sm:mb-16">
          <h1 className="font-medium text-3xl sm:text-4xl md:text-5xl leading-[1.1] tracking-tight mb-4">
            {title}
          </h1>
          {description && (
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-4">
              {description}
            </p>
          )}
          <p className="text-sm text-muted-foreground">
            Senast uppdaterad: {lastUpdated}
          </p>
        </header>

        {/* Content */}
        <div className="prose prose-sm sm:prose-base max-w-none space-y-10 sm:space-y-12">
          {children}
        </div>
      </div>
    </article>
  );
}
