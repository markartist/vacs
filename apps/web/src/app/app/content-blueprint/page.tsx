import { BlueprintBlogDraftWorkbench } from "../../../components/blueprint-blog-draft-workbench";

const riverbendExample = {
  recordLabel: "Riverbend / Home Page / Blueprint Draft",
  evidence: [
    "Keyword Research tab: branded + unbranded terms, local volume, KD, GSC clicks/impressions",
    "GBP Search Data tab: top property discovery queries and counts",
    "GSC Data tab: clicks, impressions, CTR, average position",
    "Property context: League City location, amenities, and neighborhood references",
  ],
  strategy: [
    "SEO emphasis: branded keyword plus unbranded apartment intent terms",
    "Positioning: pet-friendly modern living near UTMB and I-45",
    "Messaging direction: comfort, convenience, and connected location",
    "Channel intent: website page content + blog + social + ad support",
  ],
  plannedSections: [
    "Metadata section (SEO title + description)",
    "Heading section (H1/H2/H3 structure)",
    "Long on-page description section",
    "Schema/internal-link guidance section",
  ],
  mediaGuidance: [
    "Alt-tag cluster for exterior, leasing office, pool, pet spaces, social spaces",
    "Section-linked media intent for amenities and lifestyle visual support",
    "Social media visual themes (reels/carousels/stories) treated as derivative planning notes",
  ],
  derivativeOpportunities: [
    "Blog long-form topic package",
    "Social caption + reel/carousel/story package",
    "Ad copy package",
    "Metadata and website recommendation package",
  ],
};

const reviewBuckets = [
  {
    title: "Fields Confirmed (Provisional)",
    items: [
      "Evidence block pattern from Keyword/GBP/GSC tabs",
      "Strategy decisions from branded/unbranded/focus keyword planning",
      "Section-level planning from SEO title/description + H1/H2/H3 + long description",
      "Image guidance from image alt-tags and social visual notes",
      "Derivative opportunity pattern across blog/social/ads/metadata",
    ],
  },
  {
    title: "Likely Revisions Needed",
    items: [
      "Typed evidence metrics for CTR/KD/volume/position",
      "Explicit separation of page-level website copy vs GBP copy as distinct derivatives",
      "Structured schema-markup modeling beyond plain-text fields",
    ],
  },
  {
    title: "Additional Fields / States Needed",
    items: [
      "Workflow states for strategy review, editorial review, and approval handoffs",
      "Channel execution sub-structures for social assets (reels/carousels/hashtags/location tags)",
      "Operational provenance fields for spreadsheet tab/row source tracking",
    ],
  },
  {
    title: "Operational Artifacts vs True System Inputs",
    items: [
      "Operational artifacts: sample ad copy blocks, social post formatting examples, workbook-specific helper columns",
      "True system inputs: evidence metrics, strategic decisions, section objectives, media intent, channel targets",
    ],
  },
];

const sectionGroups = [
  { title: "Evidence", items: riverbendExample.evidence },
  { title: "Strategy", items: riverbendExample.strategy },
  { title: "Planned Sections", items: riverbendExample.plannedSections },
  { title: "Image / Media Guidance", items: riverbendExample.mediaGuidance },
  { title: "Derivative Opportunities", items: riverbendExample.derivativeOpportunities },
];

const blogTemplateReference = {
  selectedTemplateId: "blog-longform-standard-v1",
  availableTemplates: ["blog-longform-standard-v1", "blog-neighborhood-focus-v1"],
  status: "Scaffold only: no text generation",
};

export default function ContentBlueprintPage() {
  return (
    <>
      <section className="module-shell">
        <h1 className="module-title">Content Blueprint</h1>
        <p className="module-description">
          Scaffold view for blueprint records as the system of record. This page prepares structure only and does not
          generate content.
        </p>
        <div className="module-note" style={{ marginTop: 12 }}>
          Review Sample: {riverbendExample.recordLabel}
        </div>
      </section>

      <div className="card-grid">
        {sectionGroups.map((group) => (
          <article className="card" key={group.title}>
            <h3>{group.title}</h3>
            <ul style={{ margin: "8px 0 0 18px", padding: 0, color: "#4c607a" }}>
              {group.items.map((item) => (
                <li key={item} style={{ marginBottom: 6 }}>
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <section className="module-shell" style={{ marginTop: 14 }}>
        <h2 style={{ margin: 0, color: "#143256" }}>Blog Template Reference</h2>
        <p className="module-description">
          Blueprint records can reference a blog template from the draft template library. This is review-only wiring
          and does not generate content.
        </p>
        <div className="module-note" style={{ marginTop: 12 }}>
          Selected Template: {blogTemplateReference.selectedTemplateId}
        </div>
        <div className="card-grid" style={{ marginTop: 12 }}>
          <article className="card">
            <h3>Available Templates</h3>
            <ul style={{ margin: "8px 0 0 18px", padding: 0, color: "#4c607a" }}>
              {blogTemplateReference.availableTemplates.map((templateId) => (
                <li key={templateId} style={{ marginBottom: 6 }}>
                  {templateId}
                </li>
              ))}
            </ul>
          </article>
          <article className="card">
            <h3>Status</h3>
            <p>{blogTemplateReference.status}</p>
          </article>
        </div>
      </section>

      <BlueprintBlogDraftWorkbench />

      <section className="module-shell" style={{ marginTop: 14 }}>
        <h2 style={{ margin: 0, color: "#143256" }}>Reconciliation Review Buckets</h2>
        <p className="module-description">
          Prepared for upcoming spreadsheet + mapping + narrative reconciliation. These buckets are review-oriented and
          intentionally draft.
        </p>
      </section>

      <div className="card-grid">
        {reviewBuckets.map((group) => (
          <article className="card" key={group.title}>
            <h3>{group.title}</h3>
            <ul style={{ margin: "8px 0 0 18px", padding: 0, color: "#4c607a" }}>
              {group.items.map((item) => (
                <li key={item} style={{ marginBottom: 6 }}>
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </>
  );
}
