export type DraftStatus = "draft";

export interface DraftContractMeta {
  status: DraftStatus;
  source: "pending_artifact_review";
  notes?: string;
}

export type EvidenceSourceType =
  | "ga4"
  | "gsc"
  | "pagespeed"
  | "gbp"
  | "pricing_availability"
  | "property_data"
  | "market_context"
  | "manual";

export interface EvidenceInputRecord {
  evidenceId: string;
  sourceType: EvidenceSourceType;
  label: string;
  referenceId?: string;
  sourceUrl?: string;
  observedAt?: string;
  snapshotAt?: string;
  summary?: string;
  lifecycle: DraftContractMeta;
}

export interface StrategicDecisionRecord {
  decisionId: string;
  category: "audience" | "positioning" | "seo" | "voice" | "offer" | "cta" | "risk";
  statement: string;
  rationale: string;
  evidenceLinks: string[];
  confidence?: "low" | "medium" | "high";
  lifecycle: DraftContractMeta;
}

export interface BlueprintSectionDefinition {
  sectionId: string;
  title: string;
  objective: string;
  required: boolean;
  channelTargets: ContentChannel[];
  guidanceNotes?: string[];
  policyTags?: string[];
  minLengthHint?: number;
  maxLengthHint?: number;
}

export interface BlueprintImagePlacement {
  placementId: string;
  sectionId?: string;
  label: string;
  purpose: "hero" | "section" | "inline" | "supporting" | "social";
  aspectRatioHint?: string;
  altTextGuidance?: string;
  sourcePreference?: string;
}

export type ContentChannel = "blog" | "social" | "email" | "ads" | "metadata" | "website-recommendations";

export interface ContentBlueprintRecord {
  blueprintId: string;
  title: string;
  propertyId: string;
  campaignId?: string;
  owner: string;
  status: "draft" | "review";
  createdAt: string;
  updatedAt: string;
  objectiveSummary: string;
  audienceSummary?: string;
  evidence: EvidenceInputRecord[];
  strategicDecisions: StrategicDecisionRecord[];
  sections: BlueprintSectionDefinition[];
  imagePlacements: BlueprintImagePlacement[];
  channelTargets: ContentChannel[];
  lifecycle: DraftContractMeta;
}

export interface ChannelOutputSection {
  sectionId: string;
  heading: string;
  body: string;
  ordering: number;
  decisionLinks?: string[];
  evidenceLinks?: string[];
}

export interface DerivativeOutputPackage {
  outputId: string;
  blueprintId: string;
  channel: ContentChannel;
  status: "draft" | "review";
  generatedAt?: string;
  sections: ChannelOutputSection[];
  mediaPlacementRefs?: string[];
  metadata?: Record<string, string>;
  lifecycle: DraftContractMeta;
}
