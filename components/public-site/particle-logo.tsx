"use client";
import { useEffect, useRef, useState } from "react";
import { initLogoField, logoTracks } from "../../lib/logo-field.mjs";
import type { CSSProperties } from "react";

/** Canvas owns the decorative layer; React owns the fallback and pause control. */
export function ParticleLogo() {
  const art = useRef<HTMLDivElement>(null);
  const animation = useRef<ReturnType<typeof initLogoField> | null>(null);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (!art.current) return;
    const instance = initLogoField(art.current, () => setReady(true));
    animation.current = instance;
    return () => {
      animation.current = null;
      instance.dispose();
    };
  }, []);
  return (
    <>
      <div
        className="web3t-hero__logo-field"
        aria-hidden="true"
        data-hero-art=""
        ref={art}
      >
        <div className="web3t-hero__logo-fallback">
          {logoTracks.map((logo, i) => (
            <i
              key={i}
              style={
                {
                  "--logo-x": `${logo.phase * 100}%`,
                  "--logo-y": `${logo.row * 100}%`,
                  "--logo-height": `${logo.height}px`,
                  "--logo-opacity": logo.opacity,
                } as CSSProperties
              }
            />
          ))}
        </div>
      </div>
      {ready && (
        <button
          type="button"
          className="web3t-hero__motion-toggle"
          aria-pressed={paused}
          onClick={() => {
            const next = !paused;
            setPaused(next);
            animation.current?.setPaused(next);
          }}
        >
          {paused ? "Resume animation" : "Pause animation"}
        </button>
      )}
    </>
  );
}
