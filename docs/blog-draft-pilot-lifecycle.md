# Blog Draft Pilot Lifecycle (Draft)

Purpose: define the controlled lifecycle for a single pilot blog draft derived from one Content Blueprint and one Blog Template.

Status: scaffold-only, no generation runtime.

## Lifecycle Sequence
1. Blueprint created
2. Blueprint reviewed
3. Blog template selected
4. Blog draft generated
5. Draft reviewed/edited
6. Draft approved

## Object Contracts
- Blog draft object contract:
  - `packages/contracts/src/blog-draft.ts`
- Blog draft human review contract:
  - `packages/contracts/src/blog-review.ts`
- Blog template contract:
  - `packages/contracts/src/blog-template.ts`
- Blueprint contract:
  - `packages/contracts/src/content-blueprint.ts`

## Pilot Notes
- `Blog draft generated` is represented as a placeholder structure in this phase.
- Human review is represented with revision status, review notes, reviewer identity placeholders, and approval markers.
- Prompt orchestration and AI generation are intentionally not implemented.
