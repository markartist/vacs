# Content Blueprint Model (Draft)

Purpose: define the central system-of-record pattern for VACS where one blueprint drives many channel outputs.

Status: draft and pending methodology artifact review.

## Core Principle
`ContentBlueprintRecord` is the canonical strategic object.

Channel deliverables are derivative outputs from a blueprint, not independent source objects.

## Separation Of Concerns
- Evidence Inputs:
  - source observations and references
  - no strategic conclusions
- Strategic Decisions:
  - explicit choices and rationale tied to evidence
  - no generated copy
- Generated/Derived Assets:
  - section-based output packages by channel
  - linked back to blueprint, evidence, and decision records

## Derivative Channels (Prepared)
- Blog
- Social
- Email
- Ads
- Metadata
- Website copy recommendations

## Output Shape Rule
All derived outputs should use section-based structures, not monolithic document blobs.

## Blog Template Linkage (Draft)
- Blueprint review scaffolding supports referencing a blog template ID.
- Blog template contracts are defined in `packages/contracts/src/blog-template.ts`.
- Pilot blog draft object contracts are defined in `packages/contracts/src/blog-draft.ts`.

## Current Contract Location
- `packages/contracts/src/content-blueprint.ts`
- `packages/contracts/src/blog-workflow.ts` (blog-specific derivative structure)

## Draft Translation Layer
- `packages/core/src/blueprint-intake.ts`
- `docs/spreadsheet-blueprint-translation-layer.md`

## Reconciliation Readiness
- `governance/plans/blueprint-reconciliation-plan.md`
- `governance/research/methodology-intake/mapping-notes/reconciliation-matrix-template.md`
- `governance/research/methodology-intake/references/riverbend-blueprint-example-record.draft.json`
- Governance UI reconciliation surface:
  - `apps/web/src/app/app/governance/page.tsx`
