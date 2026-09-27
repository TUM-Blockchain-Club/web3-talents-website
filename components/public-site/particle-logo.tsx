"use client";
import { useEffect, useRef } from "react";
import { initHero } from "../../lib/hero-particles.mjs";

/** Canvas owns this empty decorative element; React owns its lifecycle. */
export function ParticleLogo() {
  const art = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (art.current) return initHero(art.current);
  }, []);
  return (
    <div
      className="web3t-hero__bg"
      aria-hidden="true"
      data-hero-art=""
      ref={art}
    />
  );
}
