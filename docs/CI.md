# CI Operator Notes

`possum-ai-tutor` is a Vite/TypeScript app deployed from the repository root.
The CI workflow validates the same production path that Netlify uses.

The root CI gate runs:

- `pnpm install --frozen-lockfile`
- `pnpm run check`
- `pnpm test`
- `pnpm run build`

The workflow lets `pnpm/action-setup` read the exact hashed `packageManager`
entry from `package.json`. It uses explicit setup actions instead of relying on
Corepack so local or runner-side Corepack key rotation issues do not block the
pipeline.
