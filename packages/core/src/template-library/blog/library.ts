import type { BlogTemplateLibrary } from "@vacs/contracts/blog-template";

export const draftBlogTemplateLibrary: BlogTemplateLibrary = {
  libraryId: "blog-template-library-v1",
  libraryName: "Draft Blog Template Library",
  lifecycle: {
    status: "draft",
    source: "pending_artifact_review",
    notes: "Scaffold-level template set for blueprint-linked blog planning only.",
  },
  templates: [
    {
      templateId: "blog-longform-standard-v1",
      templateName: "Long-Form Standard",
      lifecycle: {
        status: "draft",
        source: "pending_artifact_review",
      },
      globalProperties: {
        title: "{{title}}",
        slug: "{{slug}}",
        metaTitle: "{{metaTitle}}",
        metaDescription: "{{metaDescription}}",
        primaryKeyword: "{{primaryKeyword}}",
        secondaryKeywords: ["{{secondaryKeyword1}}", "{{secondaryKeyword2}}"],
        associatedBlueprintId: "{{blueprintId}}",
      },
      sections: [
        {
          sectionId: "intro",
          heading: "Introduction",
          purposeNotes: "Set context and intent for the reader.",
          bodyContentPlaceholder: "{{introBody}}",
          seoNotes: "Include primary keyword naturally in first paragraph.",
        },
        {
          sectionId: "core-section-1",
          heading: "Core Section 1",
          purposeNotes: "Deliver key value proposition from blueprint strategy.",
          bodyContentPlaceholder: "{{coreSectionOneBody}}",
          imageSlot: { slotId: "section-image-1", label: "Section Image 1" },
        },
        {
          sectionId: "core-section-2",
          heading: "Core Section 2",
          purposeNotes: "Expand supporting detail and evidence-backed points.",
          bodyContentPlaceholder: "{{coreSectionTwoBody}}",
        },
        {
          sectionId: "closing-cta",
          heading: "Closing and CTA",
          purposeNotes: "Summarize and provide action-oriented close.",
          bodyContentPlaceholder: "{{closingBody}}",
          seoNotes: "Reinforce primary keyword and one secondary keyword.",
        },
      ],
    },
    {
      templateId: "blog-neighborhood-focus-v1",
      templateName: "Neighborhood Focus",
      lifecycle: {
        status: "draft",
        source: "pending_artifact_review",
      },
      globalProperties: {
        title: "{{title}}",
        slug: "{{slug}}",
        metaTitle: "{{metaTitle}}",
        metaDescription: "{{metaDescription}}",
        primaryKeyword: "{{primaryKeyword}}",
        secondaryKeywords: ["{{secondaryKeyword1}}"],
        associatedBlueprintId: "{{blueprintId}}",
      },
      sections: [
        {
          sectionId: "overview",
          heading: "Area Overview",
          purposeNotes: "Introduce location narrative and local relevance.",
          bodyContentPlaceholder: "{{overviewBody}}",
        },
        {
          sectionId: "highlights",
          heading: "Local Highlights",
          purposeNotes: "Show nearby destinations, access, and lifestyle benefits.",
          bodyContentPlaceholder: "{{highlightsBody}}",
          imageSlot: { slotId: "hero-image", label: "Neighborhood Hero", required: true },
        },
        {
          sectionId: "living-fit",
          heading: "Why It Fits Your Lifestyle",
          purposeNotes: "Connect audience intent to property positioning.",
          bodyContentPlaceholder: "{{livingFitBody}}",
          seoNotes: "Use secondary keyword variation in subheading or first sentence.",
        },
      ],
    },
  ],
};

export function listDraftBlogTemplates() {
  return draftBlogTemplateLibrary.templates;
}
