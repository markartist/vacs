"use client";

import { useMemo, useState } from "react";

const templateOptions = [
  { id: "blog-longform-standard-v1", label: "Long-Form Standard" },
  { id: "blog-neighborhood-focus-v1", label: "Neighborhood Focus" },
];

const sampleBlueprintId = "riverbend-home-blueprint-draft";

const templateSections: Record<string, Array<{ sectionId: string; heading: string; imageSlotRef?: string }>> = {
  "blog-longform-standard-v1": [
    { sectionId: "intro", heading: "Introduction" },
    { sectionId: "core-section-1", heading: "Core Section 1", imageSlotRef: "section-image-1" },
    { sectionId: "core-section-2", heading: "Core Section 2" },
    { sectionId: "closing-cta", heading: "Closing and CTA" },
  ],
  "blog-neighborhood-focus-v1": [
    { sectionId: "overview", heading: "Area Overview" },
    { sectionId: "highlights", heading: "Local Highlights", imageSlotRef: "hero-image" },
    { sectionId: "living-fit", heading: "Why It Fits Your Lifestyle" },
  ],
};

export function BlueprintBlogDraftWorkbench() {
  const [selectedTemplateId, setSelectedTemplateId] = useState(templateOptions[0].id);

  const draftObjectPreview = useMemo(() => {
    const sections = templateSections[selectedTemplateId] ?? [];
    return {
      associatedBlueprintId: sampleBlueprintId,
      associatedTemplateId: selectedTemplateId,
      title: "{{title}}",
      metaTitle: "{{metaTitle}}",
      metaDescription: "{{metaDescription}}",
      primaryKeyword: "{{primaryKeyword}}",
      secondaryKeywords: ["{{secondaryKeyword1}}", "{{secondaryKeyword2}}"],
      structuredSectionOutputs: sections.map((section) => ({
        sectionId: section.sectionId,
        heading: section.heading,
        bodyContentPlaceholder: `{{${section.sectionId}Body}}`,
        imageSlotRef: section.imageSlotRef,
      })),
      imageSlotReferences: sections
        .map((section) => section.imageSlotRef)
        .filter((value): value is string => Boolean(value)),
      generationMetadata: {
        mode: "placeholder",
        notes: "No generation run executed.",
      },
      humanReview: {
        revisionStatus: "not_started",
        reviewNotes: [] as string[],
        reviewerIdentityPlaceholders: ["seo_reviewer@placeholder", "content_editor@placeholder"],
        approvalMarker: "approved=false",
      },
    };
  }, [selectedTemplateId]);

  return (
    <section className="module-shell" style={{ marginTop: 14 }}>
      <h2 style={{ margin: 0, color: "#143256" }}>Pilot Blog Draft Workbench</h2>
      <p className="module-description">
        Select a template and inspect the draft blog object structure that will be produced from this blueprint in the
        pilot workflow.
      </p>

      <div className="card-grid" style={{ marginTop: 12 }}>
        <article className="card">
          <h3>Template Selection</h3>
          <label htmlFor="template-select" style={{ display: "block", marginBottom: 6, color: "#4c607a" }}>
            Blog Template
          </label>
          <select
            id="template-select"
            value={selectedTemplateId}
            onChange={(event) => setSelectedTemplateId(event.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #bccadd",
              background: "#fff",
              color: "#102541",
            }}
          >
            {templateOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label} ({option.id})
              </option>
            ))}
          </select>
          <p style={{ marginTop: 10, color: "#4c607a" }}>Blueprint: {draftObjectPreview.associatedBlueprintId}</p>
        </article>

        <article className="card">
          <h3>Draft Object Fields</h3>
          <ul style={{ margin: "8px 0 0 18px", padding: 0, color: "#4c607a" }}>
            <li>associated blueprint id</li>
            <li>associated template id</li>
            <li>title</li>
            <li>meta title</li>
            <li>meta description</li>
            <li>primary keyword</li>
            <li>secondary keywords</li>
            <li>structured section outputs</li>
            <li>image slot references</li>
            <li>generation metadata placeholder</li>
          </ul>
        </article>
      </div>

      <div className="card-grid" style={{ marginTop: 12 }}>
        <article className="card">
          <h3>Structured Section Outputs</h3>
          <ul style={{ margin: "8px 0 0 18px", padding: 0, color: "#4c607a" }}>
            {draftObjectPreview.structuredSectionOutputs.map((section) => (
              <li key={section.sectionId} style={{ marginBottom: 6 }}>
                {section.sectionId}: {section.heading}
              </li>
            ))}
          </ul>
        </article>
        <article className="card">
          <h3>Image Slot References</h3>
          {draftObjectPreview.imageSlotReferences.length === 0 ? (
            <p>No image slot references in this template.</p>
          ) : (
            <ul style={{ margin: "8px 0 0 18px", padding: 0, color: "#4c607a" }}>
              {draftObjectPreview.imageSlotReferences.map((slot) => (
                <li key={slot} style={{ marginBottom: 6 }}>
                  {slot}
                </li>
              ))}
            </ul>
          )}
        </article>
        <article className="card">
          <h3>Human Review Placeholders</h3>
          <ul style={{ margin: "8px 0 0 18px", padding: 0, color: "#4c607a" }}>
            <li>revision status: {draftObjectPreview.humanReview.revisionStatus}</li>
            <li>review notes: empty list</li>
            <li>approval marker: {draftObjectPreview.humanReview.approvalMarker}</li>
          </ul>
          <p style={{ marginTop: 10, color: "#4c607a", fontWeight: 600 }}>reviewer identities</p>
          <ul style={{ margin: "6px 0 0 18px", padding: 0, color: "#4c607a" }}>
            {draftObjectPreview.humanReview.reviewerIdentityPlaceholders.map((item) => (
              <li key={item} style={{ marginBottom: 6 }}>
                {item}
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}
