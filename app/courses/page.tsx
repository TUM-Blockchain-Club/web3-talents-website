import type { Metadata } from "next";
import { CoursePage } from "@/components/public-site/course-sections";
import { courseFacts } from "@/components/public-site/course-content";

export const metadata: Metadata = {
  title: "Blockchain Fundamentals 1 — Web3 Talents",
  description:
    `Blockchain Fundamentals 1: free, 20 weeks, starting ${courseFacts.start}. ${courseFacts.sessionTime}. Explore 10 topics through expert lectures and peer teaching. Apply by November 8.`,
};

export default CoursePage;
