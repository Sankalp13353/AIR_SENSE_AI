import "../styles/dashboard.css";

function StatsCards({ stats }) {
  const cards = [
    {
      title: "Total Predictions",
      value: stats.total_predictions ?? 0,
      icon: "📊",
    },
    {
      title: "Average AQI",
      value: stats.average_aqi ?? 0,
      icon: "🌍",
    },
    {
      title: "Highest AQI",
      value: stats.highest_aqi ?? 0,
      icon: "🔴",
    },
    {
      title: "Lowest AQI",
      value: stats.lowest_aqi ?? 0,
      icon: "🟢",
    },
  ];

  return (
    <div className="stats-grid">
      {cards.map((card, index) => (
        <div className="stat-card" key={index}>
          <div className="stat-icon">{card.icon}</div>

          <h3>{card.title}</h3>

          <h1>{card.value}</h1>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;