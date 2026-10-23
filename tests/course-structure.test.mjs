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
  const weeks = [
    ...html.matchAll(/<li class="web3t-co-week [^"]*">([\s\S]*?)<\/li>/g),
  ].map(([, week]) => inventory(week).text);
  assert.equal(weeks.length, 2);
  assert.match(
    weeks[0],
    /Week 1 Learn & prepare.*Expert lecture.*Research & prepare/,
  );
  assert.match(weeks[1], /Week 2 Present & exchange.*Peer teaching/);
  assert.doesNotMatch(weeks[1], /Research & prepare/);
  for (const icon of ["lecture", "research", "teach", "loopback"]) {
    assert.match(html, new RegExp(`/assets/icon-${icon}.svg`));
  }
  assert.ok(
    html.indexOf("for research and preparation.") <
      html.indexOf("web3t-co-timeline"),
  );
  assert.match(
    inventory(html).text,
    /Repeat with the next topic · 10 topics over 20 weeks/,
  );
  assert.doesNotMatch(
    html,
    /web3t-co-badge|Step [123]|Week 3\b|AT THE START|href="\/course"/,
  );
});
