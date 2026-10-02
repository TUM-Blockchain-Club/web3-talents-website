# Public website component guide

Only `web3-talents.com` is covered here. The Oracle Moodle application remains in
its own repository and is not changed or connected by this migration.

## Routes

| URL | Page composition |
| --- | --- |
| `/` | `components/public-site/home-sections.tsx` |
| `/courses` | `components/public-site/courses-sections.tsx` |
| `/course` | `components/public-site/course-sections.tsx` |
| `/community` | `components/public-site/community-sections.tsx` |

The small `app/**/page.tsx` files provide metadata and route entry points. Each
section is a named React component that can be rearranged or extended without
copying a whole page. The previous HTML files and global initialization scripts
are replaced, not embedded inside React. Their originals remain in Git history
(last static version: `576f638`). Old `.html` links permanently redirect to the
matching clean URL.

## Reusable pieces

- `site-header.tsx` / `site-footer.tsx`: shared navigation and branding. The header
  pairs the blue/purple hero symbol with the existing white wordmark; the footer
  retains its original branding.
- `cards.tsx`: course, speaker, testimonial, diversity, and club-event cards.
- `program-cards.tsx`: interactive stacked program cards and their content.
- `carousel.tsx`: responsive scroll carousel with pagination, previous/next
  buttons, native touch scrolling, and arrow-key navigation on the viewport.
- `accordion.tsx`: FAQ/curriculum items and an optional expand-all group.
- `course-tabs.tsx`: keyboard-accessible course description/curriculum/FAQ tabs.
- `particle-logo.tsx`: lifecycle and still fallback for the drifting logo field.
  `lib/logo-field.mjs` controls twenty-seven logo tracks, speeds, sizes, sprite sampling,
  and localized hover breakup. It reuses the original blue/purple artwork from
  `assets/hero-bg.png`, compositing away its dark background. Drift speeds are
  34–62 pixels per second (twice the initial speed).
  Symbols are approximately 40% larger than the initial eighteen-logo field.
  Nine additional staggered tracks increase density by 50% without changing the
  existing logo sizes, drift speeds, or hover radius.
  `lib/hero-particles.mjs` supplies the shared spring/repulsion physics.
  The field pauses off-screen or in background tabs, honors reduced motion, and
  provides a pause/resume control visible only on keyboard focus, keeping it out of
  the visual design. Hover particles keep following the moving logo.
- `unavailable-action.tsx`: disabled public calls to action. Intentionally no
  Moodle login, application, or registration destination.

Most sections are Server Components. Small client components own interactive
state, event handlers, observers, and animation cleanup. Next.js prerenders the
pages for fast loading; that does **not** mean they are plain HTML pages anymore.
React hydrates the interactive components, and internal links use client routing.

## Appearance

The React migration retained `public/styles.css` and `public/assets/`. Existing class names,
wrappers, fonts, colors, spacing, text, and asset URLs are preserved. Native image
elements deliberately retain the current sizing rules. Do not import the older
`app/globals.css` or older top-level `components/` homepage into these routes:
those belong to the previous, different design.

The homepage hero now uses a drifting field of small logo symbols instead of the
single large background illustration; its text, dimensions, and links are unchanged.

`public/interactions.css` adds hover/focus feedback, active navigation underlines,
tab transitions, and intrinsic-height accordion transitions without replacing the
original stylesheet. Program selector pills make both stacked cards reachable on
mobile. Value-card descriptions remain visible on touch devices. The shared
header initializes `lib/page-interactions.mjs` against its page container for
one-time, subtle scroll entrances; content is never hidden while waiting for JS.
Observers and animations are disposed on navigation. Reduced-motion preferences
disable animated transitions and scroll entrances (including changes at runtime).

Example of adding another course card inside the existing carousel:

```tsx
<CourseCard title="Another course" variant="cyan" status="Coming Soon" />
```

## Checks

`public/usability.css` contains the focused usability refinements (compact sticky
header, keyboard navigation, readable secondary text, and unclipped content).
See [the usability audit](frontend-usability-audit.md) for research and verification.

```sh
npm test
npm run typecheck
npm run build
npm run dev
```

Courses, community photos, and events retain clearly labeled placeholders. Speaker
profiles and the previous testimonial statements were restored at the user's
request; testimonial photos remain removed. This restoration is not independent
verification of the statements. Do not reintroduce event addresses, dates, or
unconfirmed curricula. Unused testimonial image assets remain in the repository
but are not rendered on the public pages.

Tests server-render the real TSX pages and compare their text, headings, and
images against the current public content inventory. They also cover redirects,
assets, disabled CTAs, initial accessibility state, particle physics, and entrance
animation cleanup/reduced motion. Program-selector labels repeat existing titles
and are excluded from the original prose inventory, with separate semantic tests.
When intentionally changing content, update the corresponding inventory entry.
Browser checks are still needed for interactive behavior and visual changes.
