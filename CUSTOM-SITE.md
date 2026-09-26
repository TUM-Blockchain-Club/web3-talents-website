# Restored custom public site

The public design is restored from
`TUM-Blockchain-Club/Web3-Talents-Platform`, branch `web3talents-site`,
commit `08474507067c118a94a711a27389fd207906945d`.

The four static pages, stylesheet, interaction scripts and local assets live in
`public/`. `beforeFiles` rewrites serve the four pages at `/`, `/courses`,
`/course`, and `/community`. Legacy `.html` addresses permanently redirect to
these clean URLs, retaining existing bookmarks. The previous React implementation
remains in source for rollback. Navigation and asset paths are root-relative.

The standalone pages include their own box-sizing reset (previously inherited
from Moodle). Course wrapper classes must match the `.web3t-courses` and
`.web3t-course` stylesheet selectors. Community event cards use a responsive
grid with decorative puzzle images; their text stays in normal flow so longer
copy and small screens cannot overlap the illustrations or adjacent cards.

The compact homepage hero uses the original background image as its static
fallback. On fine-pointer desktops with no reduced-motion preference,
`hero-motion.js` samples the original artwork into tiny 3px cells. Within a 76px
cursor brush, colored pixels leave the image and flow outward with repulsion,
curl, and damped spring physics. Each moving cell is removed from its source;
the rest of the image remains intact. Pixels spring home when the cursor moves
away, and rendering stops once all pixels settle, or when hidden or blurred.
Touch, narrow screens, disabled JavaScript, unavailable canvas, and reduced-motion
preferences keep the original still image. Public cohort and
event dates remain “coming soon” until confirmed dates are available.

Run regression checks with `node --test tests/*.test.mjs`.

Login and Apply actions are intentionally disconnected from Moodle; `public/app.js`
marks them unavailable. No Moodle server, admin workflow, or database is changed.

Publish through this repository's existing Vercel Git integration. Reverting the
restoration commit restores the previous homepage.
