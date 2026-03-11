# Venterra AI Content Suite (VACS)

Venterra AI Content Suite is a Cloudflare-native platform in preparation for generating aligned marketing content across channels using structured property, performance, and market context.

## Current Goal
The repository is in **setup/preparation mode** with a working authenticated application environment:
- Magic-link authentication (Worker)
- Signed session cookies backed by persistent D1 sessions
- Protected routes
- Internal reusable app shell UI with scaffold module destinations
- Content Blueprint preparation module as central system-of-record
- Blog workflow preparation module and methodology intake area

The content-generation pipeline is intentionally not implemented yet.

## Intended Hostname
- `vacs.venterradev.com`

## Architecture Direction (High-Level)
Modular stage model (directional, not final):
1. Source context normalization
2. Content Blueprint construction (evidence + strategy + section plan)
3. Channel-specific section assembly from blueprint
4. SEO/policy logic passes
5. Human-quality refinement and evaluation

## Top-Level Structure
- `apps/`
  - `api/` Cloudflare Worker auth/session/protected API foundation
  - `web/` Login experience + authenticated application shell
- `packages/`
  - `contracts/` shared schemas and formal contracts
  - `prompts/` prompt assets/versioning
  - `policies/` machine-readable SEO/brand policy rules
  - `core/` shared logic and utilities
  - `clients/` Cloudflare/service adapters
- `governance/` planning/roadmap/architecture/decisions/research
- `docs/` operational and developer documentation
- `scripts/` helper scripts for setup and validation

## Authentication and Shell Scope Implemented
- `/login` (web)
- `/auth/verify` (web bridge)
- `/auth/request-link` (api)
- `/auth/verify` (api)
- `/auth/session` (api)
- `/auth/logout` (api)
- `/app` and `/app/dashboard` protected APIs
- `/app/*` web shell protected by session check middleware
- `/app/content-blueprint` scaffold module for central record preparation
- `/app/blog-workflow` scaffold module for first workflow preparation

## Methodology Intake And Translation Prep
- Intake workspace:
  - `governance/research/methodology-intake/narrative/`
  - `governance/research/methodology-intake/spreadsheets/`
  - `governance/research/methodology-intake/references/`
  - `governance/research/methodology-intake/mapping-notes/`
- Draft blog workflow contracts:
  - `packages/contracts/src/blog-workflow.ts`
- Draft central blueprint contracts:
  - `packages/contracts/src/content-blueprint.ts`
- Draft blog template contracts:
  - `packages/contracts/src/blog-template.ts`
- Draft blog draft contracts:
  - `packages/contracts/src/blog-draft.ts`
- Draft blog review contracts:
  - `packages/contracts/src/blog-review.ts`
- Draft translation layer:
  - `packages/core/src/blueprint-intake.ts`
- Draft template library scaffold:
  - `packages/core/src/template-library/blog/library.ts`
- Draft pilot blog draft scaffold:
  - `packages/core/src/pilot/blog-draft-pilot.ts`
- Reconciliation scaffolding:
  - `governance/plans/blueprint-reconciliation-plan.md`
  - `governance/research/methodology-intake/mapping-notes/reconciliation-matrix-template.md`
  - `governance/research/methodology-intake/references/riverbend-blueprint-example-record.draft.json`
- Translation docs:
  - `docs/content-blueprint-model.md`
  - `docs/blog-template-library.md`
  - `docs/blog-draft-pilot-lifecycle.md`
  - `docs/pilot-methodology-to-approved-draft-flow.md`
  - `docs/blog-methodology-intake.md`
  - `docs/methodology-translation-path.md`
  - `docs/spreadsheet-blueprint-translation-layer.md`

## Setup Mode Notes
- Email provider defaults to `console` in local mode; `resend` and `sendgrid` provider integrations are implemented for production configuration
- Domain restriction (`@venterraliving.com`) is prepared via env flags and can be enforced later

## Quick Start
```bash
npm install
npm run dev:api
npm run dev:web
```

Open `http://localhost:3000/login`.
