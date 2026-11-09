import type { Metadata } from "next";
import { CardGeneratorPage } from "@/components/public-site/card-generator";

// Unlisted: reachable by link only, so it stays out of the navigation and of
// search results.
export const metadata: Metadata = {
  title: "Your Web3 Talents card",
  description: "Create your personal Web3 Talents card.",
  robots: { index: false, follow: false },
};

export default CardGeneratorPage;
