// Progressive enhancement: content stays visible if JavaScript or motion is unavailable.
export function initPageInteractions(root) {
  if (typeof IntersectionObserver === "undefined") return () => {};
  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  const animations = new Set();
  const seen = new WeakSet();
  const targets = root.querySelectorAll(
    "section h2, .web3t-step, .web3t-co-scard, .web3t-cm-dcard, .web3t-cm-piece",
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
            { opacity: 0.65, translate: "0 16px" },
            { opacity: 1, translate: "0 0" },
          ],
          {
            duration: 480,
            delay: Math.min(stagger++ * 65, 195),
            easing: "cubic-bezier(.22,1,.36,1)",
          },
        );
        animations.add(animation);
        animation.onfinish = () => animations.delete(animation);
      }
    },
    { threshold: 0.12 },
  );
  targets.forEach((target) => observer.observe(target));
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
