const globalProperties = [
  "title",
  "slug",
  "meta title",
  "meta description",
  "primary keyword",
  "secondary keywords",
  "associated blueprint id",
];

const sectionStructureFields = [
  "section id",
  "heading",
  "section purpose / notes",
  "body content placeholder",
  "optional image slot",
  "optional SEO notes",
];

const templateLibraryPreview = ["blog-longform-standard-v1", "blog-neighborhood-focus-v1"];

export default function BlogWorkflowPage() {
  return (
    <>
      <section className="module-shell">
        <h1 className="module-title">Blog Workflow</h1>
        <p className="module-description">
          Scaffold for blueprint-linked blog template selection and section-based layout review. No content generation
          is implemented.
        </p>
      </section>

      <div className="card-grid">
        <article className="card">
          <h3>Template Library (Draft)</h3>
          <ul style={{ margin: "8px 0 0 18px", padding: 0, color: "#4c607a" }}>
            {templateLibraryPreview.map((item) => (
              <li key={item} style={{ marginBottom: 6 }}>
                {item}
              </li>
            ))}
          </ul>
        </article>
        <article className="card">
          <h3>Global Blog Properties</h3>
          <ul style={{ margin: "8px 0 0 18px", padding: 0, color: "#4c607a" }}>
            {globalProperties.map((item) => (
              <li key={item} style={{ marginBottom: 6 }}>
                {item}
              </li>
            ))}
          </ul>
        </article>
        <article className="card">
          <h3>Section Structure Fields</h3>
          <ul style={{ margin: "8px 0 0 18px", padding: 0, color: "#4c607a" }}>
            {sectionStructureFields.map((item) => (
              <li key={item} style={{ marginBottom: 6 }}>
                {item}
              </li>
            ))}
          </ul>
        </article>
      </div>
    </>
  );
}
