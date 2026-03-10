# Repository Structure Overview

```text
apps/
  api/                # Cloudflare Worker: auth, sessions, protected routes
  web/                # Login + authenticated shell
packages/
  contracts/          # Shared schemas/data contracts
  prompts/            # Prompt assets and versioning
  policies/           # SEO/brand/policy rules
  core/               # Shared business logic
  clients/            # Service adapters/wrappers
governance/
  roadmap/
  decisions/
  architecture/
  plans/
  research/
    methodology-intake/  # Narrative/spreadsheet/reference intake for workflow formalization
docs/
  blog-methodology-intake.md
  methodology-translation-path.md
scripts/
```

Design intent: keep runtime implementation (`apps`) isolated from governance and modular shared assets (`packages`).
