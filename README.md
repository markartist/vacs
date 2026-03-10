# Venterra AI Content Suite (VACS)

Venterra AI Content Suite is a Cloudflare-native platform in preparation for generating aligned marketing content across channels using structured property, performance, and market context.

## Current Repo Goal
This repository is currently in **setup/preparation mode**. It establishes the runtime foundation, repository structure, governance framework, and Cloudflare posture so detailed requirements can be integrated cleanly after planning is finalized.

No full content-generation pipeline is implemented yet.

## High-Level Architecture Direction (Directional)
Planned modular stages:
1. Source context normalization
2. Channel-specific draft generation
3. SEO/policy logic passes
4. Human-quality refinement
5. Evaluation and review

The system is intentionally structured to avoid a monolithic single-prompt approach.

## Intended Hostname
- `vacs.venterradev.com`

## Top-Level Structure
- `apps/`: Runtime applications (Worker/API entrypoint)
- `packages/`: Shared modular building blocks
  - `contracts/`: Schemas, types, data contracts
  - `prompts/`: Prompt assets and versioning
  - `policies/`: Machine-readable policy logic (SEO/brand/rules)
  - `core/`: Shared business logic utilities
  - `clients/`: Cloudflare/service adapters
- `governance/`: Planning and decision system of record
- `docs/`: Developer and operational documentation
- `scripts/`: Helper scripts for setup/development

## Project Status
- Status: `Preparation`
- Build scope now: repository + Worker foundation + Cloudflare setup posture
- Deferred until planning lock: final contracts, agent boundaries, SEO rules, voice rules, review workflow, evaluation criteria
