---
name: generate
description: Trigger an Omega generate run for a new test. Calls the Run API, waits for a PR, and reports if a run is waiting for a person — it never writes a test file itself.
---

# /generate

Triggers a **generate** run against the Omega Run API
(`POST /runs` with `type: generate` — see `docs/CONTRACTS/run-api.v0.yaml` in
the omega repo for the full schema).

## What this skill does

1. Takes your plain-language requirement (or a ticket reference, if this
   Omega instance has a TicketSource configured) and posts it as `source` on
   `POST /runs`.
2. Polls `GET /runs/{run_id}` until `status` is `completed` or `failed`,
   surfacing `progress.phase` / `progress.detail` as it goes. If
   `progress.waiting` is present, the run is paused for a person (its
   `status` stays `running`): stop polling and report, in plain language,
   what is being asked (`progress.waiting.question`; if the kind is
   unknown, say it needs a person), the run id, and that they should open
   this run in Omega to answer. Say that `/generate` will not continue on
   its own — check the run in Omega afterwards. Never call
   `/runs/{run_id}/answer` from this skill; the person answers in Omega.
3. On `completed`, reads `GET /runs/{run_id}/result` and reports the PR link
   from the delivery — Omega already opened it, this skill does not.
4. On `failed`, reports `triage.category` and `triage.detail` in plain
   language — never a raw stack trace or engine log line.

## What this skill does NOT do

It never generates, edits, or writes to `pages/`, `data/`, or `tests/`
itself. If the Run API is unreachable or a run fails, the fix is to correct
the run's input and trigger again — never to hand-write the test this skill
was asked for. That would recreate the two-engine problem Omega's ADR-004
exists to prevent (see this repo's `CLAUDE.md`).
