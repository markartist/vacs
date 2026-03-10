const sectionGroups = [
  {
    title: "Evidence",
    items: [
      "Keyword research rows (SEMrush, local volume, KD, clicks/impressions)",
      "GBP query trends and ranking terms",
      "GSC query performance (clicks, impressions, CTR, position)",
      "Property and page context references",
    ],
  },
  {
    title: "Strategy",
    items: [
      "Branded and unbranded keyword prioritization",
      "Audience and location framing decisions",
      "Messaging and SEO focus decisions",
      "Channel target selection for derivative assets",
    ],
  },
  {
    title: "Planned Sections",
    items: [
      "Section-level heading plan (H1/H2/H3)",
      "On-page and metadata section objectives",
      "Schema and internal-link guidance placeholders",
      "Section ordering and required/optional status",
    ],
  },
  {
    title: "Image / Media Guidance",
    items: [
      "Alt-tag and visual intent notes",
      "Placement references tied to section IDs",
      "Format/aspect-ratio hints",
      "Source preference and licensing notes",
    ],
  },
  {
    title: "Derivative Opportunities",
    items: [
      "Blog package opportunity",
      "Social package opportunity",
      "Ad copy opportunity",
      "Metadata and website recommendation opportunities",
    ],
  },
];

export default function ContentBlueprintPage() {
  return (
    <>
      <section className="module-shell">
        <h1 className="module-title">Content Blueprint</h1>
        <p className="module-description">
          Scaffold view for blueprint records as the system of record. This page prepares structure only and does not
          generate content.
        </p>
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
    </>
  );
}
