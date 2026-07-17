import type { ReactNode } from "react";

export function SectionContainer({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`section-container ${className}`.trim()}>{children}</div>
  );
}
