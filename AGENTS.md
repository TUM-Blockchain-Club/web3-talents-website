# Repository Guide

- This project uses Next.js App Router and React. Keep route changes in the existing app directory and reuse shared components.
- Use pnpm; install from pnpm-lock.yaml with `pnpm install --frozen-lockfile --ignore-scripts`.
- Run the available build, lint, typecheck and test scripts before committing. Keep dependency patches separate from feature changes.
- Treat environment files, credentials and generated private data as local-only. Do not run database, email or blockchain mutations during dependency verification.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
