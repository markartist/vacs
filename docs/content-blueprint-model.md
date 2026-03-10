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

## Current Contract Location
- `packages/contracts/src/content-blueprint.ts`
- `packages/contracts/src/blog-workflow.ts` (blog-specific derivative structure)
