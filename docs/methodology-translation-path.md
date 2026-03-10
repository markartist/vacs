# Methodology Translation Path (Draft)

Purpose: outline the disciplined path from human-authored methodology to system logic using a blueprint-first model.

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
   - Identify evidence inputs, strategic decisions, section definitions, media slots, and output package expectations.
   - Capture ambiguities without forcing assumptions.

3. Blueprint Contract Drafting
   - Express extracted structures as draft blueprint contracts in `packages/contracts`.
   - Keep lifecycle markers set to draft/pending.
   - Keep strict separation between:
     - evidence inputs
     - strategic decisions
     - derivative assets

4. Policy Logic Drafting
   - Convert explicit rules into machine-readable policy candidates in `packages/policies`.
   - Keep unresolved rule conflicts in governance notes.

5. Prompt Input Readiness
   - Define prompt input envelopes and required context fields in `packages/prompts` + contracts.
   - Do not implement generation prompts until methodology is approved.

6. Generation Stage Mapping
   - Map approved methodology into planned blueprint-to-output stages:
     - context normalization
     - blueprint construction
     - channel-specific section assembly
     - policy pass
     - refinement pass
   - Keep stage boundaries explicit to avoid monolithic implementation.

7. Review and Evaluation Design
   - Define review checkpoints and evaluation criteria.
   - Capture acceptance scoring contracts before automation.

## Explicit Non-Goals In This Phase
- No content generation runtime
- No prompt orchestration engine
- No automated copy output

## Current Prepared Artifacts
- Draft central blueprint contracts in `packages/contracts/src/content-blueprint.ts`
- Draft blog derivative contracts in `packages/contracts/src/blog-workflow.ts`
- Content Blueprint scaffold module in `apps/web/src/app/app/content-blueprint`
- Blog workflow scaffold module in `apps/web/src/app/app/blog-workflow`
- Intake workspace under `governance/research/methodology-intake`
