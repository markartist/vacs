import type { DraftContractMeta } from "./content-blueprint";

export interface BlogImageSlot {
  slotId: string;
  label: string;
  purpose: "hero" | "section" | "inline" | "supporting";
  aspectRatioHint?: string;
  altTextGuidance?: string;
  mediaRefId?: string;
  sourceUrl?: string;
  licenseNote?: string;
}

export interface BlogSectionStructure {
  sectionId: string;
  title: string;
  objective: string;
  required: boolean;
  minWords?: number;
  maxWords?: number;
  seoFocus?: string[];
  policyTags?: string[];
  imageSlots?: BlogImageSlot[];
}

export interface BlogTemplateStructure {
  templateId: string;
  templateName: string;
  channel: "blog";
  blueprintSectionRefs?: string[];
  lifecycle: DraftContractMeta;
  audienceHint?: string;
  toneHint?: string;
  sections: BlogSectionStructure[];
}

export interface BlogBriefInputStructure {
  briefId: string;
  blueprintId: string;
  propertyId: string;
  requestedBy: string;
  campaignId?: string;
  publishWindow?: string;
  primaryKeyword?: string;
  secondaryKeywords?: string[];
  intentSummary: string;
  audienceSummary?: string;
  businessGoal?: string;
  requiredPoints?: string[];
  prohibitedClaims?: string[];
  sourceReferences?: string[];
  lifecycle: DraftContractMeta;
}

export interface BlogOutputSection {
  sectionId: string;
  heading: string;
  markdown: string;
  wordCount: number;
  linkedImageSlots?: string[];
}

export interface BlogOutputPackageStructure {
  outputId: string;
  blueprintId: string;
  briefId: string;
  templateId: string;
  status: "draft" | "review";
  generatedAt: string;
  title: string;
  slug: string;
  excerpt?: string;
  sections: BlogOutputSection[];
  media: BlogImageSlot[];
  qualitySignals?: Record<string, string | number | boolean>;
  lifecycle: DraftContractMeta;
}
