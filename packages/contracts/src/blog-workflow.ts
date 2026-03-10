import type { DraftContractMeta } from "./content-blueprint";
import type { BlogTemplateContract } from "./blog-template";

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

export type BlogTemplateStructure = BlogTemplateContract;

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
