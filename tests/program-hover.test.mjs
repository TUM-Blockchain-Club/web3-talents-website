import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { programPreviewAtPoint } from "../lib/program-hover.mjs";

const stack = { width: 900, height: 340, selected: 0, pointerType: "mouse" };
test("stationary mouse over the exposed edge never alternates the preview", () => {
  for (const selected of [0, 1]) {
    for (const point of [
      { x: 915, y: 120 },
      { x: 500, y: 375 },
      { x: 915, y: 375 },
    ]) {
      for (let frame = 0; frame < 120; frame++) {
        assert.equal(
          programPreviewAtPoint({ ...stack, ...point, selected }),
          1 - selected,
        );
      }
    }
  }
});
test("moving back onto the main card or leaving restores the selected course", () => {
  for (const point of [
    { x: 400, y: 150 },
    { x: 900, y: 340 },
    { x: 940, y: 150 },
    { x: 400, y: 410 },
    { x: -1, y: 100 },
  ]) {
    assert.equal(programPreviewAtPoint({ ...stack, ...point }), null);
  }
});
test("touch and pen do not preview or override explicit selection", () => {
  for (const pointerType of ["touch", "pen"]) {
    assert.equal(
      programPreviewAtPoint({ ...stack, x: 920, y: 100, pointerType }),
      null,
    );
  }
});
test("hover is handled by stationary stack coordinates rather than animated card entry", () => {
  const source = readFileSync(
    new URL("../components/public-site/program-cards.tsx", import.meta.url),
    "utf8",
  );
  assert.doesNotMatch(source, /onPointerEnter/);
  assert.match(source, /event\.currentTarget\.getBoundingClientRect\(\)/);
  assert.match(source, /programPreviewAtPoint/);
});
