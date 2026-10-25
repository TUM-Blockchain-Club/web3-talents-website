# Dependency maintenance

Keep Next.js and eslint-config-next on the same patched release; React and React DOM share an exact version. Use pnpm and the committed pnpm-lock.yaml. The npm lockfile is superseded by this lockfile.

Install with `pnpm install --frozen-lockfile --ignore-scripts`, then run the available build, lint, typecheck and test scripts. Audit with `pnpm audit`. Verify builds with synthetic configuration; keep database, email and blockchain mutations out of dependency checks.
