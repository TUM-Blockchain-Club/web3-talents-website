# Restored custom public site

The public design is restored from
`TUM-Blockchain-Club/Web3-Talents-Platform`, branch `web3talents-site`,
commit `08474507067c118a94a711a27389fd207906945d`.

The four static pages, stylesheet, interaction scripts and local assets live in
`public/`. A `beforeFiles` rewrite serves `public/index.html` at `/`, replacing
the homepage without changing its address. The previous React implementation
remains in source for rollback. Courses and Community links stay within this site.

Login and Apply actions are intentionally disconnected from Moodle; `public/app.js`
marks them unavailable. No Moodle server, admin workflow, or database is changed.

Publish through this repository's existing Vercel Git integration. Reverting the
restoration commit restores the previous homepage.
