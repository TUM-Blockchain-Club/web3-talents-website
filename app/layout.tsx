import type React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web3 Talents — TUM Blockchain Club",
  description:
    "Join Web3 Talents for Blockchain Fundamentals 1: a free, 20-week online program starting December 1, 2026. Expert lectures, group research, and peer teaching.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/styles.css" />
        <link rel="stylesheet" href="/interactions.css" />
        <link rel="stylesheet" href="/usability.css" />
      </head>
      <body className="web3t-page">{children}</body>
    </html>
  );
}
