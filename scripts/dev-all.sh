#!/usr/bin/env bash

set -euo pipefail

cleanup() {
  if [[ -n "${RAILS_PID:-}" ]]; then
    kill "$RAILS_PID" 2>/dev/null || true
    wait "$RAILS_PID" 2>/dev/null || true
  fi
}

trap cleanup EXIT INT TERM

cd backend
bundle exec rails server &
RAILS_PID=$!
cd ..

npm run dev
