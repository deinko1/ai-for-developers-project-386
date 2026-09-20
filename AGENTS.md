# AGENTS.md

Rails 8.1 API + Vite/React SPA ("Календарь звонков"). Two independent apps in one repo:
`backend/` (Rails, :3000) and `frontend/` (Vite, :5173). The root `Makefile` is the source of
truth for commands — run everything through `make`, which adds mise/Homebrew to PATH and wraps
tools in `mise exec --` (a raw `rails`/`npm` may not resolve).

## Commands

- `make setup` — install gems + npm deps (root, frontend) and prepare the DB. Run after clone.
- `make dev` — Rails (:3000) + Vite (:5173) together (foreman / `Procfile.dev`).
- `make check` — lint + test + typecheck. Canonical local gate and pre-commit hook; CI equivalent:
  `Lint` (RuboCop + oxlint), `Backend` (Brakeman, bundler-audit, Rails tests), `Frontend`
  (typecheck + Vitest), `Commit messages` (PRs only). Run before finishing.
- `make test` — backend tests + frontend tests + frontend typecheck (no lint).
- `make lint` — RuboCop + oxlint.
- Single backend test: `cd backend && mise exec -- bin/rails test test/integration/api/v1/health_test.rb`
- Single frontend test: `cd frontend && mise exec -- npm run test -- src/test/dummy.test.tsx`
- `backend/bin/ci` — backend-only pipeline (RuboCop, bundler-audit, Brakeman, tests, seed replant).
- Other targets (coverage, watch, console, routes, db-*): see the `Makefile`.

## Toolchain quirks

- Frontend lint is **oxlint**, not ESLint. TS uses project references, so typecheck is `tsc -b`.
- Tailwind v4 is configured via the Vite plugin + `frontend/src/index.css` — there is no
  `tailwind.config.js`. Don't create one.
- shadcn/ui: add with `cd frontend && npx shadcn@latest add <name>`; generated files go in
  `src/components/ui` and are ignored by oxlint.
- Vitest runs without globals — import `describe/it/expect` from `vitest`. Tests sit next to code
  as `*.test.tsx`; RTL cleanup is registered in `frontend/src/test/setup.ts`.
- Frontend calls relative `/api/...`; in dev this is proxied to :3000, so no CORS locally.

## Conventions (enforced)

- Conventional Commits (`<type>(<scope>): <description>`), checked by the `commit-msg` hook
  (commitlint) and CI on PRs. release-please derives versions: `fix:` patch, `feat:` minor,
  `feat!`/`BREAKING CHANGE:` major.
- Install hooks once per clone: `make hooks` (sets `core.hooksPath .githooks`). pre-commit runs
  `make check`; bypass with `git commit --no-verify`.
- New features must ship with tests: Minitest in `backend/test/`, Vitest + RTL in
  `frontend/src/**/*.test.tsx`.
- Stay local by default: never commit, push, or open/merge a PR without asking the user
  first. Leave changes in the working tree so the user can review them in their editor, and
  ask before any `git commit`, `git push`, or PR action.
- Before opening a PR, have the `pr-reviewer` subagent review the branch
  (`.opencode/agents/pr-reviewer.md`) and fix any `blocker` findings.
- Never edit, delete, or rename `.github/workflows/hexlet-check.yml` or the repository — Hexlet-managed.

## Env

`DATABASE_URL` (overrides `config/database.yml`), `FRONTEND_ORIGIN` (prod CORS), `RAILS_MAX_THREADS`
(DB pool, default 5). No `.env.example` is committed.

## Agent skills

### Issue tracker

Issues and specs live as GitHub issues (via `gh`) in `deinko1/ai-for-developers-project-386`. See `docs/agents/issue-tracker.md`.

### Triage labels

The five canonical triage roles, label strings equal to their names. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context repo (one `CONTEXT.md` + `docs/adr/` at the root). See `docs/agents/domain.md`.
