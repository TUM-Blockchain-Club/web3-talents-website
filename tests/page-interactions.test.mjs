import assert from "node:assert/strict";
import { test } from "node:test";
import { initPageInteractions, initScrollHeader } from "../lib/page-interactions.mjs";
import { renderPage } from "./react-render.cjs";

test("page entrances run once, respect preference changes, and clean up on navigation", () => {
  const previousMedia = globalThis.matchMedia;
  const previousObserver = globalThis.IntersectionObserver;
  const previousWindow = globalThis.window;
  let callback,
    preferenceChanged,
    disconnected = false,
    removed = false;
  const media = {
    matches: false,
    addEventListener(_, listener) {
      preferenceChanged = listener;
    },
    removeEventListener(_, listener) {
      removed = listener === preferenceChanged;
    },
  };
  let played = 0,
    cancelled = 0;
  const observed = [];
  const target = {
    getBoundingClientRect: () => ({ top: 1000, bottom: 1100 }),
    animate() {
      played++;
      return {
        cancel() {
          cancelled++;
        },
      };
    },
  };
  globalThis.matchMedia = () => media;
  globalThis.window = { innerHeight: 800 };
  globalThis.IntersectionObserver = class {
    constructor(listener) {
      callback = listener;
    }
    observe(element) { observed.push(element); }
    unobserve() {}
    disconnect() {
      disconnected = true;
    }
  };
  try {
    const inView = { ...target, getBoundingClientRect: () => ({ top: 40, bottom: 200 }) };
    const dispose = initPageInteractions({ querySelectorAll: () => [target, inView] });
    assert.deepEqual(observed, [target], "content already in view does not flash on load or Back");
    callback([{ target, isIntersecting: false }]);
    assert.equal(played, 0);
    callback([{ target, isIntersecting: true }]);
    callback([{ target, isIntersecting: true }]);
    assert.equal(played, 1);
    media.matches = true;
    preferenceChanged();
    assert.equal(cancelled, 1);
    const other = {
      animate() {
        played++;
      },
    };
    callback([{ target: other, isIntersecting: true }]);
    assert.equal(played, 1);
    dispose();
    assert.ok(disconnected && removed);
    assert.equal(cancelled, 1);
  } finally {
    if (previousMedia === undefined) delete globalThis.matchMedia;
    else globalThis.matchMedia = previousMedia;
    if (previousObserver === undefined) delete globalThis.IntersectionObserver;
    else globalThis.IntersectionObserver = previousObserver;
    if (previousWindow === undefined) delete globalThis.window;
    else globalThis.window = previousWindow;
  }
});

test("scroll header batches updates, handles changing height and releases every listener", () => {
  const keys = ["window", "document", "requestAnimationFrame", "cancelAnimationFrame", "ResizeObserver"];
  const originals = keys.map((key) => globalThis[key]);
  const listeners = new Map();
  const frames = new Map();
  let next = 0, resized, disconnected = false, scrolled = false;
  const properties = new Map();
  const header = {
    style: { setProperty: (key, value) => properties.set(key, value), removeProperty: (key) => properties.delete(key) },
    classList: { toggle: (_, value) => { scrolled = value; }, remove: () => { scrolled = false; } },
  };
  globalThis.window = {
    scrollY: 0, innerHeight: 800,
    addEventListener: (name, fn, options) => {
      if (name === "scroll") assert.equal(options.passive, true);
      listeners.set(name, fn);
    },
    removeEventListener: (name, fn) => {
      assert.equal(listeners.get(name), fn);
      listeners.delete(name);
    },
  };
  globalThis.document = { documentElement: { scrollHeight: 2400 }, body: {} };
  globalThis.requestAnimationFrame = (fn) => { frames.set(++next, fn); return next; };
  globalThis.cancelAnimationFrame = (id) => frames.delete(id);
  globalThis.ResizeObserver = class {
    constructor(fn) { resized = fn; }
    observe(node) { assert.equal(node, document.body); }
    disconnect() { disconnected = true; }
  };
  const flush = () => { const callbacks = [...frames.values()]; frames.clear(); callbacks.forEach((fn) => fn()); };
  try {
    const stop = initScrollHeader(header);
    assert.equal(properties.get("--scroll-progress"), "0");
    window.scrollY = 800;
    listeners.get("scroll")(); listeners.get("scroll")();
    assert.equal(frames.size, 1);
    flush();
    assert.equal(properties.get("--scroll-progress"), "0.5");
    assert.equal(scrolled, true);
    document.documentElement.scrollHeight = 1600;
    resized(); flush();
    assert.equal(properties.get("--scroll-progress"), "1");
    window.scrollY = -20;
    listeners.get("scroll")(); flush();
    assert.equal(properties.get("--scroll-progress"), "0");
    document.documentElement.scrollHeight = 800;
    resized(); flush();
    assert.equal(properties.get("--scroll-progress"), "0");
    listeners.get("scroll")();
    stop();
    assert.equal(frames.size, 0);
    assert.equal(listeners.size, 0);
    assert.equal(properties.size, 0);
    assert.ok(disconnected);
    resized();
    assert.equal(frames.size, 0);
  } finally {
    keys.forEach((key, i) => {
      if (originals[i] === undefined) delete globalThis[key];
      else globalThis[key] = originals[i];
    });
  }
});

test("single program needs no selector and route navigation marks the current section", () => {
  const home = renderPage("home");
  assert.match(home, /<h3>Blockchain Fundamentals 1<\/h3>/);
  assert.doesNotMatch(home, /Choose a program|aria-pressed=|Course 02|is-back/);
  for (const page of ["courses", "course", "community"]) {
    const section = page === "course" ? "courses" : page;
    assert.match(
      renderPage(page),
      new RegExp(`aria-current="page"[^>]*href="/${section}"`),
    );
  }
});

test("collapsed accordion panels are inert and use a non-clipping inner container", () => {
  for (const page of ["course", "community"]) {
    const html = renderPage(page);
    const panels = [
      ...html.matchAll(/<div[^>]*class="[^"]*web3t-accordion-panel"[^>]*>/g),
    ];
    assert.ok(panels.length > 0);
    for (const [panel] of panels) {
      assert.match(panel, /aria-hidden="true"/);
      assert.match(panel, /inert=""/);
    }
    assert.equal(
      [...html.matchAll(/class="web3t-accordion-panel__inner"/g)].length,
      panels.length,
    );
  }
});
