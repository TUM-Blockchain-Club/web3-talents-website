import assert from "node:assert/strict";
import { test } from "node:test";
import {
  coverPlacement,
  coursePointer,
  createCourseRenderer,
  courseArtworkSource,
} from "../lib/course-particles.mjs";

test("course artwork preserves the original image and right/top cover crop", () => {
  assert.equal(courseArtworkSource, "/assets/hero-blockchain-cubes.png");
  assert.deepEqual(coverPlacement(100, 50, 200, 200), {
    x: -200,
    y: 0,
    width: 400,
    height: 200,
  });
  assert.deepEqual(coverPlacement(100, 50, 300, 100), {
    x: 0,
    y: 0,
    width: 300,
    height: 150,
  });
});

test("hover only responds over right-hand artwork, not touch or outside", () => {
  const bounds = { left: 20, top: 100, width: 1000, height: 700 };
  assert.deepEqual(coursePointer({ clientX: 820, clientY: 300 }, bounds), {
    x: 800,
    y: 200,
  });
  for (const event of [
    { clientX: 820, clientY: 300, pointerType: "touch" },
    { clientX: 300, clientY: 300 },
    { clientX: 820, clientY: 99 },
    { clientX: 1021, clientY: 300 },
  ])
    assert.equal(coursePointer(event, bounds), null);
});

test("only local pixels disperse and return; artwork never drifts while idle", () => {
  const previous = globalThis.document;
  const draws = [];
  const makeCanvas = () => {
    const canvas = { width: 0, height: 0 };
    canvas.getContext = () => ({
      drawImage(...args) {
        draws.push(args.slice(1));
      },
      clearRect() {},
      fillRect() {},
      setTransform() {},
      getImageData() {
        return {
          data: new Uint8ClampedArray(canvas.width * canvas.height * 4).fill(
            255,
          ),
        };
      },
    });
    return canvas;
  };
  globalThis.document = { createElement: makeCanvas };
  try {
    const renderer = createCourseRenderer(makeCanvas(), {
      naturalWidth: 1487,
      naturalHeight: 1058,
    });
    renderer.resize(1200, 900, 1.5);
    assert.equal(renderer.draw(null, 0, 16), 0);
    const placement = draws.at(-1);
    assert.equal(renderer.draw(null, 100000, 16), 0);
    assert.deepEqual(draws.at(-1), placement);
    const active = renderer.draw({ x: 900, y: 350 }, 100016, 16);
    assert.ok(
      active > 0 && active < 2200,
      "only a small brush of pixels moves",
    );
    let remaining;
    for (let i = 0; i < 250; i++)
      remaining = renderer.draw(null, 100032 + i * 16, 16);
    assert.equal(remaining, 0);
    assert.deepEqual(draws.at(-1), placement);
    renderer.dispose();
  } finally {
    if (previous === undefined) delete globalThis.document;
    else globalThis.document = previous;
  }
  assert.equal(createCourseRenderer({ getContext: () => null }, {}), null);
});
