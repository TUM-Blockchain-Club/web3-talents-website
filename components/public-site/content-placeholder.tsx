import type { ReactNode } from "react";

/** Honest empty state, never styled or marked up as a real person's quotation. */
export function ContentPlaceholder({
  title,
  children,
  className = "",
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <article
      className={`web3t-content-placeholder ${className}`}
      data-content-status="unconfirmed"
    >
      <span className="web3t-content-placeholder__label">Coming soon</span>
      <h3>{title}</h3>
      <p>{children}</p>
    </article>
  );
}
