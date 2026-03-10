export function DashboardCards() {
  const cards = [
    { title: "Content Jobs", text: "Queue and run status placeholders for future orchestration." },
    { title: "Prompt Library", text: "Prompt assets and versioning placeholders." },
    { title: "Policy Layer", text: "SEO/brand policy rule evaluation placeholders." },
    { title: "Governance", text: "Decision, review, and approval workflow placeholders." },
  ];

  return (
    <div className="card-grid">
      {cards.map((card) => (
        <article key={card.title} className="card">
          <h3>{card.title}</h3>
          <p>{card.text}</p>
        </article>
      ))}
    </div>
  );
}
