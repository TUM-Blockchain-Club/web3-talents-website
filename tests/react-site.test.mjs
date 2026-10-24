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
  test(`${page}: local assets exist and only application actions are connected`, () => {
    const html = renderPage(page);
    for (const [, asset] of html.matchAll(/(?:src|href)="\/(assets\/[^"?#]+)"/g)) {
      assert.ok(existsSync(new URL(asset, publicDir)), `Missing ${asset}`);
    }
    for (const [action] of html.matchAll(/<a\b[^>]*data-login[^>]*>/g)) {
      assert.match(action, /aria-disabled="true"/);
      assert.doesNotMatch(action, /href=/);
    }
    const applications = [...html.matchAll(/<a\b[^>]*data-apply[^>]*>/g)];
    assert.ok(applications.some(([action]) => !action.includes('aria-disabled')));
    for (const [action] of applications) {
      if (action.includes('aria-disabled="true"')) {
        assert.doesNotMatch(action, /href=/); // Unconfirmed community events stay unavailable.
        continue;
      }
      assert.match(action, /href="https:\/\/tally.so\/r\/BE4l9Y"/);
      assert.doesNotMatch(action, /aria-disabled|tabindex="-1"/);
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

test('Blockchain Fundamentals 1 is named consistently without announcing other courses', () => {
  for (const page of ['home', 'courses', 'course']) {
    const content = inventory(renderPage(page));
    assert.ok(content.headings.includes('Blockchain Fundamentals 1'));
    assert.doesNotMatch(content.text, /Course 01|Placeholder information|This preview does not represent an announced course/);
  }
  for (const page of ['home', 'courses']) {
    const html = renderPage(page);
    assert.doesNotMatch(inventory(html).text, /Course 0[123]|Further course information|Title and curriculum to be confirmed/);
    assert.equal(inventory(html).headings.filter(title => title === 'Blockchain Fundamentals 1').length, 1);
  }
  assert.doesNotMatch(renderPage('courses'), /Courses slider/);
  assert.match(inventory(renderPage('course')).text, /10 topics/);
});

test('confirmed peer-teaching format is restored without unconfirmed schedules or fees', () => {
  const home = inventory(renderPage('home')).text;
  for (const label of ['Expert Input', 'Become a Specialist', 'Teach your Peers', 'Build on What You Learn']) {
    assert.ok(home.includes(label));
  }
  assert.doesNotMatch(home, /program format is being finalized|Session formats and learning activities will be announced/);
  const courses = inventory(renderPage('courses')).text;
  for (const label of ['Lecture weeks and presentation weeks alternate', 'small peer groups of three', '10–15-minute presentation', 'jigsaw learning model']) {
    assert.ok(courses.includes(label));
  }
  const course = inventory(renderPage('course')).text;
  assert.match(course, /small peer groups/);
  assert.doesNotMatch(course, /Learning activities — to be confirmed/);
  assert.match(home, /COST FREE/);
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
    assert.doesNotMatch(html, /testimonial-avatar|community-photo\.png|Blabla|Annual Alumni|Jan 2027|10-week|3–4 hours|recognised certificate/);
    assert.doesNotMatch(html, /Cohort 2/);
  }
});

test('confirmed free twenty-week program and December start are consistent', () => {
  for (const page of pages) {
    const text = inventory(renderPage(page)).text;
    assert.match(text, /20[ -]weeks?/i);
    assert.match(text, /free/i);
    assert.doesNotMatch(text, /COST TO BE CONFIRMED|DURATION TO BE CONFIRMED|Fees, if any|any fees|Duration, session times/);
    assert.match(text, /December 1, 2026/);
    assert.doesNotMatch(text, /TBD|start date.*to be announced|Applications coming soon|Curriculum and requirements to be confirmed/);
  }
});

test('confirmed application dates are published without inventing a form URL or timezone', () => {
  for (const page of ['home', 'course', 'community']) {
    assert.match(inventory(renderPage(page)).text, /November 8, 2026 at 23:59/);
  }
  for (const page of ['course', 'community']) {
    const text = inventory(renderPage(page)).text;
    assert.match(text, /November 22, 2026/);
    assert.match(text, /deadline timezone is still to be confirmed/);
    assert.match(text, /additional time/i);
  }
  for (const page of pages) {
    assert.match(inventory(renderPage(page)).text, /Apply now/);
    assert.doesNotMatch(inventory(renderPage(page)).text, /Application link pending|link will be added/);
  }
});

test('curriculum covers all ten topic pairs and preserves unique accordion targets', () => {
  const html = renderPage('course');
  const text = inventory(html).text;
  for (let start = 1; start < 20; start += 2) {
    assert.match(text, new RegExp(`Weeks ${start}–${start + 1}:`));
  }
  for (const topic of ['Decentralization', 'Cryptography', 'Wallets', 'Bitcoin', 'Proof-of-Stake', 'Ethereum', 'Smart Contracts', 'Tokenomics', 'Real World Assets', 'Taxation']) {
    assert.ok(text.includes(topic));
  }
  const ids = [...html.matchAll(/ id="(course-accordion-\d+)"/g)].map(match => match[1]);
  assert.equal(ids.length, 10);
  assert.equal(new Set(ids).size, ids.length);
  assert.match(text, /10–15-minute presentation/);
  assert.match(text, /Cameras are required/);
  assert.doesNotMatch(text, /second expert lecture|follow-up expert lecture|option B|Screening:|burned out|Speaker can pitch/);
});

test('both pages show the same three previous speakers with real portraits', () => {
  const sections = ['home', 'course'].map(page => renderPage(page).match(/<section[^>]*id="speakers"[\s\S]*?<\/section>/)[0]);
  const portraits = sections.map(section => [...section.matchAll(/<img[^>]*src="([^"]+)"[^>]*alt="([^"]+)"/g)].map(([,src,alt]) => ({src,alt})));
  assert.deepEqual(portraits[0], portraits[1]);
  assert.deepEqual(portraits[0].map(p => p.alt), ['Dr. David An', 'Jonas Gebele', 'David Kurz']);
  for (const section of sections) {
    assert.match(section, /Previous speakers/);
    assert.match(section, /Speakers from previous cohorts/);
    assert.match(section, /lineup will be announced separately/);
    assert.doesNotMatch(section, /speaker-placeholder|Andi Schmitt|Philip Maume|Christian Ziegler/);
    assert.equal([...section.matchAll(/Previous topic:/g)].length, 3);
  }
});

test('speaker profiles and remaining testimonials render without testimonial images', () => {
  for (const [page, count] of [['home', 3], ['course', 7]]) {
    const html = renderPage(page);
    assert.match(html, /Dr\. David An/);
    assert.match(html, /Jonas Gebele/);
    assert.equal([...html.matchAll(/<blockquote>/g)].length, count);
    const testimonials = [...html.matchAll(/<figure\b[^>]*web3t-quote--text-only[^>]*>[\s\S]*?<\/figure>/g)];
    assert.equal(testimonials.length, count);
    for (const [testimonial] of testimonials) assert.doesNotMatch(testimonial, /<img\b/);
  }
});

test('unified course page keeps the detail wrapper and cube artwork', () => {
  const css = readFileSync(new URL('styles.css', publicDir), 'utf8');
  for (const page of ['courses', 'course']) {
    assert.match(renderPage(page), /class="web3t web3t-course"/);
    assert.match(renderPage(page), /class="web3t-course__cubes" aria-hidden="true"/);
    assert.ok(css.includes('.web3t-course__cubes'));
  }
});

test('all course entry points use one page and legacy links redirect directly', async () => {
  const homepage = renderPage('home');
  assert.match(homepage, /href="\/courses"[^>]*>Course Details<\/a>/);
  for (const page of pages) {
    const html = renderPage(page);
    assert.doesNotMatch(html, /href="\/course"|All Courses/);
    assert.match(html, /href="\/courses"/);
  }
  const routes = await config.redirects();
  for (const source of ['/course', '/course.html', '/courses.html']) {
    assert.deepEqual(routes.find(route => route.source === source), { source, destination: '/courses', permanent: true });
  }
  const entry = readFileSync(new URL('../app/courses/page.tsx', import.meta.url), 'utf8');
  assert.match(entry, /import \{ CoursePage \} from "@\/components\/public-site\/course-sections"/);
  assert.match(entry, /export default CoursePage/);
  assert.equal(existsSync(new URL('../app/course/page.tsx', import.meta.url)), false);
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
