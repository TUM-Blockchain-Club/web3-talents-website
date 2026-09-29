import assert from "node:assert/strict";
import { test } from "node:test";
import {
  logoPosition,
  localPointer,
  logoTracks,
  createLogoFieldRenderer,
  hoverRadius,
  driftQuery,
  logoSource,
  artworkAlpha,
} from "../lib/logo-field.mjs";
import { stepParticle } from "../lib/hero-particles.mjs";

test("original blue artwork replaces the rainbow logo and drifts twice as fast", () => {
  assert.equal(logoSource, "/assets/hero-bg.png");
  assert.deepEqual(
    logoTracks.map((track) => track.speed),
    [48, 38, 54, 44, 62, 34, 40, 58, 46],
  );
  assert.equal(artworkAlpha(4, 7, 22), 0);
  assert.equal(artworkAlpha(25, 80, 220), 1);
  assert.equal(artworkAlpha(25, 32, 56), 0.5);
});

test("nine differently sized logos move left to right at their configured speed", () => {
  assert.equal(logoTracks.length, 9);
  for (const track of logoTracks) {
    const before = logoPosition(track, 1280, 538, 0);
    const after = logoPosition(track, 1280, 538, 0.1);
    assert.ok(Math.abs(after.x - before.x - track.speed * 0.1) < 0.00001);
    assert.equal(after.y, before.y);
  }
});
test("logos wrap beyond the edges and fit mobile viewports", () => {
  for (const time of [0, 100, 100000])
    for (const track of logoTracks) {
      const p = logoPosition(track, 390, 440, time);
      assert.ok(p.x >= -p.width - 48 && p.x <= 390 + 48);
      assert.ok(p.y >= 0 && p.y + p.height <= 440);
      assert.ok(p.height < track.height);
    }
});
test("hover follows moving logos, even when the cursor is stationary", () => {
  const first = logoPosition(logoTracks[1], 1280, 538, 0);
  const second = logoPosition(logoTracks[1], 1280, 538, 1);
  const pointer = { x: first.x + 40, y: first.y + 50 };
  assert.equal(
    localPointer(pointer, first).x - localPointer(pointer, second).x,
    logoTracks[1].speed,
  );
  assert.equal(localPointer({ x: -999, y: -999 }, first), null);
});
test("small-logo brush leaves pixels outside the localized hover area untouched", () => {
  const pixel = { homeX: 60, homeY: 60, x: 60, y: 60, vx: 0, vy: 0, seed: 1 };
  stepParticle(pixel, { x: 60 + hoverRadius + 1, y: 60 }, 16, 0, hoverRadius);
  assert.equal(pixel.x, 60);
  assert.equal(pixel.y, 60);
  assert.equal(createLogoFieldRenderer({ getContext: () => null }, {}), null);
  assert.match(driftQuery, /prefers-reduced-motion: no-preference/);
});

test("renderer disperses actual logo cells locally and reassembles them", () => {
  const previousDocument = globalThis.document;
  const context = (canvas) => ({
    drawImage() {},
    clearRect() {},
    fillRect() {},
    setTransform() {},
    putImageData() {},
    getImageData() {
      return {
        data: new Uint8ClampedArray(canvas.width * canvas.height * 4).fill(255),
      };
    },
  });
  const makeCanvas = () => {
    const canvas = { width: 0, height: 0 };
    canvas.getContext = () => context(canvas);
    return canvas;
  };
  globalThis.document = { createElement: makeCanvas };
  try {
    const renderer = createLogoFieldRenderer(makeCanvas(), {});
    renderer.resize(1280, 538, 1);
    assert.equal(renderer.draw(0, null, 16), 0);
    const logo = logoPosition(logoTracks[4], 1280, 538, 0);
    const active = renderer.draw(
      0,
      { x: logo.x + logo.width / 2, y: logo.y + logo.height / 2 },
      16,
    );
    assert.ok(
      active > 0 && active < 1000,
      "A localized group of cells, not all logos",
    );
    let remaining;
    for (let i = 0; i < 200; i++) remaining = renderer.draw(0, null, 16);
    assert.equal(remaining, 0);
    renderer.dispose();
  } finally {
    if (previousDocument === undefined) delete globalThis.document;
    else globalThis.document = previousDocument;
  }
});
