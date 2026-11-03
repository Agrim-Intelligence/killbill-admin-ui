# This repo's rules

This repo holds Playwright tests, page objects, and typed test data that
**Omega generates and heals** — it does not hold your product's source code.
Read this before touching anything in `pages/`, `data/`, or `tests/`.

## The one rule

**This repo's tests are only ever touched by Omega, via the Run API.** A
human or an AI agent (Claude Code, an MCP client, anything) working in this
repo triggers `/generate` or `/heal` and gets a PR back — never hand-edit
`pages/*.page.ts`, `data/*.data.ts`, or `tests/**/*.spec.ts` directly, and no
session generates, edits, or heals a test itself. That is Omega's own
ADR-004, restated here for this repo since you won't have Omega's own docs
open while you're in this one:

> AI surfaces are trigger-only. Claude Code plugin, MCP tools, repo skills,
> CLI: all call the API and return results. No agent session generates,
> edits, or heals a test directly — that recreates the two-engine problem
> the merge exists to kill.

A direct edit to a managed path will drift from Omega's own record of that
file and be silently overwritten the next time `/generate` or `/heal` runs
against it. The commit hook in this repo
(`scripts/gate-omega-managed-paths.sh`, wired via `.githooks/commit-msg`)
blocks a commit on a managed path unless it carries the `Omega-Run-Id`
trailer Omega's own delivery stamps on the commits it opens — that trailer
is the only thing separating "Omega wrote this" from "someone hand-edited
Omega's output", so a commit missing it on a managed path is blocked before
it lands.

## What to do instead

| You want to... | Do this |
|---|---|
| Add a new test | Trigger `/generate` with a plain-language requirement, or a ticket reference if this instance has one configured. Wait for the PR. |
| Fix a broken test | Trigger `/heal` with the failing spec. Wait for the PR. |
| Change a page object | Same as above — a page object heals as part of whichever test surfaced the break; there is no separate "edit a page object" flow. |
| Review what changed | Read the PR. Every changeset carries a human-readable summary and evidence links. |

## Layout

```
pages/                       page objects — one class per file, Omega-managed
data/                        typed test data — Omega-managed
tests/                       Playwright specs, grouped by feature — Omega-managed
env/                         per-environment values — yours; Omega never writes here
.claude/skills/generate/     the /generate skill — triggers a generate run
.claude/skills/heal/         the /heal skill — triggers a heal run
scripts/gate-omega-managed-paths.sh   the commit-msg gate described above
```

This is Omega's own frozen repo-layout convention — this repo doesn't invent
anything, it's the thing that convention targets.

## Environments

The tests read whatever differs between environments (record ids, values that
change, which credential set signs in) from one file per environment,
`env/<name>.values.json`. That file is yours: Omega never writes it, and the
commit hook never blocks it. A value that is the same everywhere needs no
entry; the default in `data/` stands.

To add an environment:

1. Copy `env/example.values.json` to `env/<name>.values.json`. A name is
   letters, digits, `-` or `_`, starting with a letter or digit.
2. Put each record id under `<PageClass>.record`; a test that needs one names
   the key it is missing. Override any default in `data/<feature>.data.ts` by
   `<feature>.<group>.<name>`, with the group as that file writes it (for
   example `login.validUser.username`). A value that differs for each client
   has no default: the test fails and names the key it is missing, so add that
   key here. Where the saved test data points at a setting with
   `{"config": "<key>"}`, the test reads that key from this file only, as text,
   so write a number as text (`"8080"`, not `8080`). A setting that comes from a
   link or the registry is not used, and the test reports the value as missing.
3. For a password, write only `{"credential": "<set>"}`, never the password.
   Set the password in your CI secrets: `TARGET_APP_PASSWORD` for the
   `default` set, `TARGET_APP_<SET>_PASSWORD` for any other (`admin` reads
   `TARGET_APP_ADMIN_PASSWORD`). A test refuses to run when a values file holds
   the value of any of these variables, a username equal to its password
   included, so give such a user a different password.
   If `TARGET_APP_PASSWORD` is unset, the test that needs it fails with a message
   naming the variable to set.
4. Choose the environment. To run several in one go, link each environment in
   Omega: it adds one Playwright project per environment itself, so do not
   declare a `projects` block in the Playwright config (suite mode refuses a config
   that has one). For a single environment, set `OMEGA_TEST_ENV=<name>`
   instead.

## Style

Everything Omega writes into this repo is meant to read to a non-engineer
QA — test names, PR summaries, evidence. If something here doesn't, that's a
bug in Omega to report upstream, not something to hand-fix in this repo.
