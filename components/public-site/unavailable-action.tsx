import type { ReactNode } from "react";

/** No href: public CTAs are deliberately disconnected from Moodle/registration. */
export function UnavailableAction({
  children,
  className,
  kind = "apply",
}: {
  children: ReactNode;
  className: string;
  kind?: "apply" | "login";
}) {
  return (
    <a
      className={className}
      role="link"
      aria-disabled="true"
      title="Not available yet"
      data-apply={kind === "apply" ? "" : undefined}
      data-login={kind === "login" ? "" : undefined}
    >
      {children}
    </a>
  );
}
