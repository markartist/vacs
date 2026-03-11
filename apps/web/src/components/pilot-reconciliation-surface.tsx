const comparisonRows = [
  {
    area: "Blueprint Model",
    current: "Evidence, strategy, section plans, media guidance, derivative opportunities",
    narrativeCheck: "Confirm field intent and identify missing workflow states",
    status: "Pending Alex narrative",
  },
  {
    area: "Blog Template Model",
    current: "Global metadata fields + section-based layout contract",
    narrativeCheck: "Confirm section ordering logic and template variation rules",
    status: "Pending Alex narrative",
  },
  {
    area: "Blog Draft Lifecycle",
    current: "Created -> Reviewed -> Template Selected -> Draft Generated -> Reviewed/Edited -> Approved",
    narrativeCheck: "Confirm gate criteria for transition between lifecycle steps",
    status: "Pending Alex narrative",
  },
];

const reviewScaffold = {
  revisionStatus: "not_started",
  reviewerPlaceholders: ["seo_reviewer@placeholder", "content_editor@placeholder"],
  approvalMarker: "approved=false",
};

export function PilotReconciliationSurface() {
  return (
    <>
      <section className="module-shell">
        <h1 className="module-title">Pilot Reconciliation Surface</h1>
        <p className="module-description">
          Compare current pilot models against Alex&apos;s narrative and capture governance decisions before pilot
          execution.
        </p>
      </section>

      <div className="card-grid">
        <article className="card">
          <h3>Model Comparison Matrix</h3>
          <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 8, fontSize: 13 }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", borderBottom: "1px solid #d9e3f0", paddingBottom: 6 }}>Area</th>
                <th style={{ textAlign: "left", borderBottom: "1px solid #d9e3f0", paddingBottom: 6 }}>Current</th>
                <th style={{ textAlign: "left", borderBottom: "1px solid #d9e3f0", paddingBottom: 6 }}>Narrative Check</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row.area}>
                  <td style={{ verticalAlign: "top", paddingTop: 8, color: "#143256", fontWeight: 600 }}>{row.area}</td>
                  <td style={{ verticalAlign: "top", paddingTop: 8, color: "#4c607a" }}>{row.current}</td>
                  <td style={{ verticalAlign: "top", paddingTop: 8, color: "#4c607a" }}>
                    {row.narrativeCheck}
                    <div style={{ marginTop: 4, color: "#6b7f96" }}>{row.status}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>

        <article className="card">
          <h3>Human Review Scaffold (Blog Draft)</h3>
          <ul style={{ margin: "8px 0 0 18px", padding: 0, color: "#4c607a" }}>
            <li>revision status: {reviewScaffold.revisionStatus}</li>
            <li>review notes: empty list (placeholder)</li>
            <li>reviewer identity placeholders:</li>
          </ul>
          <ul style={{ margin: "6px 0 0 30px", padding: 0, color: "#4c607a" }}>
            {reviewScaffold.reviewerPlaceholders.map((item) => (
              <li key={item} style={{ marginBottom: 6 }}>
                {item}
              </li>
            ))}
          </ul>
          <ul style={{ margin: "8px 0 0 18px", padding: 0, color: "#4c607a" }}>
            <li>approval marker: {reviewScaffold.approvalMarker}</li>
          </ul>
        </article>
      </div>
    </>
  );
}
