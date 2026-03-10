import type {
  BlueprintImagePlacement,
  BlueprintSectionDefinition,
  ContentBlueprintRecord,
  DerivativeOpportunity,
  DraftContractMeta,
  EvidenceInputRecord,
  StrategicDecisionRecord,
} from "@vacs/contracts/content-blueprint";

export type SpreadsheetRowRecord = Record<string, string>;

export interface SpreadsheetBlueprintIntakeInput {
  propertyId: string;
  owner: string;
  row: SpreadsheetRowRecord;
  evidenceRows?: SpreadsheetRowRecord[];
}

export interface SpreadsheetBlueprintTranslationResult {
  blueprintDraft: Partial<ContentBlueprintRecord>;
  unmappedColumns: string[];
  pendingReviewNotes: string[];
}

const DRAFT_META: DraftContractMeta = {
  status: "draft",
  source: "pending_artifact_review",
};

const KNOWN_COLUMNS = new Set([
  "Property",
  "Location",
  "Page",
  "URL",
  "Profile Branded Property Keyword",
  "Unbranded Primary Keywords",
  "Secondary Unbranded Keywords",
  "SEO Title",
  "SEO Description",
  "H1",
  "H2",
  "H3",
  "Long On-Page Description",
  "GBP Description",
  "Image Alt-Tags",
  "Internal Link Anchor",
  "Schema Type",
  "Schema Name",
  "Schema Amenities",
  "Short Content",
  "Long-Form Content",
  "Social Media",
  "Sem Adjustments",
  "Focus Keywords",
  "Sample Ad Copy",
]);

function text(row: SpreadsheetRowRecord, key: string): string | undefined {
  const raw = row[key];
  if (!raw) return undefined;
  const out = raw.trim();
  return out.length > 0 ? out : undefined;
}

function splitKeywords(value?: string): string[] {
  if (!value) return [];
  return value
    .split(/[,\\n]+/g)
    .map((part) => part.trim())
    .filter(Boolean);
}

function mapEvidenceRows(rows: SpreadsheetRowRecord[] = []): EvidenceInputRecord[] {
  return rows.slice(0, 10).map((row, index) => ({
    evidenceId: `evidence-${index + 1}`,
    sourceType: "manual",
    label: row["Keywords"] || row["Top queries"] || `Spreadsheet Evidence ${index + 1}`,
    summary: JSON.stringify(row),
    lifecycle: DRAFT_META,
  }));
}

function mapStrategy(row: SpreadsheetRowRecord): StrategicDecisionRecord[] {
  const decisions: StrategicDecisionRecord[] = [];

  const branded = text(row, "Profile Branded Property Keyword");
  if (branded) {
    decisions.push({
      decisionId: "decision-branded-keyword",
      category: "seo",
      statement: `Prioritize branded keyword focus: ${branded}`,
      rationale: "Derived from spreadsheet branded keyword planning column.",
      evidenceLinks: [],
      lifecycle: DRAFT_META,
    });
  }

  const unbranded = text(row, "Unbranded Primary Keywords");
  if (unbranded) {
    decisions.push({
      decisionId: "decision-primary-keywords",
      category: "seo",
      statement: `Prioritize unbranded primary keywords: ${unbranded}`,
      rationale: "Derived from spreadsheet primary keyword column.",
      evidenceLinks: [],
      lifecycle: DRAFT_META,
    });
  }

  return decisions;
}

function mapSections(row: SpreadsheetRowRecord): BlueprintSectionDefinition[] {
  const sections: BlueprintSectionDefinition[] = [];

  for (const key of ["H1", "H2", "H3"] as const) {
    const heading = text(row, key);
    if (!heading) continue;
    sections.push({
      sectionId: key.toLowerCase(),
      title: heading,
      objective: `${key} planning imported from spreadsheet`,
      required: true,
      channelTargets: ["blog", "metadata"],
    });
  }

  const longOnPage = text(row, "Long On-Page Description");
  if (longOnPage) {
    sections.push({
      sectionId: "long-on-page-description",
      title: "Long On-Page Description",
      objective: "Draft section seeded from spreadsheet long on-page copy guidance.",
      required: true,
      channelTargets: ["blog", "website-recommendations"],
      guidanceNotes: [longOnPage],
    });
  }

  return sections;
}

function mapImagePlacements(row: SpreadsheetRowRecord): BlueprintImagePlacement[] {
  const altTags = splitKeywords(text(row, "Image Alt-Tags"));
  return altTags.slice(0, 8).map((tag, index) => ({
    placementId: `image-${index + 1}`,
    label: tag,
    purpose: "section",
    altTextGuidance: tag,
  }));
}

function mapDerivativeOpportunities(row: SpreadsheetRowRecord): DerivativeOpportunity[] {
  const opportunities: DerivativeOpportunity[] = [];

  const longForm = text(row, "Long-Form Content");
  if (longForm) {
    opportunities.push({
      opportunityId: "opp-blog",
      channel: "blog",
      title: "Long-Form Blog Opportunity",
      notes: longForm,
    });
  }

  const social = text(row, "Social Media");
  if (social) {
    opportunities.push({
      opportunityId: "opp-social",
      channel: "social",
      title: "Social Opportunity",
      notes: social,
    });
  }

  const ads = text(row, "Sample Ad Copy");
  if (ads) {
    opportunities.push({
      opportunityId: "opp-ads",
      channel: "ads",
      title: "Ad Copy Opportunity",
      notes: ads,
    });
  }

  const shortContent = text(row, "Short Content");
  if (shortContent) {
    opportunities.push({
      opportunityId: "opp-metadata",
      channel: "metadata",
      title: "Metadata/Short Content Opportunity",
      notes: shortContent,
    });
  }

  return opportunities;
}

export function translateSpreadsheetRowToBlueprintDraft(
  input: SpreadsheetBlueprintIntakeInput
): SpreadsheetBlueprintTranslationResult {
  const pageName = text(input.row, "Page") ?? "Unknown Page";
  const sectionTargets = mapDerivativeOpportunities(input.row).map((item) => item.channel);

  const blueprintDraft: Partial<ContentBlueprintRecord> = {
    title: `${pageName} Blueprint Draft`,
    propertyId: input.propertyId,
    owner: input.owner,
    status: "draft",
    objectiveSummary: text(input.row, "SEO Description") ?? "Draft objective imported from spreadsheet row.",
    audienceSummary: text(input.row, "Location"),
    evidence: mapEvidenceRows(input.evidenceRows),
    strategicDecisions: mapStrategy(input.row),
    sections: mapSections(input.row),
    imagePlacements: mapImagePlacements(input.row),
    derivativeOpportunities: mapDerivativeOpportunities(input.row),
    channelTargets: sectionTargets.length > 0 ? Array.from(new Set(sectionTargets)) : ["blog"],
    lifecycle: DRAFT_META,
  };

  const unmappedColumns = Object.keys(input.row).filter((key) => {
    const value = text(input.row, key);
    return Boolean(value) && !KNOWN_COLUMNS.has(key);
  });

  return {
    blueprintDraft,
    unmappedColumns,
    pendingReviewNotes: [
      "Spreadsheet parsing and field interpretation are draft-only until narrative validation.",
      "Numeric evidence metrics need typed contract definitions before production intake.",
      "Social sub-structures (reels, carousels, hashtags) need dedicated derivative contracts.",
    ],
  };
}
