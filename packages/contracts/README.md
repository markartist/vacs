# @vacs/contracts

Purpose: shared TypeScript contracts for cross-app boundaries in VACS.

Status: scaffolded for setup/preparation mode.

## Current Contracts
- `session.ts`: user identity and authenticated session state contracts
- `navigation.ts`: module metadata and navigation registry contracts
- `content-job.ts`: draft content-job structure for future orchestration modules
- `content-blueprint.ts`: draft central blueprint model with explicit separation of evidence, strategy, and derivative assets
- `blog-template.ts`: draft long-form blog template contract (global properties + section blocks)
- `blog-workflow.ts`: draft blog-specific derivative contracts linked to blueprint records

These contracts are intentionally conservative and expected to evolve as formal data contracts are finalized.
