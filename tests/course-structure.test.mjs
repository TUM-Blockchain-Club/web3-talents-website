import assert from "node:assert/strict";
import { test } from "node:test";
import { renderPage } from "./react-render.cjs";
import { inventory } from "./page-inventory.mjs";

test("restored course timeline accompanies the unchanged description on the unified page", () => {
  const html = renderPage("course");
  const paragraphs = [
    ...html.matchAll(/<p class="web3t-course-about__desc">([\s\S]*?)<\/p>/g),
  ].map(([, p]) => inventory(p).text);
  assert.deepEqual(paragraphs, [
    "Lecture weeks and presentation weeks alternate. An industry expert introduces a topic in a live lecture with Q&A. In small peer groups of three, you research one of four subtopics and prepare a 10–15-minute presentation. The following week, you teach your subtopic to other groups and learn from theirs — the jigsaw learning model. A new topic begins at the next lecture session.",
    "Sessions last 1.5 hours and take place online on Tuesdays. Teams rotate during the program so you can work with more peers. Use Moodle for materials and assignments, and Zoom for meetings; recordings and additional learning resources are provided. Cameras are required during sessions.",
    "For each presentation, create an original diagram, timeline, or comparison table, and use primary sources such as whitepapers and developer documentation. Set aside additional time outside sessions for research and preparation.",
  ]);
  assert.equal([...html.matchAll(/class="web3t-co-timeline"/g)].length, 1);
  for (const step of ["foundation", "research", "teach"]) {
    assert.match(html, new RegExp(`web3t-co-step--${step}`));
  }
  for (const icon of ["lecture", "research", "teach", "loopback"]) {
    assert.match(html, new RegExp(`/assets/icon-${icon}.svg`));
  }
  assert.ok(
    html.indexOf("for research and preparation.") <
      html.indexOf("web3t-co-timeline"),
  );
  assert.match(inventory(html).text, /The next topic starts again at Step 1/);
  assert.doesNotMatch(html, /AT THE START|href="\/course"/);
});
