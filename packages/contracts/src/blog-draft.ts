import type { DraftContractMeta } from "./content-blueprint";
import type { BlogDraftHumanReview } from "./blog-review";

export type BlogDraftWorkflowState =
  | "blueprint_created"
  | "blueprint_reviewed"
  | "blog_template_selected"
  | "blog_draft_generated"
  | "draft_reviewed_edited"
  | "draft_approved";

export interface BlogDraftSectionOutput {
  sectionId: string;
  heading: string;
  bodyContentPlaceholder: string;
  seoNotes?: string;
  imageSlotRef?: string;
}

export interface BlogDraftGenerationMetadataPlaceholder {
  mode: "placeholder";
  generatorVersion?: string;
  runId?: string;
  generatedAt?: string;
  notes?: string;
}

export interface BlogDraftObject {
  blogDraftId: string;
  associatedBlueprintId: string;
  associatedTemplateId: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  structuredSectionOutputs: BlogDraftSectionOutput[];
  imageSlotReferences: string[];
  generationMetadata: BlogDraftGenerationMetadataPlaceholder;
  humanReview?: BlogDraftHumanReview;
  workflowState: BlogDraftWorkflowState;
  lifecycle: DraftContractMeta;
}
