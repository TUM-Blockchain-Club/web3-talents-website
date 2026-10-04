import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { test } from 'node:test';
import config from '../next.config.mjs';
import { renderPage } from './react-render.cjs';
import { inventory } from './page-inventory.mjs';

const baseline = JSON.parse(readFileSync(new URL('./public-content-baseline.json', import.meta.url), 'utf8'));
const pages = ['home', 'courses', 'course', 'community'];
const publicDir = new URL('../public/', import.meta.url);

for (const page of pages) {
  test(`${page}: actual React render matches the current public content`, () => {
    assert.deepEqual(inventory(renderPage(page)), baseline[page]);
  });
  test(`${page}: local assets exist and public actions remain disconnected`, () => {
    const html = renderPage(page);
    for (const [, asset] of html.matchAll(/(?:src|href)="\/(assets\/[^"?#]+)"/g)) {
      assert.ok(existsSync(new URL(asset, publicDir)), `Missing ${asset}`);
    }
    for (const [action] of html.matchAll(/<a\b[^>]*data-(?:login|apply)[^>]*>/g)) {
      assert.match(action, /aria-disabled="true"/);
      assert.doesNotMatch(action, /href=/);
    }
    assert.doesNotMatch(html, /(?:130\.61\.104\.92|login\/index\.php|\.html["#?])/);
    assert.doesNotMatch(html, /August 2026|July 15|JULY 2026|Dec 15|January 15th|June, 13|Jun-2024|17 days to apply|Applications Open/);
  });
}

test('every old URL redirects to an existing React route, without HTML rewrites', async () => {
  assert.equal(config.rewrites, undefined);
  for (const redirect of await config.redirects()) {
    assert.equal(redirect.permanent, true);
    assert.ok(existsSync(new URL(`../app${redirect.destination === '/' ? '' : redirect.destination}/page.tsx`, import.meta.url)));
    assert.equal(existsSync(new URL(redirect.source.slice(1), publicDir)), false);
  }
});

test('Blockchain Fundamentals 1 is named consistently without announcing other courses or dates', () => {
  for (const page of ['home', 'courses', 'course']) {
    const content = inventory(renderPage(page));
    assert.ok(content.headings.includes('Blockchain Fundamentals 1'));
    assert.doesNotMatch(content.text, /Course 01|Placeholder information|This preview does not represent an announced course/);
  }
  assert.match(inventory(renderPage('home')).text, /Course 02 Further course information/);
  assert.match(inventory(renderPage('courses')).text, /Course 02 Title and curriculum to be confirmed/);
  assert.match(inventory(renderPage('courses')).text, /Course 03 Title and curriculum to be confirmed/);
  assert.match(inventory(renderPage('course')).text, /Curriculum, dates, and requirements will be published once confirmed/);
});

test('confirmed peer-teaching format is restored without unconfirmed schedules or fees', () => {
  const home = inventory(renderPage('home')).text;
  for (const label of ['Expert Input', 'Become a Specialist', 'Teach your Peers', 'Expert Validation']) {
    assert.ok(home.includes(label));
  }
  assert.doesNotMatch(home, /program format is being finalized|Session formats and learning activities will be announced/);
  const courses = inventory(renderPage('courses')).text;
  for (const label of ['Lecture + Assignment', 'Processing in Specialist Groups', 'Group Teaching + New Lecture', 'PROGRESSIVE LEARNING CYCLE']) {
    assert.ok(courses.includes(label));
  }
  const course = inventory(renderPage('course')).text;
  assert.match(course, /small peer groups/);
  assert.doesNotMatch(course, /Learning activities — to be confirmed/);
  assert.match(home, /COST TO BE CONFIRMED/);
});

test('favicon uses the original standalone Web3 Talents mark, not the wide wordmark', () => {
  const layout = readFileSync(new URL('../app/layout.tsx', import.meta.url), 'utf8');
  assert.doesNotMatch(layout, /icons\s*:/);
  const icon = readFileSync(new URL('../app/icon.png', import.meta.url));
  assert.equal(icon.subarray(1, 4).toString(), 'PNG');
  assert.equal(icon.readUInt32BE(16), 1400);
  assert.equal(icon.readUInt32BE(20), 1400);
});

test('testimonial photos and unconfirmed event/course specifics stay removed', () => {
  for (const page of pages) {
    const html = renderPage(page);
    assert.doesNotMatch(html, /testimonial-avatar|community-photo\.png|Blabla|Annual Alumni|Jan 2027|20[ -][Ww](?:eek|EEK)|10-week|3–4 hours|recognised certificate/);
    assert.match(html, /to be (?:confirmed|announced)|coming soon/i);
  }
});

test('speaker profiles and all testimonial statements are restored without testimonial images', () => {
  for (const [page, count] of [['home', 5], ['course', 8]]) {
    const html = renderPage(page);
    assert.match(html, /Dr\. David An/);
    assert.match(html, /Jonas Gebele/);
    assert.equal([...html.matchAll(/<blockquote>/g)].length, count);
    const testimonials = [...html.matchAll(/<figure\b[^>]*web3t-quote--text-only[^>]*>[\s\S]*?<\/figure>/g)];
    assert.equal(testimonials.length, count);
    for (const [testimonial] of testimonials) assert.doesNotMatch(testimonial, /<img\b/);
  }
});

test('course wrappers and original stylesheet remain intact', () => {
  const css = readFileSync(new URL('styles.css', publicDir), 'utf8');
  for (const page of ['courses', 'course']) {
    assert.match(renderPage(page), new RegExp(`class="web3t web3t-${page}"`));
    assert.ok(css.includes(`.web3t-${page}`));
  }
});

test('header uses the blue symbol and preserves an accessible home link on every page', () => {
  for (const page of pages) {
    const header = renderPage(page).match(/<header\b[\s\S]*?<\/header>/)[0];
    assert.match(header, /aria-label="Web3 Talents home"/);
    assert.match(header, /web3t-nav__blue-symbol/);
    assert.match(header, /web3t-nav__wordmark/);
    assert.doesNotMatch(header, /<img/);
  }
  const css = readFileSync(new URL('interactions.css', publicDir), 'utf8');
  assert.match(css, /\.web3t-nav__blue-symbol\s*\{[^}]*hero-bg\.png/);
});

test('components use React markup, not embedded HTML or legacy global scripts', () => {
  const directory = new URL('../components/public-site/', import.meta.url);
  for (const file of readdirSync(directory).filter(name => name.endsWith('.tsx'))) {
    const source = readFileSync(new URL(file, directory), 'utf8');
    assert.doesNotMatch(source, /dangerouslySetInnerHTML|innerHTML|<script|document\.querySelector/);
  }
  assert.equal(existsSync(new URL('app.js', publicDir)), false);
  assert.equal(existsSync(new URL('hero-motion.js', publicDir)), false);
});

test('tabs and accordion initial states expose appropriate accessibility semantics', () => {
  const html = renderPage('course');
  assert.equal([...html.matchAll(/role="tab"/g)].length, 3);
  assert.equal([...html.matchAll(/aria-selected="true"/g)].length, 1);
  assert.equal([...html.matchAll(/role="tabpanel"/g)].length, 3);
  assert.equal([...html.matchAll(/role="tabpanel"[^>]*hidden=""/g)].length, 2);
  for (const [button] of html.matchAll(/<button[^>]*class="web3t-course-phase__head"[^>]*>/g)) {
    assert.match(button, /aria-expanded="false"/);
    assert.match(button, /aria-controls="course-accordion-\d+"/);
  }
});
