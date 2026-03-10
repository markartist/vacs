export function DashboardCards() {
  const cards = [
    { title: "Content Jobs", text: "Queue and run status placeholders for future orchestration." },
    { title: "Prompts", text: "Prompt assets, templates, and version controls." },
    { title: "Policies", text: "SEO and brand policy rule evaluation placeholders." },
    { title: "Governance", text: "Decision, review, and approval workflow placeholders." },
    { title: "Admin", text: "Environment and access management scaffold." },
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
