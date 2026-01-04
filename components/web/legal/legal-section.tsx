import type { ReactNode } from "react";

interface LegalSectionProps {
  id: string;
  title: string;
  children: ReactNode;
}

export function LegalSection({ id, title, children }: LegalSectionProps) {
  return (
    <section id={id} className="scroll-mt-20">
      <h2 className="font-medium text-2xl sm:text-3xl tracking-tight mb-4 sm:mb-6">
        {title}
      </h2>
      <div className="space-y-4 text-muted-foreground text-base leading-relaxed">
        {children}
      </div>
    </section>
  );
}
