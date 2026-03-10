#!/usr/bin/env bash
set -euo pipefail

required=(
  "apps/api"
  "apps/web"
  "packages/contracts"
  "packages/prompts"
  "packages/policies"
  "packages/core"
  "packages/clients"
  "governance/roadmap"
  "governance/decisions"
  "governance/architecture"
  "governance/plans"
  "governance/research"
  "docs"
  "scripts"
)

for path in "${required[@]}"; do
  if [[ ! -e "$path" ]]; then
    echo "Missing required path: $path"
    exit 1
  fi
done

echo "Repository structure validation passed."
