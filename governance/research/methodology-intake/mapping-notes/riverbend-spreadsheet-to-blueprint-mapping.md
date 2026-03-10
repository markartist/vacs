# Riverbend Spreadsheet To Content Blueprint Mapping (Draft)

Source artifact:
- `/Users/mark/Downloads/Riverbend_SEO Content Workflow & Digital Marketing Strategy_COPY.xlsx`

Status:
- Draft interpretation only
- Pending Alex narrative walkthrough and stakeholder confirmation

## Workbook Tabs Reviewed
- `SEO + Content Workflow`
- `Keyword Research`
- `GBP Search Data`
- `GSC Data (6 Months)`

## 1) Evidence Inputs Mapping

Spreadsheet fields interpreted as evidence inputs:
- `Keyword Research` tab:
  - `Keywords`
  - `SEMrush Source`
  - `Local Search Volume`
  - `US Search Volume`
  - `GBP Search Volume`
  - `GSC Clicks / Impressions`
  - `KD%`
- `GBP Search Data` tab:
  - ranked query + volume rows
- `GSC Data (6 Months)` tab:
  - `Top queries`
  - `Clicks`
  - `Impressions`
  - `CTR`
  - `Position`
- `SEO + Content Workflow` contextual evidence:
  - `Property`
  - `Location`
  - `Page`
  - `URL`

Blueprint contract destination:
- `ContentBlueprintRecord.evidence[]` (`EvidenceInputRecord`)
- `ContentBlueprintRecord.propertyId`
- `ContentBlueprintRecord.title` / contextual labels

## 2) Strategic Decisions Mapping

Spreadsheet fields interpreted as strategic decisions:
- `Profile Branded Property Keyword`
- `Unbranded Primary Keywords`
- `Secondary Unbranded Keywords`
- `Focus Keywords`
- `Sem Adjustments`
- messaging choices embedded in:
  - `Short Content`
  - `Long-Form Content`
  - `Sample Ad Copy`

Blueprint contract destination:
- `ContentBlueprintRecord.strategicDecisions[]` (`StrategicDecisionRecord`)
- `ContentBlueprintRecord.objectiveSummary`
- `ContentBlueprintRecord.audienceSummary`
- `ContentBlueprintRecord.channelTargets`

## 3) Structural Planning Mapping

Spreadsheet fields interpreted as section/structure planning:
- `SEO Title`
- `SEO Description`
- `H1`
- `H2`
- `H3`
- `Long On-Page Description`
- `GBP Description`
- `Internal Link Anchor`
- `Schema Type`
- `Schema Name`
- `Schema Amenities`

Blueprint contract destination:
- `ContentBlueprintRecord.sections[]` (`BlueprintSectionDefinition`)
- `DerivativeOutputPackage.sections[]` (`ChannelOutputSection`) for channel-level derivatives

## 4) Image / Media Guidance Mapping

Spreadsheet fields interpreted as media guidance:
- `Image Alt-Tags`
- media cues embedded in social content (`Reel Ideas`, `Carousel Ideas`, `Story Ideas`)

Blueprint contract destination:
- `ContentBlueprintRecord.imagePlacements[]` (`BlueprintImagePlacement`)

## 5) Derivative Opportunities Mapping

Spreadsheet fields interpreted as derivative channel opportunities:
- `Short Content`
- `Long-Form Content`
- `Social Media`
- `Sample Ad Copy`
- metadata-related fields:
  - `SEO Title`
  - `SEO Description`
  - headings (`H1/H2/H3`)

Blueprint contract destination:
- `ContentBlueprintRecord.derivativeOpportunities[]` (`DerivativeOpportunity`)
- `ContentBlueprintRecord.channelTargets`
- channel-specific `DerivativeOutputPackage` records

## Pending Review: Fields/Stages Not Fully Represented Yet

Items seen in spreadsheet but not fully modeled in current draft contracts:
- explicit numeric SEO metrics schema (volume, CTR, KD, position) beyond generic evidence summary
- detailed social execution structures:
  - reel ideas
  - carousel slide plans
  - story concepts
  - hashtag bundles
  - location tags
- explicit SERP length constraints/workflow gates (SEO title/description length control)
- schema markup detail model (`Schema Type/Name/Amenities`) as typed structured objects
- distinction between page-level on-site copy vs GBP copy as dedicated derivative types
- SEM adjustment strategy as typed ad-ops decisions
- workflow status columns/checkpoints for review/approval handoffs

These should remain draft pending the narrative walkthrough and schema refinement pass.
