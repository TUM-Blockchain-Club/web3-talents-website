import assert from "node:assert/strict";
import { test } from "node:test";
import { trackArtworkPointer } from "../lib/artwork-pointer.mjs";
import { coursePointer } from "../lib/course-particles.mjs";

test("stationary hover follows scrolling artwork, respects overlays and cleans up", () => {
  const savedDocument = globalThis.document,
    savedWindow = globalThis.window;
  const doc = new EventTarget(),
    win = new EventTarget();
  globalThis.document = doc;
  globalThis.window = win;
  const art = { closest: () => null },
    outside = { closest: () => null };
  const button = { closest: () => ({}) };
  let target = art,
    pointer,
    calls = 0;
  let bounds = { left: 0, top: 100, width: 1200, height: 700 };
  doc.elementFromPoint = () => target;
  const emit = (node, name, fields = {}) =>
    node.dispatchEvent(Object.assign(new Event(name), fields));
  const stop = trackArtworkPointer(
    { contains: (node) => node !== outside },
    (event) => {
      pointer = coursePointer(event, bounds);
      calls++;
    },
    () => {
      pointer = null;
      calls++;
    },
  );
  try {
    emit(doc, "pointermove", {
      clientX: 900,
      clientY: 300,
      pointerType: "mouse",
    });
    assert.deepEqual(pointer, { x: 900, y: 200 });
    bounds.top = 20;
    emit(win, "scroll");
    assert.deepEqual(
      pointer,
      { x: 900, y: 280 },
      "scroll remaps without another pointer move",
    );
    target = outside;
    emit(win, "scroll");
    assert.equal(pointer, null, "scrolling past art ends hover");
    target = art;
    emit(win, "scroll");
    assert.deepEqual(
      pointer,
      { x: 900, y: 280 },
      "scrolling back restores hover under the stationary mouse",
    );
    target = button;
    emit(win, "scroll");
    assert.equal(
      pointer,
      null,
      "buttons and sticky navigation do not activate artwork behind them",
    );
    target = art;
    emit(doc, "pointermove", {
      clientX: 900,
      clientY: 300,
      pointerType: "touch",
    });
    emit(win, "scroll");
    assert.equal(pointer, null);
    emit(doc, "pointermove", {
      clientX: 900,
      clientY: 300,
      pointerType: "mouse",
    });
    emit(doc, "pointerout", { relatedTarget: null });
    emit(win, "scroll");
    assert.equal(
      pointer,
      null,
      "leaving the browser clears stale cursor coordinates",
    );
    emit(doc, "pointermove", {
      clientX: 900,
      clientY: 300,
      pointerType: "mouse",
    });
    emit(win, "blur");
    emit(win, "scroll");
    assert.equal(pointer, null);
    stop();
    const before = calls;
    emit(doc, "pointermove", { clientX: 900, clientY: 300 });
    emit(win, "scroll");
    assert.equal(calls, before, "unmounted artwork has no remaining handlers");
  } finally {
    stop();
    if (savedDocument === undefined) delete globalThis.document;
    else globalThis.document = savedDocument;
    if (savedWindow === undefined) delete globalThis.window;
    else globalThis.window = savedWindow;
  }
});
