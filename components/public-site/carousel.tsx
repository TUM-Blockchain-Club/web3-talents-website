"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";

export function Carousel({
  children,
  className,
  scrollerClassName,
  label,
}: {
  children: ReactNode;
  className: string;
  scrollerClassName: string;
  label: string;
}) {
  const viewport = useRef<HTMLDivElement>(null);
  const [pages, setPages] = useState(0);
  const [active, setActive] = useState(0);
  useEffect(() => {
    const element = viewport.current;
    if (!element) return;
    let frame = 0;
    let disposed = false;
    const measure = () => {
      if (disposed) return;
      const overflow = element.scrollWidth - element.clientWidth;
      const count =
        overflow <= 4
          ? 0
          : Math.min(
              10,
              Math.max(2, Math.ceil(element.scrollWidth / element.clientWidth)),
            );
      setPages(count);
      setActive(
        count
          ? Math.max(
              0,
              Math.min(
                count - 1,
                Math.round((element.scrollLeft / overflow) * (count - 1)),
              ),
            )
          : 0,
      );
    };
    const schedule = () => {
      if (disposed) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(element);
    for (const child of element.children) observer.observe(child);
    element.addEventListener("scroll", schedule, { passive: true });
    document.fonts.ready.then(schedule);
    measure();
    return () => {
      disposed = true;
      observer.disconnect();
      element.removeEventListener("scroll", schedule);
      cancelAnimationFrame(frame);
    };
  }, []);
  function goTo(index: number) {
    const element = viewport.current;
    if (!element || pages < 2) return;
    element.scrollTo({
      left: Math.round(
        (index / (pages - 1)) * (element.scrollWidth - element.clientWidth),
      ),
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }
  return (
    <div className={className} data-carousel="slider">
      <div
        className={`${scrollerClassName}${pages === 0 ? " is-centered" : ""}`}
        data-scroller=""
        ref={viewport}
      >
        {children}
      </div>
      <div
        className="web3t-dots"
        data-dots=""
        aria-label={label}
        style={pages ? undefined : { display: "none" }}
      >
        {Array.from({ length: pages }, (_, i) => (
          <button
            key={i}
            type="button"
            className={`web3t-dot${i === active ? " is-active" : ""}`}
            aria-label={`Go to page ${i + 1}`}
            aria-current={i === active ? "true" : undefined}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  );
}
