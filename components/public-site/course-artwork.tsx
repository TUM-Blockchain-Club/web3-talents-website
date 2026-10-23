"use client";

import { useEffect, useRef } from "react";
import { initCourseArtwork } from "../../lib/course-particles.mjs";

/** The original CSS image remains the fallback and the exact resting state. */
export function CourseArtwork() {
  const art = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!art.current) return;
    return initCourseArtwork(art.current);
  }, []);
  return <div ref={art} className="web3t-course__cubes" aria-hidden="true" />;
}
