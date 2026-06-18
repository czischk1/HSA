#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# Sync the latest prototype from Documents → this repo, push to GitHub, and
# update the live Google Apps Script web app — in one step.
#
#   Run from Git Bash:   ./sync-and-deploy.sh ["optional commit message"]
#
# One-time prereqs (see DEPLOY-GOOGLE-WORKSPACE.md):
#   • clasp installed (npm i -g @google/clasp) and `clasp login` done
#   • `clasp create --type webapp` run once  → creates .clasp.json
#   • (to bump the SAME live /exec URL) save your deployment id:
#         clasp deployments            # find the id
#         echo <DEPLOYMENT_ID> > .deploy-id
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SRC="${HSA_SRC:-/c/Users/Admin/Documents/humanstackai-prototype/index.html}"
DST="$REPO_DIR/index.html"
MSG="${1:-chore: sync prototype + redeploy ($(date '+%Y-%m-%d %H:%M'))}"

cd "$REPO_DIR"

# 1) pull the latest single-file app from the Documents working copy
[ -f "$SRC" ] || { echo "✗ source not found: $SRC"; exit 1; }
cp "$SRC" "$DST"
echo "✓ copied index.html from Documents"

# 2) commit + push to GitHub (skip cleanly if nothing changed)
if [ -n "$(git status --porcelain)" ]; then
  git add -A
  git commit -q -m "$MSG"
  git push -q origin main
  echo "✓ committed + pushed to GitHub — $MSG"
else
  echo "• no changes to commit/push"
fi

# 3) update the Apps Script project
if ! command -v clasp >/dev/null 2>&1; then
  echo "• clasp not installed — skipped Apps Script update (npm i -g @google/clasp)"; exit 0
fi
if [ ! -f .clasp.json ]; then
  echo "• no .clasp.json — run the one-time 'clasp create' first (see DEPLOY-GOOGLE-WORKSPACE.md)"; exit 0
fi
clasp push -f
echo "✓ clasp push"

# 4) bump the live web app (same /exec URL) if a deployment id is configured
if [ -f .deploy-id ]; then
  DEP_ID="$(tr -d '[:space:]' < .deploy-id)"
  clasp deploy -i "$DEP_ID" --description "sync $(date '+%Y-%m-%d %H:%M')"
  echo "✓ redeployed live web app ($DEP_ID)"
else
  echo "• .deploy-id not set — code pushed, production /exec URL NOT bumped."
  echo "    clasp deployments            # list ids"
  echo "    echo <DEPLOYMENT_ID> > .deploy-id"
fi

echo "Done."
