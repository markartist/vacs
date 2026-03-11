import type { BlogDraftObject, BlogDraftWorkflowState } from "@vacs/contracts/blog-draft";
import { draftBlogTemplateLibrary } from "../template-library/blog/library";

const workflowSequence: BlogDraftWorkflowState[] = [
  "blueprint_created",
  "blueprint_reviewed",
  "blog_template_selected",
  "blog_draft_generated",
  "draft_reviewed_edited",
  "draft_approved",
];

export function pilotBlogDraftLifecycle(): BlogDraftWorkflowState[] {
  return workflowSequence;
}

export function buildPilotBlogDraft(
  associatedBlueprintId: string,
  associatedTemplateId = draftBlogTemplateLibrary.templates[0]?.templateId ?? "blog-template-draft"
): BlogDraftObject {
  return {
    blogDraftId: "pilot-blog-draft-001",
    associatedBlueprintId,
    associatedTemplateId,
    title: "{{title}}",
    metaTitle: "{{metaTitle}}",
    metaDescription: "{{metaDescription}}",
    primaryKeyword: "{{primaryKeyword}}",
    secondaryKeywords: ["{{secondaryKeyword1}}", "{{secondaryKeyword2}}"],
    structuredSectionOutputs: [
      {
        sectionId: "intro",
        heading: "Introduction",
        bodyContentPlaceholder: "{{introBody}}",
      },
      {
        sectionId: "core-section-1",
        heading: "Core Section 1",
        bodyContentPlaceholder: "{{coreSectionOneBody}}",
        imageSlotRef: "section-image-1",
      },
      {
        sectionId: "closing-cta",
        heading: "Closing and CTA",
        bodyContentPlaceholder: "{{closingBody}}",
        seoNotes: "Reinforce primary keyword near close.",
      },
    ],
    imageSlotReferences: ["hero-image", "section-image-1"],
    generationMetadata: {
      mode: "placeholder",
      notes: "No AI generation executed in pilot scaffold mode.",
    },
    humanReview: {
      draftId: "pilot-blog-draft-001",
      revisionStatus: "not_started",
      reviewNotes: [],
      reviewerMarkers: [
        { reviewerIdentityPlaceholder: "seo_reviewer@placeholder", completed: false },
        { reviewerIdentityPlaceholder: "content_editor@placeholder", completed: false },
      ],
      approvalMarker: {
        approved: false,
      },
      lifecycle: {
        status: "draft",
        source: "pending_artifact_review",
        notes: "Human review scaffold only.",
      },
    },
    workflowState: "blog_template_selected",
    lifecycle: {
      status: "draft",
      source: "pending_artifact_review",
      notes: "Pilot object scaffold only.",
    },
  };
}
