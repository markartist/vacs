# Spreadsheet To Blueprint Translation Layer (Draft)

Purpose: define how spreadsheet-style planning inputs translate into draft `ContentBlueprintRecord` objects.

Status: draft only, not a production import pipeline.

## Implementation Location
- `packages/core/src/blueprint-intake.ts`

## Input Shape
- `SpreadsheetBlueprintIntakeInput`
  - `propertyId`
  - `owner`
  - `row` (single worksheet row represented as `Record<string, string>`)
  - `evidenceRows` (optional normalized evidence rows from research tabs)

## Output Shape
- `SpreadsheetBlueprintTranslationResult`
  - `blueprintDraft` (`Partial<ContentBlueprintRecord>`)
  - `unmappedColumns` (non-empty source columns not yet mapped)
  - `pendingReviewNotes`

## Current Mapping Scope
- Row-level strategy and structure mapping from `SEO + Content Workflow`
- Optional evidence row mapping from keyword/GBP/GSC tabs
- Derivative opportunity seeding for:
  - blog
  - social
  - ads
  - metadata

## Deliberate Constraints
- No workbook parser implementation
- No persistence layer
- No generation logic
- No policy automation

## Pending Review Areas
- Numeric evidence metric typing (volume, CTR, KD, ranking)
- Social sub-structures (reels, carousels, hashtags)
- Structured schema markup object model
- Workflow status/approval stage normalization
