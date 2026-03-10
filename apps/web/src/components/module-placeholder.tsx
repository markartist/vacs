export function ModulePlaceholder({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section className="module-shell">
      <h1 className="module-title">{title}</h1>
      <p className="module-description">{description}</p>
      <div className="module-note">
        Scaffold mode: this destination is prepared for implementation but intentionally not functional yet.
      </div>
    </section>
  );
}
