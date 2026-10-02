import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { renderPage } from "./react-render.cjs";

for (const page of ["home", "courses", "course", "community"]) {
  test(`${page}: one main landmark with a working skip target`, () => {
    const html = renderPage(page);
    assert.equal([...html.matchAll(/<main\b/g)].length, 1);
    assert.match(html, /href="#main-content"/);
    assert.match(html, /<main id="main-content" tabindex="-1">/);
    assert.equal([...html.matchAll(/<h1\b/g)].length, 1);
  });
  test(`${page}: consistent footer destinations and honest unavailable actions`, () => {
    const html = renderPage(page);
    assert.match(
      html,
      /href="https:\/\/www.linkedin.com\/company\/tum-blockchain-club\/"/,
    );
    assert.match(html, /href="https:\/\/forms.tum-blockchain.com\/contact"/);
    assert.match(html, /href="\/community">About Us/);
    assert.match(html, /href="(?:\/community)?#faq">FAQ/);
    assert.doesNotMatch(html, /Apply Now|>Sign Up</);
    assert.match(html, /Login<span class="web3t-action-status">Coming soon/);
  });
}

test("below-fold speaker images reserve space and load lazily", () => {
  for (const page of ["home", "course"]) {
    const images = [...renderPage(page).matchAll(/<img\b[^>]*__photo[^>]*>/g)];
    assert.ok(images.length >= 3);
    for (const [image] of images) {
      assert.match(
        image,
        /width="220" height="220" loading="lazy" decoding="async"/,
      );
    }
  }
});

test("course panels are reachable after keyboard tab selection", () => {
  const panels = [
    ...renderPage("course").matchAll(/<div\b[^>]*role="tabpanel"[^>]*>/g),
  ];
  assert.equal(panels.length, 3);
  for (const [panel] of panels) assert.match(panel, /tabindex="0"/);
});

test("secondary text palette meets 4.5:1 against its specified solid surfaces", () => {
  const luminance = (hex) => {
    const rgb = hex
      .match(/\w\w/g)
      .map((n) => parseInt(n, 16) / 255)
      .map((n) => (n <= 0.04045 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4));
    return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
  };
  for (const [text, surface] of [
    ["b7b1c8", "15151e"],
    ["e1dfff", "14112f"],
    ["d3cfdf", "01061c"],
    ["c2bdff", "15151e"],
  ]) {
    assert.ok((luminance(text) + 0.05) / (luminance(surface) + 0.05) >= 4.5);
  }
});

test("usability layer keeps testimonials unclipped and navigation offset from anchors", () => {
  const css = readFileSync(
    new URL("../public/usability.css", import.meta.url),
    "utf8",
  );
  assert.match(
    css,
    /\.web3t-course-students__masonry\s*\{[^}]*max-height: none;[^}]*overflow: visible;/,
  );
  assert.match(
    css,
    /scroll-margin-top: calc\(var\(--w3-header-height\) \+ 20px\)/,
  );
  assert.match(css, /\.web3t-nav\s*\{[^}]*position: sticky/);
});
