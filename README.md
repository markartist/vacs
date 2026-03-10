# Venterra AI Content Suite (VACS)

Venterra AI Content Suite is a Cloudflare-native platform in preparation for generating aligned marketing content across channels using structured property, performance, and market context.

## Current Goal
The repository is in **setup/preparation mode** with a working authenticated application environment:
- Magic-link authentication (Worker)
- Signed session cookies backed by persistent D1 sessions
- Protected routes
- Internal reusable app shell UI with scaffold module destinations

The content-generation pipeline is intentionally not implemented yet.

## Intended Hostname
- `vacs.venterradev.com`

## Architecture Direction (High-Level)
Modular stage model (directional, not final):
1. Source context normalization
2. Channel-specific draft generation
3. SEO/policy logic passes
4. Human-quality refinement
5. Evaluation and review

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
