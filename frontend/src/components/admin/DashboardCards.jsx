function DashboardCards({ stats }) {
  const cards = [
    {
      title: "Users",
      icon: "👥",
      value: stats.users,
      color: "#2563eb",
    },
    {
      title: "Authors",
      icon: "✍️",
      value: stats.authors,
      color: "#7c3aed",
    },
    {
      title: "Admins",
      icon: "🛡️",
      value: stats.admins,
      color: "#dc2626",
    },
    {
      title: "Books",
      icon: "📚",
      value: stats.books,
      color: "#16a34a",
    },
    {
      title: "Active Borrows",
      icon: "📖",
      value: stats.activeBorrows,
      color: "#ea580c",
    },
    {
      title: "Reviews",
      icon: "⭐",
      value: stats.reviews,
      color: "#ca8a04",
    },
  ];

  return (
    <div className="dashboard-cards">
      {cards.map((card) => (
        <div
          key={card.title}
          className="card"
          style={{
            borderTop: `5px solid ${card.color}`,
          }}
        >
          <div
            style={{
              fontSize: "2.8rem",
              marginBottom: "15px",
            }}
          >
            {card.icon}
          </div>

          <h3
            style={{
              color: "#6b7280",
              marginBottom: "10px",
              fontWeight: 600,
            }}
          >
            {card.title}
          </h3>

          <h1
            style={{
              color: card.color,
              fontSize: "2.5rem",
              marginBottom: "8px",
            }}
          >
            {card.value}
          </h1>

          <p
            style={{
              color: "#9ca3af",
              fontSize: "14px",
            }}
          >
            Total {card.title.toLowerCase()}
          </p>
        </div>
      ))}
    </div>
  );
}

export default DashboardCards;