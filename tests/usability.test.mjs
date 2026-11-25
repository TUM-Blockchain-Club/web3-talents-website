import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { renderPage } from "./react-render.cjs";

test("public pages use normal scrolling without section snapping", () => {
  const css = readFileSync(new URL("../public/usability.css", import.meta.url), "utf8");
  assert.doesNotMatch(css, /scroll-snap-type: y|scroll-snap-stop/);
  const js = readFileSync(new URL("../lib/page-interactions.mjs", import.meta.url), "utf8");
  assert.doesNotMatch(js, /initScrollHeader|preventDefault|addEventListener\("wheel"/);
});

test("footer social icon reserves a compact square with an accessible click target", () => {
  for (const page of ["home", "course", "community"]) {
    const icon = renderPage(page).match(/<img[^>]*class="web3t-footer__linkedin"[^>]*>/)?.[0];
    assert.ok(icon);
    assert.match(icon, /width="32" height="32"/);
  }
  const css = readFileSync(new URL("../public/styles.css", import.meta.url), "utf8");
  assert.match(css, /\.web3t-footer__social-link\{[^}]*width:44px;height:44px/);
  assert.match(css, /\.web3t-footer__linkedin\{[^}]*width:32px;height:32px;aspect-ratio:1;object-fit:contain/);
  const svg = readFileSync(new URL("../public/assets/social-linkedin.svg", import.meta.url), "utf8");
  assert.match(svg, /preserveAspectRatio="xMidYMid meet"/);
});

test("learning steps keep text in document flow before fonts or JavaScript load", () => {
  const css = readFileSync(new URL("../public/styles.css", import.meta.url), "utf8");
  assert.match(css, /\.web3t-steps__list\{[^}]*display:grid/);
  assert.match(css, /\.web3t-step\{[^}]*minmax\(0,1fr\)/);
  assert.doesNotMatch(css, /\.web3t-step__(?:badge|text)\{[^}]*position:absolute/);
  assert.doesNotMatch(css, /\.web3t-steps__canvas\{[^}]*aspect-ratio:/);
  assert.match(css, /\.web3t-step__text h3[^}]*white-space:normal/);
  const layout = readFileSync(new URL("../app/layout.tsx", import.meta.url), "utf8");
  for (const [file, precedence] of [["styles", "base"], ["interactions", "interactions"], ["usability", "usability"]]) {
    assert.ok(layout.includes(`href="/${file}.css" precedence="${precedence}"`));
  }
  for (const font of ["Inter-400", "SpaceGrotesk-500"]) {
    assert.ok(layout.includes(`rel="preload" href="/assets/${font}.woff2" as="font"`));
  }
});

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
    assert.doesNotMatch(html, />Sign Up</);
    assert.match(html, /href="https:\/\/tally.so\/r\/BE4l9Y"[^>]*>Apply now<\/a>/);
    const header = html.match(/<header\b[\s\S]*?<\/header>/)?.[0];
    assert.ok(header);
    assert.match(header, /href="https:\/\/moodle.web3-talents.com\/login\/"[^>]*>Student login<\/a>/);
    assert.doesNotMatch(header, /Coming soon|data-login/);
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
