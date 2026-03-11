# Pilot Methodology To Approved Draft Flow (Draft)

Purpose: define the first controlled pilot path from finalized methodology input to approved blog draft.

Status: review-only scaffolding; no AI generation or automation.

## Flow
1. Methodology Reconciliation
   - Inputs compared:
     - spreadsheet structure
     - mapping documents
     - Alex narrative
   - Output:
     - confirmed model decisions
     - revision/addition decisions
     - operational artifacts excluded from canonical inputs

2. Blueprint Preparation
   - Create one pilot `ContentBlueprintRecord`.
   - Populate evidence, strategy, sections, media guidance, and derivative opportunities.
   - Human review required:
     - strategy and evidence alignment check

3. Blueprint Review Gate
   - Reviewer validates blueprint structure and decision rationale.
   - Must pass before template selection.

4. Blog Template Selection
   - Select one template from draft library.
   - Associate selected template ID with pilot blueprint.
   - Human review required:
     - template suitability for methodology and channel intent

5. Blog Draft Structure Stage
   - Create `BlogDraftObject` in placeholder mode.
   - Populate metadata fields and structured section outputs (no generated prose).
   - Human review required:
     - section-level completeness
     - metadata structure completeness
     - image slot reference checks

6. Draft Review / Edit Stage
   - Capture review notes, revision status, reviewer placeholders, and approval markers.
   - Resolve requested changes.

7. Draft Approval Gate
   - Approval marker set by designated reviewer.
   - Draft considered pilot-ready only after approval.

## Required Human Review Checkpoints
- Blueprint review gate
- Template selection gate
- Draft review/edit gate
- Final approval gate

## Explicit Non-Goals
- No prompting pipeline
- No text generation
- No output automation
