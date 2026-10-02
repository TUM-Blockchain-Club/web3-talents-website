// Hit-test the stationary stack, never the cards that animate underneath it.
export function programPreviewAtPoint({
  x,
  y,
  width,
  height,
  selected,
  pointerType,
}) {
  if (
    pointerType !== "mouse" ||
    x < 0 ||
    y < 0 ||
    x > width + 38 ||
    y > height + 68
  )
    return null;
  return x > width || y > height ? 1 - selected : null;
}
