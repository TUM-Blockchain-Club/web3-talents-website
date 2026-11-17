import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync } from "node:fs";
import {
  logoPosition,
  localPointer,
  logoTracks,
  createLogoFieldRenderer,
  hoverRadius,
  driftQuery,
  logoSource,
  symbolCrop,
} from "../lib/logo-field.mjs";
import { stepParticle } from "../lib/hero-particles.mjs";

test("transparent blue PNG is used whole, with unchanged drift speeds", () => {
  assert.equal(logoSource, "/assets/web3talents-logo-blue.png");
  assert.deepEqual(symbolCrop, { x: 0, y: 0, width: 1086, height: 1448 });
  const png = readFileSync(new URL('../public' + logoSource, import.meta.url));
  assert.equal(png.readUInt32BE(16), symbolCrop.width);
  assert.equal(png.readUInt32BE(20), symbolCrop.height);
  assert.equal(png[25], 6, 'Approved PNG retains its alpha channel');
  assert.deepEqual(
    logoTracks.slice(0, 9).map((track) => track.speed),
    [48, 38, 54, 44, 62, 34, 40, 58, 46],
  );
});

test("PNG transparency is preserved rather than inferred from brightness", () => {
  const source = readFileSync(new URL('../lib/logo-field.mjs', import.meta.url), 'utf8');
  assert.doesNotMatch(source, /artworkAlpha|putImageData/);
  assert.match(source, /if \(colors\[i \+ 3\] < 20\) continue/);
  const card = readFileSync(new URL('../components/public-site/card-generator.tsx', import.meta.url), 'utf8');
  assert.match(card, /loadImage\("\/assets\/web3talents-logo-blue\.png"\)/);
  const drawing = readFileSync(new URL('../components/public-site/card-drawing.ts', import.meta.url), 'utf8');
  assert.match(drawing, /cardArt = "\/assets\/web3talents-logo-blue\.png"/);
});

test("twenty-seven differently sized logos move left to right at their configured speed", () => {
  assert.equal(logoTracks.length, 27);
  assert.deepEqual(
    logoTracks.slice(0, 18).map((track) => track.height),
    [
      115, 162, 129, 179, 120, 193, 157, 109, 154, 92, 104, 95, 112, 101, 126,
      104, 123, 98,
    ],
  );
  assert.equal(new Set(logoTracks.map((track) => track.phase)).size, 27);
  for (const track of logoTracks) {
    assert.ok(track.height >= 92 && track.height <= 193);
    assert.ok(track.row >= 0 && track.row <= 1);
    assert.ok(track.opacity >= 0.5 && track.opacity <= 0.85);
    assert.ok(track.speed >= 34 && track.speed <= 62);
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
