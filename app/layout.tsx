import type React from "react";
import type { Metadata } from "next";
import { courseFacts } from "@/components/public-site/course-content";

export const metadata: Metadata = {
  title: "Web3 Talents — TUM Blockchain Club",
  description:
    `Join Web3 Talents for Blockchain Fundamentals 1: a free, 20-week online program starting ${courseFacts.start}. ${courseFacts.sessionTime}. Expert lectures, group research, and peer teaching.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/assets/Inter-400.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/assets/SpaceGrotesk-500.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="stylesheet" href="/styles.css" precedence="base" />
        <link rel="stylesheet" href="/interactions.css" precedence="interactions" />
        <link rel="stylesheet" href="/usability.css" precedence="usability" />
      </head>
      <body className="web3t-page">{children}</body>
    </html>
  );
}
