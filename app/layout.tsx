import type React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web3 Talents — TUM Blockchain Club",
  description:
    "Explore the Web3 Talents community. Official program information and announcements coming soon.",
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
