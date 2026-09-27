import type React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web3 Talents — TUM Blockchain Club",
  description:
    "A free, peer-led cohort programme for learning Web3, run by TUM Blockchain Club.",
  icons: { icon: "/assets/logo.png" },
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
      </head>
      <body className="web3t-page">{children}</body>
    </html>
  );
}
