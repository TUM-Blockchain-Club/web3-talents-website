import assert from "node:assert/strict";
import { test } from "node:test";
import { initPageInteractions } from "../lib/page-interactions.mjs";
import { renderPage } from "./react-render.cjs";

test("page entrances run once, respect preference changes, and clean up on navigation", () => {
  const previousMedia = globalThis.matchMedia;
  const previousObserver = globalThis.IntersectionObserver;
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
  const target = {
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
  globalThis.IntersectionObserver = class {
    constructor(listener) {
      callback = listener;
    }
    observe() {}
    unobserve() {}
    disconnect() {
      disconnected = true;
    }
  };
  try {
    const dispose = initPageInteractions({ querySelectorAll: () => [target] });
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
  }
});

test("program selection is accessible and route navigation marks the current section", () => {
  const home = renderPage("home");
  assert.match(home, /role="group" aria-label="Choose a program"/);
  assert.match(home, /aria-pressed="true"[^>]*>Course 01/);
  assert.match(home, /aria-pressed="false"[^>]*>Course 02/);
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
