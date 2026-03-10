# Methodology Translation Path (Draft)

Purpose: outline the disciplined path from human-authored methodology to system logic for the first business workflow (long-form blog content).

Status: draft and pending narrative/spreadsheet review.

## Source Inputs
- Narrative documentation (process description, intent, constraints)
- Spreadsheet/template artifacts (fields, sections, ordering, checks)
- Supporting references

## Translation Stages
1. Intake and Catalog
   - Place artifacts in `governance/research/methodology-intake/`.
   - Record provenance/version in mapping notes.

2. Structural Extraction
   - Identify template parts, brief fields, section definitions, media slots, and output package expectations.
   - Capture ambiguities without forcing assumptions.

3. Contract Drafting
   - Express extracted structures as draft contracts in `packages/contracts`.
   - Keep lifecycle markers set to draft/pending.

4. Policy Logic Drafting
   - Convert explicit rules into machine-readable policy candidates in `packages/policies`.
   - Keep unresolved rule conflicts in governance notes.

5. Prompt Input Readiness
   - Define prompt input envelopes and required context fields in `packages/prompts` + contracts.
   - Do not implement generation prompts until methodology is approved.

6. Generation Stage Mapping
   - Map approved methodology into planned stages:
     - context normalization
     - draft assembly
     - policy pass
     - refinement pass
   - Keep stage boundaries explicit to avoid monolithic implementation.

7. Review and Evaluation Design
   - Define review checkpoints and evaluation criteria.
   - Capture acceptance scoring contracts before automation.

## Explicit Non-Goals In This Phase
- No blog generation runtime
- No prompt orchestration engine
- No automated copy output

## Current Prepared Artifacts
- Draft contracts for blog workflow in `packages/contracts/src/blog-workflow.ts`
- Blog workflow scaffold module in `apps/web/src/app/app/blog-workflow`
- Intake workspace under `governance/research/methodology-intake`
