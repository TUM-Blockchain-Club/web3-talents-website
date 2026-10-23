// Keep viewport coordinates: scrolling moves the artwork, not the mouse.
export function trackArtworkPointer(surface, move, leave) {
  let cursor = null;
  const refresh = () => {
    if (!cursor || document.hidden) {
      leave();
      return;
    }
    const target = document.elementFromPoint(cursor.clientX, cursor.clientY);
    if (
      !target ||
      !surface.contains(target) ||
      target.closest?.("a,button,input,textarea,select,nav,[role=tablist]")
    ) {
      leave();
      return;
    }
    move(cursor);
  };
  const clear = () => {
    cursor = null;
    leave();
  };
  const remember = (event) => {
    if (event.pointerType === "touch") {
      clear();
      return;
    }
    cursor = {
      clientX: event.clientX,
      clientY: event.clientY,
      pointerType: event.pointerType,
    };
    refresh();
  };
  const exit = (event) => {
    if (!event.relatedTarget) clear();
  };
  const visibility = () => {
    if (document.hidden) clear();
  };
  document.addEventListener("pointermove", remember, { passive: true });
  document.addEventListener("pointerout", exit);
  document.addEventListener("pointercancel", clear);
  document.addEventListener("visibilitychange", visibility);
  window.addEventListener("scroll", refresh, { passive: true, capture: true });
  window.addEventListener("resize", refresh, { passive: true });
  window.addEventListener("blur", clear);
  return () => {
    document.removeEventListener("pointermove", remember);
    document.removeEventListener("pointerout", exit);
    document.removeEventListener("pointercancel", clear);
    document.removeEventListener("visibilitychange", visibility);
    window.removeEventListener("scroll", refresh, { capture: true });
    window.removeEventListener("resize", refresh);
    window.removeEventListener("blur", clear);
    clear();
  };
}
