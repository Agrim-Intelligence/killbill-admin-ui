---
name: heal
description: Trigger an Omega heal run for a failing test. Calls the Run API and waits for a PR — it never edits the failing spec or page object itself.
---

# /heal

Triggers a **heal** run against the Omega Run API
(`POST /runs` with `type: heal` — see `docs/CONTRACTS/run-api.v0.yaml` in the
omega repo for the full schema).

## What this skill does

1. Takes the failing Playwright spec (`script`, inline) and, if useful, the
   Gherkin it should satisfy (`gherkin`, optional) and posts them on
   `POST /runs`.
2. Polls `GET /runs/{run_id}` until `status` is `completed` or `failed`,
   surfacing `progress.phase` / `progress.detail` as it goes.
3. On `completed`, reads `GET /runs/{run_id}/result` — reports the PR link
   from the delivery plus `heal.diff` and `heal.attempts` in plain language.
4. On `failed`, reports `triage.category` and `triage.detail` — never a raw
   stack trace or engine log line, and never retried silently by this skill.

## What this skill does NOT do

It never edits `pages/*.page.ts`, `data/*.data.ts`, or `tests/**/*.spec.ts`
itself, and it never guesses at a fix locally when a heal run fails. A
failed heal is reported, not patched around — hand-patching here is exactly
the drift the commit-msg gate (`scripts/gate-omega-managed-paths.sh`) exists
to catch (see this repo's `CLAUDE.md`).
