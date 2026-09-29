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

- `site-header.tsx` / `site-footer.tsx`: shared navigation and branding.
- `cards.tsx`: course, speaker, testimonial, diversity, and club-event cards.
- `program-cards.tsx`: interactive stacked program cards and their content.
- `carousel.tsx`: responsive scroll carousel with working pagination.
- `accordion.tsx`: FAQ/curriculum items and an optional expand-all group.
- `course-tabs.tsx`: keyboard-accessible course description/curriculum/FAQ tabs.
- `particle-logo.tsx`: lifecycle and still fallback for the drifting logo field.
  `lib/logo-field.mjs` controls eighteen logo tracks, speeds, sizes, sprite sampling,
  and localized hover breakup. It reuses the original blue/purple artwork from
  `assets/hero-bg.png`, compositing away its dark background. Drift speeds are
  34–62 pixels per second (twice the initial speed).
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

Example of adding another course card inside the existing carousel:

```tsx
<CourseCard title="Another course" variant="cyan" status="Coming Soon" />
```

## Checks

```sh
npm test
npm run typecheck
npm run build
npm run dev
```

Tests server-render the real TSX pages and compare their text, headings, and
images against the pre-migration content inventory. They also cover redirects,
assets, disabled CTAs, initial accessibility state, and particle physics.
When intentionally changing content, update the corresponding inventory entry.
Browser checks are still needed for interactive behavior and visual changes.
