// Progressive enhancement: content stays visible if JavaScript or motion is unavailable.
export function initPageInteractions(root) {
  if (typeof IntersectionObserver === "undefined") return () => {};
  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  const animations = new Set();
  const seen = new WeakSet();
  const targets = root.querySelectorAll(
    "section h2, .web3t-step, .web3t-co-scard, .web3t-cm-dcard, .web3t-cm-piece, " +
      ".web3t-program__carousel, .web3t-speaker, .web3t-value-card, .web3t-quote, " +
      ".web3t-course-speaker, .web3t-cm-event, .web3t-course-about__desc, " +
      "section > .web3t-rail > p",
  );
  const observer = new IntersectionObserver(
    (entries) => {
      let stagger = 0;
      for (const entry of entries) {
        if (!entry.isIntersecting || seen.has(entry.target)) continue;
        seen.add(entry.target);
        observer.unobserve(entry.target);
        if (motion.matches || !entry.target.animate) continue;
        const animation = entry.target.animate(
          [
            { opacity: 0.25, translate: "0 26px" },
            { opacity: 1, translate: "0 0" },
          ],
          {
            duration: 700,
            delay: Math.min(stagger++ * 70, 210),
            easing: "cubic-bezier(.22,1,.36,1)",
            fill: "backwards",
          },
        );
        animations.add(animation);
        animation.onfinish = () => animations.delete(animation);
      }
    },
    { threshold: 0.08, rootMargin: "0px 0px -24px 0px" },
  );
  targets.forEach((target) => {
    // Never fade out content already in view on load, anchor arrival or Back.
    const rect = target.getBoundingClientRect();
    if (rect.bottom > 0 && rect.top < window.innerHeight) seen.add(target);
    else observer.observe(target);
  });
  const cancel = () => {
    for (const animation of animations) animation.cancel();
    animations.clear();
  };
  const preferenceChanged = () => {
    if (motion.matches) cancel();
  };
  motion.addEventListener("change", preferenceChanged);
  return () => {
    observer.disconnect();
    motion.removeEventListener("change", preferenceChanged);
    cancel();
  };
}
