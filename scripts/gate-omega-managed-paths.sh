#!/usr/bin/env bash
# Omega test-repo scaffold — commit-msg gate (docs/CONTRACTS/test-repo-template.md).
#
# The rule this contract exists to enforce: nobody hand-edits Omega-managed
# output. A commit that touches a managed path must carry the same
# `Omega-Run-Id: <run_id>` trailer GitPrSink stamps on its own delivery
# commits (docs/CONTRACTS/result-sink.md, "Commit convention") — that
# trailer is the one signal separating "Omega wrote this" from "a human
# hand-edited Omega's output", so a commit missing it on a managed path is
# blocked before it lands.
#
# Usage (as a commit-msg hook, via .githooks/commit-msg):
#   gate-omega-managed-paths.sh <commit-msg-file>
#
# Exit codes:
#   0  no managed path staged, OR the trailer is present — commit allowed
#   1  a managed path is staged and the trailer is missing — commit BLOCKED
#   2  COULD NOT CHECK (bad ref, git failure) — never silently allow (mirrors
#      the omega repo's own scripts/verify.sh / quality/scripts/pr_size_guard.sh:
#      a scan error is a build-breaker, never treated as a pass)
set -uo pipefail

MSG_FILE="${1:-}"
[ -n "$MSG_FILE" ] && [ -f "$MSG_FILE" ] || {
  echo "gate-omega-managed-paths: usage: $(basename "$0") <commit-msg-file>" >&2
  exit 2
}

# Managed kinds, per output-contract.md §1 — the only
# paths Omega's own writer/extractor may create or modify.
MANAGED=(
  ':(glob)pages/*.page.ts'
  ':(glob)data/*.data.ts'
  ':(glob)tests/**/*.spec.ts'
)

ERR=$(mktemp)
STAGED=$(git diff --cached --name-only -- "${MANAGED[@]}" 2>"$ERR")
rc=$?
GIT_ERR=$(cat "$ERR")
rm -f "$ERR"
if [ "$rc" -ne 0 ]; then
  # stderr kept separate from STAGED so a benign warning on an otherwise
  # successful call can never masquerade as a staged managed path.
  echo "gate-omega-managed-paths: CANNOT CHECK — git diff failed: $GIT_ERR" >&2
  exit 2
fi

[ -z "$STAGED" ] && exit 0   # nothing managed staged — not this gate's concern

if grep -qE '^Omega-Run-Id: .+' "$MSG_FILE"; then
  exit 0
fi

cat >&2 <<EOF
gate-omega-managed-paths: BLOCKED — this commit touches Omega-managed file(s)
without an "Omega-Run-Id" trailer:

$(printf '  %s\n' "$STAGED")

These files are written by Omega's engine, never by hand (see this repo's
CLAUDE.md). A direct edit here will drift from — and be silently
overwritten by — the next /generate or /heal run.

What to do instead: trigger /generate or /heal for the change you want;
Omega opens a PR with this trailer already on its commit. If you are
intentionally merging Omega's own PR branch, merge/rebase it — don't
hand-author the trailer yourself.
EOF
exit 1
