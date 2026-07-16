import Link from "next/link";
import type { ReactNode } from "react";

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <main className="legal-page">
      <article className="container legal-shell">
        <Link className="legal-back" href="/">
          → חזרה לעמוד הקמפיין
        </Link>
        <h1>{title}</h1>
        {children}
      </article>
    </main>
  );
}
